import React from 'react';
import {Image, View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import colors from '../utils/colors';

class PlaceHolder extends React.Component {

  render() {
    let {loading, onRefresh, text, image} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {loading?<ActivityIndicator size="large" color={colors.defaults.title}/>:
          (image?
            <View style={styles.content}>
              <Image source={image} resizeMode='contain' style={{width: 100, height: 100}} />
              <Text style={styles.text}>{text||'暂无数据'}</Text>
            </View>:
            <TouchableOpacity onPress={onRefresh} style={styles.content}>
              <Icon size={80} color={colors.defaults.title} type="ionicon" name="ios-refresh"/>
              <Text style={styles.text}>{text||'暂无数据'}</Text>
            </TouchableOpacity>)
        }
      </View>
    )
  }

}

let styles = {
  content: {padding: 10},
  text: {color: colors.defaults.title, marginTop: 10}
};

export default PlaceHolder;