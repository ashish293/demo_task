import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const handleLogin = () => {
    // if (isEmail(email) && isStrongPassword(password)) {
    //   navigation.navigate('Home');
    // }
    if (!isEmail(email)) {
      setEmailValid('Invalid email');
    }
    if (!isStrongPassword(password)) {
      setPasswordValid('Invalid password');
    }
    if (isEmail(email) && isStrongPassword(password)) {
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
        <TextInput
          style={styles.inputs}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <Text>{emailValid}</Text>
        <TextInput
          style={styles.inputs}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        <Text>{passwordValid}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('Forgot Password');
        }}>
        <Text>Forgotten Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text>New User?</Text>
      </TouchableOpacity>
      <Button
        title="Login"
        onPress={() => {
          handleLogin();
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
  },
  inputs: {
    borderWidth: 1,
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
});
