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
                 <Text style={styles.textStyle}>Allow Location Access Guide</Text>
              </View>
          </TouchableOpacity>
          {/* Add more content here */}
        </View>

        <View style={styles.container}>
        <Image source={require('../images/bus-stop.png')} style={styles.bus}/>
        <TouchableOpacity onPress={() => setBusTripModalVisible(true)}>
          <View style={styles.containerWithShadow2}>
            <Text style={{color: '#42047e', fontSize: 20, fontWeight: '900', textAlign: 'center'}}> Bus Trip Schedules Guide</Text>
          </View>
        </TouchableOpacity>
        </View>

        {/* Add more containers here */}
        <View style={styles.container}>
          <Image source={require('../images/route.png')} style={styles.route}/>
          <TouchableOpacity onPress={() => setselectRouteModalVisible(true)}>
          <View style={styles.containerWithShadow3}>
          <Text style={{color: '#42047e', fontSize: 20, fontWeight: '900', top: '-2%', left: '-1%'}}>Select Route Guide</Text>
          </View>
        </TouchableOpacity>
          {/* Add content for container 2 */}
        </View>

        <View style={styles.container}>
          <Image source={require('../../assets/images/share-location.png')} style={styles.share}/>
          <TouchableOpacity onPress={() => setsharelocationModalVisible(true)}>
          <View style={styles.containerWithShadow4}>
          <Text style={{color: '#42047e', fontSize: 20, fontWeight: '900', top: '-2%', left: '-1%'}}>Share Location Guide</Text>
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
              <Text style={styles.modalText}>Bus trip schedules</Text>
              <ScrollView style={{ flex: 1, marginBottom: '-35%' }}>
  <Text style={{ color: 'black', fontSize: 17, top: '3%', fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Locate the Bottom Navigation Menu: Look for the navigation menu at the bottom of your screen. It typically contains icons or text labels representing different sections or features of the application.
  </Text>
  <Text style={{ color: 'black', top: '5%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Identify the "Bus Schedules" Option: Scan through the icons or text labels on the bottom navigation menu to find the option labeled "Bus Schedules". This option may be represented by an icon resembling a bus or by the text "Bus Schedules".
  </Text>
  <Text style={{ color: 'black', top: '7%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start' , textAlign: 'justify'}}>
    • Tap or Click on "Bus Schedules": Once you've located the "Bus Schedules" option, tap or click on it to initiate the process of loading the schedules. 
  </Text>
  <Text style={{ color: 'black', top: '9%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Monitor the Loading Progress: While the schedules are loading, you may see visual indicators such as loading spinners or progress bars to signify that the data is being fetched.
  </Text>
  <Text style={{ color: 'black', top: '11%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Review the Loaded Schedules: Once all the bus schedules have been successfully loaded, the application will display them on the screen. You can now review the schedules for different routes, departure times, and other relevant details.
  </Text>
</ScrollView>

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
              <Text style={styles.modalText}>Select route</Text>
              <ScrollView style={{ flex: 1, marginBottom: '-35%' }}>
  <Text style={{ color: 'black', fontSize: 17, top: '3%', fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Locate the "Select Route" Bar: The "Select Route" bar is typically a user interface element within the application or platform you're using to track buses. It may be located at the topof the screen.
  </Text>
  <Text style={{ color: 'black', top: '5%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Click on the "Select Route" Bar: click on the "Select Route" bar to activate it. This action typically opens a dropdown menu or presents a list of available bus routes for selection.
  </Text>
  <Text style={{ color: 'black', top: '7%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start' , textAlign: 'justify'}}>
    • Choose Your Route: After clicking on the "Select Route" bar, a dropdown menu or list will appear containing the available bus routes.
  </Text>
  <Text style={{ color: 'black', top: '9%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    •Click on Your Route: Once you've found your route in the dropdown menu or list, click on it to select it. This action indicates to the application that you're interested in tracking buses operating along that specific route.
  </Text>
  <Text style={{ color: 'black', top: '11%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Wait for the Bus to Show on the Map: After selecting your route, the application will initiate the process of displaying the bus or buses servicing that route on the map.
  </Text>
  <Text style={{ color: 'black', top: '7%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Monitor the Map: Keep an eye on the map displayed within the application interface. As the buses start to appear on the map, you'll be able to track their movements and monitor their progress along the selected route.
  </Text>
  <Text style={{ color: 'black', top: '3%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Interact with the Map: Depending on the application's functionality, you may be able to interact with the map to zoom in or out, pan across different areas, and view additional details such as bus stop locations, traffic conditions, or estimated arrival times.
  </Text>
  <Text style={{ color: 'black', top: '-1%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    •Track Your Bus: Once the bus or buses serving your selected route are displayed on the map, you can track their movements in real-time and plan your journey accordingly based on their current locations and estimated arrival times.
  </Text>
</ScrollView>
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
              <Text style={styles.modalText}>Share Location</Text>
              <ScrollView style={{ flex: 1, marginBottom: '-35%' }}>
  <Text style={{ color: 'black', fontSize: 17, top: '3%', fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    •Locate the "Share Location" Button: The "Share Location" button is typically a feature within the map interface of the application or platform you're using for bus tracking and scheduling. It may be located at the bottom or top of the map view, depending on the application's design.
  </Text>
  <Text style={{ color: 'black', top: '5%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Identify the "Share Location" Button: Once you've scrolled to the bottom of the map, look for the "Share Location" button. It may be represented by an icon such as a location pin or a share symbol.
  </Text>
  <Text style={{ color: 'black', top: '7%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start' , textAlign: 'justify'}}>
    • Click on the "Share Location" Button: Using your mouse cursor or touchscreen, click on the "Share Location" button to activate the sharing feature. This action typically prompts the application to start sharing your current location with other users or drivers.
  </Text>
  <Text style={{ color: 'black', top: '9%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', textAlign: 'justify' }}>
    • Board the Bus: After clicking on the "Share Location" button, proceed to board the bus. Once you're on board, ensure that you're comfortably seated and ready for your journey.
  </Text>
  <Text style={{ color: 'black', top: '11%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Turn Off Share Location: Once you've boarded the bus and are ready to depart, it's essential to turn off your share location to avoid affecting other drivers unnecessarily. Locate the "Share Location" button again, either at the bottom of the map or wherever it was initially located.
  </Text>
  <Text style={{ color: 'black', top: '7%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Click to Turn Off Sharing: Click on the "Share Location" button once more to deactivate the sharing feature. This action will stop sharing your current location with other users or drivers on the platform.
  </Text>
  <Text style={{ color: 'black', top: '3%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Confirm Deactivation: Some applications may prompt you to confirm that you want to stop sharing your location. If prompted, confirm your decision to turn off share location.
  </Text>
  <Text style={{ color: 'black', top: '-1%', fontSize: 17, fontWeight: '800', justifyContent: 'flex-start', marginBottom: '25%', textAlign: 'justify'}}>
    • Continue Your Journey: With the share location feature turned off, you can now relax and enjoy your journey on the bus without impacting other drivers' navigation or experiences.
  </Text>
</ScrollView>
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
