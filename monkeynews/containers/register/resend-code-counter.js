import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from "../../assets/stylesheets/styles";

class ResendVerificationCode extends Component {

    state = {
        countdownTimer: this.props.startOnMount ? 59 : 0
    }

    componentDidMount() {
        if( this.props.startOnMount ) {
            this.clockCall = setInterval(() => {
                this.decrementClock();
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.clockCall);
    }

    decrementClock = () => {      
        if(this.state.countdownTimer === 0) {
            clearInterval(this.clockCall);
            return;
        }
        this.setState((prevstate) => ({ countdownTimer: prevstate.countdownTimer - 1 }));
    };

    startTimer = () => {
        const payload = {
            user_id: this.props.userData.tempUserId,
        }
        this.props.resendVerificationCodeRequest(this.props.generateFormData(payload), (data) => {
            if( data ) {
                this.setState({ countdownTimer : 59 })
                this.clockCall = setInterval(() => {
                    this.decrementClock();
                }, 1000);
            }
        })
    }

    render() {
        return (
            <View style={styles.resendContainer}>
                <View style={{marginVertical: 10}}>
                    <Text style={[styles.resendText, {fontSize: 20}]}>00 : {this.state.countdownTimer < 10 ? '0'+this.state.countdownTimer : this.state.countdownTimer}</Text>
                </View>
                <TouchableOpacity disabled={this.state.countdownTimer != 0}
                onPress={this.startTimer}>
                    {
                        this.props.userData.loading && !this.props.userData.shouldAnimate ? <ActivityIndicator size="large" color="#fff"/> : <Text style={this.state.countdownTimer != 0 ? { color: '#ffffff30'} : styles.resendText}>Resend</Text>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

export default ResendVerificationCode
