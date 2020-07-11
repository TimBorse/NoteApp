// Homescreen.js
import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    title="Go to Notes"
                    onPress={() => this.props.navigation.navigate('Categories')}
                />
            </View>
        );
    }
}
