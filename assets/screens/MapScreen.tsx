/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, BackHandler, Alert, TouchableOpacity } from 'react-native';
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
  const [selectedRoute, setSelectedRoute] = useState('');
  const [open, setOpen] = useState(false);
  const [pinLocation, setPinLocation] = useState<DriverLocation | null>(null);

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

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPinLocation({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      {/* Dropdown container */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          style={[styles.routeButton, open && styles.openDropdown]}
        >
          <Text style={styles.routeButtonText}>{selectedRoute || 'Select Route'}</Text>
        </TouchableOpacity>
        {open && (
          <View style={styles.dropdownMenu}>
            {['Pinamalayan - Calapan', 'Calapan - Pinamalayan'].map((route, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedRoute(route);
                  setOpen(false);
                }}
                style={styles.dropdownItem}
              >
                <Text>{route}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* MapView component */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 13.0397,
          longitude: 121.4788,
          latitudeDelta: 0.011,
          longitudeDelta: 0.011,
        }}
        onPress={handleMapPress}
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
        {pinLocation && (
          <Marker coordinate={pinLocation}>
            <Image source={require('../images/pin4.png')} style={{ width: 32, height: 32 }} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '3%',
    left: '10%',
    width: '80%',
    height: '10%',
    zIndex: 1,
  },
  routeButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  openDropdown: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  routeButtonText: {
    fontSize: 16,
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
