// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NotesScreen from './screens/NotesScreen';
import HomeScreen from './screens/HomeScreen';


const Stack = createStackNavigator();

function NavStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
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
