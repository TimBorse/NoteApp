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

class CategoryClass extends Component {
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
        Alert.alert(rowData);
    }
    clickHandler = () => {
        //function to handle click on floating Action Button
        Alert.alert('Floating Button Clicked');}

    render() {
        return (
            <View style={styles.MainContainer}>
                <Header
                    backgroundImage={require('./header_ohneText.png')}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => Alert.alert('Menu clicked') }}
                    centerComponent={{ text: 'Note App', style: { color: '#6268b8', fontSize:30,fontWeight:"bold", fontStyle:'italic', fontFamily:' '} }}
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
                        source={require('./add_icon_b.png')}
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
        //backgroundColor:'black'
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    separator: {
        height: 0.5, width: "100%", backgroundColor: "#6b3389"
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
        color:'#6b3389',
        marginLeft: 10,
    },
});

const styles = StyleSheet.create ({
    container: {
        padding: 12,
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 16,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
})



/* export default class App extends PureComponent {
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
    let {cardText, card, cardImage} = styles;
    return (
      <TouchableOpacity style={card}>
        <Image
          style={cardImage}
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2013/07/12/14/11/note-147951_960_720.png',
          }}
        />
        <Text style={cardText}>{item.title}</Text>
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
  cardText: {
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#d7d7d7',
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
});*/
