/**
 * Created by faraz ali on 13/05/2019.
 */

import Theme from './theme';

export default {
    goButton:{
        backgroundColor: Theme.secondary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.25,
        borderRadius:20,
        elevation:10,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        //left:'5%',
        top:'98%',
        height:40,
        width:105,
        zIndex:10,
        position:'absolute'
    },
    goButton2:{
        backgroundColor: Theme.secondary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 4.25,
        borderRadius:20,
        elevation:10,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        //left:'35%',
        top:'98%',
        height:40,
        width:105,
        zIndex:10,
        position:'absolute'
    },
    imageView:{
        flex:1.2,
        alignItems:'center',
    },
    mainHeading:{
        flex:1.8,
        flexDirection:'row',
        fontSize:24,
        color:Theme.primary,
        fontWeight:'bold',
        marginLeft:'5%',
        marginTop:'10%'
    },
}