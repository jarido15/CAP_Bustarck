/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Button, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GuideScreen = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [busTripModalVisible, setBusTripModalVisible] = useState(false); // New state for Bus Trip Info modal
  const [selectRouteModalVisible, setselectRouteModalVisible] = useState(false); // New state for Bus Trip Info modal
  const [sharelocationModalVisible, setsharelocationModalVisible] = useState(false); 

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/gps.png')} style={styles.gps} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.containerWithShadow1}>
                 <Text style={styles.textStyle}>Allow Location Access</Text>
              </View>
          </TouchableOpacity>
          {/* Add more content here */}
        </View>

        <View style={styles.container}>
        <Image source={require('../images/bus-stop.png')} style={styles.bus}/>
        <TouchableOpacity onPress={() => setBusTripModalVisible(true)}>
          <View style={styles.containerWithShadow2}>
            <Text style={{color: '#42047e', fontSize: 20, fontWeight: '900', textAlign: 'center'}}> Bus Trips</Text>
          </View>
        </TouchableOpacity>
        </View>

        {/* Add more containers here */}
        <View style={styles.container}>
          <Image source={require('../images/route.png')} style={styles.route}/>
          <TouchableOpacity onPress={() => setselectRouteModalVisible(true)}>
          <View style={styles.containerWithShadow3}>
          <Text style={{color: '#42047e', fontSize: 20, fontWeight: '900', top: '-2%', left: '-1%'}}>Select Route</Text>
          </View>
        </TouchableOpacity>
          {/* Add content for container 2 */}
        </View>

        <View style={styles.container}>
          <Image source={require('../../assets/images/share-location.png')} style={styles.share}/>
          <TouchableOpacity onPress={() => setselectRouteModalVisible(true)}>
          <View style={styles.containerWithShadow4}>
          <Text style={{color: '#42047e', fontSize: 20, fontWeight: '900', top: '-2%', left: '-1%'}}>Share Location</Text>
          </View>
        </TouchableOpacity>
          {/* Add content for container 3 */}
        </View>
        {/* Add extra content to extend the scroll */}
        <View style={{ height: 500 }} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}> Allow Location Access </Text>
              <ScrollView style={{ flex: 1, marginBottom: '-35%' }}>
  <Text style={{ color: 'black', fontSize: 17, top: '3%', fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Open Settings: Find and tap the "Settings" app on your Android device. It usually looks like a gear icon.
  </Text>
  <Text style={{ color: 'black', top: '5%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Locate Privacy Settings: Scroll down and look for the "Privacy" or "Security & Privacy" option. Tap on it to access privacy settings.
  </Text>
  <Text style={{ color: 'black', top: '7%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start' , textAlign: 'justify'}}>
    • Find Location Access: Within the Privacy settings, locate and tap on the "Location" option. It may be listed under "Permissions" or "Permission Manager."
  </Text>
  <Text style={{ color: 'black', top: '9%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Enable Location Access: You'll see different options for location access, such as "Allow all the time," "Allow only while using the app," or "Deny." Choose the option that best fits your needs. To enable location access for all apps, select "Allow all the time" or "Allow only while using the app" for specific apps.
  </Text>
  <Text style={{ color: 'black', top: '11%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Done: You've successfully allowed location access on your Android device. Apps that require location information will now be able to access it according to your selected permission settings.
  </Text>
</ScrollView>

              <TouchableOpacity   onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.modalbutton}>
                <Text style={styles.gotit}>Got It</Text>
                </View>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={busTripModalVisible}
          onRequestClose={() => {
            setBusTripModalVisible(!busTripModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}> • Bus Trips</Text>
              <TouchableOpacity onPress={() => setBusTripModalVisible(!busTripModalVisible)}>
                <View style={styles.modalbutton}>
                  <Text style={styles.gotit}>Got It</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={selectRouteModalVisible}
          onRequestClose={() => {
            setselectRouteModalVisible(!selectRouteModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}> • Select Route</Text>
              <TouchableOpacity onPress={() => setselectRouteModalVisible(!selectRouteModalVisible)}>
                <View style={styles.modalbutton}>
                  <Text style={styles.gotit}>Got It</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={sharelocationModalVisible}
          onRequestClose={() => {
            setsharelocationModalVisible(!sharelocationModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}> • Share Location</Text>
              <TouchableOpacity onPress={() => setsharelocationModalVisible(!sharelocationModalVisible)}>
                <View style={styles.modalbutton}>
                  <Text style={styles.gotit}>Got It</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  gotit:{
    left: '37%',
    top: '10%',
    fontSize: 20,
    fontWeight: '900',
    color:'#Fff'
  },
  modalbutton:{
    backgroundColor: '#42047e',
    width: 180,
    height: '25%',
    borderRadius: 20,
    top: '80%'
  },
  containerWithShadow1: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    top: '250%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#42047e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerWithShadow2: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    top: '250%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#42047e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerWithShadow3: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    top: '250%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#42047e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  containerWithShadow4: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    top: '250%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#42047e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: '#42047e',
    fontSize: 20,
    fontWeight: '900',
  },
  bus:{
    width: '35%',
    height: '75%',
    left: '40%',
    top: '5%',
    position: 'absolute',
  },
share: {
  width: '35%',
    height: '75%',
    left: '40%',
    top: '5%',
    position: 'absolute',
},
  route: {
    width: '35%',
    height: '79%',
    left: '40%',
    top: '5%',
    position: 'absolute',

  },
  gps: {
    width: '35%',
    height: '79%',
    left: '40%',
    top: '5%',
    position: 'absolute',

  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Set background color for safe area
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: '1%', // Adjust paddingBottom to accommodate the extra content at the end
  },
  container: {
    backgroundColor: '#fff', // Set background color for container
    margin: 15, // Add margin for spacing
    borderRadius: 10, // Add border radius for rounded corners
    shadowColor: '#000', // Set shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25, // Set shadow opacity
    shadowRadius: 3.84, // Set shadow radius
    elevation: 5, // Set elevation for Android
    padding: 20, // Add padding for inner content
    height: '20%', // Set initial height for container
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#42047e',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '80%',
    width: '80%',
  },
  modalText: {
    // marginBottom: '210%',
    left: '-22%',
    color: '#646464',
    fontWeight: '900',
    fontSize: 17,
  },
  buttonStyle: {
    backgroundColor: 'blue', // Change the color to whatever you like
    borderRadius: 10,
    padding: 10,
    elevation: 2
  }
});
