import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as spotifyActions from './../actions/spotify'

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.spotifyActions.fetchUserPlaylists()
    }
    render() {
        const { total, fetching, playlists } = this.props.spotify
        return fetching ?
            <div>
                <p>Fetching...</p>
                <p>Found {total} playlists</p>
                <ul>
                    {playlists.map(p => <li>{p.name}</li>)}
                </ul>
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
