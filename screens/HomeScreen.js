import React , {useLayoutEffect , useEffect , useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import CoustomListItem from '../components/CoustomListItem'
import { Avatar } from 'react-native-elements'
import {auth, db} from '../firebase'

const HomeScreen = ({navigation}) => {
    const [chats,setChats] = useState([]);
        
    useEffect(()=>{
        const unsubscribe = db.collection("chats").onSnapshot(snapshot =>{
            setChats(snapshot.docs.map(doc=>({
                id:doc.id,
                data:doc.data(),
            })))
        })
        return unsubscribe;
    },[])

    const signOut = ()=>{
        auth.signOut().then(()=>{
            navigation.replace("login")
        });
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"ChatApp",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
            headerTitleAlign:"center",
            headerLeft: ()=>{
                return <View style={{ marginLeft:20 }}>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                        <Avatar rounded source={{
                            uri:auth?.currentUser?.photoURL
                        }} />
                    </TouchableOpacity>
                </View>
            },
            headerRight: ()=>{
                return <View style={{
                    flexDirection:"row",
                    justifyContent:'space-between',
                    width:80,
                    marginRight:20,
                 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                        navigation.navigate("addChat");
                    }}>
                        <SimpleLineIcons name="pencil" size={25} color="black" />
                    </TouchableOpacity>
                </View>
            },
        })  
    },[navigation])

    const enterChat = (id, chatName) =>{
        navigation.navigate("chat",{
            id, chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id,data:{chatName}})=>(
                    <CoustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height:"100%",
    }
})
