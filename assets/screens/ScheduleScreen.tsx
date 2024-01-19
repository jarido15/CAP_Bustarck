import React from 'react';
import {Text, StyleSheet, StatusBar, View, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScheduleScreen = ({}) => {
  return ( 
    <View style={StyleSheet.container}>
      <Text> Schedule Screen</Text>
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8fcbbc',
  },
});
