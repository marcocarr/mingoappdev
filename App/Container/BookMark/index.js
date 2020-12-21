import React, {Component} from "react";
import {Text, FlatList, ListView, View, Image} from "react-native";
import styles from "./styles";
import User from "@services/User";
import {Events, Languages} from "@common";
import {PostReadLater} from "@components";
import {fetchPostsBookmark}  from "@redux/actions";
import {connect} from "react-redux";
import Icons from "@navigation/Icons";


class BookMark extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    Events.onClearPosts(this.clearPosts.bind(this));
    this.props.fetchPostsBookmark();
  }

  clearPosts() {
    User.clearPosts(true);
    this.props.fetchPostsBookmark();
  }

  onViewPost(item, index, parentPosts) {
    this.props.onViewPost(item, index, parentPosts)
  }

  renderItem({item, index}) {
      return <PostReadLater post={item}
                            onViewPost={this.onViewPost.bind(this, item, index, this.props.bookmark.posts)} />
  }

  render() {
    const {bookmark} = this.props;

    return (
      <View style={styles.body}>
        {bookmark.posts.length != 0 && <View style={styles.topBar}>{Icons.Clear()}</View>}
        {bookmark.posts.length == 0 && <View style={styles.emptyView}><Text style={[styles.empty]}>{Languages.noBookmark}</Text></View>}

        <FlatList
          style={styles.flatlist}
          horizontal={false}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem.bind(this)}
          data={bookmark.posts} />
      </View>
    )
  }
}

const mapStateToProps = ({bookmark}) => ({bookmark});
module.exports = connect(mapStateToProps, {fetchPostsBookmark})(BookMark);
