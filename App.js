
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import LoginScreen from './src/loginpages/loginScreen';
import HomeScreen from './src/loginpages/Homescreen';
import SearchScreen from './src/loginpages/SearchScreen';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="SearchScreen" component={SearchScreen} />
                </Stack.Navigator>
                
                <Toast />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
