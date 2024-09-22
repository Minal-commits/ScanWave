import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import QrScan from './src/screens/QrScan';
import GenerateQR from './src/screens/GenerateQR';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name='ScanQR' component={QrScan} options={{headerShown: false}}/>
        <Stack.Screen name='GenerateQR' component={GenerateQR} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}