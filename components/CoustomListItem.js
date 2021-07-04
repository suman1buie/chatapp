import React , {useState , useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../firebase'


const CoustomListItem = ({id, chatName, enterChat }) => {
    const [messages, setMessages] = useState([])
    useEffect(() =>{
        const unsubscribe = db.collection('chats').doc(id).collection("message").orderBy('timeStamp','desc')
        .onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>({
            id:doc.id,
            data:doc.data()
        }))));
        return unsubscribe;
    },[messages]);

    return (
        <ListItem onPress={() =>enterChat(id,chatName)} key={id} bottomDivider>
           <Avatar 
                rounded
                source={{
                    uri:messages[0]?.data.photoURL || "data:image/jpeg;base64,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"
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={styles.title}>
                {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                {messages[0]?.data.displayName} : {messages[0]?.data.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CoustomListItem

const styles = StyleSheet.create({
    title: {
        color:"green",
        fontWeight:"900",
        fontSize:20,
    }
})
