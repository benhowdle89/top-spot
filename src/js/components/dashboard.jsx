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
        return <PlaylistsLoading message="Fetching your playlists" />
    }
    displayPlaylists(playlists) {
        const { fetchingTracks, trackFetchingProgress: progress } = this.props.spotify
        const output = [<Playlists playlists={playlists} />]
        if (fetchingTracks) {
            output.unshift(<PlaylistsLoading message="Analysing your tracks" progress={progress} />)
        }
        return output
    }
    displayTopTracks(tracks) {
        const { addPlaylist } = this.props.spotifyActions
        const { creatingPlaylist } = this.props.spotify
        return <div className="top-tracks-container p4 max-width-2 mx-auto flex justify-center items-center flex-column">
            {[
                <TopTracks tracks={tracks} />,
                <AddPlaylist addPlaylist={addPlaylist} creatingPlaylist={creatingPlaylist} />
            ]}
        </div>
    }
    displayShare() {
        const { createdUrl } = this.props.spotify
        return <Share url={createdUrl} />
    }
    render() {
        const { fetching, playlists, topTracks, createdUrl } = this.props.spotify
        return (
            <div className="h-100">
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
