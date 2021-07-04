import React,{useState , useEffect , useLayoutEffect} from 'react'
import { StyleSheet, Text, View , KeyboardAvoidingView } from 'react-native'
import {Button, Input, Image} from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:"Sign In",
            headerTitleAlign:"center",
        })
    },[navigation])

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            // console.log(authUser);
            if (authUser) {
                navigation.replace("home");
            }
        })
        return unsubscribe;
    },[navigation]);

    const logIn = ()=>{
        auth.signInWithEmailAndPassword(email,password).catch(err =>alert(err));
    }


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri:"data:image/jpeg;base64,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",
            }}
            style={styles.imageStyle}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="email" 
                value={email} 
                onChangeText={text=>setEmail(text)} />
                <Input placeholder="Password" secureTextEntry type="password"
                value={password} onChangeText={text=>setPassword(text)} onSubmitEditing={logIn} />
            </View>
            <Button containerStyle={styles.button} onPress={logIn} title="Log In" />
            <Button containerStyle={styles.button} onPress={()=>navigation.navigate("register")} type="outline" title="Register" />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        padding:10,
    },
    imageStyle:{
        width:170,
        height:170,
        borderRadius:20
    },
    inputContainer:{
        width:300,
        marginTop:20
    },
    button:{
        width:200,
        marginTop:10
    }
})

