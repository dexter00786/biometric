import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
  return (
      <TouchableOpacity 
        style = {props.style} 
        onPress = {props.onPress}    
    >
          <Text style = {{color : props.color}} >{props.title}</Text>
      </TouchableOpacity>
  )
}

export default CustomButton
