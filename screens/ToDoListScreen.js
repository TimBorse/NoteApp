import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Alert,
    TextInput, FlatList,
} from 'react-native';
import {Header, Icon, CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class ToDoListScreen extends Component {
    items = [];
    focusListener;
    constructor(props) {
        super(props);

        this.state = {
            toDo: "",
            items: this.items,
            checked: this.props.checked,
        };

        this.focusListener = props.navigation.addListener('focus', () => {
            this.importData();
            this.render();
        })

    }

    setText = (text)=> {
        this.setState({toDo: text})
    }


    importData = async () => {
        try {
            this.items = [];
            var keys = await AsyncStorage.getAllKeys();
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                if(key.startsWith("toDo-")){
                    let toDo = await AsyncStorage.getItem(keys[i]);
                    this.items.push({
                        toDo: toDo,
                        id: key,
                        checked: false,
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
        this.setState({items: this.items});
    }


    _renderItem = ({item, index}) => {
        let {contentText,card,cardEinzeln} = styles;

       const handleOnPress = (item) => {
           var res = this.items.find(obj => { return obj.id = item.id})
           console.log(item.id)
           res.checked = !item.checked
           this.setState({items: this.items});
       }
        return (
            <View style={card}>
                <View style={cardEinzeln}>
                    <CheckBox
                        checkedIcon='check-square-o'
                        uncheckedIcon='check-square-o'
                        uncheckedColor={'#fff'}
                        checkedColor={'#528d45'}
                        checked={item.checked}
                        size={30}
                        onPress={() => handleOnPress(item)}
                    />
                    <Text style={contentText}>
                        {item.toDo}
                    </Text>
                    <Icon
                        type='font-awesome'
                        name='times'
                        color={'#6268b8'}
                        size={30}
                        containerStyle={{marginRight:10}}
                        onPress={() => {removeItemValue(item.id);}}
                    >
                    </Icon>
                </View>
            </View>
        );
    };

    render() {
        console.log(this.state.items.length);
        let {items} = this.state;

        return (
            <View style={styles.MainContainer}>
                <Header
                    // backgroundImage={require('../header_ohneText.png')}
                    leftComponent={{ icon: 'menu', color: '#6268b8', onPress: () =>  Alert.alert("Menu clicked!")}}
                    centerComponent={{ text: 'To Do List', style: { color: '#6268b8', fontSize:30,fontWeight:"bold", } }}
                    rightComponent={{ icon: 'home', color: '#6268b8',onPress: () => this.props.navigation.navigate('Home') }}
                    containerStyle={{
                        backgroundColor: "#caebff",
                        justifyContent: "space-around"
                    }}
                />
                <View style={styles.inputBox}>
                    <TextInput
                        style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 2, marginBottom:10, marginTop:10, }}
                        onChangeText={this.setText}
                        placeholder={"To Do Input"}
                    />
                    <TouchableOpacity
                        style={{backgroundColor:'#c1c3e7',height:40,width:60, marginBottom:10, marginTop:10,}}
                        onPress={() => {saveData(this.props, this.state.toDo, this.state.toDo);}}>
                        <Text style={{color:'black',textAlign:'center',padding:10,fontWeight:"bold"}}>Add</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.container}
                    data= {items}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
            </View>

        );
    }
}



async function saveData(props, toDO, data){
    try{
        if (data !== "") {
            var toDo_name = "toDo-" + toDO;
            await AsyncStorage.setItem(toDo_name, data.toString());
            console.log(toDo_name)
        }
    }catch (err){
        console.log(err);
    }
}

async function removeItemValue(key) {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}


const styles = StyleSheet.create({
    MainContainer: {
        flex:1,
        backgroundColor: 'transparent',
    },
    contentText: {
        fontSize: 25,
        flex: 1,
        textAlign: 'left',
        color: "#000000",
    },
    inputBox: {
        flexDirection:'row',
        marginBottom: 5,
        marginTop:5,
        marginLeft: '2%',
        width: '96%',
        justifyContent: 'space-around',
    },
    cardEinzeln: {
        flexDirection:'row',
        alignItems:"center",
        marginBottom: 5,
        marginTop: 5,
        width: '96%',
    },
    card: {
        backgroundColor: '#c1c3e7',
        borderColor: '#6268b8',
        borderWidth: 2,
        borderRadius:10,
        marginBottom: 5,
        marginTop:5,
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

