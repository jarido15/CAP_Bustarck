/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, BackHandler, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { firestore2 } from '../screens/firebase'; // Import your Firestore instance

const { width, height } = Dimensions.get('window');

const customMarkerImage = require('../images/busstop.png');

// Define the type for the driver location
interface DriverLocation {
  latitude: number;
  longitude: number;
}

interface DriverInfo {
  firstName: string;
  lastName: string;
  contactNumber: string;
  busPlateNumber: string;
  busId: string;
}

const CustomMarker = ({ coordinate, title, description }) => {
  return (
    <Marker coordinate={coordinate} title={title}>
      <Image source={customMarkerImage} style={{ position: 'absolute', width: 40, height: 40 }} />
      <Callout>
        <View style={styles.calloutContainer}>
          <Text style={{color: 'black'}}>{description}</Text>
        </View>
      </Callout>
    </Marker>
  );
};

const Mapscreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);

  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
  const [driverInfo, setDriverInfo] = useState<DriverInfo>({
    firstName: '',
    lastName: '',
    contactNumber: '',
    busPlateNumber: '',
    busId: '',
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => BackHandler.exitApp() }
        ],
        { cancelable: false }
      );
      return true;
    });

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore2
      .collection('Drivers')
      .doc('kng9UgjhRESsT4nYtOAT5ResbPJ2')
      .onSnapshot(snapshot => {
        const driverData = snapshot.data();
        if (driverData) {
          const { firstName, lastName, contactNumber, busPlateNumber, busId } = driverData;
          console.log('Driver data:', firstName, lastName, contactNumber, busPlateNumber, busId);
          setDriverInfo({ firstName, lastName, contactNumber, busPlateNumber, busId });
        }
      });

    return () => unsubscribe();
  }, []);

  // Update driver location on map
  useEffect(() => {
    const unsubscribe = firestore2
      .collection('Drivers')
      .doc('kng9UgjhRESsT4nYtOAT5ResbPJ2')
      .collection('Trips')
      .orderBy('timestamp', 'desc') // Assuming 'timestamp' field is used to order trips
      .limit(1) // Fetch only the latest trip document
      .onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          const tripData = doc.data();
          const { latitude, longitude } = tripData;
          console.log('Driver location:', latitude, longitude);
          setDriverLocation({ latitude, longitude });

          // Center the map on the driver's location
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.01000,
              longitudeDelta: 0.01000,
            });
          }
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        // Initial region will be updated dynamically
        initialRegion={{
          latitude: driverLocation?.latitude || 13.0397,
          longitude: driverLocation?.longitude || 121.4788,
          latitudeDelta: 0.01100,
          longitudeDelta: 0.01100,
        }}
      >
        {/* Display the driver's location marker if available */}
        {driverLocation && (
          <CustomMarker
            coordinate={{
              latitude: driverLocation.latitude,
              longitude: driverLocation.longitude,
            }}
            title="HI! I am"
            description={`Driver: ${driverInfo.firstName} ${driverInfo.lastName} 
Contact Number: ${driverInfo.contactNumber}
Bus Plate Number: ${driverInfo.busPlateNumber}, 
Bus ID: ${driverInfo.busId}`}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    width: '100%', // Adjust as needed
    height: '100%', // Adjust as needed
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Mapscreen;
