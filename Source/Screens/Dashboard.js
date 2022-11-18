import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../Components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import TouchID from 'react-native-touch-id'

const Dashboard = (props) => {
    const navigation = useNavigation();
    const [userToken, setUserToken] = useState()
    const [exist, setExist] = useState();
    const [defaultEmail, setdefaultEmail] = useState()
    console.log(props)
    useEffect(() => {
        getItemLogin()
        getItem()
        .then(()=>{ setdefaultEmail(userToken['email'])})
    }, [])
    

    const getItem = async () => {
        try 
          {
             await AsyncStorage.getItem('details')
            .then((response)=>setUserToken(JSON.parse(response)))
          } 
          catch(e) 
          {
            console.log(e)
          }
    }

    const getItemLogin = async () => {
        try 
          {
             await AsyncStorage.getItem('Logindetails')
            .then((response)=>{setExist(response.email == defaultEmail)})
            .then(()=> console.warn(exist))
          } 
          catch(e) 
          {
            console.log(e)
          }
    }

    const enableBiometric = async () => {
        const newObject = {...userToken}
        newObject.biometric = true
        setUserToken(newObject)
        await AsyncStorage.setItem('details',JSON.stringify(newObject))
    }

    const disableBiometric = async () => {
        const newObject = {...userToken}
        newObject.biometric = false
        setUserToken(newObject)
        await AsyncStorage.setItem('details',JSON.stringify(newObject))
    }
    const logout =  () => { 
        navigation.replace('authstack')
    }
    console.warn("dashboard usertoken :", userToken )
  return (
    <SafeAreaView style={styles.container} >
    <View style={styles.container} >
        <View style={styles.header} >
            <View style={{ flex : 0.4, height : "100%",justifyContent : "center", alignItems : "center",}} >
                <Text style={{color : "white", fontWeight : "bold", fontSize : 16,}} >Welcome!  </Text>
            </View>
            <View style={{ flex : 0.2, height : "100%",justifyContent : "center", alignItems : "center", }} >
               <TouchableOpacity 
                style={{height : "80%", width: "80%"}} 
                onPress = {()=>logout()}
               >
               <Image source = {require('../Assets/exit.png')} style={{height : "80%", width: "80%"}} />
               <Text style={{color : "white", fontSize : 12,}} >Log Out</Text>
               </TouchableOpacity>
            </View>
        </View>
        <View style = {styles.mainView} >
           <View style = {styles.fingerprintView} >
                <Image source={require('../Assets/fingerprint.png')} style={{height : 100, width : 100}} />
                <Text style = {{fontSize : 18, fontWeight : "bold"}} >Do you want to enable fingerprint for authentication?</Text>
            </View>
            <View style = {styles.buttonView}>
                <CustomButton title = {'Yes'} style={styles.btnStyle} color = {"white"}  onPress = {()=> enableBiometric()} />
                <CustomButton title = {'No'} style={styles.btnStyle} color = {'white'} onPress = {()=> disableBiometric()} />
            </View> 
        </View>
    </View>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    header : {
        flex : 0.1,
        flexDirection : "row",
        backgroundColor : "#00A593",
        alignItems : "center",
        justifyContent : "space-between",
    },
    mainView : {
        flex : 0.9,
        justifyContent : "center",
        alignItems : "center",
    },
    fingerprintView : {
        flex : 0.3,
        justifyContent : "space-evenly",
        alignItems : "center",
        width : "90%",
    },
    buttonView : {
        flex : 0.3,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "flex-start",
        paddingTop : 10,
        width : "90%",
    }, 
    btnStyle : {
        height : 40,
        flex : 0.4,
        backgroundColor : "#006C8E",
        borderRadius : 18,
        borderColor : "#00A593",
        justifyContent : "center",
        alignItems : "center",
    }

})