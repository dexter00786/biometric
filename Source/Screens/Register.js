import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../Components/CustomInput'
import CustomButton from '../Components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get('window').width
const Register = () => {
    const navigation = useNavigation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    // const [details, setDetails] = useState({})
    const [validationError, setValidationErrors] = useState({});

    const checkValidation = ()=>{
      let errors = {}
      let formIsValid = true;

      if (!name || name.trim() === ""){
        formIsValid = false;
        errors["nameError"] = "username cannot be left empty!";
      }
  
      if (!email || email.trim() === ""){
          formIsValid = false;
          errors["emailError"] = "Email cannot be left empty!";
      }
      if (email) {
          if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
              formIsValid = false;
              errors["emailError"] = "Please enter a valid email";
          }
      }
      if (!password || password.trim() === "") {
          formIsValid = false;
          errors["passwordError"] = "Password cannot be left empty!";
      }
      if (password) {
          if (!password.match( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)) {
              formIsValid = false;
              errors["passwordError"] = "Please enter a valid password";
          }
      }
      setValidationErrors(errors);
      return formIsValid;
  }

  const setData = async () => {
    if(checkValidation()){
      let details = {
        name : name,
        email : email,
        password : password
      }
    try{
      await AsyncStorage.setItem("details",JSON.stringify(details))
      navigation.navigate('afterauth')
    }
    catch(e) {
      console.log(e)
    }
  }}

  const getItem = async () => {
        
    try {
        const jsonValue = await AsyncStorage.getItem('details')
        console.warn(JSON.parse(jsonValue))
      } catch(e) {
        console.log(e)
      }
}
  // console.warn(details)
  return (
        <SafeAreaView style = {styles.container} >
          <View style={styles.loginContainer} >
          <View style={styles.helloView} >
            <Text style={{ fontWeight : "bold", fontSize : 16, color : "#A6A6A6" }} >Create Account</Text>
          </View>
          <View style={styles.formView} >
            <Text style={{ fontSize : 16, color : "#A6A6A6", marginVertical : 10 }} >User Name*</Text>
            <CustomInput 
              placeholder = {'Enter user name'} 
              keyboardType = {"email-address"} 
              autoCapitalize = {false} onChangeText = {(text)=>setName(text)} 
            />
            <Text  style={{color : "red"}} >{validationError["nameError"]}</Text>
            <Text style={{ fontSize : 16, color : "#A6A6A6", marginVertical : 10 }} >Email ID*</Text>
            <CustomInput 
              placeholder = {'Enter Email ID'} 
              keyboardType = {"email-address"} 
              autoCapitalize = {false} onChangeText = {(text)=>setEmail(text)}
            />
            <Text  style={{color : "red"}} >{validationError["emailError"]}</Text>
            <Text style={{ fontSize : 16, color : "#A6A6A6", marginVertical : 10 }} >Password*</Text>
            <CustomInput
             placeholder = {'Enter Password'}
             keyboardType = {"default"}
             autoCapitalize = {false} onChangeText = {(text)=>setPassword(text)}
            />
            <Text  style={{color : "red"}} >{validationError["emailError"]}</Text>
            <CustomButton style={styles.loginButton} title = {'Register'} color = {"white"} onPress = {()=>setData()} />
          </View>
          <View style={styles.socialLoginView} >
              <Text>Or register using social media</Text>
              <View style = {styles.socialIconView} >
                <TouchableOpacity onPress={()=>getItem()} >
                <Image source = {{uri : "https://cdn-icons.flaticon.com/png/512/3128/premium/3128304.png?token=exp=1656336507~hmac=8dbf65564f6b5ba79ba1390e82c3a94d"}} 
                  style={{ height : 30, width : 30 }}
                />
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source = {{uri : "https://cdn-icons-png.flaticon.com/512/733/733579.png"}} 
                  style={{ height : 30, width : 30, }}
                />
                </TouchableOpacity>
                <TouchableOpacity>
                <Image source = {{uri : "https://cdn-icons-png.flaticon.com/512/733/733613.png"}} 
                  style={{ height : 30, width : 30 }}
                />
                </TouchableOpacity>
              </View>
          </View>
        </View>
        </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({

  container : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : "#EBEBEB",
  },
  loginContainer : {
    flex : 0.8,
    width : width - 30, 
    alignItems : "center",
    backgroundColor : "#FFFFFF", 
    borderWidth : 1, 
    borderColor : "#FFFFFF" 
  },
  helloView : {
    flex : 0.2,
    width : "100%",
    justifyContent : "center",
    alignItems : "center",
  },
  formView : {
    flex : 0.6,
    width : "95%",
  },
  loginButton : {
    height : 40,
    width : "80%",
    alignSelf : "center",
    backgroundColor : "#006C8E",
    borderWidth : 1,
    borderRadius : 18,
    borderColor : "#006C8E",
    justifyContent : "center",
    alignItems : "center",
    marginTop : 30,
  },
  socialLoginView : {
    flex : 0.2,
    width : "95%",
    justifyContent : "space-evenly",
    alignItems : "center",
  },
  socialIconView : {
    flexDirection : "row",
    justifyContent : "space-around",
    width : "50%",
  }

})