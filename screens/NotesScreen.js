import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList, Image, Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Header, Divider} from 'react-native-elements';
import HtmlText from 'react-native-html-to-text';
import WebView from 'react-native-webview';

export default class NotesScreen extends Component {
    items=[];
    category;
    focusListener;

    importData = async () => {
        try {
            this.items=[];
            var keys = await AsyncStorage.getAllKeys();
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                if(key.startsWith("Note") && key.split('-')[2] === this.category){
                    let value = await AsyncStorage.getItem(keys[i]);
                    let styledValue = "<style> body {font-size: 40px;}h1 {font-size: 70px;}</style>" + value;
                    let title = key.split('-')[1];
                    this.items.push({
                        title: title,
                        content: styledValue,
                        id: key,
                    });
                }
            }


        } catch (error) {
            console.error(error);
        }
        this.setState({items: this.items});

    }

    constructor(props) {
        super(props);
        this.category = props.route.params.category;
        this.focusListener = props.navigation.addListener('focus', () => {
            this.importData();
            this.render();
        })
        this.state = {items: this.items};
    }

    _renderItem = ({item, index}) => {
        let {titleText, contentText, card, cardImage} = styles;
        //ToDo: Redirection to actual note onclick
        const redirect = () => this.props.navigation.navigate('Editor', {
            id: item.id,
            category: this.category,
        });
        return (
            <TouchableOpacity style={card} onPress={redirect}>
                <ImageBackground
                    source={require('../note.png')}
                    style={cardImage}>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'flex-start',
                            marginLeft: '10%',
                            marginRight: '10%',
                        }}>
                        <Text style={titleText}>{item.title}</Text>
                        <WebView  style={{
                            backgroundColor: '#f6ea8c',
                        }}
                                  showsHorizontalScrollIndicator={false}
                                  showsVerticalScrollIndicator ={false}
                                  source={{html: item.content}} />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    render() {
        let {container, FloatingButtonStyle, TouchableOpacityStyle} = styles;
        let {items} = this.state;
        //ToDo: Add correct Navigation
        const createNewNote = () => this.props.navigation.navigate('Editor', {
            id: "",
            category: this.category,
        });
        return (
            <View
                style={{
                    height: '100%'}}>
                <Header
                    backgroundImage={require('../header_ohneText.png')}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () =>  Alert.alert("Menu clicked!")}}
                    centerComponent={{ text: 'Notes', style: { color: '#6268b8', fontSize:30,fontWeight:"bold", fontStyle:'italic', fontFamily:' '} }}
                    rightComponent={{ icon: 'home', color: '#fff',onPress: () => this.props.navigation.navigate('Home') }}
                    containerStyle={{
                        backgroundColor: "transparent",
                        justifyContent: "space-around"
                    }}
                />
                <Divider style={{ backgroundColor: '#000000', height:2 }} />
                <FlatList
                    style={container}
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={createNewNote}
                    style={TouchableOpacityStyle}>
                    <Image
                        //We are making FAB using TouchableOpacity with an image
                        //We are using online image here
                        // source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png', }}

                        //You can use you project image Example below
                        source={require('../add_icon_b.png')}
                        style={FloatingButtonStyle}
                    />
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: '#caebff',
        marginBottom: 80,
    },
    titleText: {
        fontSize: 30,
        fontWeight:"bold",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentText: {
        textAlign: 'left',
        marginRight: '10%',
        marginLeft: '10%',
        marginBottom: '10%',
    },
    card: {
        backgroundColor: '#caebff',
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3,
        },
    },
    cardImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        marginBottom: 80,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 75,
        height: 75,
        //backgroundColor:'black'
    },
});

