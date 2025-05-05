// libs
import React, { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// hooks
import useCircleAnimation from './hooks/useCircleAnimation';

// mics
import styles from './styles';
import { Icons } from '../../assets';
import type { StoryAvatarProps } from './types';

const StoryAvatar = forwardRef<View, StoryAvatarProps>(
  (
    {
      item,
      index,
      pressedIndex,
      isStoryViewVisible,
      openStories,
      viewedStories = [],
      userNameStyle,
      userImageStyle,
      userImageProps,
      viewedStoryContainerStyle,
      userNameProps,
      rootProps,
      containerStyle,
      showAddButton,
      onAddButtonPress,
    }: StoryAvatarProps,
    ref
  ) => {
    const isUserStorySeen: boolean = viewedStories?.[index]?.every(
      (val: boolean) => val
    );

    const _userNameStyle = StyleSheet.flatten([styles.username, userNameStyle]);
    const _userImageStyle = StyleSheet.flatten([styles.image, userImageStyle]);
    const _containerStyle = StyleSheet.flatten([
      styles.imageContainer,
      containerStyle,
      (isUserStorySeen && viewedStoryContainerStyle) ??
        styles.viewedStoryContainer,
    ]);

    const { avatarAnimatedStyle } = useCircleAnimation({
      pressedIndex,
      index,
      isStoryViewVisible,
    });

    return (
      <Pressable
        onPress={gestureEvents => openStories?.(index, gestureEvents)}
        {...rootProps}>
        <Animated.View ref={ref}>
          <View style={_containerStyle}>
            <Animated.Image
              resizeMode="cover"
              source={{ uri: item?.profile }}
              style={[_userImageStyle, avatarAnimatedStyle]}
              {...userImageProps}
            />
            {showAddButton && onAddButtonPress && (
              <Pressable
                style={styles.addButton}
                hitSlop={5}
                onPress={onAddButtonPress}>
                <Animated.Image source={Icons.add} style={styles.addIcon} />
              </Pressable>
            )}
          </View>
          <Text style={_userNameStyle} {...userNameProps}>
            {item?.username}
          </Text>
        </Animated.View>
      </Pressable>
    );
  }
);
export default StoryAvatar;
