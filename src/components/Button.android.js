// @flow
import React, { PropTypes } from 'react';
import {
  View,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

const propTypes = {
  style: View.propTypes.style,
  text: PropTypes.string,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  rippleColor: PropTypes.string,
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  text: '',
  rippleColor: '#000',
};

type Props = {
  text: string;
  style?: ?Object;
  onPress: Function;
  onLongPress: Function;
  rippleColor: string;
  children: Object | Array<Object>;
};

/* eslint-disable new-cap */
function Button(props: Props): React.Element<*> {
  return (
    <TouchableNativeFeedback
      onLongPress={props.onLongPress}
      onPress={props.onPress}
      delayPressIn={2}
      background={TouchableNativeFeedback.Ripple(props.rippleColor)}
    >
      <View style={[styles.container, props.style]}>
        {props.children}
      </View>
    </TouchableNativeFeedback>
  );
}
/* eslint-enable new-cap */

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
  },
});

export default Button;
