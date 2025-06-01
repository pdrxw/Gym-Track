import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import Register from '../pages/register';
import Home from '../pages/home';
import BottomRoutes from './bottom.routes';

export default function Routes() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            // initialRouteName="BottomRoutes"
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor: '#090c13'
                }
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
            <Stack.Screen
                name="Home"
                component={Home}
            /> 
            <Stack.Screen
                name="BottomRoutes"
                component={BottomRoutes}
            />
        </Stack.Navigator>
    );
}