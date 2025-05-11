import type { MultiStoryContainerProps, PointerType, ScrollValue, ViewConfig } from '../types';
declare const useMultiStoryContainer: (_flatListRef: any, { userStoryIndex, backgroundColor }: Partial<MultiStoryContainerProps>, handleLongPress: (visibility: boolean) => void, onComplete?: () => void, pointers?: PointerType, visible?: boolean) => {
    scrollX: ScrollValue;
    onViewRef: ({ viewableItems }: ViewConfig) => void;
    viewabilityConfig: import("react").MutableRefObject<{
        itemVisiblePercentThreshold: number;
        waitForInteraction: boolean;
    }>;
    listStyle: {
        flex: number;
        backgroundColor: string;
    };
    rootStyle: {
        height: number;
        width: number;
        backgroundColor: string;
    };
    storyIndex: number;
    gestureHandler: import("react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition").SimultaneousGesture;
    setStoryIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
    onScroll: (event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => void;
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
    isKeyboardVisible: boolean;
    setIsScrollActive: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    updateStoryIndex: () => void;
    isScrollActiveRef: import("react").MutableRefObject<boolean>;
    storyIndexRef: import("react").MutableRefObject<number>;
    animationModalStyle: {
        transform: ({
            translateY: number;
            translateX?: undefined;
            scale?: undefined;
        } | {
            translateX: number;
            translateY?: undefined;
            scale?: undefined;
        } | {
            scale: number;
            translateY?: undefined;
            translateX?: undefined;
        })[];
    };
};
export default useMultiStoryContainer;
