/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartingScreen from './assets/screens/WelcomeScreen';
import SplashScreen from 'react-native-splash-screen';
import MapScreen from './assets/screens/MapScreen';
import GuideScreen from './assets/screens/GuideScreen';
import ScheduleScreen from './assets/screens/ScheduleScreen'; // Import the ScheduleScreen component
import { View, Image, Text, TouchableOpacity, StatusBar } from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MapStack() {
  return (
    <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#42047e" barStyle="light-content" />
        <StatusBar backgroundColor="#42047e" barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            backgroundColor: '#fff',
            height: 60,
          },
        }}>
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 5,
                }}>
                <Image
                  source={require('./assets/images/MapMarker.png')}
                  resizeMode="contain"
                  style={{
                    top: -0.1,
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#42047e' : '#748c94',
                  }}
                />
                <Text
                  style={{ color: focused ? '#42047e' : '#748c94', fontSize: 10,  justifyContent: 'center' }}>
                  Map
                </Text>
              </View>
            ),
          }}
        />
  <Tab.Screen
  name="Bus Schedule"
  component={ScheduleScreen}
  options={({ navigation }) => ({
    tabBarLabel: '',
    headerShown: true,
    headerTitleAlign: 'center',
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          top: 5,
        }}>
        <Image
          source={require('./assets/images/time.png')}
          resizeMode="contain"
          style={{
            top: -0.1,
            width: 34,
            height: 34,
            tintColor: focused ? '#42047e' : '#748c94',
          }}
        />
        <Text
          style={{ color: focused ? '#42047e' : '#748c94', fontSize: 10, justifyContent: 'center' }}>
          Bus Schedule
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#42047e',
      elevation: 15,
      shadowOpacity: 0.9,
      shadowColor: '#000',
      shadowRadius: 15,
      shadowOffset: {
        width: 0,
        height: 4,
      },
    },
    headerTintColor: '#fff',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        style={{ marginLeft: 10 }}>
        <Image source={require('./assets/images/icons8-back-50.png')} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    ),
  })}
/>
<Tab.Screen
  name=" User Guide"
  component={GuideScreen}
  options={({ navigation }) => ({
    tabBarLabel: '',
    headerShown: true,
    headerTitleAlign: 'center',
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          top: 10,
        }}>
        <Image
          source={require('./assets/images/questions.png')}
          resizeMode="contain"
          style={{
            top: -4,
            width: 25,
            height: 25,
            tintColor: focused ? '#42047e' : '#748c94',
          }}
        />
        <Text
          style={{ color: focused ? '#42047e' : '#748c94', fontSize: 10,  justifyContent: 'center' }}>
          User Guide
        </Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#42047e',
      elevation: 15,
      shadowOpacity: 0.9,
      shadowColor: '#000',
      shadowRadius: 15,
      shadowOffset: {
        width: 0,
        height: 4,
      },
    },
    headerTintColor: '#fff',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Bus Schedule')}
        style={{ marginLeft: 10 }}>
        <Image source={require('./assets/images/icons8-back-50.png')} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    ),
  })}
/>

      </Tab.Navigator>
    </View>
  );
}

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
          <StatusBar backgroundColor="#42047e" barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="StartingScreen">
        <Stack.Screen name="StartingScreen" component={StartingScreen} />
        <Stack.Screen
          name="MapScreen"
          component={MapStack}
          options={{
            headerShown: false,

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
