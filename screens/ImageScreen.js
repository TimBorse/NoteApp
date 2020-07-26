import Gallery from 'react-native-image-gallery';
import ImagePicker from 'react-native-image-picker';
import React, {Component, useState} from 'react';
import {StyleSheet, Image, TouchableOpacity, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Header, Icon} from 'react-native-elements';

/**
 * The screen for the images of a note
 */
export default class ImageScreen extends Component{

    noteId;
    id;
    index;

    /**
     * Initializes state and data
     *
     * @param props: Properties of the screen
     */
    constructor(props) {
        super();
        this.state= {index: 0, images: []};
        this.noteId = props.route.params.id;
        this.id = "Image-";
        this.id += this.noteId.split('-')[1] + "-";
        this.id += this.noteId.split('-')[2];
        this.importData();
    }

    /**
     * Changes index in state
     *
     * @param i: Number to change the index to
     */
    changeIndex = i => {
       this.setState({index: i});
    }

    /**
     * Retrieves the images associated to the note from the Async Storage
     */
    async importData(){
        try {
            var images=[];
            var keys = await AsyncStorage.getAllKeys();
            for (var i = 0; i < keys.length; i++) {
                let key = keys[i];
                if(key == this.id){
                    let value = await AsyncStorage.getItem(keys[i]);
                    let storedImages = value.split(";");
                    for(var j=0; j<storedImages.length;j++){
                        var image = {source: {uri:storedImages[j]}, dimensions: { width: 150, height: 150 }};
                        images.push(image);
                    }
                }
            }
            this.setState({images: images});
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Opens the Image Picker. After the selection it updates the state and saves it to the Async Storage
     *
     * Base Source: https://www.npmjs.com/package/react-native-image-picker
     */
    openImagePicker(){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                var images = []
                const state = this.state.images;
                for(var i=0;i<state.length;i++){
                    images.push(state[i]);
                }
                var image = {source: source, dimensions: { width: 150, height: 150 }};
                images.push(image);
                this.setState({images: images});
                this._gallery.getViewPagerInstance().scrollToPage(images.length-1, false)
                this.saveImages();
            }
        });
    }

    /**
     * Saves Images to Async Storage
     */
    async saveImages(){
        var images = this.state.images;
        var str = "";
        for(var i=0; i<images.length;i++){
          str += images[i].source.uri;
          if(i<images.length-1)
            str += ";";
        }
        if(str != ""){
            await AsyncStorage.setItem(this.id, str);
        }else{
            await AsyncStorage.removeItem(this.id);
        }
    }

    /**
     * Remove the image which the index of the state points to from Async Storage
     */
    async removeImage(){
        var images = this.state.images;
        var index = this.state.index;
        console.log(index);
        console.log("length:"+ images.length)
        if(images.length == 1){
            images.pop();
        }
        else if(index+1 < images.length){
            images.splice(index, 1);
        }else{
            images.pop();
            this._gallery.getViewPagerInstance().scrollToPage(index-1, false)
        }
        this.setState({images: images});
        this.saveImages();
    }

    /**
     * Renders the elements of this screen
     */
    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: 0
            }}>
                <Header
                    backgroundImage={require('../resources/images.png')}
                    leftComponent={{ icon: 'arrow-back', size:30, color: '#6268b8', onPress: () =>  this.props.navigation.navigate('Editor',{id: this.noteId}) }}
                    centerComponent={{ text: '', style: { color: '#6268b8', fontSize:30,fontWeight:"bold", fontStyle:'italic',} }}
                    rightComponent={{ icon: 'home', color: '#6268b8',onPress: () => this.props.navigation.navigate('Home') }}
                    containerStyle={{
                        backgroundColor: "transparent",
                        justifyContent: "space-around"
                    }}
                />
                <Gallery
                    ref={(c) => { this._gallery = c }}
                    style={{ flex: 1, backgroundColor: 'transparent' }}
                    images={this.state.images}
                    onPageSelected={this.changeIndex}
                />
                <View style={{flexDirection:'row',justifyContent: 'space-around',marginBottom:10}}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.openImagePicker()}
                    style={styles.ImageOpacityStyle}>
                    <Icon
                        reverse
                        raised
                        type='font-awesome'
                        name={'image'}
                        size={35}
                        color={'#6268b8'}
                    >
                    </Icon>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.removeImage()}
                    style={styles.ImageOpacityStyle}>
                    <Icon
                        raised
                        reverse
                        type='font-awesome'
                        name={'trash-o'}
                        size={35}
                        color={'#6268b8'}
                    >
                    </Icon>
                </TouchableOpacity>
                </View>
            </View>



        );
    }
}

/**
 * The styles of the elements of this screen
 */
const styles = StyleSheet.create({FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 75,
        height: 75,
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },});

/**
 *  Options for the Image Picker
 */
const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


