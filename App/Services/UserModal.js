import AsyncStorage from "@react-native-community/async-storage";
import * as firebase from "firebase";
import { remove, findIndex, get, isFunction } from "lodash";

import { Constants, Config } from "@common";
import firebaseApp from "@services/Firebase";

import Api from "./Api";

function UserModal() {
  if (!(this instanceof UserModal)) {
    return new UserModal();
  }
}

/**
 * Check the user login data is existing on the app
 * @returns {boolean}
 */
UserModal.prototype.isLogedIn = async function () {
  try {
    const value = await AsyncStorage.getItem(Constants.Key.user);

    return value;
  } catch (error) {}
};

/**
 * create account with firebase
 * @param email
 * @param password
 * @param callBackFunc
 * @param onError
 */
UserModal.prototype.createWithFirebase = async function (
  email,
  password,
  callBackFunc,
  onError
) {
  try {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        if (typeof callBackFunc === "function") {
          callBackFunc();
        }
        return this.saveUser(userData, email);
      })
      .catch((error) => {
        if (typeof onError === "function") {
          onError(error);
        }
      });
  } catch (error) {
    console.log("Luyx: createWithFirebase with error: ", error);
  }
};

/**
 * Create the user login
 * @param email
 * @param password
 * @param callBackFunc
 * @param onError
 * @param isExisted
 */
// #1
UserModal.prototype.create = async function (
  email,
  password,
  name,
  callBackFunc,
  onError,
  isExisted
) {
  try {
    // existed on wordpress create with firebase
    if (isExisted) {
      await this.createWithFirebase(email, password, callBackFunc, onError);
    }
    // register on Wordpress site
    const json = await Api.register(email, password, name);

    const status = get(json, "status");

    console.log("Luyx: C: UserModal, F: create, L 90 json(): ", json);

    if (status === "error") {
      return onError(json);
    }

    if (status === "ok") {
      if (Constants.firebaseEnable) {
        await this.createWithFirebase(email, password, callBackFunc, onError);
      } else {
        const { status, ...userData } = json;
        await this.saveUser(userData, email);

        if (typeof callBackFunc === "function") {
          callBackFunc();
        }
      }
    } else {
      callBackFunc();
    }
  } catch (error) {
    console.log(error);

    onError(error);
  }
};
/**
 * login on both Wordpress and Firebase
 * @param email
 * @param password
 * @param callBackFunc
 * @param onError
 */
UserModal.prototype.login = async function (
  email,
  password,
  callBackFunc,
  onError
) {
  try {
    let wordpressLoggined = {};

    try {
      wordpressLoggined = await Api.getJWTToken(email, password);
    } catch (e) {
      console.log("Luyx: login with error: ", e);
    }

    if (wordpressLoggined.token) {
      const userInfo = await Api.getUserInfoByToken(wordpressLoggined.token);
      const user = {
        userId: userInfo.id,
        jwtToken: wordpressLoggined.token,
        displayName: wordpressLoggined.user_display_name,
        email: wordpressLoggined.user_email,
        photoURL: "",
      };

      // if enable user also save to Firebase
      if (Constants.firebaseEnable) {
        firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            user.uid = response.user.uid;
            this.saveUser(user, email, () => {
              if (typeof callBackFunc === "function") {
                callBackFunc();
              }
            });
          })
          .catch((error) => {
            // if use not found on firebase, just create it for saving app data
            if (
              error.code === "auth/user-not-found" ||
              error.code === "auth/wrong-password"
            ) {
              return this.create(
                email,
                password,
                null,
                callBackFunc,
                onError,
                true
              );
            }
            if (typeof onError === "function") {
              onError(error);
            }
          });
      } else if (typeof callBackFunc === "function") {
        this.saveUser(user, email, () => {
          if (typeof callBackFunc === "function") {
            callBackFunc();
          }
        });
      }
    } else if (typeof onError === "function") {
      onError({ message: "Invalid email or password." });
    }
  } catch (error) {
    console.log(error);
    onError(error);
  }
};

UserModal.prototype.loginFacebook = async function (accessToken) {
  try {
    const auth = firebaseApp.auth();
    const credential = firebase.auth.FacebookAuthProvider.credential(
      accessToken
    );

    const data = await auth.signInAndRetrieveDataWithCredential(credential);

    let userEmail = data.email;
    if (userEmail == null) {
      userEmail = `${data.uid}@facebook.com`;
    }

    return this.saveUser(data, userEmail);
  } catch (error) {
    console.log(error);
  }
};

UserModal.prototype.loginGoogle = async function (input) {
  const auth = firebaseApp.auth();
  const credential = firebase.auth.GoogleAuthProvider.credential(input.idToken);
  const data = await auth
    .signInAndRetrieveDataWithCredential(credential)
    .catch((err) => console.log(err));
  return this.saveUser(data, input.user.email);
};

/**
 * Save user data to offline
 * @param userData
 * @param email
 * @param callback
 */
UserModal.prototype.saveUser = async function (userData = {}, email, callback) {
  try {
    await AsyncStorage.removeItem(Constants.Key.user);

    await AsyncStorage.setItem(
      Constants.Key.user,
      JSON.stringify({ ...userData, email })
    );
    // await AsyncStorage.setItem(Constants.Key.email, email);

    if (callback && isFunction(callback)) {
      callback();
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * get read later user
 */
UserModal.prototype.getUser = async function () {
  try {
    const userData = await AsyncStorage.getItem(Constants.Key.user);
    if (userData != null) {
      return JSON.parse(userData);
    }
  } catch (error) {
    return null;
  }
};

UserModal.prototype.getPosts = async function () {
  const userPosts = await AsyncStorage.getItem(Constants.Key.posts);

  let postData = [];
  if (userPosts != null) {
    postData = JSON.parse(userPosts);
  }

  // if the offline data is null let check the online and sync back to the app
  if (postData.length === 0) {
    postData = await this.getFirebasePost();
    AsyncStorage.setItem(Constants.Key.posts, JSON.stringify(postData));
  }

  return postData;
};

/**
 * Get the data from firebase
 * @returns {*|string|string}
 */
UserModal.prototype.getFirebasePost = async function () {
  const userData = await this.getUser();
  let postData = [];

  if (get(userData, "uid")) {
    const data = await firebaseApp
      .database()
      .ref(`/${Config.Firebase.readlaterTable}/${userData.uid}`)
      .once("value");

    if (data.val() != null) {
      postData = data.val().post;
    }
  }

  return postData;
};

/**
 * Add the post to firebase
 * @param post
 */
UserModal.prototype.firebaseSync = async function (postData) {
  const userData = await this.getUser();

  if (get(userData, "uid")) {
    await firebaseApp
      .database()
      .ref(Config.Firebase.readlaterTable)
      .child(`${userData.uid}/post`)
      .set(postData);
  }
};

/**
 * Save read later post and sync to firebase
 * @param post
 */
UserModal.prototype.savePost = async function (post, fnc) {
  if (typeof post === "undefined" || post == null) {
    return;
  }

  const userPosts = await AsyncStorage.getItem(Constants.Key.posts);
  let postData = [];
  if (userPosts != null) {
    postData = JSON.parse(userPosts);
  }

  const indexPost = findIndex(postData, (data) => {
    return data.id == post.id;
  });

  // not in the read later array yet
  if (indexPost == -1) {
    postData.push(post);

    // save to storage local
    await AsyncStorage.setItem(Constants.Key.posts, JSON.stringify(postData));

    if (typeof fnc === "function") {
      fnc();
    }

    // sync to firebase
    await this.firebaseSync(postData);
  }
};

/**
 * remove read later post
 * @param post
 */
UserModal.prototype.removePost = async function (post) {
  const userPosts = await AsyncStorage.getItem(Constants.Key.posts);
  let postData = [];
  if (userPosts != null) {
    postData = JSON.parse(userPosts);
  }
  const newPostData = remove(postData, (data) => {
    return data.id != post.id;
  });

  AsyncStorage.setItem(Constants.Key.posts, JSON.stringify(newPostData));

  // sync to firebase
  await this.firebaseSync(newPostData);
};

/**
 * Remove all read later post
 */
UserModal.prototype.clearPosts = function (isSync) {
  // should remove online also
  if (typeof isSync !== "undefined") {
    this.firebaseSync(null);
  }
  AsyncStorage.getItem(Constants.Key.posts).then((data) => {
    if (data != null) {
      return AsyncStorage.multiRemove([Constants.Key.posts], (err) => {});
    }
  });
};

/**
 * Logout and delete all offline data
 */
UserModal.prototype.logOut = function () {
  AsyncStorage.getItem(Constants.Key.user).then((data) => {
    if (data != null) {
      return AsyncStorage.multiRemove([Constants.Key.user], (err) => {});
    }
  });
};

export default UserModal;
