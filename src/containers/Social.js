// @flow
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
} from 'react-native';

type Props = {
  navigator: Object;
  route: Object;
  relay: Object;
  loading: boolean;
  viewer?: ?Object;
};

type State = {
  initialListSize: number;
};


const DataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id,
});

// type DefaultProps = {};

class Social extends Component<*, Props, State> {
  props: Props;
  dataSource: Object;

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    viewer: PropTypes.object,
  };


  constructor(props: Props) {
    super(props);

    if (props.viewer && props.viewer.postCount) {
      this.state = {
        initialListSize: props.viewer.postCount,
      };
      if (props.viewer.posts && props.viewer.posts.edges) {
        this.dataSource = DataSource.cloneWithRows(props.viewer.posts.edges);
      }
    } else {
      this.state = {
        initialListSize: 0,
      };
    }

    this.renderRow = this.renderRow.bind(this);
  }

  state: State;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.viewer && nextProps.viewer.posts && nextProps.viewer.posts.edges) {
      this.dataSource = DataSource.cloneWithRows(nextProps.viewer.posts.edges);
    }
  }

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
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Social</Text>
        {!loading &&
          <View style={styles.innerContainer}>
            <Text style={styles.email}>{this.props.viewer.email}</Text>
            <ListView
              initialListSize={this.state.initialListSize}
              dataSource={this.dataSource}
              renderRow={this.renderRow}
              pageSize={5}
              scrollRenderAheadDistance={400}
              style={styles.listView}
            />
          </View>
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

export default Relay.createContainer(Social, {
  initialVariables: {},
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id
        postCount
        email
        posts(
          first: 2147483647  # max GraphQLInt
        ) {
          edges {
            node {
              id
              text
              comments(
                first: 2147483647  # max GraphQLInt
              ) {
                edges {
                  node {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
});
