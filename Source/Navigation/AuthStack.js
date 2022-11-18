import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnBoarding from '../Screens/OnBoarding'
import Login from '../Screens/Login'
import Register from '../Screens/Register'

const Stack = createNativeStackNavigator()
const AuthStack = () => {
  return (
        <Stack.Navigator 
          screenOptions={{ headerShown : false}}
        >
            <Stack.Screen name = 'onboarding' component = {OnBoarding} />
            <Stack.Screen name = 'login' component = {Login} />
            <Stack.Screen name = 'register' component = {Register} />
        </Stack.Navigator>
  )
}

export default AuthStack