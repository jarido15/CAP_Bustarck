/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StartingScreen from './assets/screens/WelcomeScreen';
import SplashScreen from 'react-native-splash-screen';
import DriverScreen from './assets/screens/DriverScreen';
import MapScreen from './assets/screens/MapScreen';
import GuideScreen from './assets/screens/GuideScreen';
import {Color, Border, FontFamily, FontSize} from '../screens/GlobalStyles';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MapStack() {
  const bottomSheetRef = React.useRef(null);

  return (
    <View style={{flex: 1}}>
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
            tabBarIcon: ({focused}) => (
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
                  style={{color: focused ? '#fff' : '#748c94', fontSize: 10}}>
                  Map
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Schedule"
          component={ScreenWithoutComponent}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 5,
                }}
                onPress={() => bottomSheetRef.current.open()}>
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
                  style={{color: focused ? '#fff' : '#748c94', fontSize: 10}}>
                  Bus Schedule
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Guide"
          component={GuideScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({focused}) => (
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
                  style={{color: focused ? '#fff' : '#748c94', fontSize: 10}}>
                  User Guide
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        height={500} // Set height to fill the screen
        duration={250}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        }}
        useNativeDriver={true} // Add useNativeDriver prop
      >
        <View style={{backgroundColor: '#fff', padding: 16}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Jost-SemiBold',
              textAlign: 'center',
              color: 'black',
            }}>
            Bus Schedules
          </Text>
          {/* Add your components and functionality for the Schedule bottom sheet */}
        </View>
      </BottomSheet>
    </View>
  );
}

// ScreenWithoutComponent is a dummy component to satisfy the Tab.Screen requirement of having a component prop
const ScreenWithoutComponent = () => null;

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
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
