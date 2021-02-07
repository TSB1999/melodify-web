import React, { Component } from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar as Sidebar1 } from 'semantic-ui-react'
import { Row, Col, Carousel, Card } from 'react-bootstrap'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Link } from 'react-router-dom'
import UserStore from "../../stores/UserStores"

import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import SpotifyPlayer from 'react-spotify-player';
import { observer } from 'mobx-react'
import spotifyApi from '../../components/spotify_api/Spotify_API'
import { Container, Button } from '@material-ui/core';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SaveIcon from '@material-ui/icons/Save';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { CardMedia, Typography } from '@material-ui/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MediaControlCard from '../meloPlayer.js'
import FaceIcon from '@material-ui/icons/Face';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SettingsIcon from '@material-ui/icons/Settings';

import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';

import "./Sidebar.css";

let currentlyPlaying = {}

let playbackState = {}

let allUsers = []

let thisTrack = {}

const Sidebar = () => {

    const [saved, setSaved] = React.useState(false)
    const signout = () => {
        UserStore.isLoggedIn = false
        sessionStorage.removeItem('FBIdToken');
        sessionStorage.removeItem('UserStore')
        localStorage.removeItem('spotifyAPI')
        delete axios.defaults.headers.common['Authorization']
        window.location.href = '/'
    }

    const postTrack = (id) => {

        spotifyApi.getTrack(id).then((response) => {
            thisTrack = {
                id: response.id,
                name: response.name,
                artist: response.album.artists[0].name,
                artistImage: response.album.images[0].url
            }

            UserStore.thisTrack = {
                id: thisTrack.id,
                name: thisTrack.name,
                artist: thisTrack.artist,
                artistImage: thisTrack.artistImage,
                status: 'Track'
            }
            // trackLoaded = true
            UserStore.trackLoaded = true
        })
    }

    const saveTrack = (id) => {
        spotifyApi.addToMySavedTracks([id]).then((response) => {
            console.log(response)
            setSaved(true)
        })
    }

    const nextTrack = () => {
        axios.post(`https://api.spotify.com/v1/me/player/next`, {
            headers: {
                Authorization: localStorage.getItem('spotifyAPI')
            }
        })
    }

    console.log(`${UserStore.URI.substring(14)}`)
    dayjs.extend(relativeTime)
    return (
        <div>
            <Sidebar1
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible
                width='wide'
                style={{ border: 'none', borderColor: 'white', backgroundColor: '#007bff' }}
            >


                {UserStore.spotifyLoggedIn &&
                    <Menu.Item>
                        {UserStore.spotifyLoggedIn &&
                            <Card style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', padding: '10px', marginLeft: '10px', marginRight: '10px', borderRadius: '10px', borderBottom: 'solid', borderColor: '#007bff' }}>
                                <Row>
                                    <Col lg={5} style={{ borderRight: 'solid', borderColor: 'black' }}>
                                        {/* <FaceIcon style={{ color: '#007bff', marginRight: 'auto' }} /> */}
                                        <Image src={UserStore.thisSpotifyProfile.image} style={{ height: '40px', width: '40px', marginLeft: 'auto', marginRight: 'auto', display: 'block', border: 'solid', borderRadius: '20px', borderColor: 'white' }} />
                                    </Col>
                                    <Col>
                                        {!UserStore.isLoggedIn &&
                                            <Row style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                                <a href='http://localhost:8888' style={{ backgroundColor: '#1db954', color: 'white', padding: '1em 1.5em', textDecoration: 'none', textTransform: 'bold' }} > Not You?</a>
                                            </Row>
                                        }
                                        {UserStore.isLoggedIn &&
                                            <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                <h4 style={{ color: 'white', backgroundColor: '#007bff', padding: '10px', borderRadius: '10px' }}>Keem</h4>
                                            </Row>
                                        }
                                    </Col>
                                </Row>
                            </Card>
                        }
                        {UserStore.isLoggedIn &&
                            <div style={{ marginLeft: '0px', borderLeft: 'solid', borderRight: 'solid', borderBottom: 'solid', borderRadius: '25px', }}>
                                <MediaControlCard currentlyPlaying={currentlyPlaying} />

                                <div>
                                    <Button variant='primary' style={{ backgroundColor: 'white ', margin: '5px' }} onClick={() => this.postTrack(UserStore.playbackState.id)}><PostAddIcon style={{ color: '#007bff' }} /></Button>

                                    {saved &&
                                        <Button variant='primary' style={{ backgroundColor: 'white ', margin: '5px' }} onClick={() => this.saveTrack(UserStore.playbackState.id)}><SaveOutlinedIcon style={{ color: '#007bff' }} /></Button>
                                    }
                                    {saved &&
                                        <Button variant='primary' style={{ backgroundColor: 'white ', margin: '5px' }} onClick={() => this.saveTrack(UserStore.playbackState.id)}><SaveIcon style={{ color: '#007bff' }} /></Button>
                                    }

                                    <Button variant='primary' style={{ backgroundColor: 'white ', margin: '5px' }} onClick={() => this.postTrack(UserStore.playbackState.id)}><SearchIcon style={{ color: '#007bff' }} /></Button>
                                </div>
                            </div>
                        }


                    </Menu.Item>
                }
                <Menu.Item as={Link} to="/">
                    <Icon name='home' />
                        Home
                    </Menu.Item>
                <Menu.Item as={Link} to="/discover" style={{ backgroundColor: '#007bff' }}>
                    <Icon name='music' style={{ color: '#AAAFB4' }} />
                        Discover
                    </Menu.Item>
                <Menu.Item as={Link} to="/messages" style={{ backgroundColor: '#007bff' }}>
                    <Icon name='comment alternate' style={{ color: '#AAAFB4' }} />
                        Messages
                    </Menu.Item>
                <Menu.Item as={Link} to="/me">
                    <Icon name='user' />
                        Profile
                    </Menu.Item>
                <Menu.Item as={Link} to="/settings" style={{ backgroundColor: '#007bff' }}>
                    <Icon name='cog' style={{ color: '#AAAFB4' }} />
                        Settings
                    </Menu.Item>
                <Menu.Item as='a' onClick={signout} style={{ backgroundColor: '#931621' }}>
                    <Icon name='sign out alternate' />
                        Log Out
                    </Menu.Item>

                {/* <Menu.Item as='a' style={{ backgroundColor: '#007bff' }}>
                        <Card style = {{borderRadius : '5px', backgroundColor : '#007bff', border : 'solid'}}>
                            <Carousel controls={false} indicators={false} style={{ height: '100%', backgroundColor : '#007bff' }}>
                                {UserStore.allUsers.map((user) => <Carousel.Item interval={2000}>
                                    <Row style={{ backgroundColor: 'white', padding: '5px' }}>
                                        <Col lg={4}>
                                            <Button style={{ borderRadius: '10px', color: '#007bff', backgroundColor: 'white', float: 'left' }}  ><ArrowBackIcon /></Button>
                                        </Col>
                                        <Col lg={4} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                            <Button style={{ borderRadius: '10px', color: '#007bff', backgroundColor: '007bff', marginLeft: 'auto', marginRight: 'auto', display: 'block' }} variant="primary" >{user.meloID}</Button>
                                        </Col>
                                        <Col lg={4}>
                                            <Button style={{ borderRadius: '10px', color: '#007bff', float: 'right', backgroundColor: 'white' }} variant="primary" ><ArrowForwardIcon /></Button>
                                        </Col>
                                    </Row>
                                    <Carousel controls={true} indicators={false}>
                                        {JSON.parse(user.recentlyPlayed).map(item => <Carousel.Item interval={100} style={{ backgroundColor: '#21295C' }} >
                                            <Row style={{ backgroundColor: '#007bff', borderRadius: '10px' }}>
                                                <Col lg={4}>
                                                    <CardMedia
                                                        onClick={() => UserStore.URI = `spotify:track:${item.id}`}
                                                        image={item.image}
                                                        title={`${item.trackName} artwork`}
                                                        style={{ height: '75px', width: '75px', border: 'solid', borderColor: 'whitesmoke', margin: '35px 20px 20px 20px' }}
                                                    />
                                                </Col>
                                                <Col style={{ padding: '15px' }}>
                                                    <Typography component="h6" variant="h6" style={{ textAlign: 'left', margin: '10px', color: 'white' }}>
                                                        {item.trackName.length > 15 &&
                                                            `${item.trackName.substring(0, 14)}...`
                                                        }
                                                        {!(item.trackName.length > 15) &&
                                                            item.trackName
                                                        }
                                                    </Typography>
                                                    <Typography component="subtitle1" variant="subtitle1" style={{ textAlign: 'left', margin: '10px', color: 'white' }}>
                                                        {
                                                            item.artistName
                                                        }
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" style={{ textAlign: 'left', margin: '10px', color: 'white' }}>
                                                        {`${dayjs(item.playedAt).fromNow()}`}
                                                    </Typography>
                                                </Col>
                                            </Row>
                                        </Carousel.Item>
                                        )}

                                    </Carousel>
                                </Carousel.Item>)}

                            </Carousel>
                        </Card>

                    </Menu.Item> */}


                {/* {   UserStore.thisUserProfile.credentials.meloID &&
                <Menu.Item as='a' onClick={this.signout} style={{ backgroundColor: '#931621' }}>
                        <Icon name='sign out alternate' />
              {UserStore.thisUserProfile.credentials.meloID}
            </Menu.Item>
            } */}

            </Sidebar1>
        </div>
    )

}

export default observer(Sidebar)
