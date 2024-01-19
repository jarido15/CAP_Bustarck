// import * as React from 'react';
// import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {Color, Border, FontFamily, FontSize} from '../screens/GlobalStyles';
// import {useNavigation} from '@react-navigation/native';
// const LoginScreen = () => {
//   const navigation = useNavigation();
//   const handleCommuterPress = () => {
//     navigation.navigate('MapScreen'); // Navigate to the MapScreen for the Commuter
//   };
//   const handleBusDriverPress = () => {
//     navigation.navigate('DriverScreen'); // Navigate to the Bus Driver Screen
//   };
//   return (
//     <LinearGradient
//       style={styles.loginscreen}
//       locations={[0, 1]}
//       colors={['#42047e', '#07f49e']}
//       useAngle={true}
//       angle={180}>
//       <View style={styles.loginscreenChild} />
//       <TouchableOpacity onPress={handleCommuterPress}>
//         <View style={[styles.loginscreenItem, styles.loginscreenShadowBox]} />
//         <Text style={[styles.commuter, styles.commuterTypo]}>Commuter</Text>
//       </TouchableOpacity>
//       <Text style={[styles.useBustrackAs, styles.orTypo]}>Use Bustrack as</Text>
//       <Text style={[styles.or, styles.orTypo]}>or</Text>
//       <TouchableOpacity onPress={handleBusDriverPress}>
//         <View style={[styles.loginscreenInner, styles.loginscreenShadowBox]} />
//         <Text style={[styles.busDriver, styles.commuterTypo]}>Bus Driver</Text>
//       </TouchableOpacity>
//       <Image
//         style={styles.bus4RemovebgPreview1Icon}
//         resizeMode="cover"
//         source={require('../images/busone.png')}
//       />
//       <Image
//         style={styles.placeholder1Icon}
//         resizeMode="cover"
//         source={require('../images/pinlocation.png')}
//       />
//     </LinearGradient>
//   );
// };
// const styles = StyleSheet.create({
//   loginscreenShadowBox: {
//     height: 35,
//     width: 265,
//     backgroundColor: Color.colorIndigo,
//     borderRadius: Border.br_41xl,
//     shadowOpacity: 1,
//     elevation: 4,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 5,
//       height: 4,
//     },
//     shadowColor: 'rgba(0, 0, 0, 0.25)',
//     position: 'absolute',
//   },
//   orTypo: {
//     height: 28,
//     width: 349,
//     textAlign: 'center',
//     color: Color.colorGray,
//     fontFamily: FontFamily.jostLight,
//     fontWeight: '300',
//     fontSize: FontSize.size_xl,
//     position: 'absolute',
//   },
//   commuterTypo: {
//     width: 203,
//     textAlign: 'left',
//     color: Color.colorWhite,
//     fontFamily: FontFamily.jostSemiBold,
//     fontWeight: '600',
//     fontSize: FontSize.size_xl,
//     left: 175,
//     height: 28,
//     position: 'absolute',
//   },
//   loginscreenChild: {
//     top: 570,
//     borderRadius: 40,
//     backgroundColor: '#d9d9d9',
//     width: 350,
//     height: 250,
//     opacity: 0.5,
//     shadowOpacity: 1,
//     elevation: 4,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 5,
//       height: 4,
//     },
//     shadowColor: 'rgba(0, 0, 0, 0.25)',
//     left: 35,
//     position: 'absolute',
//   },
//   loginscreenItem: {
//     top: 635,
//     left: 75,
//   },
//   loginscreenInner: {
//     top: 725,
//     left: 75,
//   },
//   useBustrackAs: {
//     top: 600,
//     left: 40,
//   },
//   or: {
//     top: 685,
//     left: 37,
//     width: 349,
//     textAlign: 'center',
//     color: Color.colorGray,
//     fontFamily: FontFamily.jostLight,
//     fontWeight: '300',
//     fontSize: FontSize.size_xl,
//   },
//   commuter: {
//     top: 640,
//   },
//   busDriver: {
//     top: 730,
//   },
//   bus4RemovebgPreview1Icon: {
//     top: 183,
//     left: 0,
//     width: 385,
//     height: 384,
//     position: 'absolute',
//   },
//   placeholder1Icon: {
//     top: 108,
//     width: 205,
//     height: 216,
//     left: 161,
//     position: 'absolute',
//   },
//   loginscreen: {
//     flex: 1,
//     width: '100%',
//     height: 932,
//     overflow: 'hidden',
//     backgroundColor: 'transparent',
//   },
// });

// export default LoginScreen;
