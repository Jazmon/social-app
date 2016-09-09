// @flow
import React from 'react';
import {
  Navigator,
  BackAndroid,
  InteractionManager,
  View,
  // Text,
  StyleSheet,
} from 'react-native';
import Relay from 'react-relay';
import {
  RelayNetworkLayer,
  urlMiddleware,
  perfMiddleware,
  gqErrorsMiddleware,
} from 'react-relay-network-layer';

import config from '../config.json';
import Social from './containers/Social';
import SocialQueryConfig from './queryconfigs/SocialQueryConfig';

// Relay.injectNetworkLayer(
//   new Relay.DefaultNetworkLayer('http://localhost:3000/graphql'),
// );
export type RouteType = {
  title: string;
  Component: React.Element<*> | React.Component<*, *, *>;
  queryConfig: Object;
};

type Props = {
  // navigator: Object;
  // route: Object;
  // relay: Object;
  // loading: boolean;
};

type State = {
  // text: string;
};

// type DefaultProps = {};

class App extends React.Component<*, Props, State> {
  props: Props;
  backListener: Object;
  navigator: Object;
  goBack: Function;
  onMainScreen: Function;
  determineScene: Function;

  static propTypes = {
    // navigator: PropTypes.object.isRequired,
    // route: PropTypes.object.isRequired,
    // relay: PropTypes.object.isRequired,
    // loading: PropTypes.bool.isRequired,
  };


  constructor(props: Props) {
    super(props);

    // this.state = {
    //   text: 'App',
    // };

    this.goBack = this.goBack.bind(this);
    this.onMainScreen = this.onMainScreen.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.determineScene = this.determineScene.bind(this);
  }

  state: State;

  componentWillMount() {
    this.backListener = BackAndroid.addEventListener('hardwareBackPress', () => {
      if (!this.onMainScreen()) {
        this.goBack();
        return true;
      }
      return false;
    });
  }

  componentDidMount() {
    console.log('url:', config.relayUrl);
    // Relay.injectNetworkLayer(new Relay.DefaultNetworkLayer(config.relayUrl));
    Relay.injectNetworkLayer(
     new RelayNetworkLayer([
       urlMiddleware({
         url: config.relayUrl,
       }),
       // loggerMiddleware(),
       gqErrorsMiddleware(),
       perfMiddleware(),
       // retryMiddleware({
       //   fetchTimeout: 15000,
       //   // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
       //   retryDelays: (attempt) => Math.pow(2, attempt + 4) * 100,
       //   forceRetry: (cb, delay) => {
       //     window.forceRelayRetry = cb;
       //     console.log(`call 'forceRelayRetry()' for immediately retry! Or wait ${delay}ms.`);
       //   },
       //   statusCodes: [500, 503, 504],
       // }),
       // authMiddleware({
       //   token: () => token,
       // }),
      //  next => async(req) => {
      //    const result = await AsyncStorage.getItem('gqlToken');
      //    let gqlToken;
      //    if (!!result) {
      //      console.log('Got token from async store, setting it');
      //      console.log('result', result);
      //      gqlToken = JSON.parse(result).token;
      //    } else {
      //      gqlToken = token;
      //    }
      //    req.headers.auth = gqlToken; // eslint-disable-line no-param-reassign
      //    return next(req);
      //  },
     ], {
       disableBatchQuery: true,
     })
   );
    Relay.injectTaskScheduler(InteractionManager.runAfterInteractions);
  }

  componentWillUnmount() {
    this.backListener.remove();
  }

  determineScene(route: Object): RouteType {
    if (route.type === 'app') {
      if (route.index === 0) {
        return {
          title: 'Social App',
          Component: Social,
          queryConfig: new SocialQueryConfig(),
          defaultProps: [{ viewer: null }],
        };
      }

      throw Error('Unknown route type');
    } else {
      throw Error('Unknown route type');
    }
  }

  onMainScreen(): boolean {
    return this.navigator.getCurrentRoutes().length === 1;
  }

  goBack(): void {
    this.navigator.pop();
  }

  renderScene: Function;
  renderScene(route: RouteType, navigator: Object) {
    if (!this.navigator) this.navigator = navigator;
    const { title, Component, queryConfig, defaultProps, ...params } = this.determineScene(route);

    return (
      <Relay.Renderer
        Container={Component}
        queryConfig={queryConfig}
        environment={Relay.Store}
        // eslint-disable-next-line no-unused-vars
        render={({ done, error, props, retry, stale }) => {
          if (stale) { console.warn('data was stale in relay'); }
          if (error) {
            console.error(error);
            return (
              <View />
            );
          } else if (props) {
            return (
              <Component
                {...params}
                {...defaultProps}
                {...props}
                // focused={true}
                navigator={navigator}
                route={route}
                name={title}
                goToLogin={this.goToLogin}
                retry={retry}
                loading={false}
              />
            );
          }

          return (
            <Component
              {...params}
              {...defaultProps}
              {...props}
              // focused={false}
              navigator={navigator}
              route={route}
              name={title}
              goToLogin={this.goToLogin}
              retry={retry}
              loading={true}
            />
          );

          // return (
          //   <Component
          //     {...params}
          //     {...defaultProps}
          //     {...props}
          //     // focused={false}
          //     navigator={navigator}
          //     route={route}
          //     name={title}
          //     retry={retry}
          //     loading={!!props}
          //   />
          // );
        }}
      />
    );
  }

  render(): React.Element<*> {
    const initialRoute: Object = {
      index: 0,
      type: 'app',
      anim: false,
    };

    return (
      <Navigator
        style={styles.navigator}
        initialRoute={initialRoute}
        renderScene={this.renderScene}
        // onDidFocus={() => this.setFocus(true)}
        // onWillFocus={() => this.setFocus(false)}
        // eslint-disable-next-line no-unused-vars
        configureScene={(route, routeStack) =>
          route.sceneConfig || Navigator.SceneConfigs.PushFromRight}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  // loadingContainer: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // loadingInnerContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

export default App;
