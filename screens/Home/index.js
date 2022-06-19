import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotificationScreen from '../NotificationScreen';
import PhotoScreen from '../PhotoScreen';
import TextScreen from '../TextScreen';
import Calculator from '../Calculator';

const Home = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Photo" component={PhotoScreen} />
      <Tab.Screen name="Text" component={TextScreen} />
      <Tab.Screen name="Calculator" component={Calculator} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
