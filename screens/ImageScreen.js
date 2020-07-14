import Gallery from 'react-native-image-gallery';
import ImagePicker from 'react-native-image-picker';
import {Component, useState} from 'react';


export default class ImageScreen extends Component{
    render() {
        return (<View></View>);}
          /*  <Gallery
                style={{ flex: 1, backgroundColor: 'black' }}
                images={[
                    { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                    { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                    { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                    { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                ]}
            />
        );
    }*/
}
/*
function openImagePicker(){
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
        const [source, setSource] = useState([]);
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else {
            const source = { uri: response.uri };

            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            imageArray.push(source);
            setSource(imageArray);
        }
    });*/
//}
