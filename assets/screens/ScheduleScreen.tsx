/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firestore2 } from './firebase'; // Import the firestore2 instance

const ScheduleScreen = () => {
  const [trips, setTrips] = useState([]);
  const [busId, setBusId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTripsAndBusId = async () => {
    setIsRefreshing(true); // Set refreshing state to true

    try {
      console.log('Fetching trips and bus ID...');
      // Access the document under 'Drivers' collection directly
      const driverDocRef = firestore2.collection('Drivers').doc('kng9UgjhRESsT4nYtOAT5ResbPJ2');

      // Get the document snapshot
      const driverDocSnapshot = await driverDocRef.get();

      // Check if the document exists
      if (driverDocSnapshot.exists) {
        const driverData = driverDocSnapshot.data();
        console.log('Driver data:', driverData);

        // Retrieve the busId field from the document data
        const busIdFromFirestore = driverData.busId;
        setBusId(busIdFromFirestore);
      } else {
        console.log('Driver document does not exist.');
      }

      // Access the 'Trip_Info' subcollection and fetch trips
      const tripsCollectionRef = driverDocRef.collection('Trip_Info');
      const tripsSnapshot = await tripsCollectionRef.get();

      if (!tripsSnapshot.empty) {
        const tripsData = [];
        tripsSnapshot.forEach(doc => {
          tripsData.push({ id: doc.id, ...doc.data() });
        });
        console.log('Trips data:', tripsData);
        setTrips(tripsData);
      } else {
        console.log('No trips found in the trips subcollection.');
      }
    } catch (error) {
      console.error('Error fetching trips and bus ID:', error);
    } finally {
      setIsRefreshing(false); // Set refreshing state to false
    }
  };

  useEffect(() => {
    fetchTripsAndBusId();
  }, []);

  const handleRefresh = () => {
    fetchTripsAndBusId();
  };

  const handleEndReached = () => {
    // When the end of the list is reached, trigger a refresh
    fetchTripsAndBusId();
  };

  console.log('Component rendered, trips:', trips); // Log component rendering and trips state

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.tripContainer}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Trip {index + 1}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Date Of Trip: {item.DateOfTrip}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Available Time: {item.AvailableTime}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Departure Time: {item.DepartureTime}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Available Seats: {item.AvailableSeats}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Route: {item.Route}</Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>Bus ID: {busId}</Text>
          </View>
        )}
        keyExtractor={(_item, index) => index.toString()}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  tripContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    width: '100%',
  },
});

export default ScheduleScreen;
