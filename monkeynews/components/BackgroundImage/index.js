import React, { useMemo } from 'react'
import styles from "../../assets/stylesheets/styles";
import { ImageBackground } from 'react-native'

const BackgroundImage = (props) => {
    // const image = useMemo(() => {
    //     return (
    //         <ImageBackground source={props.image}
    //         style={styles.bgImageContainer}
    //         imageStyle={styles.bgImageContainerStyle}>
    //             {props.children}
    //         </ImageBackground>
    //     )
    // }, []);
    return (
        <ImageBackground source={props.image}
        style={styles.bgImageContainer}
        imageStyle={styles.bgImageContainerStyle}>
            {props.children}
        </ImageBackground>
    )
    // return image;
}

export default BackgroundImage
