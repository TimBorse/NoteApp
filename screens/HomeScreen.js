// Homescreen.js
import React, {Component} from 'react';
import {View, ImageBackground} from 'react-native';
import {Button, Icon} from 'react-native-elements';

export default class HomeScreen extends Component {
    render() {
        return (
            <ImageBackground style={{width: '100%', height: '100%'}} source={require('../Start.png')} resizeMethod={'scale'}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
                <Button
                    icon={
                        <Icon
                            name="create"
                            type={'material'}
                            size={20}
                            color="white"
                            containerStyle={{marginRight:5}}
                        />
                    }
                    iconLeft
                    containerStyle={{ width: 130,marginBottom:10}}
                    buttonStyle={{backgroundColor: '#c1c3e7',
                        borderColor: '#6268b8', borderWidth:1}}
                    type="solid"
                    title="Write a Note"
                    onPress={() => this.props.navigation.navigate('Categories')}
                />
                <Button
                    icon={
                        <Icon
                            name="check-circle"
                            type={'material'}
                            size={20}
                            color="white"
                            containerStyle={{marginRight:10}}
                        />
                    }
                    iconLeft
                    containerStyle={{ width: 130,marginTop:10}}
                    buttonStyle={{backgroundColor: '#c1c3e7',
                        borderColor: '#6268b8', borderWidth:1}}
                    type="solid"
                    title="To Do List"
                    onPress={() => this.props.navigation.navigate('ToDo')}
                />
            </View>
            </ImageBackground>
        );
    }
}
