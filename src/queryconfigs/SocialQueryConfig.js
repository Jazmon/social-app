// @flow
import Relay, { Route as QueryConfig } from 'react-relay';

class SocialQueryConfig extends QueryConfig {
  static routeName: string = 'SocialQueryConfig';
  static paramDefinitions = {};

  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
}

export default SocialQueryConfig;
