import EventEmitter from "@services/AppEventEmitter";

const appChangeMenuStyle = () => EventEmitter.emit("app.changeMenuStyle");
const openLeftMenu = () => EventEmitter.emit("left.menu.click");
const closeLeftMenu = () => EventEmitter.emit("left.menu.close");
const openModalLayout = () => EventEmitter.emit("modal.layout.open");
const closeModalLayout = () => EventEmitter.emit("modal.layout.close");
const openModalTag = () => EventEmitter.emit("modal.tag.open");
const openModalCategory = () => EventEmitter.emit("modal.category.open");
const closeModalTag = () => EventEmitter.emit("modal.tag.close");
const readLaterChangeLayout = () => EventEmitter.emit("readlater.changeLayout");
const newsChangeLayout = (params) =>
  EventEmitter.emit("news.changeLayout", params);
const loginRefresh = () => EventEmitter.emit("login.refresh");
const loginShowError = (params) => EventEmitter.emit("login.showError", params);
const loginShowInfo = (params) => EventEmitter.emit("login.showInfo", params);
const logoutUser = () => EventEmitter.emit("logout.user");

const homePageRefresh = () => EventEmitter.emit("homepage.refresh");
const sideMenuRefresh = () => EventEmitter.emit("sidemenu.refresh");
const postCardFetchData = () => EventEmitter.emit("posts.cards.fetchData");
const openPhotoClick = (data) => EventEmitter.emit("open.photo.click", data);
const closePhotoClick = () => EventEmitter.emit("close.photo.click");
const clearPosts = () => EventEmitter.emit("posts.clear.click");

const nextPost = () => EventEmitter.emit("open.post.next");
const openUserModal = () => EventEmitter.emit("modal.user.open");
const closeUserModal = () => EventEmitter.emit("modal.user.close");

const onAppChangeMenuStyle = (func) =>
  EventEmitter.addListener("app.changeMenuStyle", func);
const onOpenLeftMenu = (func) =>
  EventEmitter.addListener("left.menu.click", func);
const onCloseLeftMenu = (func) =>
  EventEmitter.addListener("left.menu.close", func);
const onOpenModalLayout = (func) =>
  EventEmitter.addListener("modal.layout.open", func);
const onOpenModalTag = (func) =>
  EventEmitter.addListener("modal.tag.open", func);
const onOpenModalCategory = (func) =>
  EventEmitter.addListener("modal.category.open", func);
const onOpenUserModal = (func) =>
  EventEmitter.addListener("modal.user.open", func);
const onCloseUserModal = (func) =>
  EventEmitter.addListener("modal.user.close", func);
const onReadLaterUpdate = (func) =>
  EventEmitter.addListener("readLater.update", func);
const onReadLaterChangeLayout = (func) =>
  EventEmitter.addListener("readlater.changeLayout", func);

const onLoginRefresh = (func) =>
  EventEmitter.addListener("login.refresh", func);
const onLoginShowError = (func) =>
  EventEmitter.addListener("login.showError", func);
const onLoginShowInfo = (func) =>
  EventEmitter.addListener("login.showInfo", func);
const onLogoutUser = (func) => EventEmitter.addListener("logout.user", func);

const onSideMenuRefresh = (func) =>
  EventEmitter.addListener("sidemenu.refresh", func);
const onOpenPhotoClick = (func) =>
  EventEmitter.addListener("open.photo.click", func);
const onClosePhotoClick = (func) =>
  EventEmitter.addListener("close.photo.click", func);
const onClearPosts = (func) =>
  EventEmitter.addListener("posts.clear.click", func);

const onNextPost = (func) => EventEmitter.addListener("open.post.next", func);

export default {
  appChangeMenuStyle,
  openLeftMenu,
  closeLeftMenu,
  openModalLayout,
  closeModalLayout,
  openModalTag,
  openUserModal,
  closeUserModal,
  readLaterChangeLayout,
  loginShowError,
  loginShowInfo,
  newsChangeLayout,
  loginRefresh,
  logoutUser,
  homePageRefresh,
  sideMenuRefresh,
  postCardFetchData,
  openPhotoClick,
  clearPosts,
  nextPost,
  openModalCategory,
  closePhotoClick,
  closeModalTag,

  // listener
  onOpenLeftMenu,
  onCloseLeftMenu,
  onOpenModalLayout,
  onOpenModalTag,
  onOpenUserModal,
  onCloseUserModal,
  onLoginRefresh,
  onLoginShowError,
  onLogoutUser,
  onSideMenuRefresh,
  onOpenPhotoClick,
  onClosePhotoClick,
  onClearPosts,
  onOpenModalCategory,
  onNextPost,
  onAppChangeMenuStyle,
  onReadLaterUpdate,
  onReadLaterChangeLayout,
  onLoginShowInfo,
};
