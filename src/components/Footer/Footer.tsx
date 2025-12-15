import React, { useRef } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Reanimated, { useAnimatedStyle, interpolateColor } from 'react-native-reanimated';
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { Icons } from '../../assets';
import { Strings } from '../../constants';
import { useKeyboardListener } from '../../hooks';
import { Colors } from '../../theme';
import styles from './styles';
import type { FooterProps } from './types';

const Footer = ({
  onIconPress,
  onSendTextPress,
  sendTextStyle,
  sendIconStyle,
  inputStyle,
  containerStyle,
  sendText,
  shouldShowSendImage = true,
  shouldShowTextInputSend = true,
  sendIconProps,
  sendTextProps,
  containerViewProps,
  customInput,
  customSendButton,
  customInputSendButton,
  sectionStyle,
  ...rest
}: FooterProps) => {
  const isKeyboardVisible = useKeyboardListener();
  const ref = useRef<TextInput>(null);
  const { progress } = useReanimatedKeyboardAnimation();

  const handleSendTextPress = () => {
    ref?.current?.clear();
    onSendTextPress?.();
  };

  const _sendTextStyle = StyleSheet.flatten([styles.sendText, sendTextStyle]);
  const _sendIconStyle = StyleSheet.flatten([styles.sendIcon, sendIconStyle]);
  const _inputStyle = StyleSheet.flatten([styles.input, inputStyle]);
  const _containerStyle = StyleSheet.flatten([
    styles.container,
    containerStyle,
  ]);
  const _sectionStyle = StyleSheet.flatten([styles.sectionStyle, sectionStyle]);

  const animatedSectionStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        progress.value,
        [0, 1],
        [(_sectionStyle?.borderColor as string) || '#A1A1A1', Colors.white]
      ),
    };
  });

  return (
    <View style={_containerStyle} {...containerViewProps}>
      <Reanimated.View style={[_sectionStyle, animatedSectionStyle]}>
        <>
          {customInput ?? (
            <TextInput
              ref={ref}
              style={_inputStyle}
              placeholder={Strings.sendMessage}
              placeholderTextColor={Colors.white}
              {...rest}
            />
          )}
          </>
        {isKeyboardVisible && shouldShowTextInputSend && (
          <TouchableOpacity onPress={handleSendTextPress}>
            {customInputSendButton ?? (
              <Text style={_sendTextStyle} {...sendTextProps}>
                {sendText ?? Strings.send}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </Reanimated.View>
      {!isKeyboardVisible && shouldShowSendImage && (
        <TouchableOpacity onPress={onIconPress} testID="footerIcon" style={{ marginLeft: 8 }}>
          {customSendButton ? (
            customSendButton
          ) : (
            <Image
              source={Icons.send}
              style={_sendIconStyle}
              {...sendIconProps}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Footer;
