import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import functions from '@react-native-firebase/functions';
import isEmail from 'validator/lib/isEmail';

const options = [
  {label: 'Add', value: 'add'},
  {label: 'Substract', value: 'sub'},
  {label: 'Multiply', value: 'mul'},
  {label: 'Divide', value: 'div'},
];

const Calculator = () => {
  const [n1, setN1] = useState(null);
  const [n2, setN2] = useState(null);
  const [operation, setOperation] = useState('add');
  const [loader, setLoader] = useState(false);
  const [result, setResult] = useState(null);
  const handleCalc = async () => {
    setLoader(true);
    const request = {n1: parseInt(n1), n2: parseInt(n2), operation};
    console.log('request', request);
    await functions()
      .httpsCallable('calculate')(request)
      .then(response => {
        console.log('response', response);
        setResult(response.data);
      })
      .catch(error => {
        console.log('error', error);
      });
    setLoader(false);
  };
  useEffect(() => {
    console.log('operation', operation);
  }, [operation]);
  return (
    <View>
      <View styles={styles.inputContainer}>
        <TextInput
          placeholder="Enter 1st Number"
          value={n1}
          style={styles.input}
          onChangeText={setN1}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter 2nd Number"
          value={n2}
          onChangeText={setN2}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.operationContainer}>
        <Text style={styles.operationSelect}>Select Operation:</Text>
        <Picker
          dropdownIconColor={'black'}
          selectedValue={operation}
          onValueChange={setOperation}
          style={{height: 30, width: 135, color: 'black'}}>
          {options.map((item, index) => (
            <Picker.Item label={item.label} key={index} value={item.value} />
          ))}
        </Picker>
      </View>
      <Button title="Calculate" onPress={handleCalc} />
      <ActivityIndicator animating={loader} />
      <Text>{result}</Text>
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
