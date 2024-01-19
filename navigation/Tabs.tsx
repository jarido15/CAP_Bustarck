import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScheduleScreen from '../assets/screens/ScheduleScreen';
import GuideScreen from '../assets/screens/GuideScreen';
import Mapscreen from '../assets/screens/MapScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mapscreen" component={Mapscreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Guide" component={GuideScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;
