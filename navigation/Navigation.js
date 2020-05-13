import {
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";
import AuthScreen from "../pages/Login";
import Home from "../pages/Home";

const MainNavigator = createSwitchNavigator(
  { Auth: AuthScreen, Home: Home }
);

export default createAppContainer(MainNavigator);
