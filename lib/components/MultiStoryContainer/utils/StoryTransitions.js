import { Extrapolate, interpolate } from 'react-native-reanimated';
import { Metrics } from '../../../theme';
//TODO: Make perfect cube transition
export const cubeTransition = (scrollX, offset, inputRange, angle, width) => {
    'worklet';
    const rotateY = interpolate(scrollX.value, inputRange, [angle, -angle], Extrapolate.CLAMP);
    return {
        transform: [
            { perspective: width },
            { translateX: offset <= scrollX.value ? width / 2 : -width / 2 },
            { rotateY: `${rotateY}rad` },
            { translateX: offset <= scrollX.value ? -width / 2 : width / 2 },
        ],
    };
};
export const scaleTransition = (index, scrollX) => {
    'worklet';
    const width = Metrics.screenWidth;
    const perspective = width;
    const inputRange = [width * (index - 1), width * index, width * (index + 1)];
    const scale = interpolate(scrollX.value, inputRange, [0.79, 1, 0.78]);
    return {
        transform: [{ perspective }, { scale }],
    };
};
//# sourceMappingURL=StoryTransitions.js.map