import type { DraggableGestureProps } from '../types';
declare const useDraggableGesture: ({ backgroundColor, onComplete, handleLongPress, isKeyboardVisible, isScrollActive, pointers, }: DraggableGestureProps) => {
    listStyle: {
        flex: number;
        backgroundColor: string;
    };
    rootStyle: {
        height: number;
        width: number;
        backgroundColor: string;
    };
    gestureHandler: import("react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition").SimultaneousGesture;
    listAnimatedStyle: {
        transform: ({
            translateX: number;
            translateY?: undefined;
            scale?: undefined;
        } | {
            translateY: number;
            translateX?: undefined;
            scale?: undefined;
        } | {
            scale: number;
            translateX?: undefined;
            translateY?: undefined;
        })[];
        backgroundColor: string;
    };
};
export default useDraggableGesture;
