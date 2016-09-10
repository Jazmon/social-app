// @flow
import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import Comment from './Comment';

const userPropType = PropTypes.shape({
  profilePicture: Image.propTypes.source,
  name: PropTypes.string,
});

const propTypes = {
  style: View.propTypes.style,
  post: PropTypes.shape({
    text: PropTypes.string,
    user: userPropType,
    likeCount: PropTypes.number,
    comments: PropTypes.arrayOf(PropTypes.shape({
      // user: userPropType,
      text: PropTypes.string,
      likeCount: PropTypes.number,
    })),
  }),
};

const defaultProps = {
  text: '',
  likeCount: 0,
};

type User = {
  profilePicture: any;
  name: string;
};

type CommentType = {
  id: string;
  // user: User;
  text: string;
  likeCount: number;
};

type Post = {
  text: string;
  user: User;
  comments: Array<CommentType>;
};


type Props = {
  style?: ?any;
  post: Post;
  // likeCount: number;
  // comments: Array<Comment>;
};

function Story(props: Props): React.Element<*> {
  const hasComments = props.post.comments.length > 0;
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>{props.post.text}</Text>
      <View>
        {hasComments && props.post.comments.map((comment) =>
          <Comment key={comment.id} comment={comment} />
        )}
      </View>
    </View>
  );
}

Story.propTypes = propTypes;
Story.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    elevation: 1,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default Story;
