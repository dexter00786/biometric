import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthStack from './AuthStack'
import AfterAuth from './AfterAuth'

const Stack = createNativeStackNavigator();
const RootNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{ headerShown : false}}
      >
        <Stack.Screen name = 'authstack' component={AuthStack} />
        <Stack.Screen name = 'afterauth' component={AfterAuth} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})