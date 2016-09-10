// @flow
import React from 'react';
import {
  Navigator,
  BackAndroid,
  ToolbarAndroid,
  InteractionManager,
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import Relay from 'react-relay';
import {
  RelayNetworkLayer,
  urlMiddleware,
  perfMiddleware,
  retryMiddleware,
  gqErrorsMiddleware,
} from 'react-relay-network-layer';

import config from '../config';
import SocialContainer from './containers/SocialContainer';
import Social from './components/Social';
import SocialQueryConfig from './queryconfigs/SocialQueryConfig';

export type RouteType = {
  title: string;
  Container: React.Component<*, *, *>;
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
  relayReadyState: ?Object;
};

// type DefaultProps = {};

class App extends React.Component<*, Props, State> {
  props: Props;
  backListener: Object;
  navigator: Object;
  goBack: Function;
  onMainScreen: Function;
  determineScene: Function;
  forceRelayRetry: ?Function;

  static propTypes = {
    // navigator: PropTypes.object.isRequired,
    // route: PropTypes.object.isRequired,
    // relay: PropTypes.object.isRequired,
    // loading: PropTypes.bool.isRequired,
  };


  constructor(props: Props) {
    super(props);

    this.state = {
      relayReadyState: null,
    };
    this.forceRelayRetry = null;

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
    Relay.injectNetworkLayer(
     new RelayNetworkLayer([
       urlMiddleware({
         url: config.relayUrl(Platform.OS),
       }),
       // loggerMiddleware(),
       gqErrorsMiddleware(),
       perfMiddleware(),
       retryMiddleware({
         fetchTimeout: 15000,
         // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
         retryDelays: (attempt) => Math.pow(2, attempt + 4) * 100,
         forceRetry: (cb, delay) => {
           this.forceRelayRetry = cb;
         },
         statusCodes: [500, 503, 504],
       }),
       // authMiddleware({
       //   token: () => token,
       // }),
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
          Container: SocialContainer,
          queryConfig: new SocialQueryConfig(),
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
    const { title, Component, Container, queryConfig, ...routeProps } = this.determineScene(route);

    // const relayLoading = !this.state.relayReadyState || !this.state.relayReadyState.ready;

    // if (relayLoading) {
    //   return (
    //     <Component
    //       {...routeProps}
    //       // focused={false}
    //       navigator={navigator}
    //       route={route}
    //       name={title}
    //       goToLogin={this.goToLogin}
    //       loading={true}
    //     />
    //   );
    // }

    return (
      <Relay.Renderer
        Container={Component}
        queryConfig={queryConfig}
        environment={Relay.Store}
        onReadyStateChange={(readyState) => this.setState({ relayReadyState: readyState })}
        // eslint-disable-next-line no-unused-vars
        render={({ done, error, props, retry, stale }) => {
          if (error) {
            console.error(error);
            return (
              <View />
            );
          } else if (props) {
            return (
              <Container
                {...routeProps}
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
              {...routeProps}
              // focused={false}
              navigator={navigator}
              route={route}
              name={title}
              goToLogin={this.goToLogin}
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


    const Toolbar = Platform.OS === 'android' ? ToolbarAndroid : View;
    return (
      <Navigator
        style={styles.navigator}
        initialRoute={initialRoute}
        renderScene={this.renderScene}
        navigationBar={
          <Toolbar
            style={{ height: 48, backgroundColor: '#bababa', alignSelf: 'flex-start' }}
            // navigator={navigator}
            // navState={navState}
          />
        }
        // onDidFocus={() => this.setFocus(true)}
        // onWillFocus={() => this.setFocus(false)}
        // eslint-disable-next-line no-unused-vars
        configureScene={(route, routeStack) =>
          route.sceneConfig || Navigator.SceneConfigs.PushFromRight}
        // navigationBar={
        //   <Navigator.NavigationBar
        //     routeMapper={{
        //       LeftButton: (route, navigator, index, navState) =>
        //        { return (<Text>Cancel</Text>); },
        //       RightButton: (route, navigator, index, navState) =>
        //         { return (<Text>Done</Text>); },
        //       Title: (route, navigator, index, navState) =>
        //         { return (<Text>Awesome Nav Bar</Text>); },
        //     }}
        //     style={{backgroundColor: 'gray'}}
        //   />
        // }
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
