/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, BackHandler, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { firestore2, auth2, auth3 } from '../screens/firebase'; // Import your Firestore and auth instances

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
     <Image source={customMarkerImage} style={{ width: 62, height: 62 }} />
      <Callout>
        <View style={styles.calloutContainer}>
          <Text style={{ color: 'black', fontSize: 11 }}>{description}</Text>
        </View>
      </Callout>
    </Marker>
  );
};

const Mapscreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);

  const [driverLocation, setDriverLocation] = useState<{ [key: string]: DriverLocation }>({});
  const [driverInfo, setDriverInfo] = useState<{ [key: string]: DriverInfo }>({});

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
    const fetchDriverLocations = async () => {
      try {
        const driversSnapshot = await firestore2.collection('Drivers').get();

        const unsubscribeCallbacks = driversSnapshot.docs.map((driverDoc) => {
          return driverDoc.ref
            .collection('Trips')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot((tripsSnapshot) => {
              tripsSnapshot.forEach((tripDoc) => {
                const driverLocationData = tripDoc.data();
                const { latitude, longitude } = driverLocationData;
                const driverId = driverDoc.id;

                console.log(`Driver ${driverDoc.id} is at latitude ${latitude} and longitude ${longitude}`);

                setDriverLocation((prevState) => ({
                  ...prevState,
                  [driverId]: { latitude, longitude },
                }));

                setDriverInfo((prevState) => ({
                  ...prevState,
                  [driverId]: {
                    firstName: driverDoc.data().firstName,
                    lastName: driverDoc.data().lastName,
                    contactNumber: driverDoc.data().contactNumber,
                    busPlateNumber: driverDoc.data().busPlateNumber,
                    busId: driverDoc.data().busId,
                  },
                }));
              });
            });
        });

        return () => {
          unsubscribeCallbacks.forEach(unsubscribe => unsubscribe());
        };
      } catch (error) {
        console.error('Error fetching driver locations:', error);
      }
    };

    fetchDriverLocations();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 13.0397,
          longitude: 121.4788,
          latitudeDelta: 0.011,
          longitudeDelta: 0.011,
        }}
      >
        {Object.keys(driverLocation).map(driverId => (
          <CustomMarker
            key={driverId}
            coordinate={driverLocation[driverId] ? driverLocation[driverId] : { latitude: 0, longitude: 0 }}
            title="Driver Location"
            description={`Driver: ${driverInfo[driverId]?.firstName} ${driverInfo[driverId]?.lastName} 
            Contact: ${driverInfo[driverId]?.contactNumber}
            Plate Number: ${driverInfo[driverId]?.busPlateNumber}`}
          />
        ))}
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
    width: 100,
    height: 100,
    top: -10,
    left: -10,
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Mapscreen;
