import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';

const Calculator = () => {
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  return (
    <View>
      <View styles={styles.inputContainer}>
        <TextInput
          placeholder="Enter 1st Number"
          value={first}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter 2nd Number"
          value={first}
          style={styles.input}
        />
      </View>
      <View style={styles.operationContainer}>
        <Text style={styles.operationSelect}>Select Operation:</Text>
        <Text>here place the dropdown box</Text>
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 4,
  },
  operationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
  operationSelect: {
    fontSize: 20,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
  },
});
