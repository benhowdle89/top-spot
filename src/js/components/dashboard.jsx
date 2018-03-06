import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as spotifyActions from './../actions/spotify'

import Playlists from './playlists'
import TopTracks from './top-tracks'
import PlaylistsLoading from './playlists-loading'
import Share from './share'
import AddPlaylist from './add-playlist'

class Dashboard extends React.Component {
    componentDidMount() {
        const { playlists } = this.props.spotify
        if (!playlists.length) {
            return this.props.spotifyActions.fetchUserPlaylists()
        }
    }
    displayPlaylistsLoading() {
        return <PlaylistsLoading />
    }
    displayPlaylists(playlists) {
        const progress = this.props.spotify.trackFetchingProgress
        return <Playlists progress={progress} playlists={playlists} />
    }
    displayTopTracks(tracks) {
        return [<TopTracks tracks={tracks} />, <AddPlaylist addPlaylist={this.props.spotifyActions.addPlaylist} />]
    }
    displayShare() {
        const { createdUrl } = this.props.spotify
        return <Share url={createdUrl} />
    }
    render() {
        const { fetching, playlists, topTracks, createdUrl } = this.props.spotify
        return (
            <div>
                {fetching && this.displayPlaylistsLoading()}
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
