// @flow
import React, { PropTypes } from 'react';
import {
  View,
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
      <Text style={styles.text}>{props.comment.text}</Text>
      <Text>{props.comment.likeCount}</Text>
    </View>
  );
}

Comment.propTypes = propTypes;
Comment.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#b5b5b5',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default Comment;
