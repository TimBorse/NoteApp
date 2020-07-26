import React, {Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    TextInput, FlatList,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Source Base for Modal: https://medium.com/@alexb72/how-to-create-your-first-modal-popup-for-your-react-native-app-5e50b24d3df1
 */

export default class CategoryClass extends Component {
    items = [];
    focusListener;
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible:false,
            is2ModalVisible:false,
            category: "",
            items: this.items,
            itemId:"",
            refresh: false,
        };
        this.focusListener = props.navigation.addListener('focus', () => {
            this.refreshFlatlist();
        })
    }

    /**
     * Flatlist rerendered
     */
    refreshFlatlist(){
        this.setState({refresh: !this.state.refresh});
        this.importData();
        this.render();
    }

    /**
     * setText method sets text in to-Do
     * @param text: text for category name
     */
    setText = (text)=> {
    this.setState({category: text})
}
    /**
     * Data from async storage is imported and set into @param items
     * Data: id and category
     */
    importData = async () => {
        try {
            this.items = [];
            var keys = await AsyncStorage.getAllKeys();
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                if(key.startsWith("category")){
                    let category = await AsyncStorage.getItem(keys[i]);
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

    /**
     * Flatlist items are rendered here.
     * Has defined View, Checkbox, Text: to-Do and Icon
     * Checkbox is the state for the to-Do: checked/unchecked
     **/
    _renderItem = ({item, index}) => {
        console.log(item.category);
        let {contentText,card,cardEinzeln} = styles;
        const redirect = () => this.props.navigation.navigate('Notes', {
            category: item.category,
        });
        return (
                <TouchableOpacity style={card} onPress={redirect}>
                        <View style={cardEinzeln}>
                            <Text style={contentText}>
                                {item.category}
                            </Text>
                           <Icon
                               type='font-awesome'
                               name='times'
                                color={'#6268b8'}
                                size={30}
                                onPress={() => this.setState({
                                    is2ModalVisible:true,
                                    itemId:item.id
                                })}>
                            </Icon>
                        </View>
                </TouchableOpacity>
        );
    };

    /**
     * Renders view for the screen
     * With 2 Modals that are opened/closed when buttons are pressed
     * */
    render() {
        console.log(this.state.items.length);
        let {items} = this.state;
        return (
            <View style={styles.MainContainer}>
                <Header
                    backgroundImage={require('../resources/category.png')}
                    leftComponent={{ icon: 'arrow-back', size:30, color: '#6268b8', onPress: () =>  this.props.navigation.goBack() }}
                    centerComponent={{ text: '', style: { color: '#6268b8', fontSize:30,fontWeight:"bold", fontStyle:'italic'} }}
                    rightComponent={{ icon: 'home', size:30, color: '#6268b8',onPress: () => this.props.navigation.navigate('Home') }}
                    containerStyle={{
                        backgroundColor: "#caebff",
                        justifyContent: "space-around"
                    }}
                />
                <FlatList
                    style={styles.container}
                    data= {items}
                    extraData={this.state.refresh}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>{
                        this.setState({
                            isModalVisible:true,
                        })
                    }}
                    style={styles.TouchableOpacityStyle}>
                    <Icon
                        raised
                        reverse
                        name={'add'}
                        size={35}
                        color={'#6268b8'}
                    >
                    </Icon>
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
                                    onPress={() => {this.saveData(this.props, this.state.category, this.state.category); {
                                        this.setState({
                                            isModalVisible:false,
                                        })}}}>
                                    <Text style={{color:'black',textAlign:'center',padding:10}}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor:'#f89494',width:'50%', type:"outline"}}
                                    onPress={() =>{
                                        this.setState({
                                            isModalVisible:false,
                                        })}}>
                                    <Text style={{color:'black',textAlign:'center',padding:10}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View>
                    <Modal animationIn="slideInUp" animationOut="slideOutDown"
                           isVisible={this.state.is2ModalVisible===true}>
                        <View style={styles.modalView}>
                            <Text style={{color:'black',marginBottom:5}}>Are you sure you want to delete the category?</Text>
                            <Text style={{color:'black',marginBottom:40}}>Every Note in this Category will be deleted...</Text>
                            <View style={{ flex: 1,justifyContent:'center',position:'absolute',bottom:0, marginBottom:10, marginTop:10}}>
                                <View style={{flexDirection:'row',}}>
                                    <TouchableOpacity
                                        style={{backgroundColor:'#81f681',width:'50%'}}
                                        onPress={() => {
                                            this.removeItemValue(this.state.itemId);
                                            this.setState({
                                                is2ModalVisible:false
                                            })}}>
                                        <Text style={{color:'black',textAlign:'center',padding:10}}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{backgroundColor:'#f89494',width:'50%', type:"outline"}}
                                        onPress={()=>this.setState({
                                            is2ModalVisible:false
                                        })}>
                                        <Text style={{color:'black',textAlign:'center',padding:10}}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

        );
    }

    /**
     *
     * @param key
     *
     */
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            this.refreshFlatlist();
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    /**
     * @param props: properties for screen
     * @param category: category name from setState is passed
     * Asked whether category is not empty
     * Is saved with setItem in DB: category_name as key and category as value
     * refreshFlatlist() is called to update the list immediately
     */
    async saveData(props, category){
        try{
            if (category !== "") {
                var category_name = "category-" + category;
                await AsyncStorage.setItem(category_name, category.toString());
                this.refreshFlatlist();
            }
        }catch (err){
            console.log(err);
        }
    }
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
        marginLeft: '2%',
        color: "#6268b8",
        fontWeight: 'bold',
    },
    cardEinzeln: {
        flexDirection:'row',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: '2%',
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

