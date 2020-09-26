import React, { PureComponent } from 'react'
import { Text, ScrollView, RefreshControl } from "react-native";
import styles from "../../assets/stylesheets/styles";
import { connect } from "react-redux";
import { loadingAction, termsRequest } from "../../actions/AppInfoActions";

class TermsAndCondition extends PureComponent {
    static routeName = "TermsAndCondition";

    componentDidMount() {
        this.loadContent();
    }

    loadContent() {
        this.props.loadingAction({ isLoading: true })
        this.props.termsRequest({content_type: 'tc'});
    }

    render() {
        return (
            <ScrollView 
                contentContainerStyle={styles.flexGrow} style={styles.backgroundContainer}
                refreshControl={ <RefreshControl refreshing={this.props.appInfo.loading} onRefresh={()=> this.loadContent() } /> }
            >
                <Text style={styles.termsText}>{this.props.appInfo.termsData}</Text>
            </ScrollView>
        )
    }
}

const mapStateToProps = ({appInfo}) => ({
    appInfo
});

const actions = { loadingAction, termsRequest };

export default connect(mapStateToProps, actions)(TermsAndCondition);