// @flow
import React, { PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const propTypes = {
  style: View.propTypes.style,
  text: PropTypes.string,
};

const defaultProps = {
  text: '',
};

type Props = {
  text: string;
  style?: ?Object;
};

function Navbar(props: Props): React.Element<*> {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

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

export default Navbar;
