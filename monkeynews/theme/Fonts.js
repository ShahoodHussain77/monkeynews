// @flow

const type = {
  // base: "ParalucentText-Book",
  // medium: "Paralucent-Medium",
  SemiBold: "Poppins-SemiBold",
  Regular: "Poppins-Regular",
  Bold: "Poppins-Bold",
  ExtraBold: "Poppins-ExtraBold",
  Italic: "Poppins-Italic",
  Light: "Poppins-Light",
  Medium: "Poppins-Medium",
  SemiBoldItalic: "Poppins-SemiBoldItalic",

  /* base: "Helvetica Neue" */
  /* Platform.select({
    ios: "Helvetica Neue",
    android: "Roboto"
  }) */
  /*  bold: Platform.select({
    ios: "HelveticaNeue-Medium",
    android: "Roboto"
  }),
  italic: Platform.select({
    ios: "HelveticaNeue-Italic",
    android: "Roboto"
  }) */
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxxSmall: 10,
  xxxSmall: 11,
  xxSmall: 13,
  xSmall: 14,
  small: 15,
  normal: 17,
  medium: 18,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
  xxxxLarge: 40
};

export default {
  type,
  size
};
