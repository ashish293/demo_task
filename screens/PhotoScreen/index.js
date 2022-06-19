import {
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const Photo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const handleCamera = () => {
    setModalVisible(false);
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, async response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setImage({
          fileName: response.assets[0].fileName,
          filePath: response.assets[0].uri,
        });
      }
    });
  };

  const handleLibrary = () => {
    setModalVisible(false);
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setImage({
          fileName: response.assets[0].fileName,
          filePath: response.assets[0].uri,
        });
        console.log('before image', image);
      }
    });
  };
  useEffect(() => {
    handleUpload();
  }, [image]);
  const handleUpload = async () => {
    setLoader(true);
    if (image) {
      const reference = storage().ref('images/' + image.fileName);
      console.log(image.filePath);
      await reference.putFile(image.filePath);
      reference.getDownloadURL().then(url => {
        console.log('url', url);
        setImgUrl(url);
      });
    }
    setLoader(false);
  };
  return (
    <View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{position: 'absolute', top: -60, right: 10}}>
            <Text style={{fontSize: 40, textAlign: 'right', padding: 10}}>
              X
            </Text>
          </TouchableOpacity>
          <Button onPress={handleCamera} title="Camera" />
          <Button onPress={handleLibrary} title="Upload" />
        </View>
      </Modal>
      <Button onPress={() => setModalVisible(true)} title="ImagePicker" />
      <ActivityIndicator size="large" animating={loader} />

      <View>
        {imgUrl && (
          <Image
            source={{uri: imgUrl}}
            style={{
              width: 300,
              height: 400,
              borderWidth: 5,
              borderColor: '#2196F3',
              marginTop: 10,
              margin: 40,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    padding: 15,
    paddingBottom: 50,
    bottom: 0,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});
