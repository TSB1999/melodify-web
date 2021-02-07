import React, { Component } from 'react'
import { Carousel, Row, Col, Button, ProgressBar } from 'react-bootstrap'
import Card from '@material-ui/core/Card'
import { CardMedia, Typography } from '@material-ui/core'
// import img1 from '/Users/tsb99/Documents/melodify/frontend/src/spotify-icon-2.png'
import UserStore from '../stores/UserStores'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Replay30Icon from '@material-ui/icons/Replay30';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SaveIcon from '@material-ui/icons/Save';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import spotifyApi from '../components/spotify_api/Spotify_API';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

export class Thumbs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false,
            bookmarked: false
        }
    }

    // componentDidUpdate(){
    //     axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${this.props.post.trackID}`, {
    //             headers: {
    //                 Authorization: localStorage.getItem('spotifyAPI')
    //             }
    //         }).then((res) => {
    //             console.log(res.data[0])
    //             if (res.data[0] == true) {
    //                 this.setState({
    //                     saved: true
    //                 })
    //             }
    //         })
    // }

    saveTrack = (id) => {
        spotifyApi.addToMySavedTracks([id]).then((response) => {
            console.log(response)
            this.setState({ saved: true })
        })
            .catch(err => console.log(err))
    }

    postTrack = (item) => {
        UserStore.thisTrack = {
            id: item.id,
            name: item.name,
            artist: item.artistName,
            artistImage: item.image
        }
        // trackLoaded = true
        UserStore.trackLoaded = true
    }

    // bookmark = (item) => {
    //     axios.get(`/post/thumb${uuidv4()}/bookmark`, {
    //         headers: {
    //             Authorization: sessionStorage.getItem('FBIdToken')
    //         }
    //     })
    //         .then(res => {
    //             console.log("success")
    //             this.setState({ bookmarked: true })
    //         })
    //         .catch(err => console.log(err))
    // }

    render() {
        dayjs.extend(relativeTime)
        console.log(UserStore.URI)

        return (
            <div>
                <Row style={{ margin: '0px 0 0 0' }}>
                    <Col style={{ borderRadius: '15px' }}>
                        <Carousel indicators={false} style={{ height: '100%' }}>
                            {UserStore.recommend.map(item => <Carousel.Item interval={500} style={{ padding: '35px' }}>
                                <Row>
                                    <Col lg={4} style={{ marginTop: 'auto', marginBottom: 'auto', display: 'block' }}>
                                        <CardMedia
                                            onClick={() => {
                                                UserStore.URI = `spotify:track:${item.id}`
                                                //this.setState({tab2 : '1'})
                                            }}
                                            image={item.image}
                                            //title={`${this.state.thisTrack.name} album cover`}
                                            style={{ height: '75px', width: '75px', border: 'solid', borderColor: '#21295c', borderRadius: '10px' }}
                                        />
                                    </Col>
                                    <Col style={{ padding: '0x' }}>
                                        <Typography component="h6" variant="h6" style={{ textAlign: 'left', margin: '5px', color: 'whitesmoke' }}>
                                            {item.name.length > 19 &&
                                                `${item.name.substring(0, 16)}...`
                                                // <marquee behavior="scroll" direction="left">{item.name}</marquee>
                                            }
                                            {!(item.name.length > 19) &&
                                                item.name
                                            }
                                        </Typography>
                                        <Typography component="subtitle1" variant="subtitle1" style={{ textAlign: 'left', margin: '5px', color: 'whitesmoke' }}>
                                            {item.artistName.length > 14 &&
                                                `${item.artistName.substring(0, 14)}...`
                                            }
                                            {!(item.artistName.length > 14) &&
                                                item.artistName
                                            }
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" style={{ textAlign: 'left', marginTop: '10px', color: 'whitesmoke' }}>
                                            {item.popularity > 75 &&
                                                <ProgressBar variant="success" now={item.popularity} />
                                            }
                                            {item.popularity > 60 && item.popularity < 76 &&
                                                <ProgressBar variant="info" now={item.popularity} />
                                            }
                                            {item.popularity < 61 &&
                                                <ProgressBar variant="warning" now={item.popularity} />
                                            }
                                        </Typography>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{ padding: '3px' }}>
                                        <Button onClick={() => console.log(item.name)} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><ThumbUpIcon style={{ color: '#21295c' }} /></Button>
                                    </Col>
                                    <Col style={{ padding: '3px' }}>
                                        <Button onClick={() => this.postTrack(item)} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><PostAddIcon style={{ color: '#21295c' }} /></Button>
                                    </Col>
                                    {!this.state.saved &&
                                        <Col style={{ padding: '3px' }}>
                                            <Button onClick={() => this.saveTrack(item.id)} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><SaveOutlinedIcon style={{ color: '#21295c' }} /></Button>
                                        </Col>
                                    }
                                    {this.state.saved &&
                                        <Col style={{ padding: '3px' }}>
                                            <Button onClick={() => this.saveTrack(item.id)} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><SaveIcon style={{ color: '#21295c' }} /></Button>
                                        </Col>
                                    }

                                    <Col style={{ padding: '3px' }}>
                                        <Button onClick={() => console.log(item.name)} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><ThumbDownIcon style={{ color: '#21295c' }} /></Button>
                                    </Col>

                                </Row>


                            </Carousel.Item>)}
                        </Carousel>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default observer(Thumbs)
