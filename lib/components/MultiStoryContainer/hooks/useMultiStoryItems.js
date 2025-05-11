import { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useAnimatedStyle } from 'react-native-reanimated';
import { cubeTransition, scaleTransition } from '../utils/StoryTransitions';
import { TransitionMode } from '../types';
import { Metrics } from '../../../theme';
const useMultiStoryItems = (index, ref, viewedStories, storyIndex, storyLength, isInitialStory, onComplete, scrollX, flatListRef, transitionMode) => {
    var _a;
    const storyRef = useRef(null);
    const [, setIsSeen] = useState(false);
    const storyInitialIndex = (_a = viewedStories === null || viewedStories === void 0 ? void 0 : viewedStories[index]) === null || _a === void 0 ? void 0 : _a.findIndex((val) => !val);
    /**
     * This useEffect is used to render the initial story index after the threshold duration of 700ms.
     * We use this because of some of the initials stories are not forwarding the correct ref to parent.
     */
    useEffect(() => {
        if (isInitialStory) {
            setTimeout(() => {
                setIsSeen(true);
            }, 700); // Note: 700ms is the threshold duration to render the initial story index
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    useImperativeHandle(ref, () => ({
        onScrollBegin: () => { var _a; return (_a = storyRef === null || storyRef === void 0 ? void 0 : storyRef.current) === null || _a === void 0 ? void 0 : _a.pause(true); },
        onScrollEnd: () => { var _a; return (_a = storyRef === null || storyRef === void 0 ? void 0 : storyRef.current) === null || _a === void 0 ? void 0 : _a.pause(false); },
        handleLongPress: (visibility) => { var _a; return (_a = storyRef === null || storyRef === void 0 ? void 0 : storyRef.current) === null || _a === void 0 ? void 0 : _a.handleLongPress(visibility); },
    }));
    const width = Metrics.windowWidth;
    const perspective = width;
    const offset = index * width;
    const ratio = Metrics.isIOS ? 2 : 1;
    const inputRange = [offset - width, offset + width];
    const angle = Math.atan(perspective / (width / ratio));
    const animationStyle = useAnimatedStyle(() => {
        if (!scrollX)
            return {};
        if ((scrollX === null || scrollX === void 0 ? void 0 : scrollX.value) === 0) {
            return {};
        }
        switch (transitionMode) {
            case TransitionMode.Cube:
                return cubeTransition(scrollX, offset, inputRange, angle, width);
            case TransitionMode.Scale:
                return scaleTransition(index, scrollX);
            default:
                return {};
        }
    }, [index, scrollX]);
    const nextStory = () => {
        var _a;
        if (storyIndex + 1 === storyLength) {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            return;
        }
        if (storyIndex >= storyLength - 1)
            return;
        (_a = flatListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
            index: storyIndex + 1,
            animated: true,
        });
    };
    const previousStory = () => {
        var _a;
        if (storyIndex === 0)
            return;
        (_a = flatListRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
            index: storyIndex - 1,
            animated: true,
        });
    };
    return {
        storyRef,
        nextStory,
        previousStory,
        animationStyle,
        storyInitialIndex,
    };
};
export default useMultiStoryItems;
//# sourceMappingURL=useMultiStoryItems.js.map