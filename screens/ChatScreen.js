import React,{useLayoutEffect , useState , useEffect} from 'react'
import { StyleSheet, View , TouchableOpacity , SafeAreaView, TouchableWithoutFeedback , KeyboardAvoidingView , ScrollView , TextInput, Keyboard, Platform} from 'react-native'
import { Avatar ,Text , Input } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { auth, db} from '../firebase'
import firebase from 'firebase/app'

const ChatScreen = ({navigation, route}) => {
    const [input,setInput] = useState("")
    const [messages, setMessages] = useState([])

    useLayoutEffect(() =>{
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisible:false,
            headerTitleAlign:"left",
            headerTitle:()=>{
                return <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    color:"white",
                    padding:10,
                }} >
                <Avatar 
                    rounded 
                    source={{
                            uri: 
                            messages[0]?.data.photoURL || "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
                        }} 
                    /> 
                    <Text h5 style={{color:"white",fontWeight:"700", marginLeft:10}}>{route.params.chatName}</Text>
                </View>
            },
            headerLeft:()=>(
                <TouchableOpacity
                    style={{marginLeft:10}}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginLeft:20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    });

    const sendMessage = () => {
        if(input !== ""){
            Keyboard.dismiss();
            db.collection('chats').doc(route.params.id).collection("message").add({
                timeStamp:firebase.firestore.FieldValue.serverTimestamp(),
                message:input,
                displayName:auth.currentUser.displayName,
                email:auth.currentUser.email,
                photoURL:auth.currentUser.photoURL,
            })
        }else{
            alert("Not a valid Input")
        }
        setInput('')
    }
    useEffect(() =>{
        const unsubscribe = db.collection('chats').doc(route.params.id).collection("message").orderBy('timeStamp','desc')
        .onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
        }))));
        return unsubscribe;
    },[route])

    return (
        <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
            style={{flex: 1}}
             behavior={Platform.OS === 'ios'? "padding" : "height"}
             keyboardVerticalOffset={90}
             >
                <>
                    <ScrollView contentContainerStyle={{padding:25}}>
                    {messages.map(({id,data})=>(
                            data.email === auth.currentUser.email ?(
                                <View key={id} style={styles.reciver}>
                                    <Avatar rounded 
                                    position="absolute"
                                    containerStyle={{
                                        position:"absolute",
                                        bottom:-15,
                                        right:-5
                                    }}
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    source={{
                                        uri:data.photoURL
                                    }} />
                                    <Text style={styles.reciverText}>{data.message}</Text>
                                </View>
                            ):(
                                <View key={id} style={styles.sender}>
                                    <Avatar rounded 
                                    position="absolute"
                                    containerStyle={{
                                        position:"absolute",
                                        bottom:-15,
                                        right:-5
                                    }}
                                    bottom={-15}
                                    right={-5}
                                    size={30}
                                    source={{
                                        uri:data.photoURL
                                    }} />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
   
                    </ScrollView>   
                </>
                <View style={styles.footer}>
                    <TextInput onSubmitEditing={sendMessage} value={input} onChangeText={text=>setInput(text)} placeholder="send a message" style={styles.textInput} />
                    <TouchableOpacity activeOpacity={0.5} onPress={sendMessage} >
                        <Ionicons name="send" size={24} color="#2B68E6"/>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            

        </KeyboardAvoidingView>
    )
}

export default ChatScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white",
    },
    footer: {
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:35,

    },
    textInput: {
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30,
    },
    reciverText:{

    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15,
    },
    reciver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20,     
        margin:15,
        maxWidth:"80%",
        position:"relative",         
    },
})
