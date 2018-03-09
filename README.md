# Top Spot

## Top Spot looks through your Spotify playlists, finds the most frequently occurring tracks, and creates you a playlist from them.

## Install

Clone the repo
Run `yarn install` or `npm install`

## Spotify credentials

Create yourself a Spotify app on the Developer site
Create a file in the root directory called `.env`:
```
SPOTIFY_CLIENT_ID=[ID]
SPOTIFY_REDIRECT_URI=http://localhost:1234
```

## Running

Run `yarn dev` to start a development server on http://localhost:1234 and to start asset compilation using Parcel

Run `yarn build` to get Parcel to build your application into a `build` directory
