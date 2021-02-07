import React, { Component } from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import { observer } from 'mobx-react';
import UserStore from '../stores/UserStores'
import spotifyApi from '../components/spotify_api/Spotify_API';
// import img1 from '/Users/tsb99/Documents/melodify/frontend/src/spotify-icon-2.png'
import axios from 'axios'

let thisArtist = {}

let artistsTopTracksArray = []

let artistTopTracks = {}

let audioFeatures = {}

let searchItem = {}

export class NewTrack extends Component {
    constructor(props) {
        super(props);

        this.state = {
            thisTrack: [],
        };
    }

    componentDidMount() {
        searchItem.foundations = this.props.track
        console.log('mounted - teehee')

        axios.get(`https://api.spotify.com/v1/artists/${this.props.track.artistID}`, {
            headers: {
                Authorization: localStorage.getItem('spotifyAPI')
            }
        })
            .then(res => {
                console.log(res.data)
                thisArtist = {
                    image: res.data.images[0].url,
                    followers: res.data.followers.total,
                    popularity: res.data.popularity
                }
                searchItem.artist = thisArtist
            })
            .catch(err => console.log(err))

        spotifyApi.getArtistTopTracks(this.props.track.artistID, 'US', { limit: 5 }).then((data) => {
            console.log(UserStore.playlist)
            artistsTopTracksArray = []
            data.tracks.map((item) => (
                artistTopTracks = {
                    id: item.id,
                    name: item.name,
                    artistName: item.artists[0].name,
                    image: item.album.images[0].url,
                    popularity: item.popularity,
                },
                artistsTopTracksArray.push(artistTopTracks),
                searchItem.artistTopTracks = artistTopTracks
            ))
        })

        spotifyApi.getAudioFeaturesForTrack(this.props.track.id).then((data) => {
            console.log(data)
            audioFeatures = {
                acousticness: data.acousticness,
                danceability: data.danceability,
                energy: data.energy,
                instrumentalness: data.instrumentalness,
                liveness: data.liveness,
                loudness: data.loudness,
                speechiness: data.speechiness,
                valence: data.valence
            }
            searchItem.audioFeatures = audioFeatures
        })

        spotifyApi.getAudioAnalysisForTrack(this.props.track.id).then((data) => {
            console.log(data)
            // come back to this
        })
    }


    // onClick = () => {
    //     //UserStore.trackID = this.props.track.id
    //     //console.log(UserStore.trackID)

    //     if (this.props.dropDownStatus == 'Track') {
    //         UserStore.thisTrack = {
    //             id: this.props.track.id,
    //             name: this.props.track.title,
    //             artist: this.props.track.artist,
    //             artistImage: this.props.track.image,
    //             status: 'Track'
    //         }
    //         UserStore.trackLoaded = true
    //     } else if (this.props.dropDownStatus == 'Album') {
    //         UserStore.thisTrack = {
    //             id: this.props.track.id,
    //             name: this.props.track.title,
    //             artist: this.props.track.artist,
    //             artistImage: this.props.track.image,
    //             status: 'Album'
    //         }
    //         UserStore.trackLoaded = true
    //     }
    //     else if (this.props.dropDownStatus == 'Artist') {
    //         UserStore.thisTrack = {
    //             id: this.props.track.id,
    //             name: this.props.track.title,
    //             artist: this.props.track.artist,
    //             artistImage: this.props.track.image,
    //             status: 'Artist'
    //         }
    //         UserStore.trackLoaded = true
    //     }
    //     else if (this.props.dropDownStatus == 'Playlist') {
    //         UserStore.thisTrack = {
    //             id: this.props.track.id,
    //             name: this.props.track.title,
    //             artist: this.props.track.artist,
    //             artistImage: this.props.track.image,
    //             status: 'Playlist'
    //         }
    //         UserStore.trackLoaded = true

    //     }
    // }

    preview = () => {
        UserStore.URI = `spotify:track:${this.props.track.id}`
    }

    render() {
        const { artist, title, image, id } = this.props.track
        return (
            <div>
                {/* <Button style = {{width : '100%', marginTop : '5px', borderRadius : '10px'}}> */}
                <Button onClick={this.props.item.bind(this, searchItem)} style={{ background: 'white', borderBottom: 'solid', borderColor: '#21295c', margin: '10px', width: '90%', borderRadius: '10px' }}>
                    <Row>
                        <Col sm={3} style={{ marginTop: 'auto', marginBottom: 'auto', display: 'block', padding: '5px', marginLeft: '5px', borderRight: 'solid', borderColor: 'black' }}>
                            <img src={image} onClick={this.preview} style={{ height: '100%', width: '55px', border: 'solid', borderColor: '#007bff', borderRadius: '5px' }} />
                        </Col>

                        <Col>
                            <Row style={{ marginTop: '10px' }}>
                                <Col>
                                    <h4 style={{ backgroundColor: '#007bff', color: 'white', margin: '5px', borderRadius: '7px' }}>{artist}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h4 style={{ color: '#007bff' }}>{title}</h4>
                                    {/* <marquee behavior="scroll" direction="left"><h4 style={{ color: '#007bff' }}>{title}</h4></marquee> */}
                                </Col>
                            </Row>
                            {/* {   this.props.dropDownStatus != 'Artist' &&
                                <button style={{ background: 'white', padding: '10px', border: 'none', color: '#007bff', borderRadius: '5px', height: '100%' }} onClick={this.onClick}>
                                    {artist} - {title}
                                </button>
                            }
                            {   this.props.dropDownStatus == 'Artist' &&
                                <button style={{ background: 'white', padding: '10px', border: 'none', color: 'white', borderRadius: '5px', height: '100%' }} onClick={this.onClick}>
                                    {artist}
                                </button>
                            } */}

                        </Col>
                    </Row>


                </Button>

            </div>
        )
    }
}

export default observer(NewTrack)
