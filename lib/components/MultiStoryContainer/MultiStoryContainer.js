import { FlashList } from '@shopify/flash-list';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import { Modal } from 'react-native';
import { GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Metrics } from '../../theme';
import { Footer } from '../Footer';
import { Indicator, ProfileHeader, StoryContainer } from '../StoryView';
import { OverlayPositions } from '../StoryView/types';
import { useMultiStoryContainer, useMultiStoryItems } from './hooks';
import styles from './styles';
/**
 * AnimatedFlashList is a wrapper around FlashList component to animate the list items.
 * Main purpose to wrap inside Animated to use useAnimatedScrollHandler for scroll animation.
 */
const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);
const MultiStoryListItem = forwardRef(({ item, index, scrollX, storyIndex, onComplete, viewedStories, isTransitionActive, flatListRef, storyLength, isInitialStory, renderOverlayView = () => React.createElement(React.Fragment, null), overlayViewPostion = OverlayPositions.Bottom, ...props }, ref) => {
    var _a, _b;
    const { animationStyle, nextStory, previousStory, storyInitialIndex, storyRef, } = useMultiStoryItems(index, ref, viewedStories, storyIndex, storyLength, isInitialStory, onComplete, scrollX, flatListRef, props === null || props === void 0 ? void 0 : props.transitionMode);
    useImperativeHandle(ref, () => ({
        handleLongPress: (visibility) => { var _a; return (_a = storyRef.current) === null || _a === void 0 ? void 0 : _a.handleLongPress(visibility); },
        pause: (pauseState) => { var _a; return (_a = storyRef.current) === null || _a === void 0 ? void 0 : _a.pause(pauseState); },
        setMuted: (muteState) => {
            var _a;
            (_a = storyRef.current) === null || _a === void 0 ? void 0 : _a.setMuted(muteState);
        },
        onScrollBegin: () => { },
        onScrollEnd: () => { },
    }));
    return (React.createElement(React.Fragment, null,
        React.createElement(Animated.View, { key: item.id, style: [styles.itemContainer, animationStyle] }, storyIndex === index || isTransitionActive ? (React.createElement(StoryContainer, { visible: true, extended: true, key: index + (item === null || item === void 0 ? void 0 : item.id), ref: storyRef, userStories: item, nextStory: nextStory, previousStory: previousStory, stories: item.stories, progressIndex: storyInitialIndex < 0 ? 0 : storyInitialIndex, maxVideoDuration: 15, renderOverlayView: renderOverlayView, overlayViewPostion: overlayViewPostion, renderHeaderComponent: () => {
                var _a;
                return (React.createElement(ProfileHeader, { userImage: { uri: (_a = item.profile) !== null && _a !== void 0 ? _a : '' }, userName: item.username, userMessage: item.title, onClosePress: () => {
                        onComplete === null || onComplete === void 0 ? void 0 : onComplete();
                    } }));
            }, renderFooterComponent: () => React.createElement(Footer, null), ...props, index: index, userStoryIndex: storyIndex })) : ((_b = (_a = props === null || props === void 0 ? void 0 : props.renderIndicatorComponent) === null || _a === void 0 ? void 0 : _a.call(props)) !== null && _b !== void 0 ? _b : React.createElement(Indicator, null)))));
});
const MultiStoryContainer = forwardRef(({ stories, visible, onComplete, onUserStoryIndexChange, viewedStories = [], pointers = { pageX: 0, pageY: 0 }, ...props }, ref) => {
    const flatListRef = useRef(null);
    const initialStoryIndex = useRef(props.userStoryIndex);
    const itemsRef = useRef([]);
    const [isTransitionActive, setIsTransitionActive] = useState(false);
    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, stories.length);
    }, [itemsRef, stories]);
    const handleLongPress = (visiblity) => {
        var _a;
        (_a = itemsRef.current[storyIndexRef.current]) === null || _a === void 0 ? void 0 : _a.handleLongPress(visiblity);
    };
    useImperativeHandle(ref, () => ({
        pause: (pauseState) => {
            var _a;
            (_a = itemsRef.current[storyIndexRef.current]) === null || _a === void 0 ? void 0 : _a.pause(pauseState);
        },
        setMuted: (muteState) => {
            var _a;
            (_a = itemsRef.current[storyIndexRef.current]) === null || _a === void 0 ? void 0 : _a.setMuted(muteState);
        },
        handleLongPress: (visibility) => {
            var _a;
            (_a = itemsRef.current[storyIndexRef.current]) === null || _a === void 0 ? void 0 : _a.handleLongPress(visibility);
        },
        onScrollBegin: () => { },
        onScrollEnd: () => { },
    }));
    const { storyIndex, onViewRef, viewabilityConfig, gestureHandler, onScroll, scrollX, listAnimatedStyle, isKeyboardVisible, setIsScrollActive, updateStoryIndex, isScrollActiveRef, storyIndexRef, animationModalStyle, } = useMultiStoryContainer(flatListRef, props, handleLongPress, onComplete, pointers, visible);
    const onScrollBeginDragFlashList = () => {
        var _a;
        setIsScrollActive(true);
        isScrollActiveRef.current = true;
        (_a = itemsRef.current[storyIndex]) === null || _a === void 0 ? void 0 : _a.onScrollBegin();
    };
    const onScrollEndDragFlashList = () => {
        var _a;
        setIsScrollActive(false);
        isScrollActiveRef.current = false;
        (_a = itemsRef.current[storyIndex]) === null || _a === void 0 ? void 0 : _a.onScrollEnd();
        updateStoryIndex();
    };
    useEffect(() => {
        onUserStoryIndexChange === null || onUserStoryIndexChange === void 0 ? void 0 : onUserStoryIndexChange(storyIndex);
    }, [onUserStoryIndexChange, storyIndex]);
    if (!visible)
        return null;
    return (React.createElement(Modal, { visible: visible, transparent: true, onRequestClose: () => onComplete === null || onComplete === void 0 ? void 0 : onComplete() },
        React.createElement(GestureHandlerRootView, { style: styles.rootViewStyle },
            React.createElement(GestureDetector, { gesture: gestureHandler },
                React.createElement(Animated.View, { style: [styles.mainFlashListContainer, animationModalStyle] },
                    React.createElement(AnimatedFlashList, { horizontal: true, pagingEnabled: true, bounces: false, data: stories, scrollEnabled: !isKeyboardVisible, ref: flatListRef, onScroll: onScroll, onScrollBeginDrag: onScrollBeginDragFlashList, onScrollEndDrag: onScrollEndDragFlashList, scrollEventThrottle: 16, initialScrollIndex: storyIndex, estimatedItemSize: Metrics.windowWidth, overrideItemLayout: layout => {
                            layout.size = Metrics.windowWidth;
                        }, keyboardShouldPersistTaps: "handled", onLayout: () => setIsTransitionActive(true), onViewableItemsChanged: onViewRef, viewabilityConfig: viewabilityConfig.current, keyExtractor: item => { var _a; return (item === null || item === void 0 ? void 0 : item.title) + ((_a = item === null || item === void 0 ? void 0 : item.id) === null || _a === void 0 ? void 0 : _a.toString()); }, extraData: storyIndex, renderItem: ({ item, index }) => (React.createElement(Animated.View, { style: [styles.mainFlashListContainer, listAnimatedStyle] },
                            React.createElement(MultiStoryListItem, { ref: (elements) => (itemsRef.current[index] = elements), ...{
                                    item,
                                    index,
                                    storyIndex,
                                    onComplete,
                                    viewedStories,
                                    scrollX,
                                    isTransitionActive,
                                    flatListRef,
                                    storyLength: stories.length,
                                    isInitialStory: initialStoryIndex.current === index,
                                }, ...props }))) }))))));
});
export default memo(MultiStoryContainer);
//# sourceMappingURL=MultiStoryContainer.js.map