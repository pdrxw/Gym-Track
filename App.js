import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/index.routes';
// import BottomRoutes from './src/routes/bottom.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
      <NavigationContainer>
        <Routes/>
        {/* <BottomRoutes/> */}
      </NavigationContainer>
  );
}
