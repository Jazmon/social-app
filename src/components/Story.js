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
      <View style={{ flexDirection: 'column', marginRight: 8 }}>
        <Text style={{ marginBottom: 8 }}>FooUser</Text>
        <Image
          source={{ uri: 'http://lorempixel.com/200/200/people/' }}
          resizeMode="contain"
          style={{ width: 40, height: 40 }}
        />
      </View>
      <View style={styles.commentsContainer}>
        <Text style={styles.text}>{props.post.text}</Text>
        {hasComments && <View style={styles.comments}>
          <Text>Comments</Text>
          {props.post.comments.map((comment) =>
            <Comment key={comment.id} comment={comment} />
          )}
        </View>}
      </View>
    </View>
  );
}

Story.propTypes = propTypes;
Story.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#f0f0f0',
    elevation: 1,
  },
  commentsContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  comments: {
    // padding: 8,
    marginTop: 4,
    flexDirection: 'column',
    flex: 1,
  },
});

export default Story;
