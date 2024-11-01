
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Button } from 'react-native';
import { useNavigation,useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const categories = ["Morning", "Afternoon", "Evening"];

const HomeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { username } = route.params || {};

    const [todoName, setTodoName] = useState('');
    const [category, setCategory] = useState('');
    const [todos, setTodos] = useState([]); 

    const handleAddTodo = () => {
        if (todoName && category) {
            const newTodo = { todoName, category };
            setTodos((prevTodos) => [...prevTodos, newTodo]); 

            Toast.show({
                type: 'success',
                text1: 'To-Do Added',
                text2: `To-Do Name: ${todoName}, Category: ${category}`
            });

            
            setTodoName('');
            setCategory('');
        } else {
            Toast.show({
                type: 'error',
                text1: 'Incomplete Information',
                text2: 'Please enter both to-do name and category.'
            });
        }
    };

    const navigateToSearchScreen = () => {
        navigation.navigate('SearchScreen', { todos }); 
    };

    const selectCategory = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <View style={styles.container}>
           
            <Text style={styles.text}>Welcome, {username} 👋</Text>
            <Text style={styles.text}>Add To-Do List</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter To-Do Name"
                placeholderTextColor="black"
                value={todoName}
                onChangeText={setTodoName}
            />

            
            <FlatList
             style={{alignSelf:'center'}}
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.categoryItem, category === item && styles.selectedCategory]}
                        onPress={() => selectCategory(item)}
                    >
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )}
                horizontal
            />
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
           
                <Button title="Add To-Do" onPress={handleAddTodo}  />
                <Button title="View To-Do List" onPress={navigateToSearchScreen} />

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        padding: 16,
        backgroundColor: 'grey',
    },
    text: {
        marginTop:20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 8,
        color: 'black',
    },
    categoryItem: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginHorizontal: 5,
        height:50,
    },
    selectedCategory: {
        backgroundColor: 'cornflowerblue',
        
    },
    categoryText: {
        fontSize: 16,
        color: 'black',
    },
});

export default HomeScreen;


