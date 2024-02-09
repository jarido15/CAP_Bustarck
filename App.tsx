/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StartingScreen from './assets/screens/WelcomeScreen';
import SplashScreen from 'react-native-splash-screen';
import DriverScreen from './assets/screens/DriverScreen';
import MapScreen from './assets/screens/MapScreen';
import GuideScreen from './assets/screens/GuideScreen';
import ScheduleScreen from './assets/screens/ScheduleScreen'; // Import the ScheduleScreen component
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome or any other available icon set

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MapStack() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: '#42047e',
            height: 50,
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
                  source={require('./assets/images/map.png')}
                  resizeMode="contain"
                  style={{
                    top: -0.1,
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#fff' : '#748c94',
                  }}
                />
                <Text
                  style={{ color: focused ? '#fff' : '#748c94', fontSize: 10 }}>
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
            tintColor: focused ? '#fff' : '#748c94',
          }}
        />
        <Text
          style={{ color: focused ? '#fff' : '#748c94', fontSize: 10 }}>
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
  name="Guide"
  component={GuideScreen}
  options={({ navigation }) => ({
    tabBarLabel: '',
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
            tintColor: focused ? '#fff' : '#748c94',
          }}
        />
        <Text
          style={{ color: focused ? '#fff' : '#748c94', fontSize: 10 }}>
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
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="StartingScreen">
        <Stack.Screen name="StartingScreen" component={StartingScreen} />
        <Stack.Screen name="DriverScreen" component={DriverScreen} />
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
