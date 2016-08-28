// @flow
import React, { Component, PropTypes } from 'react';
import Relay from 'react-relay';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  navigator: Object;
  route: Object;
  relay: Object;
  loading: boolean;
  viewer?: ?Object;
};

type State = {
  text: string;
};

// type DefaultProps = {};

class Social extends Component<*, Props, State> {
  props: Props;

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    viewer: PropTypes.object,
  };


  constructor(props: Props) {
    super(props);

    this.state = {
      text: 'Social',
    };
  }

  state: State;

  render(): React.Element<*> {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Social</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default Relay.createContainer(Social, {
  initialVariables: {},
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id
        email
      }
    `,
  },
});
