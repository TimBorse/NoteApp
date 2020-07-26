import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {CheckBox, Header, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class ToDoListScreen extends Component {
    items = [];
    focusListener;
    constructor(props) {
        super(props);
        this.focusListener = props.navigation.addListener('focus', () => {
            this.reloadFlatlist();
        })
        this.state = {
            toDo: "",
            items: this.items,
            refresh: false,
        };
    }


    /**
     * @param text: setText method sets text in to-Do
     */
    setText = (text)=> {
        this.setState({toDo: text})
    }

    /**
     * Flatlist rerendered
     */
    reloadFlatlist(){
        this.setState({refresh: !this.state.refresh})
        this.importData();
        this.render();
    }


    /**
     * Data from async storage is imported and set into @param items
     * Data: id, to-Do and checked
     * parsed because values are JSON Objects
     */
    importData = async () => {
        try {
            this.items = [];
            var keys = await AsyncStorage.getAllKeys();
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                if(key.startsWith("toDo-")){
                    let jsonObj = await AsyncStorage.getItem(keys[i]);
                    let jsStatus = JSON.parse(jsonObj)
                    this.items.push({
                        toDo: jsStatus.toDo,
                        id: key,
                        checked: jsStatus.status,
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
        this.setState({items: this.items});
    }


    /**
     * @param iditem: id of the item:
     * state is changed for the specific item
     * iditem is compared to items.id and passed to res if the same
     * checked state is changed and updated
     */
    handleOnPress = (iditem) => {
        var res = this.items.find(obj => { return obj.id === iditem.id})
        res.checked = !iditem.checked
        this.overrideData(iditem);
        this.setState({items: this.items});
    }



    /**
     * Flatlist items are rendered here.
     * Has defined View, Checkbox, Text: to-Do and Icon
     * Checkbox is the state for the to-Do: checked/unchecked
     **/
    _renderItem = ({item, index}) => {
        let {contentText,card,cardEinzeln} = styles;
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
                        onPress={() => this.handleOnPress(item)}
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
                        onPress={() => {this.removeItemValue(item.id);}}
                    >
                    </Icon>
                </View>
            </View>
        );
    };

    /**
     * Renders view for the screen
     *
     * */
    render() {
        let {items} = this.state;
        return (
            <View style={styles.MainContainer}>
                <Header
                    backgroundImage={require('../resources/todolist.png')}
                    leftComponent={{ icon: 'arrow-back', size:30, color: '#6268b8', onPress: () =>  this.props.navigation.goBack() }}
                    centerComponent={{ text: '', style: { color: '#6268b8', fontSize:30,fontWeight:"bold", } }}
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
                        onPress={() => {this.saveData(this.props, this.state.toDo);}}>
                        <Text style={{color:'black',textAlign:'center',padding:10,fontWeight:"bold"}}>Add</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={styles.container}
                    data= {items}
                    extraData={this.state.refresh}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
            </View>

        );
    }


    /**
     * @param props: properties for screen
     * @param to-DO: to-do is the passed to-Do name
     * Asked whether to-DO is not empty
     * to-Do is set with status in datas
     * Is saved with setItem in DB: toDo_name as key and datas as value (stringify) due to JSON object
     * reloadFlatlist () is called to update the list immediately
     */
    async saveData(props, toDO){
        try{
            if (toDO !== "") {
                let datas=({
                    toDo: toDO,
                    status: false
                });

                var toDo_name = "toDo-" + toDO;

                await AsyncStorage.setItem(toDo_name,JSON.stringify(datas));
                this.reloadFlatlist();
            }
        }catch (err){
            console.log(err);
        }

    }

    /**
     * Data will be overwritten to match the transferred @param
     * @param item: to-Do and status
     */
    async overrideData(item){
        try{
            if(item.toDo !== ""){
                let datas=({
                    toDo: item.toDo,
                    status: item.checked
                });
                var toDo_name = "toDo-" + item.toDo;
                await AsyncStorage.setItem(toDo_name,JSON.stringify(datas));
            }

        }catch (err){
        console.log(err);
    }
    }

    /**
     * Item is deleted from the DB with the key
     * and reloadFlatlist is called to update the list immediately
     * @param key: id of item
     */
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            this.reloadFlatlist();
            return true;
        }
        catch(exception) {
            return false;
        }
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

