import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../Screens/Dashboard'

const Stack = createNativeStackNavigator()
const AfterAuth = () => {
  return (
    <Stack.Navigator
    screenOptions={{ headerShown : false}}
    >
      <Stack.Screen name = 'dashboard' component={Dashboard} />
    </Stack.Navigator>
  )
}

export default AfterAuth

const styles = StyleSheet.create({})