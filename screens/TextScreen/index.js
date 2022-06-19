import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const TextScreen = () => {
  const [myText, setMyText] = useState('');
  const [loader, setLoader] = useState(false);
  const [docRef, setDocRef] = useState({
    collection: '',
    doc: '',
  });
  const [fetchedText, setFetchedText] = useState('');
  const uploadText = async () => {
    setLoader(true);
    try {
      const response = await firestore().collection('texts').add({
        data: myText,
      });
      // setDocRef(response._documentPath._parts);
      setDocRef({
        collection: response._documentPath._parts[0],
        doc: response._documentPath._parts[1],
      });
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await firestore()
          .collection(docRef.collection)
          .doc(docRef.doc)
          .get();
        setFetchedText(response.data().data);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchText();
  }, [docRef]);
  return (
    <View>
      <TextInput
        style={styles.textInput}
        value={myText}
        onChangeText={setMyText}
      />
      <ActivityIndicator animating={loader} />
      <Text>{fetchedText}</Text>
      <Button title="Create" onPress={uploadText} />
    </View>
  );
};

export default TextScreen;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
  },
});
