import React from 'react';
import {Text, FlatList} from 'react-native';
import { List, ListItem } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
];

class ExamplePage extends React.Component {

  _renderItem ({item}) {
    return (
      <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.subtitle}
        avatar={{uri:item.avatar_url}}
      />
    )
  }

  _keyExtractor = (item, index) => index;

  render() {

    return (
      <List>
        <FlatList
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </List>
    )
  }

}

export default ExamplePage;