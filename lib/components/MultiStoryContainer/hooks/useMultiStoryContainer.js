import { useEffect, useRef, useState } from 'react';
import { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { useKeyboardListener } from '../../../hooks';
import { Metrics } from '../../../theme';
import useDraggableGesture from './useDraggableGesture';
const useMultiStoryContainer = (_flatListRef, { userStoryIndex, backgroundColor }, handleLongPress, onComplete, pointers, visible) => {
    const [storyIndex, setStoryIndex] = useState(userStoryIndex !== null && userStoryIndex !== void 0 ? userStoryIndex : 0);
    const [isScrollActive, setIsScrollActive] = useState(false);
    const isScrollActiveRef = useRef(false);
    const viewableItemsRef = useRef(null);
    const storyIndexRef = useRef(userStoryIndex !== null && userStoryIndex !== void 0 ? userStoryIndex : 0); // We use the storyIndexRef to keep track of the current story index
    const scrollX = useSharedValue(0);
    const previousIndex = useRef(0);
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 70,
        waitForInteraction: true,
    });
    const isKeyboardVisible = useKeyboardListener();
    const onScroll = useAnimatedScrollHandler(event => {
        scrollX.value = event.contentOffset.x;
    });
    const updateStoryIndex = () => {
        var _a, _b, _c, _d, _e, _f;
        if (((_a = viewableItemsRef.current) === null || _a === void 0 ? void 0 : _a.index) == null)
            return;
        /* viewableItems returns array of current/next viewable item
               During story transition current/next or previous/current both visible on screen so array contains both items.
               To consider only next/previous item, checking length is only 1 and it is not previous story.
            */
        if (((_b = viewableItemsRef.current) === null || _b === void 0 ? void 0 : _b.length) === 1 &&
            ((_c = viewableItemsRef.current) === null || _c === void 0 ? void 0 : _c.index) !== previousIndex.current) {
            setStoryIndex((_d = viewableItemsRef.current) === null || _d === void 0 ? void 0 : _d.index);
            storyIndexRef.current = (_e = viewableItemsRef.current) === null || _e === void 0 ? void 0 : _e.index;
            previousIndex.current = (_f = viewableItemsRef.current) === null || _f === void 0 ? void 0 : _f.index;
        }
    };
    const onViewRef = ({ viewableItems }) => {
        var _a;
        const index = (_a = viewableItems === null || viewableItems === void 0 ? void 0 : viewableItems[0]) === null || _a === void 0 ? void 0 : _a.index;
        viewableItemsRef.current = { index: index, length: viewableItems === null || viewableItems === void 0 ? void 0 : viewableItems.length };
        // If scrolling is active, we will update the story index on scroll end.
        // If scrolling is not active, we will update the story index on view change.
        !isScrollActiveRef.current && updateStoryIndex();
    };
    const layoutValue = useSharedValue(0);
    useEffect(() => {
        if (visible) {
            layoutValue.value = withTiming(1, { duration: 400 }); // Default open Modal animation duration is 400
        }
    }, [layoutValue, visible]);
    const animationModalStyle = useAnimatedStyle(() => {
        var _a, _b;
        return {
            transform: [
                {
                    translateY: interpolate(layoutValue.value, [0, 1], [-(Metrics.windowHeight / 2 - ((_a = pointers === null || pointers === void 0 ? void 0 : pointers.pageY) !== null && _a !== void 0 ? _a : 0)), 0]),
                },
                {
                    translateX: interpolate(layoutValue.value, [0, 1], [-(Metrics.windowWidth / 2 - ((_b = pointers === null || pointers === void 0 ? void 0 : pointers.pageX) !== null && _b !== void 0 ? _b : 0)), 0]),
                },
                { scale: interpolate(layoutValue.value, [0, 1], [0, 1]) },
            ],
        };
    }, [layoutValue, pointers]);
    const { listStyle, rootStyle, gestureHandler, listAnimatedStyle } = useDraggableGesture({
        backgroundColor,
        onComplete,
        handleLongPress,
        isKeyboardVisible,
        isScrollActive,
        pointers,
    });
    return {
        scrollX,
        onViewRef,
        viewabilityConfig,
        listStyle,
        rootStyle,
        storyIndex,
        gestureHandler,
        setStoryIndex,
        onScroll,
        listAnimatedStyle,
        isKeyboardVisible,
        setIsScrollActive,
        updateStoryIndex,
        isScrollActiveRef,
        storyIndexRef,
        animationModalStyle,
    };
};
export default useMultiStoryContainer;
//# sourceMappingURL=useMultiStoryContainer.js.map