/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  newGray: '#696974',
  seperator: '#D3D3D3',
  border: '#DEDEDE',
  white: '#ffffff',
  text: '#212529',
  primary: '#E14032',
  success: '#28a745',
  error: '#dc3545',
  primary: '#FAF8F8',
  primaryComplementary: '#FDF0D9',
  secondary: '#EF7BAE',
  secondaryComplementary: '#FBECF9',

  gray900: '#4c4c4c',
  gray700: '#b2b2b2',
  gray200: '#F3F2F0',
  gray50: 'rgba(122, 122, 122, 0.5)',
  dark: '#404040',

  gray50trans: 'rgba(250, 250, 250, 0.6)',
  gray900trans: 'rgba(32, 30, 30, 0.6)',
  white: '#fff',

  stepperBorderWhite: '#fef5ec',
  primaryTrans: 'rgba(255, 164, 0, 0.5)',

  darkBlackTrans: 'rgba(1, 1, 1, 0.5)',
  blackTrans: 'rgba(1, 1, 1, 0.2)',

  black: '#000',
  Black1: '#22262A',
  greyishBrownTwo: '#404040',
  greyishBrown: '#4c4c4c',
  warmGrey: '#7a7a7a',
  warmGreyTwo: '#999999',
  silver: '#e2e5e8',
  strawberry: '#ed3035',
  warmBlue: '#475cde',
  lightTeal: '#70d3dd',
  purpleyGrey: '#8c8b8f',
  lightishGreen: '#60db91',
  brownishGrey: '#666666',
  lightGrey: '#999999',
  lightGrey2: '#f1f1f1',
  lightGrey3: '#fbfbfb',
  lightGrey4: '#f0f0f0',
  lightGrey5: 'rgba(216,216,216,0.14)',
  lightGrey8: '#C2C2C2',
  White1: '#FFFFFF',
  darkBlue: '#152d4e',
  green: '#60db91',
  black50: '#222222',
  purple: '#5b0034',
  brightPink: '#ff50b5',
  grayDate: '#aeb2b4',
  blueTitle: '#0c3653',
  readMoreLink: '#ff2ea6',
  transparent: 'rgba(0, 0, 0, 0.2)',
  pureTransparent: 'transparent',
  pinkBg: 'rgba(239, 123, 174, 0.05)',
  lightRed2: 'rgb(112,211,221)',
  lightRed3: '#B73331',
  lightRed4: '#B73331',
  frogGreen: 'rgb(96,219,145)',
  lightRed: 'rgba(112,211,221,0.2)',
  shadow: 'rgba(0,0,0,0.06)',
  musturd: 'rgb(249,187,75)',
  orange: 'rgb(249,115,52)',
  darkRed: 'rgb(249,43,28)',
  mehndiGreen: 'rgb(99,151,26)',
  skyBlue: '#d7e0e7',
  darkGreen: '#63971a',
  lightBlue: '#f0f9fb',
  lightGrey6: '#dbdce0',
  lightGrey7: 'rgb(76,76,76)',
  greyOpacity: 'rgba(216, 216, 216, 0.14)',
  lightPink: 'rgb(252, 167, 165)',
  LightPink1: '#F9EEEE',
  lightOrange: 'rgb(247, 194, 148)',
  darkPurple: '#801D19',
  light: '#F3F3F3',
  lightGreyBorder: '#eeecec',
  whiteGray: '#f2f2f2',
  tripGray: '#aaaaaa',
  darkGrey: '#343434',
  red1: '#b73331',
  lightGreyish2: '#e7979d',
  lightGreyish3: 'rgba(231, 151, 157, 0.11)',
  otpPlaceHolder: '#CECECE',
  grassGreen: '#478E25',
  lightWhite: '#F9F9F9',
  lightGreen: '#80C59B',
  grayWhite: '#EAE9E9',
  grayWhite2: '#FAF8F8',
  grayWhite3: '#D9D9D9',
  grayWhite4: '#F7F7F7',
  grayWhite5: '#232323',
  darkGray: '#444444',
  justBlack: '#000000',
  purple1: '#858FE8',
  darkGray2: '#969595',
  cream: 'rgba(47, 153, 20, 0.1)',
  light1: '#FAF8F8',
  grey: '#D9D9D97A',
  black1: '#282622',
  greatLightRed: '#E9E9E9',
  greatLightRed1: '#CCCCCC',
  lightPink3: '#FAEFEF',
  black2: '#181B1C',
  lowPink: '#D1D1D1',
  lightBlue1: '#DBECF8',
}

export const NavigationColors = {
  primary: Colors.primary,
}

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
