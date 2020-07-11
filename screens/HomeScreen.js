// Homescreen.js
import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text></Text>
                <Button
                    title="Go to Notes"
                    onPress={() => this.props.navigation.navigate('Notes')}
                />
                <Button
                    title="Go to Categories"
                    onPress={() => this.props.navigation.navigate('Categories')}
                />
            </View>
        );
    }
}
