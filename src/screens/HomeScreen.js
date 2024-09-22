import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Image source={require('../assets/Logo.png')} style={styles.LogoImg}/>
          <Text style={styles.text}>Welcome to ScanWave...</Text>
        </View>
        <View style={styles.btns}>
          <Button title='Scan a QR Code' onPress={() => navigation.navigate('ScanQR')} />
          <Button title='Generate a QR Code' onPress={() => navigation.navigate('GenerateQR')} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#000000',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogoImg:{
        width: 200,
        height: 200,
        objectFit: 'contain',
    },
    text:{
        color: '#ffffff',
        fontSize: 30,
    },
    btns:{
      gap: 10,
      paddingTop: 20,
    }
})