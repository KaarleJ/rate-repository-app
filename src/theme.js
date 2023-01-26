import { Platform } from 'react-native';



const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textHeading: '#FFFFFF',
    primary: '#0366d6',
    mainBackground: '#F0EBEB'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.OS === 'android' ? 'Roboto' : 'Arial'
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

if (Platform.OS === 'android') {
  theme.fonts.main='Roboto'
} else if (Platform.OS === 'ios') {
  theme.fonts.main='Arial'
}

export default theme;