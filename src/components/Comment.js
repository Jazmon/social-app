// @flow
import React, { PropTypes } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

const propTypes = {
  style: View.propTypes.style,
  comment: PropTypes.shape({
    // user: userPropType,
    text: PropTypes.string,
    likeCount: PropTypes.number,
  }),
};

const defaultProps = {
  text: '',
};

type Props = {
  comment: CommentType;
  style?: ?any;
};

type CommentType = {
  id: string;
  // user: User;
  text: string;
  likeCount: number;
};

function Comment(props: Props): React.Element<*> {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.commenterInfo}>
        <Text style={{ marginBottom: 8 }}>FooUser</Text>
        <Image
          source={{ uri: 'http://lorempixel.com/200/200/people/' }}
          resizeMode="contain"
          style={{ width: 40, height: 40 }}
        />
      </View>
      <View style={styles.commentBody}>
        <Text style={styles.text}>{props.comment.text}</Text>
        <Text>{props.comment.likeCount}</Text>
      </View>
    </View>
  );
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    elevation: 2,
  },
  commenterInfo: {
    flexDirection: 'column',
    marginRight: 8,
    // flex: 1,
  },
  commentBody: {
    flex: 1,
  },
  text: {
    color: '#000',
    fontSize: 16,
    textAlign: 'left',
  },
});

export default Comment;
