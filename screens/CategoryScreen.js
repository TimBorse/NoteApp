import React, {Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Alert,
    Image, TextInput, FlatList,
} from 'react-native';
import {Header} from 'react-native-elements';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

export default class CategoryClass extends Component {
    items = [];
    focusListener;
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible:false,
            category: "",
            items: this.items,
        };
        this.focusListener = props.navigation.addListener('focus', () => {
            this.importData();
            this.render();
        })
    }

    openModal = () =>{
        this.setState({
            isModalVisible:true
        })
    }

    closeModal = () =>{
        this.setState({
            isModalVisible:false
        })
    }
    setText = (text)=> {
    this.setState({category: text})
}

    importData = async () => {
        try {
            this.items = [];
            var keys = await AsyncStorage.getAllKeys();
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                if(key.startsWith("category")){
                    let category = await AsyncStorage.getItem(keys[i]);
                    console.log(key);
                    this.items.push({
                        category: category,
                        id: key,
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
        this.setState({items: this.items});
    }

    _renderItem = ({item, index}) => {
        console.log(item.category);
        let {contentText,card, cardImage} = styles;
        //ToDo: Redirection to actual note onclick
        const redirect = () => this.props.navigation.navigate('Notes', {
            category: item.category,
        });
        return (
                <TouchableOpacity style={card} onPress={redirect}>
                        <View style={card}>
                            <Text style={contentText}>
                                {item.category}
                            </Text>
                        </View>
                </TouchableOpacity>
        );
    };

    render() {
        console.log(this.state.items.length);
        let {items} = this.state;
        return (
            <View style={styles.MainContainer}>
                <Header
                    backgroundImage={require('../header_ohneText.png')}
                    leftComponent={{ color: '#fff', onPress: () => Alert.alert('Menu clicked') }}
                    centerComponent={{ text: 'Categories', style: { color: '#6268b8', fontSize:30,fontWeight:"bold", fontFamily:'Roboto'} }}
                    rightComponent={{ icon: 'home', color: '#fff',onPress: () => Alert.alert('Home clicked') }}
                    containerStyle={{
                        backgroundColor: "transparent",
                        justifyContent: "space-around"
                    }}
                />
                <FlatList
                    style={styles.container}
                    data= {items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.openModal}
                    style={styles.TouchableOpacityStyle}>
                    <Image
                        source={require('../add_icon_b.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
                <Modal animationIn="slideInUp" animationOut="slideOutDown"
                       isVisible={this.state.isModalVisible}
                       >
                    <View style={styles.modalView}>
                        <Text>Category Name:</Text>
                        <TextInput
                            style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1, marginBottom:30, marginTop:20, }}
                            onChangeText={this.setText}
                        />
                        <View style={{ flex: 1,justifyContent:'center',position:'absolute',bottom:0, marginBottom:10 }}>
                            <View style={{flexDirection:'row',}}>
                                <TouchableOpacity
                                    style={{backgroundColor:'#81f681',width:'50%'}}
                                    onPress={() => {saveData(this.props, this.state.category, this.state.category); this.closeModal();}}>
                                    <Text style={{color:'black',textAlign:'center',padding:10}}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor:'#f89494',width:'50%', type:"outline"}}
                                    onPress={()=>this.closeModal()}>
                                    <Text style={{color:'black',textAlign:'center',padding:10}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        );
    }
}



async function saveData(props, category, data){
    try{
        var category_name = "category-"+category;
        await AsyncStorage.setItem(category_name, data.toString());
        console.log(category_name)

    }catch (err){
        console.log(err);
    }

    props.navigation.navigate('Notes', {
        category: category,
    });
}


const styles = StyleSheet.create({
    MainContainer: {
        flex:1,
        backgroundColor: 'transparent',
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
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    separator: {
        height: 0.5, width: "100%", backgroundColor: "#000000"
    },
    modalView:{
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        justifyContent:"center",
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    contentText: {
        fontSize: 25,
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10%',
        marginLeft: '10%',
        color: "#000000",
    },
    card: {
        backgroundColor: '#c1c3e7',
        marginBottom: 5,
        marginTop: 5,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 1,
        shadowOffset: {
            width: 3,
            height: 3,
        },
    },

});

