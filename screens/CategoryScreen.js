import React, {Component} from 'react';
import ListView from "deprecated-react-native-listview";
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Alert,
    Image,
} from 'react-native';
import {Header} from 'react-native-elements';

export default class CategoryClass extends Component {
    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                'Kategorie 1',
                'Kategorie 2',
                'Kategorie 3',
                'Kategorie 4',
                'Kategorie 5',
            ]),
        };
    }

    getListViewItem = (rowData) => {
        this.props.navigation.navigate('Notes', {
            categorie: rowData,
        });
    }
    clickHandler = () => {
        //function to handle click on floating Action Button
        this.props.navigation.navigate('Test')}

    render() {
        return (
            <View style={styles.MainContainer}>
                <Header
                    backgroundImage={require('../header_ohneText.png')}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => Alert.alert('Menu clicked') }}
                    centerComponent={{ text: 'Note App', style: { color: '#6268b8', fontSize:30,fontWeight:"bold", fontFamily:'Bangla Sangam MN'} }}
                    rightComponent={{ icon: 'home', color: '#fff',onPress: () => Alert.alert('Home clicked') }}
                    containerStyle={{
                        backgroundColor: "transparent",
                        justifyContent: "space-around"
                    }}
                />

                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <Text style={styles.rowViewContainer}
                              onPress={this.getListViewItem.bind(this, rowData)}>{rowData}
                        </Text>
                    }
                    renderSeparator={(sectionId, rowId) =>
                        <View key={rowId} style={styles.separator} />}//adding separation
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.clickHandler}
                    style={styles.TouchableOpacityStyle}>
                    <Image
                        //We are making FAB using TouchableOpacity with an image
                        //We are using online image here
                        // source={{uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png', }}

                        //You can use you project image Example below
                        source={require('../add_icon_b.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>
            </View>
        );
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
        backgroundColor: "#ffffff"
    },
    separator: {
        height: 0.5, width: "100%", backgroundColor: "#000000"
    },
    rowViewContainer: {
        flex: 1,
        paddingRight: 15,
        paddingTop: 13,
        paddingBottom: 13,
        borderBottomWidth: 0.5,
        borderColor: '#c9c9c9',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign:'center',
        fontSize: 25,
        fontWeight: 'bold',
        color:'#6268b8',
        marginLeft: 10,
    },
});

