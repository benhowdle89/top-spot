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
    }
    // componentWillReceiveProps(nextProps) {
    //     const { playlists, fetched, topTracks } = this.props.spotify
    //     if (fetched && playlists.length && !topTracks.length) {
    //         return this.props.spotifyActions.findTopXTracks()
    //     }
    // }
    displayPlaylists(playlists) {
        return <ul>{playlists.map(p => <li>{p.name}</li>)}</ul>
    }
    displayTopTracks(tracks) {
        return <div>
            <ul>{tracks.map(t => <li>{t.track.name}</li>)}</ul>
            <button onClick={this.props.spotifyActions.addPlaylist}>Add this playlist to your account</button>
        </div>
    }
    displayShare() {
        const { createdUrl } = this.props.spotify
        return <a href={createdUrl} target="_BLANK">View playlist</a>
    }
    render() {
        const { fetching, playlists, topTracks, createdUrl } = this.props.spotify
        return (
            <div>
                {fetching && <p>Fetching...</p>}
                {!!playlists.length && !topTracks.length && this.displayPlaylists(playlists)}
                {!!topTracks.length && !createdUrl && this.displayTopTracks(topTracks)}
                {createdUrl && this.displayShare()}
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
