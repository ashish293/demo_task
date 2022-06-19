import {StyleSheet, Button, View} from 'react-native';
import React from 'react';
import notifee from '@notifee/react-native';

const Notification = () => {
  const handleNotification = async () => {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Test Notification',
      body: 'Body of Notification',
      android: {
        channelId,
      },
    });
  };
  return (
    <View>
      <Button
        title="Display Notification"
        onPress={() => handleNotification()}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
