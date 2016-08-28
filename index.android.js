// @flow
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import Main from './src';

function SocialApp() {
  return <Main />;
}

AppRegistry.registerComponent('SocialApp', () => SocialApp);
