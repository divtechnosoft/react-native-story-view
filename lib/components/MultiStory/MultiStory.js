import { cloneDeep } from 'lodash';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import { FlatList, View } from 'react-native';
import { MultiStoryContainer } from '../MultiStoryContainer';
import { StoryAvatar } from '../StoryAvatar';
const MultiStory = forwardRef(({ stories, transitionMode, avatarProps, onAddButtonPress, ...props }, ref) => {
    const [isStoryViewVisible, setIsStoryViewShow] = useState(false);
    const [pressedIndex, setPressedIndex] = useState(-1);
    const [pointers, setPointers] = useState({
        pageX: 0,
        pageY: 0,
    });
    const profileRef = useRef(null);
    const itemsRef = useRef([]);
    const multiStoryContainerRef = useRef(null);
    // Initialize viewedStories state
    const [viewedStories, setViewedStories] = useState(() => Array.isArray(stories) && stories.length > 0
        ? stories.map(storyGroup => storyGroup === null || storyGroup === void 0 ? void 0 : storyGroup.stories.map((story) => (story === null || story === void 0 ? void 0 : story.isSeen) || false))
        : []);
    // const { current: viewedStories } = useRef(
    //   Array(stories.length)
    //     .fill(stories)
    //     .map((row, index) =>
    //       row?.[index]?.stories.map((item: StoryType) => item?.isSeen ?? false)
    //     )
    // );
    // Update viewedStories when stories change
    useEffect(() => {
        setViewedStories(prevViewedStories => stories.map((storyGroup, index) => {
            const prevGroup = prevViewedStories[index] || [];
            return storyGroup === null || storyGroup === void 0 ? void 0 : storyGroup.stories.map((story, storyIndex) => prevGroup[storyIndex] || (story === null || story === void 0 ? void 0 : story.isSeen) || false);
        }));
    }, [stories]);
    const openStories = (index) => {
        var _a, _b;
        (_b = (_a = itemsRef.current) === null || _a === void 0 ? void 0 : _a[index]) === null || _b === void 0 ? void 0 : _b.measure((_x, _y, width, height, pageX, pageY) => {
            setPointers({
                pageX: (pageX !== null && pageX !== void 0 ? pageX : 0) + (width !== null && width !== void 0 ? width : 0) / 2,
                pageY: (pageY !== null && pageY !== void 0 ? pageY : 0) + (height !== null && height !== void 0 ? height : 0) / 2,
            });
        });
        setIsStoryViewShow(true);
        setPressedIndex(index);
    };
    useImperativeHandle(ref, () => ({
        close: _onClose,
        pause: (pauseState) => {
            var _a;
            (_a = multiStoryContainerRef.current) === null || _a === void 0 ? void 0 : _a.pause(pauseState);
        },
        setMuted: (muteState) => {
            var _a;
            (_a = multiStoryContainerRef.current) === null || _a === void 0 ? void 0 : _a.setMuted(muteState);
        },
        handleLongPress: (visibility) => {
            var _a;
            (_a = multiStoryContainerRef.current) === null || _a === void 0 ? void 0 : _a.handleLongPress(visibility);
        },
        onScrollBegin: () => { },
        onScrollEnd: () => { },
    }));
    const _onClose = () => {
        var _a;
        setIsStoryViewShow(false);
        (_a = props === null || props === void 0 ? void 0 : props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props, viewedStories);
    };
    const onUserStoryIndexChange = (index) => {
        var _a;
        if (pressedIndex === index)
            return;
        (_a = profileRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({ index: index, animated: false });
        setPressedIndex(index);
    };
    useEffect(() => {
        var _a, _b;
        if (pressedIndex !== -1) {
            (_b = (_a = itemsRef.current) === null || _a === void 0 ? void 0 : _a[pressedIndex]) === null || _b === void 0 ? void 0 : _b.measure((_x, _y, width, height, pageX, pageY) => {
                setPointers({
                    pageX: (pageX !== null && pageX !== void 0 ? pageX : 0) + (width !== null && width !== void 0 ? width : 0) / 2,
                    pageY: (pageY !== null && pageY !== void 0 ? pageY : 0) + (height !== null && height !== void 0 ? height : 0) / 2,
                });
            });
        }
    }, [pressedIndex]);
    return (React.createElement(View, null,
        React.createElement(FlatList, { ref: profileRef, horizontal: true, data: stories, showsHorizontalScrollIndicator: false, keyExtractor: item => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.id) === null || _a === void 0 ? void 0 : _a.toString(); }, renderItem: ({ item, index }) => (React.createElement(StoryAvatar, { ref: (elements) => (itemsRef.current[index] = elements), ...{
                    item,
                    index,
                    isStoryViewVisible,
                    pressedIndex,
                    openStories,
                    viewedStories,
                    showAddButton: item === null || item === void 0 ? void 0 : item.isOwner,
                    onAddButtonPress,
                    ...avatarProps,
                } })), ...props }),
        isStoryViewVisible && (React.createElement(MultiStoryContainer, { ref: multiStoryContainerRef, visible: isStoryViewVisible, pointers: pointers, onComplete: _onClose, viewedStories: cloneDeep(viewedStories), onChangePosition: (progressIndex, storyIndex) => {
                var _a;
                viewedStories[storyIndex][progressIndex] = true;
                (_a = props === null || props === void 0 ? void 0 : props.onChangePosition) === null || _a === void 0 ? void 0 : _a.call(props, progressIndex, storyIndex);
            }, onUserStoryIndexChange: onUserStoryIndexChange, transitionMode: transitionMode, ...props === null || props === void 0 ? void 0 : props.storyContainerProps, stories: stories, userStoryIndex: pressedIndex, renderOverlayView: props.renderOverlayView, overlayViewPostion: props.overlayViewPostion }))));
});
export default MultiStory;
//# sourceMappingURL=MultiStory.js.map