import React, { useState } from 'react';
import Navigation from './navigation/Navigation';
import { AppLoading } from "expo";
import { YellowBox } from "react-native";
import * as Font from "expo-font";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-condensed-bold": require("./assets/fonts/OpenSansCondensed-Bold.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf")
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  YellowBox.ignoreWarnings(["ReactNative.NativeModules.LottieAnimationView"]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Navigation />
  );
}
