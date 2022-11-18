import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = (props) => {
  return (
    <TextInput 
        style={styles.textInput}
        placeholder = {props.placeholder}
        keyboardType = {props.keyboardType}
        onChangeText = {props.onChangeText}
        autoCapitalize = {props.autoCapitalize}
    />
  )
}

export default CustomInput

const styles = StyleSheet.create({
    textInput : {
        width : "95%",
        marginVertical : 10,
        borderBottomWidth : 2,
        borderBottomColor : "#F0F0F0",
    }
})