import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as spotifyActions from './../actions/spotify'

class Dashboard extends React.Component {
    componentDidMount() {
        const { playlists, fetched } = this.props.spotify
        if (!playlists.length) {
            return this.props.spotifyActions.fetchUserPlaylists()
        }
        if (!fetched && playlists.length) {
            return this.props.spotifyActions.findTopXTracks()
        }
    }
    componentWillReceiveProps(nextProps) {
        const { playlists, fetched, topTracks } = this.props.spotify
        if (!fetched && playlists.length && !topTracks.length) {
            return this.props.spotifyActions.findTopXTracks()
        }
    }
    displayPlaylists(playlists) {
        return <ul>{playlists.map(p => <li>{p.name}</li>)}</ul>
    }
    displayTopTracks(tracks) {
        return <ul>{tracks.map(t => <li>{t.track.name}</li>)}</ul>
    }
    render() {
        const { fetching, playlists, topTracks } = this.props.spotify
        return (
            <div>
                {fetching && <p>Fetching...</p>}
                {!!playlists.length && !topTracks.length && this.displayPlaylists(playlists)}
                {!!topTracks.length && this.displayTopTracks(topTracks)}
            </div>
        )
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
