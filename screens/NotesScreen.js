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

export default class NotesScreen extends Component {
    importData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);

            return result.map(req => JSON.parse(req)).forEach(console.log);
        } catch (error) {
            console.error(error)
        }
    }
    constructor(props) {
        super(props);
        let data = this.importData();
        this.state = {
            items: [
                {
                    id: '0',
                    title: 'Starry Night',
                    content: <Text>Starry Night</Text>,
                },
                {
                    id: '1',
                    title: 'Wheat Field',
                    content: <Text>Wheat Field with Cypresses</Text>,
                },
                {
                    id: '2',
                    title: 'Bedroom in Arles',
                    content: <Text>Bedroom in Arles</Text>,
                },
                {
                    id: '3',
                    title: 'Test',
                    content: <Text>Test</Text>,
                },
            ],
        };
    }

    _renderItem = ({item, index}) => {
        let {titleText, contentText, card, cardImage} = styles;
        //ToDo: Redirection to actual note onclick
        const redirect = () => this.props.navigation.navigate('Home', {
            id: item.id,
        });
        return (
            <TouchableOpacity style={card} onPress={redirect}>
                <ImageBackground
                    source={{
                        uri:
                            'https://cdn.pixabay.com/photo/2013/07/12/14/11/note-147951_960_720.png',
                    }}
                    style={cardImage}>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={titleText}>{item.title}</Text>
                        <Text style={contentText}>
                            haasheasasagnfaignagnaigaigangaiagvggggggggggggggggggggggggggggggghghahahshsahesahsehsehgsehsehshshshsehshjsjsdrjsdrjsdrjsdjsjhsrhdsgshdshshjsjsdjsdjsjhsshswehesaghagagaeasghsaegggggggggggggggggggggggggggggggggggggggggggggggggk
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };

    render() {
        let {container, FloatingButtonStyle, TouchableOpacityStyle} = styles;
        let {items} = this.state;
        //ToDo: Add correct Navigation
        const createNewNote = () => this.props.navigation.navigate('Editor');
        return (
            <View>
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
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10%',
        marginLeft: '10%',
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

