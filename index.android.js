// @flow

import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import Main from './src';

function SocialApp() {
  return <Main />;
}

AppRegistry.registerComponent('SocialApp', () => SocialApp);
