// @flow
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import {
  ListView,
} from 'react-native';
import _ from 'lodash';

import Social from '../components/Social';

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

class SocialContainer extends Component<*, Props, State> {
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

    const postCount: number = _.get(props, 'viewer.postCount', 0);
    const posts: ?Array<any> = _.get(props, 'viewer.posts.edges', null);

    this.state = {
      initialListSize: postCount,
    };
    if (posts) this.dataSource = DataSource.cloneWithRows(posts);
  }

  state: State;

  componentWillReceiveProps(nextProps: Props) {
    const posts: ?Array<any> = _.get(nextProps, 'viewer.posts.edges', null);
    if (posts) this.dataSource = DataSource.cloneWithRows(posts);
  }

  render(): React.Element<*> {
    const email = _.get(this.props, 'viewer.email', '');
    const props = {
      ..._.omit(this.props, 'viewer'),
      email,
      dataSource: this.dataSource,
      initialListSize: this.state.initialListSize,
    };

    return (
      <Social {...props} />
    );
  }
}

export default Relay.createContainer(SocialContainer, {
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
