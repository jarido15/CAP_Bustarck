/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { firestore2 } from './firebase';

const ScheduleScreen = () => {
  const [trips, setTrips] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTripInfo = async () => {
    try {
      const driversSnapshot = await firestore2.collection('Drivers').get();
      const tripsData = [];

      for (const driverDoc of driversSnapshot.docs) {
        const tripsCollectionRef = driverDoc.ref.collection('Trip_Info');
        const querySnapshot = await tripsCollectionRef.orderBy('createdAt', 'desc').limit(1).get();

        querySnapshot.forEach(async (doc) => {
          console.log('Driver ID:', driverDoc.id); // Log driver document ID
          console.log('Fetched document:', doc.id, doc.data()); // Log fetched document
          const { AvailableSeats, AvailableTime, DateOfTrip, DepartureTime, Route } = doc.data();

          // Get busPlateNumber from the Driver collection
          const driverData = await driverDoc.ref.get();
          const busPlateNumber = driverData.data().busPlateNumber;

          tripsData.push({
            driverId: driverDoc.id, // Include driver ID in the trips data
            tripId: doc.id,
            busPlateNumber,
            AvailableSeats,
            AvailableTime,
            DateOfTrip,
            DepartureTime,
            Route,
          });
        });
      }

      console.log('Trips data:', tripsData); // Log fetched data
      setTrips(tripsData);
    } catch (error) {
      console.error('Error fetching trip information:', error.message); // Log error message
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTripInfo();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTripInfo();
  };

  return (
    <View style={styles.container}>
      {trips.length === 0 ? (
         <Text style={{color: 'black'}} style={{color: '#828282'}}>No trips available</Text>
      ) : (
        <FlatList
          data={trips}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.tripContainer}>
               <Text style={{color: 'black', fontWeight: 'bold'}}>Bus Plate Number:</Text> 
               <Text style={{color: 'black', top: '-10%', left:'35%'}}>{item.busPlateNumber}</Text>

               <Text style={{color: 'black', fontWeight: 'bold',}}>Available Seats:</Text>
               <Text style={{color: 'black', top: '-10%', left:'35%'}}> {item.AvailableSeats}</Text>

               <Text style={{color: 'black', fontWeight: 'bold'}}>Available Time:</Text>
                <Text style={{color: 'black', top: '-10%', left:'35%'}}>{item.AvailableTime}</Text>

              <Text style={{color: 'black', fontWeight: 'bold'}}>Date of Trip: </Text>
              <Text style={{color: 'black', top: '-10%', left:'35%'}}>{item.DateOfTrip}</Text>

              <Text style={{color: 'black', fontWeight: 'bold'}}>Departure Time:</Text> 
                <Text style={{color: 'black', top: '-10%', left:'35%'}}>{item.DepartureTime}</Text>

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
    paddingBottom: 20,
  },
  tripContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    width: 360,
    height: 190,
  },
});

export default ScheduleScreen;
