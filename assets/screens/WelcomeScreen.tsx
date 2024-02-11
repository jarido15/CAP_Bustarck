/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontSize, FontFamily, Color } from './GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');

  // Function to check if it's the first time the user is using the app
  const checkFirstTime = async () => {
    try {
      const isFirstTime = await AsyncStorage.getItem('isFirstTime');
      if (isFirstTime === null) {
        // If it's the first time, set the flag in AsyncStorage
        await AsyncStorage.setItem('isFirstTime', 'false');
        return true; // First time
      } else {
        return false; // Not the first time
      }
    } catch (error) {
      console.error('Error checking first time:', error);
      return true; // Assume it's the first time if error occurs
    }
  };

  useEffect(() => {
    // Check if it's the first time using the app
    checkFirstTime().then((isFirstTime) => {
      if (!isFirstTime) {
        // If not the first time, navigate to the map screen
        navigation.navigate('MapScreen');
      }
    });

    // Request location permission when the component mounts
    requestLocationPermission();
  }, []);

  // Function to request location permission
  const requestLocationPermission = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === 'granted') {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleCommuterPress = () => {
    navigation.navigate('MapScreen'); // Navigate to the MapScreen for the Commuter
  };

  return (
    <LinearGradient
      style={styles.welcomescreen}
      locations={[0, 1]}
      colors={['#42047e', '#07f49e']}
      useAngle={true}
      angle={180}>
      <TouchableOpacity onPress={handleCommuterPress}>
        <View style={styles.welcomescreenChild} />
        <Text style={[styles.getStarted, styles.getStartedTypo]}>
          get started
        </Text>
      </TouchableOpacity>
      <Text style={styles.startTrackingYour}>Start Tracking Your Bus</Text>
      <Text style={[styles.realTimeBusLocation, styles.busLayout]}>
        Real-time Bus Location
      </Text>
      <Text style={[styles.monitoring]}> Monitoring </Text>
      <Text style={[styles.trackYouBus]}>Track your bus without hassle</Text>
      <Image
        style={styles.busone}
        resizeMode="cover"
        source={require('../images/busone.png')}
      />
      <Image
        style={styles.pinlocation}
        resizeMode="cover"
        source={require('../images/pinlocation.png')}
      />
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  welcomescreenChild: {
    top: height * 0.90,
    left: width * 0.10,
    borderRadius: 60,
    backgroundColor: '#42047e',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 100,
    },
    shadowRadius: 100,
    elevation: 100,
    shadowOpacity: 5,
    width: width * 0.80,
    height: height * 0.047,
    position: 'absolute',
  },
  getStartedTypo: {
    height: height * 0.03,
    textAlign: 'left',
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.jostSemiBold,
    fontWeight: '600',
    position: 'absolute',
    top: height * 0.910,
    left: width * 0.420,
    color: '#fff',
    width: width * 0.90625,
  },
  startTrackingYour: {
    top: height * 0.865,
    left: width * 0.250,
    fontSize: width * 0.0550,
    fontFamily: 'Jost-SemiBold',
    color: '#5e5c5c',
    width: width * 0.875,
  },
  realTimeBusLocation: {
    top: height * 0.45,
    fontSize: width * 0.078125,
    fontFamily: 'Jost-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    color: Color.colorGray,
    left: width * 0.0010,
  },
  monitoring: {
    top: height * 0.45,
    fontSize: width * 0.078125,
    fontFamily: 'Jost-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    color: Color.colorGray,
    left: 0,
  },
  trackYouBus: {
    top: height * 0.45,
    left: width * 0.24,
    fontSize: width * 0.05,
    fontWeight: '300',
    fontFamily: 'Jost-Light',
  },
  busone: {
    top: height * 0.075,
    left: 0.0,
    width: '90%',
    height: height * 0.4,
    position: 'absolute',
  },
  pinlocation: {
    top: height * 0.01,
    left: width * 0.50,
    width: width * 0.3,
    height: height * 0.2,
    position: 'absolute',
  },
  welcomescreen: {
    flex: 1,
    width: '100%',
    height: height,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});

export default WelcomeScreen;
