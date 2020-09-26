import React, { PureComponent } from "react";
import { Keyboard } from "react-native";
import { TabBarComponent } from "./header-options";

class CustomTabBar extends PureComponent{
    constructor(props) {
        super(props)

        this.keyboardWillShow = this.keyboardWillShow.bind(this)
        this.keyboardWillHide = this.keyboardWillHide.bind(this)

        this.state = {
            isVisible: true
        }
    }

    componentWillUnmount() {
        this.keyboardWillShowSub.remove()
        this.keyboardWillHideSub.remove()
    }

    componentDidMount() {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    }

    keyboardWillShow = event => {
        this.setState({
            isVisible: false
        })
    }

    keyboardWillHide = event => {
        this.setState({
            isVisible: true
        })
    }
  
    render() {
        const {isVisible} = this.state
        return <TabBarComponent {...this.props.navigationProps} />
        if (!isVisible) {
            return null;
        } else {
            return <TabBarComponent {...this.props.navigationProps} />
        }
    }
}

export default CustomTabBar