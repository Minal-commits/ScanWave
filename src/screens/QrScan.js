import { Image, StyleSheet, Text, TouchableOpacity, View, Animated, Linking } from 'react-native';
import { React, useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CameraView, useCameraPermissions } from 'expo-camera';

const QrScan = ({ navigation }) => {
  const [result, setResult] = useState('');
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start blinking effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0,  
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
        <Image source={require('../assets/grant.png')} style={{ width: 200, height: 200 }} />
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 15 }}>Allow the permission</Text>
        <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }} onPress={requestPermission}><Text>Grant Permission</Text></TouchableOpacity>
      </View>
    );
  }

  const renderIcon = () => {
    if (flash) {
      return (
        <View style={{ backgroundColor: '#f20000', padding: 10, borderRadius: 100 }}>
          <MaterialIcons name='flashlight-off' size={24} color="white" />
        </View>
      );
    } else {
      return (
        <View style={{ backgroundColor: '#00782e', padding: 10, borderRadius: 100 }}>
          <MaterialIcons name='flashlight-on' size={24} color="white" />
        </View>
      );
    }
  };

  const handleScan = ({ data }) => {
    if (data) {
      const isURL = validateUrl(data);
      if (isURL) {
        setResult(data);
        Linking.openURL(data);
      }
      else{ 
        setResult(data);
      }
    } else {
      setResult('');
    }
    setIsSearching(false);
  };

  const handleScanButtonPress = () => {
    setIsSearching(true);
    setResult(''); 
  };

  const validateUrl = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + 
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$', 'i'); 
    return !!pattern.test(url);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.NavBar}>
          <TouchableOpacity style={styles.icons} onPress={() => navigation.pop()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>ScanWave</Text>
          <View></View>
        </View>
        <View style={styles.Qrcontainer}>
          <CameraView
            style={styles.camera}
            onBarcodeScanned={isSearching ? handleScan : undefined} 
            enableTorch={flash}
          >
            <View style={styles.overLay}>
              <Animated.View style={[styles.View, { opacity: opacityAnim }]} />
              {result ? <Text style={styles.scannedTxt}>Scanned Text: {result}</Text> : null}
            </View>
            <View style={styles.btns}>
              <TouchableOpacity onPress={() => setFlash(!flash)}>
                {renderIcon()}
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} onPress={handleScanButtonPress}>
                <View style={{ backgroundColor: '#f20000', padding: 10, borderRadius: 5, alignItems: 'center' }}>
                  <MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />
                  <Text style={{ color: 'white', fontSize: 16 }}>Scan</Text>
                </View>
              </TouchableOpacity>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="add-photo-alternate" size={30} color="white" />
              </View>
            </View>
          </CameraView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QrScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingVertical: 20
  },
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  Qrcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  camera: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    alignItems: 'left',
    justifyContent: 'flex-end',
  },
  overLay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'rgba(20, 25, 17, 0.5)',
    width: '100%',
  },
  View: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: 'rgba(20, 25, 17, 0.2)',
  },
  scannedTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(20, 25, 17, 0.5)',
    padding: 10,
    borderRadius: 10,
  }
});
