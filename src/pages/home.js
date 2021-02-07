import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { Card, Carousel } from 'react-bootstrap'
import img1 from '../../src/spotify-icon-2.png'
import Coverflow from 'react-coverflow';
import { Scrollbar } from "react-scrollbars-custom";
import spotifyApi from '../components/spotify_api/Spotify_API';
import Paper from '@material-ui/core/Paper'

import Post from '../components/Post'
import App from '../components/registration/App'

let thisTrack = {}

export class home extends Component {
    state = {
        posts: null,
        images: ''
    }
    componentDidMount() {
        // axios.get('/posts')                                                      // Other token
        //     .then(res => {
        //         console.log(res.data)
        //         this.setState({
        //             posts: res.data
        //         })
        //         res.data.map(item => {
        //             spotifyApi.getTrack(item.trackID).then((response) => {
        //                 thisTrack = {
        //                     id: response.id,
        //                     name: response.name,
        //                     artist: response.album.artists[0].name,
        //                     artistImage: response.album.images[0].url
        //                 }
        //             })
        //             this.setState({ images : [...this.state.images, thisTrack]})
        //         }, () => console.log(this.state.images))
        //     })
        //     .catch(err => console.log(err))
    }

    render() {
        // let recentPostsMarkup = this.state.posts ? (
        //     this.state.posts.map(post => <Post key={post.postID} post={post} />)
        // ) : <p>Loading ...</p>
        return (
            <div style={{ margin: '50px' }}>
                <Grid container>
                    <Grid item sm={3} xs={12} style={{ position: 'fixed', right: '0', width: '100%', height: '100%' }}>
                        <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#007bff' }}>
                            <Card style={{ height: '200px', padding: '10px', borderRadius: '20px' }}>
                                <Card.Header style={{ backgroundColor: '#151E3F', borderRadius: '15px' }}>
                                    <h3 style={{ color: 'white' }}>hot picks...</h3>
                                </Card.Header>
                                <Card.Body>
                                    <Coverflow
                                        width={100}
                                        height={100}
                                        displayQuantityOfSide={2.5}
                                        navigation={true}
                                        enableHeading={true}
                                        active={this.state.active}
                                    >

                                        <img src={img1} data-action="http://andyyou.github.io/react-coverflow/" style={{ borderRadius: '20px', width: '70px', height: '70px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                        <img src={img1} data-action="http://andyyou.github.io/react-coverflow/" style={{ borderRadius: '20px', width: '70px', height: '70px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                        <img src={img1} data-action="http://andyyou.github.io/react-coverflow/" style={{ borderRadius: '20px', width: '70px', height: '70px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                        <img src={img1} data-action="http://andyyou.github.io/react-coverflow/" style={{ borderRadius: '20px', width: '70px', height: '70px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                        <img src={img1} data-action="http://andyyou.github.io/react-coverflow/" style={{ borderRadius: '20px', width: '70px', height: '70px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                        <img src={img1} data-action="http://andyyou.github.io/react-coverflow/" style={{ borderRadius: '20px', width: '70px', height: '70px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />

                                    </Coverflow>
                                </Card.Body>
                            </Card>
                        </Paper>
                        <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#007bff' }}>
                            <Card style={{ height: '500px', padding: '10px', margin: '10px', borderRadius: '20px' }}>
                                <Card.Header style={{ backgroundColor: '#151E3F', borderRadius: '15px' }}>
                                    <h3 style={{ color: 'white' }}>the latest...</h3>
                                </Card.Header>
                                <Card.Body>
                                    <Scrollbar>
                                    </Scrollbar>
                                </Card.Body>
                            </Card>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} xs={12} style={{ width: '100%', height: '100%' }}>
                        <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#007bff' }}>
                            <Card style={{ height: '710px', padding: '10px', borderRadius: '20px', backgroundColor: '#007bff', border: 'none' }}>
                                <Card.Header style={{ backgroundColor: '#151E3F', borderRadius: '15px' }}>
                                    <h3 style={{ color: 'white' }}>join the experience...</h3>
                                </Card.Header>
                                <Card.Body>
                                    <App />
                                </Card.Body>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default home
