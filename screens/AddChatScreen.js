import React , { useLayoutEffect , useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import {db} from '../firebase'

const AddChatScreen = ({navigation}) => {
    const [input , setInput] = useState("");

    const createChat = async () =>{
        await db.collection("chats").add({
            chatName:input
        }).then(() =>{
            navigation.goBack();
        }).catch(err => alert(err));
    }

    useLayoutEffect(() =>{
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBackTitle: 'Chats',
            headerTitleAlign:"center",
        })
    },[navigation])

    return (
        <View style={styles.container}>
            <Input 
                placeholder = "Enter a Chat name" 
                onChangeText={text=>setInput(text)} 
                value={input} 
                onSubmitEditing={createChat}
                leftIcon = {
                    <Icon
                        name="wechat"
                        type="antdesign"
                        size={24}
                        color="black"
                    />
                }    
            />
            <Button title="Add a chat" onPress={createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        padding:30,
        height:"100%",
    },
})