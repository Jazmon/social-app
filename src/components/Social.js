// @flow
import React, { Component, PropTypes } from 'react';
// import Relay from 'react-relay';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
} from 'react-native';
// import _ from 'lodash';

type Props = {
  navigator: Object;
  route: Object;
  // relay: Object;
  loading: boolean;
  // viewer?: ?Object;
  email?: ?string;
  posts?: ?Array<Object>;
  dataSource: ?Object;
  initialListSize: number;
};

type State = {
  // initialListSize: number;
};

type DefaultProps = {
  dataSource: null;
  initialListSize: number;
};

// declare class Social <DefaultProps, Props, State> {
//
// }

class Social extends Component<DefaultProps, Props, State> {
  props: Props;

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    // relay: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    email: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object),
    dataSource: PropTypes.object,
    initialListSize: PropTypes.number,
  };

  static defaultProps = {
    dataSource: null,
    initialListSize: 0,
  };

  constructor(props: Props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  state: State;

  // componentWillReceiveProps(nextProps: Props) {
  //   if (nextProps.viewer && nextProps.viewer.posts && nextProps.viewer.posts.edges) {
  //     this.dataSource = DataSource.cloneWithRows(nextProps.viewer.posts.edges);
  //   }
  // }

  renderRow: Function;
  renderRow(rowData: Object) {
    const post = rowData.node;
    const hasComments = post.comments.edges.length > 0;
    return (
      <View key={post.id} style={styles.postContainer}>
        <Text style={styles.postText}>{post.text}</Text>
        {hasComments && <View style={styles.commentContainer}>
          {post.comments.edges.map(comment => (
            <View style={styles.comment} key={comment.node.id}>
              <Text style={styles.commentText}>{comment.node.text}</Text>
            </View>
          ))}
        </View>}
      </View>
    );
  }

  render(): React.Element<*> {
    const { loading } = this.props;
    const email = this.props.email || '';
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Social</Text>
        {!loading && !!this.props.dataSource &&
          <View style={styles.innerContainer}>
            <Text style={styles.email}>{email}</Text>
            <ListView
              initialListSize={this.props.initialListSize}
              dataSource={this.props.dataSource}
              renderRow={this.renderRow}
              pageSize={5}
              scrollRenderAheadDistance={400}
              style={styles.listView}
            />
          </View>
        }
        {loading &&
          <View><Text>Loading...</Text></View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    color: '#000',
    fontSize: 24,
  },
  email: {
    color: 'rgba(55, 55, 55, 0.8)',
    marginBottom: 16,
    fontSize: 20,
  },
  listView: {
    // borderColor: '#0f0', borderWidth: 1,
    flex: 1,
    flexDirection: 'column',
  },
  postContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    // borderColor: '#f00', borderWidth: 1,
    height: 140,
    // justifyContent: 'center',
  },
  postText: {
    fontSize: 20,
    color: '#000',
  },
  commentContainer: {
    backgroundColor: '#e4e4e4',
    padding: 8,
    flexDirection: 'column',
    flex: 1,
  },
  comment: {

    flex: 1,
    flexDirection: 'column',
  },
  commentText: {
    fontSize: 12,
    fontWeight: '300',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
  },
});

export default Social;
//
// export default Relay.createContainer(Social, {
//   initialVariables: {},
//   fragments: {
//     viewer: () => Relay.QL`
//       fragment on User {
//         id
//         postCount
//         email
//         posts(
//           first: 2147483647  # max GraphQLInt
//         ) {
//           edges {
//             node {
//               id
//               text
//               comments(
//                 first: 2147483647  # max GraphQLInt
//               ) {
//                 edges {
//                   node {
//                     id
//                     text
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     `,
//   },
// });
