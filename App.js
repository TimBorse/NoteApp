import React, {PureComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

export default class App extends PureComponent {
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
});
