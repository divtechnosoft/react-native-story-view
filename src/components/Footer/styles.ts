import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import { moderateScale, scale, verticalScale } from '../../theme/Metrics';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: verticalScale(8),
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(12),
    color: Colors.white,
    height: verticalScale(45),
    fontSize: moderateScale(12, false, 0.3),
  },
  sendIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: scale(8),
    tintColor: Colors.white,
  },
  sendText: {
    color: Colors.white,
    paddingRight: scale(16),
    fontSize: moderateScale(12, false, 0.3),
  },
  sectionStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: moderateScale(24),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
  ImageStyle: {
    padding: moderateScale(10),
    margin: moderateScale(5),
    height: moderateScale(25),
    width: moderateScale(25),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});

export default styles;
