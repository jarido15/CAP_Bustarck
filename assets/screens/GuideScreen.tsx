/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity, Button, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GuideScreen = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/gps.png')} style={styles.gps} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.containerWithShadow1}>
                 <Text style={styles.textStyle}>Allow Location</Text>
              </View>
          </TouchableOpacity>
          {/* Add more content here */}
        </View>

        <View style={styles.container}>
          <Image source={require('../images/bus-station.png')} style={styles.bus}/>
          <Text style={{color: '#42047e', fontSize: 25, fontWeight: '900', top: '80%', left: '30%'}}> Bus Trip Info</Text>
          {/* Add content for container 2 */}
        </View>

        {/* Add more containers here */}
        <View style={styles.container}>
          <Image source={require('../images/route.png')} style={styles.route}/>
          <Text style={{color: '#42047e', fontSize: 25, fontWeight: '900', top: '80%', left: '30%'}}>Select Route</Text>
          {/* Add content for container 2 */}
        </View>

        <View style={styles.container}>
          <Image source={require('../../assets/images/share-location.png')} style={styles.share}/>
          <Text style={{color: '#42047e', fontSize: 25, fontWeight: '900', top: '80%', left: '25%'}}>Share Location</Text>
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
              <Text style={styles.modalText}>Allow Location</Text>
              <Button
                title="Got It"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  containerWithShadow1: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    top: '590%',
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
    width: '70%',
    height: '65%',
    left: '22%',
    top: '5%',
    position: 'absolute',
  },
share: {
  width: '70%',
    height: '65%',
    left: '22%',
    top: '5%',
    position: 'absolute',
},
  route: {
    width: '71%',
    height: '69%',
    left: '22%',
    top: '5%',
    position: 'absolute',

  },
  gps: {
    width: '70%',
    height: '69%',
    left: '22%',
    top: '5%',
    position: 'absolute',

  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Set background color for safe area
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: '190%', // Adjust paddingBottom to accommodate the extra content at the end
  },
  container: {
    backgroundColor: '#fff', // Set background color for container
    margin: 20, // Add margin for spacing
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
    height: '40%', // Set initial height for container
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
    marginBottom: '200%',
    textAlign: 'center',
    color: '#42047e',
    fontWeight: '900',
    fontSize: 25,
  },
  buttonStyle: {
    backgroundColor: 'blue', // Change the color to whatever you like
    borderRadius: 10,
    padding: 10,
    elevation: 2
  }
});
