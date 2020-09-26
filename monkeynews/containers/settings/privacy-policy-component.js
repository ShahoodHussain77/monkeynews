import React, { PureComponent } from 'react'
import { Text, ScrollView, RefreshControl } from "react-native";
import styles from "../../assets/stylesheets/styles";
import { connect } from "react-redux";
import { loadingAction, privacyRequest } from "../../actions/AppInfoActions";

export class PrivacyPolicy extends PureComponent {
    static routeName = "PrivacyPolicy";

    componentDidMount() {
        this.loadContent()
    }

    loadContent() {
        this.props.loadingAction({ isLoading: true })
        this.props.privacyRequest({content_type: 'pp'});
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.flexGrow} style={styles.backgroundContainer}
                refreshControl={ <RefreshControl refreshing={this.props.appInfo.loading} onRefresh={()=> this.loadContent() } /> }
            >
                <Text style={styles.termsText}>{this.props.appInfo.privacyData}</Text>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({appInfo}) => ({
    appInfo
});

const actions = { loadingAction, privacyRequest };

export default connect(mapStateToProps, actions)(PrivacyPolicy);