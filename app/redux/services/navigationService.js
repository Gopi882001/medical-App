/**
 * Navigation service will help in Navigations
 * We have Route navigation here for performing root level navigations
 * common functions for navigate, back for Stack
 * Drawer Navigation functions
 */
import {CommonActions, DrawerActions} from '@react-navigation/native';

let navigator;
let profileDrawerNavigatior;

/**
 * This function is called when the RootScreen is created to set the navigator instance to use anywhere.
 */
export function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

export function getTopLevelNavigator() {
  return navigator;
}

export function setProfileDrawerNavigator(navigatorRef) {
  profileDrawerNavigatior = navigatorRef;
}

export function getProfileDrawerNavigator() {
  return profileDrawerNavigatior;
}

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param name The name of the route to navigate. Routes are defined in ScreenStack using createStackNavigator()
 * @param params Route parameters.
 */
export function navigateFromTop(name, params) {
  navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

export function navigateToScreen(route, currNavigation, _params) {
  const navigateAction = CommonActions.navigate({
    name: route,
    params: _params,
  });
  currNavigation.dispatch(navigateAction);
}

export function resetToHome() {
  navigator.dispatch(
    CommonActions.reset({index: 0, routes: [{name: 'SplashScreen'}]}),
  );
}

export function resetApp() {
  navigator.dispatch(
    CommonActions.reset({index: 0, routes: [{name: 'StartupScreen',}]}),
  );
}

export function goBack() {
  navigator.dispatch(CommonActions.goBack());
}

/**
 * Drawer Navigation
 */

export function openDrawer() {
  navigator.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer() {
  navigator.dispatch(DrawerActions.closeDrawer());
}

export function toggleDrawer() {
  navigator.dispatch(DrawerActions.toggleDrawer());
}
//

export function openProfileDrawer() {
  navigator.dispatch(DrawerActions.dangerouslyGetParent().openDrawer());
}

export function closeProfileDrawer() {
  profileDrawerNavigatior.closeDrawer();
}

export function toggleProfileDrawer() {
  profileDrawerNavigatior.toggleDrawer();
}
