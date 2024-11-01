
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/action';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    
    const handleLogin = () => {
        if (username && password) {
            dispatch(login(username, password));
            navigation.navigate('Home', { username });
            console.log(`username:  ${username} , Password : ${password}`);
        } else {
            Toast.show({
                type: 'error',
                text1: 'Incomplete Information',
                text2: 'Please enter both username and password.'
            });
        }
    };



    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter Username"
                placeholderTextColor={'black'}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor={'black'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin}/>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor:'grey'
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color:'black'
    },
    
});

export default LoginScreen;
