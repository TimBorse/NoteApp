import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
} from 'react-native';

export default class NotesScreen extends Component {
    constructor(props) {
        super(props);
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
            ],
        };
    }

    _renderItem = ({item, index}) => {
        let {titleText, contentText, card, cardImage} = styles;
        //ToDo: Redirection to actual note onclick
        const redirect = () => this.props.navigation.navigate('Home');
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
        let {container} = styles;
        let {items} = this.state;
        return (
            <FlatList
                style={container}
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    titleText: {
        fontSize: 30,
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
        backgroundColor: '#fff',
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
});

