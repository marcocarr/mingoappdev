import React, { Component } from "react";

import { Events, Images, Languages } from "@common";
import { ReadLater, User } from "@container";
import { TabBarIcon } from "@components";

import { fetchUserData } from "@redux/actions";
import { connect } from "react-redux";

class ReadLaterScreen extends Component {
  static navigationOptions = {
    tabBarLabel: Languages.textBookMark,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon icon={Images.icons.love} tintColor={tintColor} />
    ),
    header: null,
  };

  UNSAFE_componentWillMount() {
    if (typeof this.props.user.data == "undefined") {
      this.props.fetchUserData();
    }
  }

  componentDidMount() {
    Events.onLoginRefresh(() => {
      if (this.props.fetchUserData) {
        this.props.fetchUserData();
      }
    });
  }

  render = () => {
    const { user, navigation } = this.props;
    const onViewPost = (item, index, parentPosts) =>
      navigation.navigate("postDetail", {
        post: item,
        index,
        parentPosts,
        backToRoute: "readlater",
      });
    const onReload = () => navigation.navigate("readlater");

    if (typeof user.data != "undefined") {
      return (
        <User
          userData={user.data}
          onViewPost={onViewPost}
          onReload={onReload}
          postNews={() => navigation.navigate("postNews")}
        />
      );
    }
    return <ReadLater userData={user.data} onViewPost={onViewPost} />;
  };
}
const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps, { fetchUserData })(ReadLaterScreen);
