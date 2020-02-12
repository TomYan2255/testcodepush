import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions, PixelRatio } from "react-native";

export const testFunction = () => {
  const windows = Dimensions.get("window");
  const getFontScale = PixelRatio.getFontScale();
  const ret = Math.min(windows.width, windows.height) / 380 / getFontScale;

  return ret;
};

EStyleSheet.build({
  $rem: testFunction(),
  $bgColor: "rgb(241,243,241)",
  $mainYellow: "rgb(243,186,31)",
  $mainPurple: "rgb(248,54,232)",
  $mainRed: "rgb(205,54,69)",
  $mainGray: "rgb(182,182,182)",
  $labelColor: "rgb(111,111,114)",
  $titleTextColor: "rgb(92,91,92)"
});

export const defaultStyles = EStyleSheet.create({
  icon_button: {
    backgroundColor: "#193966"
  },
  icon_style: {
    color: "white",
    fontSize: 16
  }
});
