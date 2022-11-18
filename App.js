import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AuthStack from './Source/Navigation/AuthStack'
import RootNavigator from './Source/Navigation/RootNavigator'
import OnBoarding from './Source/Screens/OnBoarding'

const App = () => {
  return (
    <View style={styles.container} >
      <RootNavigator/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
    container : {
      flex : 1,
    }
})