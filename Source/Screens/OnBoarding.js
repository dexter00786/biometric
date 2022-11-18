import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ImageBackgroundBase, ImageBackground, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomButton from '../Components/CustomButton'
import TouchID from 'react-native-touch-id'
import AsyncStorage from '@react-native-async-storage/async-storage'


const width = Dimensions.get('window').width

const OnBoarding = () => {
const navigation = useNavigation()
const [userToken, setUserToken] = useState({})

useEffect(() => {
    getItem()
}, [])

    
    const getItem = async () => {
        
        try 
          {
            const jsonValue = await AsyncStorage.getItem('details')
            const value = JSON.parse(jsonValue)
            const newValue = {...value}
            setUserToken(newValue)
          } 
          catch(e) 
          {
            console.log(e)
          }
    }

    // const disableBiometric = async () => {
    //     const newObject = {...userToken}
    //     newObject.biometric = false
    //     setUserToken(newObject)
    //     await AsyncStorage.setItem('details',JSON.stringify(newObject))
    // }

const authenticate = () => {
    if(userToken['biometric'] ==  true){
        TouchID.authenticate('to demo this react-native component')
        .then(success => {
        alert("authenticated successfully", success)
        })
        .then(()=> navigation.navigate('afterauth'))
        .catch (error => {
        // alert(error)
        })
    }
    else {
        alert("Please enable biometric")
    }
}
console.warn("userToken onboarding", userToken)
  return (
        <ImageBackground 
            source = {{uri : "https://miro.medium.com/max/320/1*2zm-i1LzLyNfh62Vi1RZTg.png"}} 
            style = {styles.container} >
        <SafeAreaView style = {styles.container} >
            <View style={styles.logoView} >
                <Image source={require('../Assets/Logo.png')} style = {{height : "100%", width : "100%"}} />
            </View>
            <View style = {styles.loginView} >
                <CustomButton 
                    style = {styles.loginButton} 
                    title = 'Login' 
                    onPress = {()=>navigation.navigate('login')}  
                />
                <CustomButton 
                    style = {styles.loginButton} 
                    title = 'Register' 
                    onPress = {()=>navigation.navigate('register')} 
                />
            </View>
            {userToken.biometric == true && <View style={styles.touchIdView} >
                <View style={{ flex : 0.2, justifyContent : "center", alignItems : "center",}} >
                    <Text style={{ color : "white" }} >Now! Quick Login Use Touch Id</Text>
                </View>
                <TouchableOpacity onPress={()=>authenticate()}   style={{ flex : 0.8, alignItems : "center",}} >
                <Image source={require('../Assets/fingerprint.png')} style={{ height : 100, width : 100, marginVertical : 30}} />
                <Text style={{ color : "white",}} >Use Touch Id</Text>
                </TouchableOpacity>
            </View>}
        </SafeAreaView>
        </ImageBackground>
  )
}

export default OnBoarding

const styles = StyleSheet.create({

    container : {
        flex : 1,
        alignItems : "center",
        width : "100%",
        height : "100%",
    },
    logoView : { 
        flex : 0.3,
        marginTop : 100,
        width : width - 180,
        // borderWidth : 1, 
        // borderColor : "red" ,
    },
    loginView : {
        flex : 0.1,
        marginTop : 50,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        width : width - 30,
    }, 
    loginButton : {
        height : 40,
        flex : 0.45,
        backgroundColor : "white",
        borderWidth : 1,
        borderRadius : 18,
        borderColor : "white",
        justifyContent : "center",
        alignItems : "center"
    },
    touchIdView : { 
        flex : 0.5,
        marginTop : 50,
        width : width - 150,
    },

})