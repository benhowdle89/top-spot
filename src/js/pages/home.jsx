import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from './../actions/auth'

import Dashboard from './../components/dashboard'
import Login from './../components/login'

const parseHashFor = param => {
    const hash = (window.location.hash || "").substring(1);
    const params = {}
    hash.split('&').map(hk => {
        let temp = hk.split('=');
        params[temp[0]] = temp[1]
    });
    return params[param]
}

class Home extends React.Component {
    componentDidMount() {
        const { authActions: { authenticated } } = this.props
        const accessToken = parseHashFor('access_token')
        if (accessToken) {
            authenticated(accessToken)
            window.location.hash = ""
        }
    }
    render() {
        const { accessToken, authActions: { authenticate } } = this.props
        return accessToken ? <Dashboard /> : <Login authenticate={authenticate} />
    }
}

function mapStateToProps({ auth: { accessToken } }) {
    return {
        accessToken
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
