import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as spotifyActions from './../actions/spotify'

import Playlists from './playlists'
import TopTracks from './top-tracks'
import PlaylistsLoading from './playlists-loading'
import Share from './share'
import AddPlaylist from './add-playlist'
import Empty from './empty'

class Dashboard extends React.Component {
    componentDidMount() {
        const { playlists, fetched } = this.props.spotify
        if (!playlists.length && !fetched) {
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
        return <div className="top-tracks-container p2 pt4 center max-width-4 mx-auto">
            {[
                <h2 className="mb2">These are the top tracks you've added to your playlists</h2>,
                <AddPlaylist addPlaylist={addPlaylist} creatingPlaylist={creatingPlaylist} />,
                <TopTracks tracks={tracks} />
            ]}
        </div>
    }
    displayEmpty(type) {
        let message
        if (type === 'playlists') message = `We couldn't find any usable playlists, sorry!`
        else if (type === 'tracks') message = `We couldn't find any tracks to use, sorry!`
        return <Empty message={message} />
    }
    displayShare() {
        const { createdUrl } = this.props.spotify
        return <Share url={createdUrl} />
    }
    render() {
        const { fetching, fetched, playlists, topTracks, fetchingTracks, createdUrl } = this.props.spotify
        return (
            <div className="h-100">
                {fetching && this.displayPlaylistsLoading()}
                {!!playlists.length && !topTracks.length && this.displayPlaylists(playlists)}
                {!fetching && !playlists.length && this.displayEmpty('playlists')}
                {!!topTracks.length && !createdUrl && this.displayTopTracks(topTracks)}
                {!fetching && fetched && playlists.length && !topTracks.length && !fetchingTracks && this.displayEmpty('tracks')}
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
