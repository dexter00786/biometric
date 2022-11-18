import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomInput from '../Components/CustomInput'
import CustomButton from '../Components/CustomButton'


const width = Dimensions.get('window').width
const Login = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userToken, setUserToken] = useState({})
    const [validationError, setValidationErrors] = useState({});

    // useEffect(() => {
    //   getItem()
    // }, [])
    
    const checkValidation = ()=>{
      let errors = {}
      let formIsValid = true;
  
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
      // if(formIsValid){
      //   navigation.navigate('afterauth', {screen : 'dashboard', params : {email : email}})
      // }
      return formIsValid;
  }

  const setItem = async () => {
    if(checkValidation()){
      let details = {
        email : email,
        password : password
      }
      try{
        await AsyncStorage.setItem("Logindetails",JSON.stringify(details))
        navigation.navigate('afterauth')
      }
      catch(e) {
        console.log(e)
      }
    }
  }
  console.warn("login userToken", userToken)
  return (
        <SafeAreaView style = {styles.container} >
          <View style={styles.loginContainer} >
          <View style={styles.helloView} >
            <Text style={{ fontSize : 28, fontWeight : "bold" }} >Hello</Text>
            <Text style={{ fontWeight : "bold", fontSize : 16, color : "#A6A6A6" }} >Sign in to your account</Text>
          </View>
          <View style={styles.formView} >
            <Text style={{ fontSize : 16, color : "#A6A6A6", marginVertical : 10 }} >Email ID*</Text>
            <CustomInput placeholder = {'Enter Email ID'} 
              keyboardType = {"email-address"} 
              onChangeText = {(text)=>setEmail(text)} autoCapitalize = {false}
            />
            <Text  style={{color : "red"}} >{validationError["emailError"]}</Text>
            <Text style={{ fontSize : 16, color : "#A6A6A6", marginVertical : 10 }} >Email Password*</Text>
            <CustomInput placeholder = {'Enter Password'} 
              keyboardType = {"default"} 
              onChangeText = {(text)=>setPassword(text)} autoCapitalize = {false} 
            />
            <Text  style={{color : "red"}} >{validationError["passwordError"]}</Text>
            <TouchableOpacity style={{ alignSelf : "flex-end", marginRight : 10 }} ><Text>Forgot password?</Text></TouchableOpacity>
            <CustomButton style={styles.loginButton} title = {'Login'} color = {"white"} onPress = {()=>setItem()} />
          <View style={styles.socialLoginView} >
              <Text>Or login using social media</Text>
              <View style = {styles.socialIconView} >
                <TouchableOpacity>
                <Image source = {{uri : "https://cdn-icons.flaticon.com/png/512/3128/premium/3128304.png?token=exp=1656336507~hmac=8dbf65564f6b5ba79ba1390e82c3a94d"}} 
                  style={{ height : 30, width : 30 }}
                />
                </TouchableOpacity>
                <TouchableOpacity  >
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
        </View>
        </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({

  container : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : "#EBEBEB",
  },
  loginContainer : {
    flex : 0.7,
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
    flex : 0.8,
    width : "95%",
  },
  loginButton : {
    height : 40,
    width : "80%",
    alignSelf : "center",
    backgroundColor : "#00A593",
    borderWidth : 1,
    borderRadius : 18,
    borderColor : "#00A593",
    justifyContent : "center",
    alignItems : "center",
    marginTop : 30,
  },
  socialLoginView : {
    marginTop : 40,
    flex : 0.6,
    width : "95%",
    justifyContent : "space-evenly",
    alignItems : "center",
    alignSelf : "center",
  },
  socialIconView : {
    flexDirection : "row",
    justifyContent : "space-around",
    width : "50%",
  }

})