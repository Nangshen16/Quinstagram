import React, {useState} from 'react'
import {View, TextInput, Image, Button } from 'react-native'
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require( "firebase/firebase-storage")


//pass the data from the add component
export default function Save(props, {navigation}) {
    const [caption, setCaption] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath =`post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
        console.log(childPath)


        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
           .storage()
           .ref()
           .child(childPath)
           .put(blob);
        
        //this function able to track how many pictures 
        const taskProgress = snapshot => {
            console.log(`transffered: ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })

        }
        const taskError = snapshot => {
            console.log(snapshot)
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted);


    }
    // console.log(props.route.params.image)
    const savePostData = (downloadURL) => {
        firebase.firestore().
          collection('posts')
          .doc(firebase.auth().currentUser.uid)
          .collection("userPosts")
          .add({
              downloadURL,
              caption,
              creation: firebase.firestore().fieldValue.serverTimestamp()
          }).then((function () {
              navigation.popToTop()
          }))

    }
    return (
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.image}}/>
            <TextInput
               placeholder="Write a Caption . . ."
               onChangeText={(caption) => setCaption(caption)}/>

            <Button title="Save" onPress={()=> uploadImage()}/>
            
        </View>
    )
}
