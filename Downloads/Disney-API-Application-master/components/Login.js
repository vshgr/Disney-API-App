import {Pressable, Text, TextInput, View} from 'react-native';
import {gStyle} from "../styles/styles";
import React, {useEffect, useState} from "react";
import {auth} from "../firebase/config"

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with', user.email);
            })
            .catch(error => alert(error.message))
    }

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registered with', user.email);
            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate('Main');
            }
        })
    }, [])

    return (
        <View style={gStyle.login}>
            <TextInput style={gStyle.loginInput}
                       placeholder={"Email..."}
                       onChangeText={email => setEmail(email)}/>
            <TextInput style={gStyle.loginInput}
                       placeholder={"Password..."}
                       onChangeText={password => setPassword(password)}
                       secureTextEntry={true}/>

            <Pressable style={gStyle.loginButton} onPress={handleLogin}>
                <Text style={{color: 'white', fontFamily: 'r-b'}}>Войти</Text>
            </Pressable>
            <Pressable style={gStyle.registerButton} onPress={handleSignUp}>
                <Text style={{fontFamily: 'r-b'}}>Зарегистрироваться</Text>
            </Pressable>

        </View>
    );
}