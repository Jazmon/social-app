// @flow
import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

// $FlowIssue
import Button from './components/Button';

type Props = {
  // navigator: Object;
  // route: Object;
  // relay: Object;
  // loading: boolean;
  checkLogin: Function;
};

type State = {
  text: string;
};


// type DefaultProps = {};

class Login extends Component<*, Props, State> {
  props: Props;

  static propTypes = {
    // navigator: PropTypes.object.isRequired,
    // route: PropTypes.object.isRequired,
    // relay: PropTypes.object.isRequired,
    // loading: PropTypes.bool.isRequired,
    checkLogin: PropTypes.func.isRequired,
  };


  constructor(props: Props) {
    super(props);

    this.state = {
      text: 'Login',
    };
    // $FlowIssue
    this.doLogin = this.doLogin.bind(this);
  }

  state: State;

  async doLogin() {
    const loggedIn = { loggedIn: true };
    try {
      await AsyncStorage.setItem('loggedIn', JSON.stringify(loggedIn));
      this.props.checkLogin();
    } catch (err) {
      throw err;
    }
  }

  render(): React.Element<*> {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Login</Text>
          </View>
          <Button
            style={styles.loginButton}
            onPress={this.doLogin}
          >
            <Text style={styles.loginButtonText}>Click me</Text>
          </Button>
        </View>
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
  innerContainer: {
    flex: 1,
    // borderColor: '#0f0', borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginBottom: Dimensions.get('window').height / 3,
    padding: 16,
  },
  loginButton: {
    elevation: 1,
    padding: 16,
    // borderColor: '#f00', borderWidth: 1,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#053ab0',
  },
});

export default Login;
