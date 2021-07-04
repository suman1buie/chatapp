import React,{useState , useLayoutEffect} from 'react'
import { StyleSheet, View , KeyboardAvoidingView } from 'react-native'
import {Button, Input, Text} from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';
import {auth} from '../firebase'

const RegisterScreen = ({navigation}) => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [imageUrl,setImageUrl] = useState("");

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerTitleAlign:"center",
            headerBackTitle:"Back to Login"
        })
    },[navigation])
    const register = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName:name,
                photoURL : imageUrl || "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
            })
        })
        .catch(error =>alert(error.message))
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} >
            <StatusBar style="light" />
            <Text h3 style={{marginBottom:30}}>Create a signal account</Text>
            <View style={styles.inputContainer}>
                <Input type="text" autoFocus placeholder="Full name" onChangeText={text=>setName(text)} value={name} />
                <Input type="email" placeholder="Email" onChangeText={text=>setEmail(text)} value={email} />
                <Input type="password" secureTextEntry placeholder="Password" onChangeText={text=>setPassword(text)} value={password} />
                <Input type="text" placeholder="Image url" onChangeText={text=>setImageUrl(text)} value={imageUrl} onSubmitEditing={register} />
            </View>
            <Button containerStyle={styles.button} onPress={register} raised title="Register" />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
        padding:10,
    },
    inputContainer: {
        width:300,
    },
    button:{
        width:200,
    },
})
