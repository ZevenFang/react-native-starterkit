import React from 'react';
import {Text, FlatList, View} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import {connect} from 'dva/mobile';
import moment from 'moment';
import Touch from '../components/Touch';
import PlaceHolder from '../components/PlaceHolder';
import message from '../utils/message';

@connect(({github, loading})=>({github, loading}))
class ExamplePage extends React.Component {

  static navigationOptions = {
    title: 'Example'
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'github/getRepos',
      query: 'react-native-starterkit'
    })
  }

  _renderItem ({item}) {
    return (
      <Touch onPress={()=>message.show('updated '+moment(item.updated_at).fromNow())}>
        <ListItem
          rightIcon={
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>{item.stargazers_count} </Text>
              <Icon size={15} name={item.stargazers_count>0?"favorite":"favorite-border"}/>
            </View>}
          roundAvatar
          title={item.full_name}
          subtitle={item.description}
          avatar={{uri:item.owner.avatar_url}}
        />
      </Touch>
    )
  }

  _keyExtractor = (item, index) => index;

  render() {
    let {github, loading} = this.props;
    return (
      loading&&github.list.length===0?<PlaceHolder loading={loading.global}/>:
      <List style={{marginTop: 0}}>
        <FlatList
          data={github.list}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </List>
    )
  }

}

export default ExamplePage;