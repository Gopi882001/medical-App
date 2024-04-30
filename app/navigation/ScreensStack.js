import { createStackNavigator } from '@react-navigation/stack';

import OverviewScreen from '../screens/overview/OverviewScreenContainer';
import LoginScreen from '../screens/login/LoginScreenContainer';
import OTPScreen from '../screens/login/OTPScreenContainer';
import SplashScreenComponent from '../screens/SplashScreengif';
import SideMenuBarScreen from '../screens/menuBar/SideMenuBarScreenContainer';
import PhoneDirectoryScreen from '../screens/phoneDirectory/PhoneDirectoryDetailScreenContainer';
import UserProfile from '../screens/userProfile/UserProfileScreenContainer';
import PhoneDirectoryItemDetailComponent from '../screens/phoneDirectory/PhoneDirectoryItemDetailComponent';
import BloggingScreenComponents from '../screens/blog/BloggingScreenComponent';
import SpecificCategoryScreenComponent from '../screens/specificCategory/SpecificCategoryScreenComponent';
import EditProfile from '../screens/userProfile/EditProfileScreenContainer';
import PhoneVarify from '../screens/userProfile/PhoneVerifyScreenContainer';
import EmailVarifyScreen from '../screens/userProfile/EmailVerifyScreenContainer';
import BothVarifyScreenComponent from '../screens/userProfile/BothVarifyScreenComponent';
import ChangeGoalScreen from '../screens/changeGoal/ChangeGoalScreenContainer';
import ArticlesDashboard from '../screens/article/ArticlesDashboardContainer';
import MyPickedArticles from '../screens/article/MyPickedArticlesContainer';
import AllRequestedArticles from '../screens/article/AllRequestedArticlesContainer';
import ArticlesSubmittedByMeScreen from '../screens/article/ArticlesSubmittedByMeScreen';
import RequestedArticlesScreen from '../screens/article/RequestedArticlesScreenContainer';
import ChooseGoalModelComponent from '../screens/chooseYourGoal/ChooseGoalModelcomponent';
import WriteAricleScreen from  '../screens/article/writeArticleScreenContainer';
import RequestArticle from '../screens/article/RequestArticleContainer';
import StartupScreen from '../screens/startup/StartupScreenContainer';
import ArticleDetails from '../screens/article/ArticleDetailsContainer';
import * as CONST from '../utils/Constants';
import FullImageScreen from '../screens/blog/FullScreenImage';

const ScreensStack = createStackNavigator();

const MainScreen = () => {

  return (
    <ScreensStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>

      <ScreensStack.Screen name="StartupScreen" component={StartupScreen} />
      <ScreensStack.Screen name="SplashScreen" component={SplashScreenComponent} />
      <ScreensStack.Screen name="OverviewScreen" component={OverviewScreen} />
      <ScreensStack.Screen name="LoginScreen" component={LoginScreen} />
      <ScreensStack.Screen name="OTPScreen" component={OTPScreen} />
      <ScreensStack.Screen name="MenuBar" component={SideMenuBarScreen} />
      <ScreensStack.Screen name="PhoneDirectoryScreen" component={PhoneDirectoryScreen} />
      <ScreensStack.Screen name="UserProfile" component={UserProfile} />
      <ScreensStack.Screen name="PhoneDirectoryItemDetailComponent" component={PhoneDirectoryItemDetailComponent} />
      <ScreensStack.Screen name="BloggingScreen" component={BloggingScreenComponents} />
      <ScreensStack.Screen name="SpecificCategoryScreen" component={SpecificCategoryScreenComponent} />
      <ScreensStack.Screen name="EditProfile" component={EditProfile} />
      <ScreensStack.Screen name="PhoneVarifyScreen" component={PhoneVarify} />
      <ScreensStack.Screen name="EmailVarifyScreen" component={EmailVarifyScreen} />
      <ScreensStack.Screen name="BothVarifyScreen" component={BothVarifyScreenComponent} />
      <ScreensStack.Screen name={CONST.ChangeGoal} component={ChangeGoalScreen} />
      <ScreensStack.Screen name="ArticlesDashboard" component={ArticlesDashboard} />
      <ScreensStack.Screen name="AllRequestedArticles" component={AllRequestedArticles} />
      <ScreensStack.Screen name="FullImage" component={FullImageScreen} /> 
      <ScreensStack.Screen name="MyPickedArticles" component={MyPickedArticles}/>
      <ScreensStack.Screen name="ArticlesSubmittedByMe" component={ArticlesSubmittedByMeScreen}/>
      <ScreensStack.Screen name="RequestedArticles" component={RequestedArticlesScreen} />
      <ScreensStack.Screen name="ChooseYourGoalModelScreen" component={ChooseGoalModelComponent} />
      <ScreensStack.Screen name="WriteArticleScreen" component={WriteAricleScreen} />
      <ScreensStack.Screen name="RequestArticle" component={RequestArticle} />
      <ScreensStack.Screen name="ArticleDetails" component={ArticleDetails}/>

    </ScreensStack.Navigator>

  );
};
export default MainScreen;
