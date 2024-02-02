/* eslint-disable prettier/prettier */
import * as React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Color, FontFamily, FontSize} from './GlobalStyles';
const DriverScreen = () => {
  return (
    <LinearGradient
      style={styles.loginscreenform}
      locations={[0, 1]}
      colors={['#42047e', '#07f49e']}
      useAngle={true}
      angle={180}>
      <View
        style={[styles.loginscreenformChild, styles.rectangleViewShadowBox]}
      />
      <Text style={[styles.useBustrackAs, styles.passwordTypo]}>
        Use Bustrack as Driver
      </Text>
      <Text style={[styles.password, styles.passwordTypo]}>Password:</Text>
      <Text style={[styles.username, styles.passwordTypo]}>Username:</Text>
      <Image
        style={styles.bus4RemovebgPreview1Icon}
        resizeMode="cover"
        source={require('../images/busone.png')}
      />
      <Image
        style={styles.placeholder1Icon}
        resizeMode="cover"
        source={require('../images/pinlocation.png')}
      />
      <View
        style={[styles.loginscreenformItem, styles.loginscreenformLayout]}
      />
      <View
        style={[styles.loginscreenformInner, styles.loginscreenformLayout]}
      />
      <View style={[styles.rectangleView, styles.loginPosition]} />
      <Text style={[styles.login]}>Login</Text>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  rectangleViewShadowBox: {
    shadowOpacity: 0.1,
    elevation: 4,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  passwordTypo: {
    textAlign: 'center',
    color: Color.colorGray,
    fontFamily: FontFamily.jostLight,
    fontWeight: '300',
    fontSize: FontSize.size_xl,
    height: 28,
    position: 'absolute',
  },
  loginscreenformLayout: {
    height: 1,
    width: 300,
    borderTopWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: 'solid',
    position: 'absolute',
  },
  loginPosition: {
    left: 95,
    top: 770,
    position: 'absolute',
  },
  loginscreenformChild: {
    top: 576,
    left: 30,
    borderRadius: 40,
    backgroundColor: '#d9d9d9',
    width: 350,
    height: 250,
    opacity: 0.5,
    position: 'absolute',
  },
  useBustrackAs: {
    top: 600,
    left: 40,
    width: 349,
    height: 28,
  },
  password: {
    top: 710,
    width: 96,
    left: 57,
    height: 28,
  },
  username: {
    top: 642,
    width: 93,
    left: 59,
    height: 28,
  },
  bus4RemovebgPreview1Icon: {
    top: 183,
    left: 0,
    width: 385,
    height: 384,
    position: 'absolute',
  },
  placeholder1Icon: {
    top: 108,
    left: 161,
    width: 205,
    height: 216,
    position: 'absolute',
  },
  loginscreenformItem: {
    top: 687,
    left: 57,
  },
  loginscreenformInner: {
    top: 756,
    left: 59,
  },
  rectangleView: {
    left: 103,
    borderRadius: 60,
    backgroundColor: '#42047e',
    width: 220,
    height: 29,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  login: {
    top: 774,
    left: 180,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: FontFamily.jostSemiBold,
    color: '#fff',
    textAlign: 'left',
    width: 70,
    height: 28,
  },
  loginscreenform: {
    flex: 1,
    width: '100%',
    height: 932,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});
export default DriverScreen;
