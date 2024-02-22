/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
 /* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, BackHandler, Alert, TouchableOpacity, Modal, PanResponder, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { firestore3, auth3, firestore2 } from '../screens/firebase';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');
const customMarkerImage = require('../images/busstop.png');

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
  const [userLocation, setUserLocation] = useState<DriverLocation | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

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
    const unsubscribe = auth3.signInAnonymously()
      .then(() => {
        console.log('Anonymous login successful');
      })
      .catch(error => {
        console.error('Error signing in anonymously:', error);
      });

    return () => unsubscribe;
  }, []);

  useEffect(() => {
    // Fetch the user's current location using Geolocation
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        // Update userLocation with the fetched location
        setUserLocation({ latitude, longitude });
        console.log('User Location:', { latitude, longitude });
      },
      error => {
        console.error('Error getting user location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const saveUserLocationToFirestore = (latitude, longitude) => {
    firestore3.collection('UserLocations').add({
      userId: auth3.currentUser.uid,
      status: "active",
      latitude,
      longitude,
      timestamp: new Date()
    })
    .then(() => {
      console.log('User location saved to Firestore');
    })
    .catch(error => {
      console.error('Error saving user location to Firestore:', error);
    });
  };

  useEffect(() => {
    // Only fetch driver locations if a route is selected
    if (selectedRoute) {
        // Clear existing driver locations and information
        setDriverLocation({});
        setDriverInfo({});


        const query = firestore2.collection('Drivers').where('Route', '==', selectedRoute);

            query.get().then(snapshot => {
              if (!snapshot.empty) {
                const unsubscribe = query.onSnapshot(snapshot => {
                const driverLocations = {}; // Temporary object to hold driver locations
                const driverInfos = {}; // Temporary object to hold driver information

                snapshot.forEach(driverDoc => {
                    const driverData = driverDoc.data();
                    const driverId = driverDoc.id;

                    console.log('Driver in selected route:', driverId);

                    // Retrieve the latest trip information for the driver
                    driverDoc.ref.collection('Trips')
                        .orderBy('timestamp', 'desc')
                        .limit(1)
                        .onSnapshot(tripsSnapshot => {
                            tripsSnapshot.forEach(tripDoc => {
                                const driverLocationData = tripDoc.data();
                                const { latitude, longitude } = driverLocationData;

                                // Check if the driver's route matches the selected route
                                if (driverData.Route === selectedRoute) {
                                    // Update driver location and info only if the route matches
                                    driverLocations[driverId] = { latitude, longitude };
                                    driverInfos[driverId] = {
                                        firstName: driverData.firstName,
                                        lastName: driverData.lastName,
                                        contactNumber: driverData.contactNumber,
                                        busPlateNumber: driverData.busPlateNumber,
                                        busId: driverData.busId,
                                    };
                                }
                            });

                            // Update state with the latest driver locations and info
                            setDriverLocation({ ...driverLocations });
                            setDriverInfo({ ...driverInfos });
                        });
                });
              });
              return () => {
                // Unsubscribe from the listener when component unmounts
                unsubscribe();
            };
              }

            }, error => {
                console.error('Error fetching drivers:', error);
            });


    } else {
        // Clear existing driver locations if no route is selected
        setDriverLocation({});
        setDriverInfo({});
    }
}, [selectedRoute]);



  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setPinLocation({ latitude, longitude });
  };

  const handleShareLocation = () => {
    // Proceed to share location only when the Share button is clicked
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        saveUserLocationToFirestore(latitude, longitude);
      },
      error => {
        console.error('Error getting user location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    // Set modalVisible to true to show the modal
    setModalVisible(true);
  };

  const deleteUserLocations = () => {
    // Get the reference to the UserLocations collection
    const userLocationsRef = firestore3.collection('UserLocations');
  
    // Query the UserLocations collection for documents owned by the current user
    userLocationsRef.where('userId', '==', auth3.currentUser.uid).get()
      .then(querySnapshot => {
        // Update the status of each document found in the query to 'inactive'
        const updatePromises: any[] = [];
        querySnapshot.forEach(doc => {
          updatePromises.push(doc.ref.update({ status: 'inactive' }));
        });
        // Wait for all updates to complete
        return Promise.all(updatePromises);
      })
      .then(() => {
        console.log('User status updated successfully to inactive.');
        setUserLocation(null); // Reset userLocation state to null
        setModalVisible(false); // Close the modal after successful status update
      })
      .catch(error => {
        console.error('Error updating user status:', error);
        // Handle error if needed
      });
};

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        setModalPosition({ x: gestureState.dx, y: gestureState.dy });
      },
    })
  ).current;
  const handleSelectRoute = (Route) => {
    console.log('First Selected Route:', Route); // Add this line to log the selected route
    setSelectedRoute(Route);
    setOpen(false);
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
                onPress={() => handleSelectRoute(route)}
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
        {/* Display driver locations */}
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

        {/* Display user location marker if available */}
        {userLocation && (
  <Marker coordinate={userLocation}>
    <Image source={require('../images/user.png')} style={{ width: 50, height: 50 }} />
  </Marker>
)}


        {/* Display pin location marker if available */}
        {pinLocation && (
          <Marker coordinate={pinLocation}>
            <Image source={require('../images/pin4.png')} style={{ width: 32, height: 32 }} />
          </Marker>
        )}
      </MapView>

      {/* Button to share location */}
      <TouchableOpacity
        onPress={handleShareLocation}
        style={styles.shareLocationButton}
      >
        <View style={styles.shareLocationBox}>
          <Image source={require('../images/share.png')} style={styles.shareLocationImage} />
        </View>
      </TouchableOpacity>

      {/* Modal for sharing location */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(true); // Close the modal on Android back button press
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View
            style={[
              styles.modalContainer,
              { transform: [{ translateX: modalPosition.x }, { translateY: modalPosition.y }] },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={styles.modalContent}>
              <Text style={{fontWeight: 'bold', fontSize: 25, top: '-30%', color: 'black',}}>Note!</Text>
              <Image source={require('../images/Line.png')} style={{width: '100%', height: '0.5%', top: '-25%',}}/>
              <Text style={{fontWeight: '900', fontSize: 20, marginBottom: -25, marginTop: -25, color: 'black', justifyContent: 'space-between'}}> Please turn off your share location once you entered bus, Thank you!</Text>
              {/* Button to delete UserLocations data */}
              <TouchableOpacity
                onPress={() => {
                  deleteUserLocations();
                  setModalVisible(false);
                }}
                style={styles.offshare}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Turn Off Share Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    color: 'black',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  routeButtonText: {
    fontSize: 16,
    color: 'black',
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
  shareLocationButton: {
    position: 'absolute',
    bottom: '20%',
    right: '5%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  shareLocationBox: {
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  shareLocationImage: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '-28%',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    height: '30%',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offshare: {
    marginVertical: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 20,
    bottom: '-35%'
  },
});

export default Mapscreen;