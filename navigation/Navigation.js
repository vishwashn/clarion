import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";
import AuthScreen from "../pages/Login";
import Home from "../pages/Home";
import Colors from "../constants/Colors";

const MainNavigator = createSwitchNavigator(
  { Auth: AuthScreen, Home: Home }
);

export default createAppContainer(MainNavigator);
