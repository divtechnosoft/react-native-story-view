import type { ScrollValue } from '../types';
export declare const cubeTransition: (scrollX: ScrollValue, offset: number, inputRange: number[], angle: number, width: number) => {
    transform: ({
        perspective: number;
        translateX?: undefined;
        rotateY?: undefined;
    } | {
        translateX: number;
        perspective?: undefined;
        rotateY?: undefined;
    } | {
        rotateY: string;
        perspective?: undefined;
        translateX?: undefined;
    })[];
};
export declare const scaleTransition: (index: number, scrollX: ScrollValue) => {
    transform: ({
        perspective: number;
        scale?: undefined;
    } | {
        scale: number;
        perspective?: undefined;
    })[];
};
