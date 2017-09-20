import { NavigationActions } from 'react-navigation'

// GLOBAL.navigation.dispatch({ type: 'Navigate', routeName, params });

export function navigate(routeName, params={}) {
  const navigateAction = NavigationActions.navigate({
    routeName, params
  });
  GLOBAL.navigation.dispatch(navigateAction);
}

export function reset(routeName) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName})]
  });
  GLOBAL.navigation.dispatch(resetAction);
}

export function back(key) {
  const backAction = NavigationActions.back({key});
  GLOBAL.navigation.dispatch(backAction);
}

export default {
  navigate, reset, back
}