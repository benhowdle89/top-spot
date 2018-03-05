import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as spotifyActions from './../actions/spotify'

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.spotifyActions.fetchUserPlaylists()
    }
    render() {
        const { total, fetching } = this.props.spotify
        return fetching ?
            <div>
                <p>Fetching...</p>
                <p>Found {total} playlists</p>
            </div> : <p></p>

    }
}

function mapStateToProps({ spotify }) {
    return {
        spotify
    }
}

function mapDispatchToProps(dispatch) {
    return {
        spotifyActions: bindActionCreators(spotifyActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
