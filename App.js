// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NotesScreen from './screens/NotesScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import EditorScreen from './screens/EditorScreen';
import ImageScreen from './screens/ImageScreen';
import ToDoListScreen from './screens/ToDoListScreen';

const Stack = createStackNavigator();

function NavStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#621FF7',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} />
            <Stack.Screen name="Notes" component={NotesScreen} options={{title: 'Notes'}} />
            <Stack.Screen name="Categories" component={CategoryScreen} options={{title: 'Categories'}} />
            <Stack.Screen name="Editor" component={EditorScreen} options={{title: 'Editor'}} />
            <Stack.Screen name="Image" component={ImageScreen} options={{title: 'Image'}}/>
            <Stack.Screen name="ToDo" component={ToDoListScreen} options={{title: 'ToDo'}}/>
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <NavStack />
        </NavigationContainer>
    );
}
