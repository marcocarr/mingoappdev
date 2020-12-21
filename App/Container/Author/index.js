'use strict';

import React, { Component } from "react";
import { Text, FlatList, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

import { PostReadLater } from "@components";

import { fetchPostsByUser } from "@redux/actions";
import { connect } from "react-redux";

class Author extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
  }

  UNSAFE_componentWillMount() {
    const { data } = this.props.user;
    const userId = data.id | data.userId
    if (userId) {
      this.props.fetchPostsByUser(userId, this.page, data.jwtToken);
    }
  }

  onViewPost = (item, index) => {
    this.props.onViewPost(item, index)
  }

  renderItem({ item, index }) {
    return <PostReadLater post={item} onViewPost={() => this.onViewPost(item, index)} />
  }

  nextPosts() {
    this.page += 1;
    const { data } = this.props.user;

    const userId = data.id | data.userId
    if (userId) {
      this.props.fetchPostsByUser(userId, this.page, data.jwtToken);
    }
  }

  render() {
    const { user } = this.props;
    return (<FlatList style={styles.flatlist}
      horizontal={false}
      data={user.posts}
      keyExtractor={(item, index) => item.id}
      renderItem={this.renderItem.bind(this)}
      onEndReachedThreshold={200}
      onEndReached={() => {
        this.nextPosts();
      }} />)
  }
}

const mapStateToProps = ({ user }) => ({ user });
module.exports = connect(mapStateToProps, { fetchPostsByUser })(Author);
