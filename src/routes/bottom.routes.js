import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/home';
import User from '../pages/user'; // se tiver outra tela
import CustomTabBar from '../components/customtabbar';
import { AuthProviderList } from '../context/authContext_list';

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
    return (
        <AuthProviderList>
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={props => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            />
            <Tab.Screen
                name="User"
                component={User}
            />
        </Tab.Navigator>
        </AuthProviderList>
    );
}
