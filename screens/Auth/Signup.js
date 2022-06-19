import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Signup = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Sign up</Text>
      <View>
        <TextInput style={styles.inputs} placeholder="Email" />
        <TextInput style={styles.inputs} placeholder="Password" />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    borderWidth: 1,
    height: '100%',
    textAlign: 'center',
  },
  inputs: {
    borderWidth: 1,
    marginVertical: 10,
  },
});
