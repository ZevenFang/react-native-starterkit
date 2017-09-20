import {ToastAndroid, Alert, Platform} from 'react-native';

export function show(msg, duration) {
  if (Platform.OS === 'ios')
    Alert.alert(msg, '', [{text: '确定'}]);
  else
    ToastAndroid.show(msg, duration||ToastAndroid.SHORT);
}

export default {
  show
}