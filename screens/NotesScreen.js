import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {Header, Divider, Icon} from 'react-native-elements';
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
            this.refreshFlatList();
        })
        this.state = {refresh: false, items: this.items};
    }

    refreshFlatList(){
        this.setState({refresh: !this.state.refresh});
        this.importData();
        this.render();
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
                    source={require('../resources/note.png')}
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
                            backgroundColor: 'transparent',
                        }}
                                  showsHorizontalScrollIndicator={false}
                                  showsVerticalScrollIndicator ={false}
                                  source={{html: item.content}} />
                          <Icon name={'delete'} size={30} color={'#6a0303'} style={{marginBottom:10}} onPress={()=>this.removeItemValue(item.id)}/>
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
            <View style={styles.MainContainer}>
                <Header
                    backgroundImage={require('../resources/notes.png')}
                    leftComponent={{ icon: 'arrow-back', size:30, color: '#6268b8', onPress: () =>  this.props.navigation.goBack() }}
                    centerComponent={{ text: '', style: { color: '#6268b8', fontSize:30,fontWeight:"bold",} }}
                    rightComponent={{ icon: 'home', color: '#6268b8',onPress: () => this.props.navigation.navigate('Home') }}
                    containerStyle={{
                        backgroundColor: "#caebff",
                        justifyContent: "space-around"
                    }}
                />
                <Divider style={{ backgroundColor: 'transparent', height:10}} />
                <FlatList
                    style={container}
                    extraData={this.state.refresh}
                    data={items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={createNewNote}
                    style={TouchableOpacityStyle}>
                    <Icon
                        reverse
                        name={'add'}
                        size={25}
                        color={'#6268b8'}
                    >
                    </Icon>
                </TouchableOpacity>
            </View>

        );
    }
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            this.refreshFlatList();
            return true;
        }
        catch(exception) {
            console.log("error");
            return false;
        }
    }
}
const styles = StyleSheet.create({
    MainContainer: {
        flex:1,
        backgroundColor: 'transparent',
    },
    container: {
        flex:1,
        marginTop: 0,
        backgroundColor: 'transparent',
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
        backgroundColor: 'transparent',
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

