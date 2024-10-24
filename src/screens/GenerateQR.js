import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState, useCallback, useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import * as Sharing from 'expo-sharing';
const GenerateQR = ({navigation}) => {
  const [qrValue, setQRValue] = useState(''); 
  const [isActive, setIsActive] = useState(false); 
  const qrRef = useRef();
  const generateQRCode = () => { 
      if (!qrValue) return; 

      setIsActive(true); 
  }; 
  const handleInputChange = useCallback(
    (text) => { 
      setQRValue(text); 

      if (!text) { 
          setIsActive(false); 
      } 
  }, [qrValue]);
  
  const shareQRCode = async () => {
    if(qrValue){
      const imageURI = await qrRef.current.capture();
      Sharing.shareAsync(imageURI);
    }
  };
  

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.NavBar}>
            <TouchableOpacity style={styles.icons} onPress={() => navigation.pop()}>
              <MaterialIcons name="arrow-back-ios" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>ScanWave</Text>
            <View></View>
        </View>
        <View style={styles.GenerateQRContainer}>
          <View style={styles.generateBox}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>QR Code generator</Text>
            <Text style={{fontSize: 15, color: '#000000'}}>Paste a URL or enter a text to create a QR code</Text>
            <TextInput 
              placeholder='https://www.google.com' 
              style={styles.TxtIpt} 
              value={qrValue}
              onChangeText={handleInputChange}
            />
            <TouchableOpacity onPress={generateQRCode} style={styles.btn}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ffffff'}}>Generate QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={shareQRCode} style={styles.btn}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ffffff'}}>Share QR Code</Text>
            </TouchableOpacity>
            <View style={styles.qr}>
            {isActive && ( 
              <View ref={qrRef} style={styles.qrCode} options={{format:'png', quality: 1.0}}>
                    <QRCode 
                      value={qrValue} 
                      size={200} 
                      color="black"
                      backgroundColor="white"
                    /> 
                  <Text style={{fontSize: 15, fontWeight:'500', color: '#000000', paddingTop: 10}}>Generated by Scanwave</Text>
              </View>
            )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default GenerateQR

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#000000',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  GenerateQRContainer:{
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  generateBox:{
    width: '80%',
    backgroundColor: '#ffffff',
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: 'static'
  },
  TxtIpt: {
    marginTop:10,
    padding: 10, 
    borderWidth: 1, 
    borderRadius: 10,
  },
  qr:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25
  },
  btn:{
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  qrCode:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20
  }
})