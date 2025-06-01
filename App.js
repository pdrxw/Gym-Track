import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes/index.routes';
// import BottomRoutes from './src/routes/bottom.routes';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProviderList } from './src/context/authContext_list';

export default function App() {
  return (
      <AuthProviderList>
      <NavigationContainer>
        <Routes/>
        {/* <BottomRoutes/> */}
      </NavigationContainer>
      </AuthProviderList>
  );
}
