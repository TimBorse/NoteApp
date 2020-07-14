import Gallery from 'react-native-image-gallery';
import ImagePicker from 'react-native-image-picker';
import React, {Component, useState} from 'react';
import  {StyleSheet, Image, TouchableOpacity, View} from 'react-native';


export default class ImageScreen extends Component{

    constructor() {
        super();
        this.state= {avatarSource: []};
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
                console.log(state.length);
                for(var i=0;i<state.length;i++){
                    images.push(state[i]);
                }
                var image = {source: source, dimensions: { width: 150, height: 150 }};
                images.push(image);
                console.log(this.state.avatarSource);
                this.setState({avatarSource: images});
            }
        });
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


