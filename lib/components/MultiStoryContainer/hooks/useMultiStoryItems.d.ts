import type { StoryRef } from 'src/components/StoryView';
import { ScrollValue, TransitionMode } from '../types';
declare const useMultiStoryItems: (index: number, ref: any, viewedStories: Array<boolean[]>, storyIndex: number, storyLength: number, isInitialStory?: boolean, onComplete?: () => void, scrollX?: ScrollValue, flatListRef?: any, transitionMode?: TransitionMode) => {
    storyRef: import("react").RefObject<StoryRef>;
    nextStory: () => void;
    previousStory: () => void;
    animationStyle: {};
    storyInitialIndex: number;
};
export default useMultiStoryItems;
