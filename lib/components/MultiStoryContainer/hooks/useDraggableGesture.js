import { StyleSheet, useWindowDimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { Colors, Metrics } from '../../../theme';
import styles from '../styles';
import { useCallback } from 'react';
const useDraggableGesture = ({ backgroundColor, onComplete, handleLongPress, isKeyboardVisible, isScrollActive, pointers = { pageX: 0, pageY: 0 }, }) => {
    const { height, width } = useWindowDimensions();
    const snapPoint = Metrics.screenHeight / 8;
    const scrollDragPoint = Metrics.screenHeight / 6;
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const isCompleted = useSharedValue(false);
    const isDragged = useSharedValue(undefined);
    const isLongPressed = useSharedValue(undefined);
    const speed = 300; // Animation speed in milliseconds
    const onEndHandler = () => {
        'worklet';
        translateY.value = withTiming(0, {
            duration: speed,
        }, finished => {
            if (finished) {
                isLongPressed.value = false;
            }
        });
    };
    const panGesture = Gesture.Pan()
        .activateAfterLongPress(200)
        .enabled(!isScrollActive) // To disable the pan gesture while FlashList is scrolling
        .onChange(event => {
        if (event.velocityY === 0)
            return;
        if (event.translationY <= 0) {
            translateY.value = 0;
            return;
        }
        isLongPressed.value = true;
        translateX.value = 0;
        translateY.value = event.translationY;
        // When user swipe down to scroll point then set isDragged to true
        if (event.translationY > scrollDragPoint) {
            isDragged.value = true;
        }
        // When user swipe down to snap point then scale the view or reset to 1
        if (event.translationY > snapPoint) {
            scale.value = interpolate(event.translationY, [snapPoint, Metrics.screenHeight], [1, 0.85]);
        }
        else {
            scale.value = 1;
        }
    })
        .onEnd(event => {
        isDragged.value = false;
        if (event.translationY > snapPoint) {
            scale.value = withTiming(0, {
                duration: speed,
            }, () => {
                isCompleted.value = true;
                isLongPressed.value = false;
            });
            translateX.value = withTiming(-(Metrics.windowWidth / 2 - (pointers === null || pointers === void 0 ? void 0 : pointers.pageX)), // Center Story on X-axis
            {
                duration: speed,
            });
            translateY.value = withTiming(-(Metrics.windowHeight / 2 - (pointers === null || pointers === void 0 ? void 0 : pointers.pageY)), // Center Story on Y-axis
            {
                duration: speed,
            });
        }
        else {
            onEndHandler();
        }
    });
    const longPressGesture = Gesture.LongPress()
        .enabled(!isScrollActive) // To disable the long press while FlashList is scrolling
        .minDuration(200) // To disable the min duration
        .maxDistance(10000) // To disable the max distance
        .onStart(() => {
        isLongPressed.value = true;
    })
        .onEnd(() => {
        if (translateY.value < snapPoint) {
            onEndHandler();
        }
    });
    const gestureHandler = Gesture.Simultaneous(panGesture, longPressGesture);
    useAnimatedReaction(() => isCompleted.value, (value) => {
        if (value) {
            onComplete && runOnJS(onComplete)();
        }
    });
    /**
     * Handle the visibility of the view
     * Here we are use the useCallback to stop the re-initialize the function on every render
     */
    const handleVisibility = useCallback(() => {
        if (isLongPressed.value === undefined)
            return;
        handleLongPress === null || handleLongPress === void 0 ? void 0 : handleLongPress(isLongPressed.value);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    useAnimatedReaction(() => isLongPressed.value, () => {
        if (isKeyboardVisible)
            return;
        runOnJS(handleVisibility)();
    });
    const listAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
        backgroundColor: !isDragged.value
            ? backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : Colors.black
            : Colors.transparent,
    }));
    const listStyle = StyleSheet.flatten([styles.list]);
    const rootStyle = { height, width, backgroundColor: Colors.transparent };
    return {
        listStyle,
        rootStyle,
        gestureHandler,
        listAnimatedStyle,
    };
};
export default useDraggableGesture;
//# sourceMappingURL=useDraggableGesture.js.map