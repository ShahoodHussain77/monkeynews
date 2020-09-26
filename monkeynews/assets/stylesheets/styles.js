/**
 * Created by faraz ali on 13/05/2019.
 */

import { StyleSheet, Platform } from 'react-native'

//Importing styles
import iosStyles from './ios-styles';
import androidStyles from './android-styles';
import globalStyles from './global-styles';
import theme from './theme';


/**
 * Creating the app stylesheet with respect to platform
 */
const styles = StyleSheet.create({
    ...globalStyles,
    ...Platform.select({
        ios: iosStyles,
        android: androidStyles
    }),
});


//Exporting App Theme
export const Theme = theme;

//Exporting App Stylesheet
export default styles;