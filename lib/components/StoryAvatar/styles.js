import { StyleSheet } from 'react-native';
import { Colors, moderateScale } from '../../theme';
const styles = StyleSheet.create({
    image: {
        height: '95%',
        width: '95%',
        borderRadius: moderateScale(35),
    },
    imageContainer: {
        height: moderateScale(70),
        width: moderateScale(70),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(35),
        borderColor: Colors.pink,
        borderWidth: 2,
        marginRight: moderateScale(16),
    },
    viewedStoryContainer: {
        borderColor: Colors.inActiveColor,
    },
    username: {
        alignSelf: 'center',
        marginRight: moderateScale(16),
        marginTop: moderateScale(6),
        color: Colors.white,
        fontWeight: '500',
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 2,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 20,
    },
    addIcon: {
        width: 20,
        height: 20,
    },
});
export default styles;
//# sourceMappingURL=styles.js.map