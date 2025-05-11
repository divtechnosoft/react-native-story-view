// libs
import React, { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { Pressable, StyleSheet, Text, View } from 'react-native';
// hooks
import useCircleAnimation from './hooks/useCircleAnimation';
// mics
import styles from './styles';
import { Icons } from '../../assets';
const StoryAvatar = forwardRef(({ item, index, pressedIndex, isStoryViewVisible, openStories, viewedStories = [], userNameStyle, userImageStyle, userImageProps, viewedStoryContainerStyle, userNameProps, rootProps, containerStyle, showAddButton, onAddButtonPress, }, ref) => {
    var _a, _b;
    const isUserStorySeen = (_a = viewedStories === null || viewedStories === void 0 ? void 0 : viewedStories[index]) === null || _a === void 0 ? void 0 : _a.every((val) => val);
    const _userNameStyle = StyleSheet.flatten([styles.username, userNameStyle]);
    const _userImageStyle = StyleSheet.flatten([styles.image, userImageStyle]);
    const _containerStyle = StyleSheet.flatten([
        styles.imageContainer,
        containerStyle,
        (_b = (isUserStorySeen && viewedStoryContainerStyle)) !== null && _b !== void 0 ? _b : styles.viewedStoryContainer,
    ]);
    const { avatarAnimatedStyle } = useCircleAnimation({
        pressedIndex,
        index,
        isStoryViewVisible,
    });
    return (React.createElement(Pressable, { onPress: gestureEvents => openStories === null || openStories === void 0 ? void 0 : openStories(index, gestureEvents), ...rootProps },
        React.createElement(Animated.View, { ref: ref },
            React.createElement(View, { style: _containerStyle },
                React.createElement(Animated.Image, { resizeMode: "cover", source: { uri: item === null || item === void 0 ? void 0 : item.profile }, style: [_userImageStyle, avatarAnimatedStyle], ...userImageProps }),
                showAddButton && onAddButtonPress && (React.createElement(Pressable, { style: styles.addButton, hitSlop: 5, onPress: onAddButtonPress },
                    React.createElement(Animated.Image, { source: Icons.add, style: styles.addIcon })))),
            React.createElement(Text, { style: _userNameStyle, ...userNameProps }, item === null || item === void 0 ? void 0 : item.username))));
});
export default StoryAvatar;
//# sourceMappingURL=StoryAvatar.js.map