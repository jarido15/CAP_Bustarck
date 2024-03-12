/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firestore2 } from './firebase';

const ScheduleScreen = () => {
  const [trips, setTrips] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchTripInfo();
  }, []); // Fetch trip info when the component mounts

  const fetchTripInfo = async () => {
    try {
      const driversSnapshot = await firestore2.collection('Drivers').where('archive', '==', false).where('Status', '==', 'active').get();
      const tripsData = [];
  
      for (const driverDoc of driversSnapshot.docs) {
        const driverData = driverDoc.data(); // Get driver data including Route
        const tripsCollectionRef = driverDoc.ref.collection('Trip_Info');
        const querySnapshot = await tripsCollectionRef.orderBy('createdAt', 'desc').limit(1).get();
  
        querySnapshot.forEach(doc => {
          const tripData = doc.data();
          tripsData.push({
            busPlateNumber: driverData.busPlateNumber,
            Route: driverData.Route,
            firstName: driverData.firstName,
            lastName: driverData.lastName,
            ...tripData
          });
        });
      }
  
      setTrips(tripsData);
    } catch (error) {
      console.error('Error fetching trip information:', error.message);
    } finally {
      setIsRefreshing(false);
    }
  };
  

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTripInfo();
  };

  return (
    <View style={styles.container}>
      {trips.length === 0 ? (
         <Text  style={{color: '#727272'}}>No trips available</Text>
      ) : (
        <FlatList
          data={trips}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.tripContainer}>
               <Text style={{ color: '#42047e', fontWeight: 'bold' }}>Driver:</Text>
               <Text style={{color: 'black', top: '-7%', left:'40%'}}>{item.firstName} {item.lastName}</Text>

               <Text style={{color: '#42047e', fontWeight: 'bold'}}>Bus Plate Number:</Text> 
               <Text style={{color: 'black', top: '-7%', left:'40%'}}>{item.busPlateNumber}</Text>

               <Text style={{color: '#42047e', fontWeight: 'bold'}}>Available Seats:</Text>
               <Text style={{color: 'black', top: '-7%', left:'40%'}}> {item.AvailableSeats}</Text>

               <Text style={{color: '#42047e', fontWeight: 'bold'}}>Date of Trip: </Text>
               <Text style={{color: 'black', top: '-7%', left:'40%'}}>{item.DateOfTrip}</Text>

               <Text style={{color: '#42047e', fontWeight: 'bold'}}>Available Time:</Text>
               <Text style={{color: 'black', top: '-7%', left:'40%'}}>{item.AvailableTime}</Text>

               <Text style={{color: '#42047e', fontWeight: 'bold'}}>Departure Time:</Text> 
               <Text style={{color: 'black', top: '-7%', left:'40%'}}>{item.DepartureTime}</Text>

               <Text style={{ color: '#42047e', fontWeight: 'bold' }}>Route:</Text>
               <Text style={{color: 'black', top: '-7%', left:'40%'}}>{item.Route}</Text>

              {/* Render other trip details as needed */}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          onEndReachedThreshold={0.1}
        />
      )}
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
    paddingBottom: 25,
  },
  tripContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    width: 360,
    height: 'auto',
    elevation: 2, // Add elevation for shadow effect
  },
});

export default ScheduleScreen;
