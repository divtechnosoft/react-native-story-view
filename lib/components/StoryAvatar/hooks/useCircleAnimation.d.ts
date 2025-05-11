import type { CircleAnimationProps } from '../types';
declare const useCircleAnimation: ({ pressedIndex, index, isStoryViewVisible, }: CircleAnimationProps) => {
    avatarAnimatedStyle: {
        transform: {
            scale: number;
        }[];
    };
};
export default useCircleAnimation;
