import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

const SearchScreen = () => {
    const route = useRoute();
    const { todos } = route.params || { todos: [] };

    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('name'); 
   
    const filteredTodos = todos.filter(todo => {
        const todoNameMatch = todo.todoName.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = todo.category.toLowerCase().includes(searchQuery.toLowerCase());

        return filterType === 'name' ? todoNameMatch : categoryMatch;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.header}>To-Do List</Text>
            
            
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Search by ${filterType}`}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Picker
                    selectedValue={filterType}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFilterType(itemValue)}
                >
                    <Picker.Item label="Search by Name" value="name" />
                    <Picker.Item label="Search by Category" value="category" />
                </Picker>
            </View>

            <FlatList
                data={filteredTodos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.todoText}>Title: {item.todoName}</Text>
                        <Text style={styles.categoryText}>Category: {item.category}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'grey',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,

    },
    searchInput: {
        height: 60,
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginRight: 10,
        backgroundColor: '#2f4f4f',
    },
    picker: {
        height: 40,
        width: 150,
        backgroundColor: '#2f4f4f',
        borderRadius: 8,
    },
    todoItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    todoText: {
        fontSize: 18,
        color: 'black',
    },
    categoryText: {
        fontSize: 12,
        color: 'gray',
    },
});

export default SearchScreen;











