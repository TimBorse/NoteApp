import Gallery from 'react-native-image-gallery';
import ImagePicker from 'react-native-image-picker';
import React, {Component, useState} from 'react';
import  {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class ImageScreen extends Component{
    id;
    constructor(props) {
        super();
        this.state= {avatarSource: []};
        var noteId = props.route.params.id;
        this.id = "Image-";
        this.id += noteId.split('-')[1] + "-";
        this.id += noteId.split('-')[2];
        this.importData();
    }
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
            this.setState({avatarSource: images});
        } catch (error) {
            console.error(error);
        }
    }
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
                console.log(source);

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                var images = []
                const state = this.state.avatarSource;
                for(var i=0;i<state.length;i++){
                    console.log(state[i]);
                    images.push(state[i]);
                }
                var image = {source: source, dimensions: { width: 150, height: 150 }};
                images.push(image);
                this.setState({avatarSource: images});
            }
        });
    }

    async saveImages(){
        var images = this.state.avatarSource;
        var str = "";
        for(var i=0; i<images.length;i++){
          str += images[i].source.uri;
          if(i<images.length-1)
            str += ";";
        }
        if(str != ""){
            console.log(this.id)
            console.log(str);
            await AsyncStorage.setItem(this.id, str);
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                marginTop: 0
            }}>
                <Gallery
                    style={{ flex: 1, backgroundColor: 'black' }}
                    images={this.state.avatarSource}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.openImagePicker()}
                    style={styles.ImageOpacityStyle}>
                    <Image
                        //We are making FAB using TouchableOpacity with an image
                        //We are using online image here
                        // source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png', }}

                        //You can use you project image Example below
                        source={require('../gallery_icon.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.saveImages()}
                    style={styles.ImageOpacityStyle}>
                    <Image
                        //We are making FAB using TouchableOpacity with an image
                        //We are using online image here
                        // source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png', }}

                        //You can use you project image Example below
                        source={require('../save_icon.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
            </View>



        );
    }
}
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

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};


