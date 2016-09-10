// @flow
import React, { Component, PropTypes } from 'react';
import {
  View,
  // Text,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

import App from './App';
import Login from './Login';

type Props = {
  // navigator: Object;
  // route: Object;
  // relay: Object;
  // loading: boolean;
};

type State = {
  loggedIn: boolean;
};

type DefaultProps = {};

class Main extends Component<*, Props, State> {
  props: Props;

  // static propTypes = {
    // navigator: PropTypes.object.isRequired,
    // route: PropTypes.object.isRequired,
    // relay: PropTypes.object.isRequired,
    // loading: PropTypes.bool.isRequired,
  // };


  constructor(props: Props) {
    super(props);
    console.log('main constructor');

    this.state = {
      loggedIn: false,
    };
    // $FlowIssue
    this.checkLogin = this.checkLogin.bind(this);
  }

  state: State;

  componentDidMount() {
    console.log('main comp did mount');
    this.checkLogin();
  }

  async checkLogin() { // eslint-disable-line consistent-return
    try {
      let loggedIn = await AsyncStorage.getItem('loggedIn');
      if (loggedIn !== null) {
        loggedIn = (JSON.parse(loggedIn)).loggedIn;
        this.setState({
          loggedIn,
        });
      }
    } catch (err) {
      throw err;
    }
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <View style={styles.container}>
        {loggedIn && <App />}
        {!loggedIn && <Login checkLogin={this.checkLogin} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default Main;
