// @flow
import React, { PropTypes } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import { ToolbarAndroid } from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

// const Toolbar = Platform.OS === 'android' ? ToolbarAndroid : View;

const propTypes = {
  style: View.propTypes.style,
  navigator: PropTypes.object,
  navState: PropTypes.object,
};

const defaultProps = {

};

type Props = {
  style?: ?any;
  navigator: Object;
  navState: Object;
};

// $FlowIssue
function Navbar(props: Props): React.Element<*> {
  const title = _.last(props.navigator.getCurrentRoutes()).title || '';
  if (Platform.OS === 'android') {
    return (
      <ToolbarAndroid
        navIconName="menu"
        style={[styles.container, props.style]}
        title={title}
      />
    );
  }
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bababa',
    alignItems: 'center',
    justifyContent: 'center',
    // height: 48,
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
});

export default Navbar;
