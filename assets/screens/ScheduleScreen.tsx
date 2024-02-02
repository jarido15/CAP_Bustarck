import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firestore2 } from './firebase'; // Import the firestore2 instance

const ScheduleScreen = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        console.log('Fetching trips...');
        const tripsCollection = await firestore2.collection('Trips').get();
        console.log('Trips collection:', tripsCollection); // Log the collection object
        const tripsData = tripsCollection.docs.map(doc => doc.data());
        console.log('Trips data:', tripsData); // Log the fetched data
        setTrips(tripsData);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };
  
    fetchTrips();
  }, []);
  
  

  console.log('Component rendered, trips:', trips); // Log component rendering and trips state

  return (
    <View style={styles.container}>
      <Text>Schedule Screen</Text>
      {/* Render the fetched trips data here */}
      {trips.map((_trip, index) => (
        <Text key={index}>{/* Render trip details here */}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScheduleScreen;
