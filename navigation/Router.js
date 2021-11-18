import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';

//constants
import { COLORS, icons } from '../constants'
import { Image } from 'react-native';

const dTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: 'transparent',
    }
}

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const Tab = () => {
    return (
        <Tabs.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                backgroundColor: COLORS.black,
                borderTopColor: "transparent",
                height: 60
            }

        }}>
            <Tabs.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.home}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.gray
                            }}
                        />
                    )
                }}
            />
            <Tabs.Screen name="Play" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.play_button}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.gray
                            }}
                        />
                    )
                }}
            />
            <Tabs.Screen name="Search" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.search}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.gray
                            }}
                        />
                    )
                }}
            />
            <Tabs.Screen name="Profile" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.profile}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? COLORS.primary : COLORS.gray
                            }}
                        />
                    )
                }}
            />
        </Tabs.Navigator>
    )
}

const Router = () => {
    return (
        <NavigationContainer theme={dTheme}>
            <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Root" component={Tab} />
                <Stack.Screen name="Detail" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router
