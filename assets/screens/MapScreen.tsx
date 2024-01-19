import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
  Alert
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Icon, RadioButton} from 'react-native-paper';
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const {width, height} = Dimensions.get('window');

const Mapscreen = () => {

  const navigation = useNavigation;
  const [state, setState] = useState({
    pickupCords: {
      latitude: 13.0397,
      longitude: 121.4788,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    droplocationCords: {
      latitude: 13.377094,
      longitude: 121.164571,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    pinnedLocation: null,
  });

  const mapRef = useRef();
  const {pickupCords, droplocationCords, pinnedLocation} = state;

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionName, setSelectedOptionName] = useState(
    'Select Your Destination',
  );

  const [currentRegion, setCurrentRegion] = useState({
    latitude: pickupCords.latitude,
    longitude: pickupCords.longitude,
    latitudeDelta: pickupCords.latitudeDelta,
    longitudeDelta: pickupCords.longitudeDelta,
  });

  const setTargetCoordinatesAndName = selectedOption => {
    switch (selectedOption) {
      case 'Option 1':
        return {coordinates: pickupCords, name: 'Calapan - Pinamalayan'};
      case 'Option 2':
        return {coordinates: droplocationCords, name: 'Pinamalayan - Calapan'};
      default:
        return {coordinates: pickupCords, name: 'Select Your Destination'};
    }
  };

  const handleOptionChange = itemValue => {
    const {coordinates, name} = setTargetCoordinatesAndName(itemValue);
    setSelectedOption(itemValue);
    setSelectedOptionName(name);
    setCurrentRegion(coordinates);
    mapRef.current.animateToRegion(coordinates, 1000);
  };

  const zoomIn = () => {
    const newRegion = {
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta / 2,
      longitudeDelta: currentRegion.longitudeDelta / 2,
    };
    setCurrentRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  const zoomOut = () => {
    const newRegion = {
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta * 2,
      longitudeDelta: currentRegion.longitudeDelta * 2,
    };
    setCurrentRegion(newRegion);
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  const handlePinLocation = event => {
    const {coordinate} = event.nativeEvent;
    setState(prevState => ({
      ...prevState,
      pinnedLocation: {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      },
    }));
  };
  //for exit
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Exit',
              onPress: () => {
                // Reset any necessary states or perform cleanup actions here
                //navigation.navigate('MapScree'); // Navigate back to the initial screen
                // Reset state variables, perform cleanup, or reset context here
            
                BackHandler.exitApp(); // Exit the app if needed
              },
            },
          ],
          {cancelable: false},
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: pickupCords.latitude,
          longitude: pickupCords.longitude,
          latitudeDelta: pickupCords.latitudeDelta,
          longitudeDelta: pickupCords.longitudeDelta,
        }}
        onPress={handlePinLocation}>
        {pinnedLocation && (
          <Marker
            coordinate={pinnedLocation}
            title="Pinned Location"
            description="Your pinned location"
            pinColor="blue">
            {}
            <Image
              source={require('../images/drop.png')} // Replace with your custom image path
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 40, height: 40}}
            />
          </Marker>
        )}
        {}
      </MapView>

      {/* Zoom In button */}
      <TouchableOpacity style={styles.zoomInButton} onPress={zoomIn}>
        <Image
          source={require('../images/zoom-in.png')}
          style={styles.zoomIcon}
        />
      </TouchableOpacity>

      {/* Zoom Out button */}
      <TouchableOpacity style={styles.zoomOutButton} onPress={zoomOut}>
        <Image
          source={require('../images/zoom-out.png')}
          style={styles.zoomIcon}
        />
      </TouchableOpacity>

      {/* Dropdown button and menu */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={styles.selectOption}>{selectedOptionName}</Text>
        <Icon
          name={showDropdown ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {/* Pin Location button */}
      <TouchableOpacity
        style={styles.pinLocationButton}
        onPress={() =>
          setState(prevState => ({...prevState, pinnedLocation: null}))
        }>
        <Image
          source={require('../images/pinmap.png')}
          style={styles.pinIcon}
        />
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdownMenu}>
          <RadioButton.Group
            onValueChange={handleOptionChange}
            value={selectedOption}>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="Option 1" />
              <Text style={styles.optionText}>Calapan - Pinamalayan</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton value="Option 2" />
              <Text style={styles.optionText}>Pinamalayan - Calapan</Text>
            </View>
          </RadioButton.Group>
        </View>
      )}
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
  zoomInButton: {
    position: 'absolute',
    bottom: height * 0.15,
    right: width * 0.05,
    borderRadius: width * 0.1,
  },
  zoomOutButton: {
    position: 'absolute',
    bottom: height * 0.1,
    right: width * 0.05,
    borderRadius: width * 0.1,
  },
  zoomIcon: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: '#fff',
    borderRadius: width * 0.02,
  },
  dropdownButton: {
    position: 'absolute',
    top: height * 0.025,
    left: width * 0.083,
    backgroundColor: 'white',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.25,
    borderRadius: width * 0.1,
    zIndex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    top: height * 0.075,
    left: width * 0.083,
    backgroundColor: 'white',
    paddingVertical: height * 0.001,
    paddingHorizontal: width * 0.2,
    borderRadius: width * 0.05,
    zIndex: 1,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: width * 0.025,
    color: 'black',
    fontSize: width * 0.04,
  },
  selectOption: {
    right: width * 0.01,
    color: 'black',
    fontSize: width * 0.04,
  },
  pinLocationButton: {
    position: 'absolute',
    bottom: height * 0.85,
    right: width * 0.05,
    borderRadius: width * 0.02,
    backgroundColor: '#fff',
  },
  pinIcon: {
    width: width * 0.1,
    height: width * 0.1,
  },
});

export default Mapscreen;
