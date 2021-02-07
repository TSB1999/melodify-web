import React, { Component } from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'
import Card from '@material-ui/core/Card'
import { CardMedia, Typography } from '@material-ui/core'
import img1 from '../../src/spotify-icon-2.png'
import UserStore from '../stores/UserStores'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import spotifyApi from '../components/spotify_api/Spotify_API';

let thisTrack = {}

const Bookmarks = () => {

    const getTrack = (id) => {
        console.log(id)
        spotifyApi.getTrack(id).then((response) => {
            thisTrack = {
                id: response.id,
                name: response.name,
                artist: response.album.artists[0].name,
                artistImage: response.album.images[0].url
            }
        })
        return thisTrack
    }

    dayjs.extend(relativeTime)
    console.log(UserStore.bookmarked)

    return (
        <div>
            <Carousel>
                {UserStore.bookmarked.map(item => <Carousel.Item interval={500}>

                    <Card style={{ backgroundColor: '#950952' }}>
                        <Row>
                            <Col lg={4} style={{ backgroundColor: '#151E3F' }}>
                                <CardMedia
                                    onClick={() => UserStore.URI = `spotify:track:${item.trackID}`}
                                    image={this.getTrack(item.trackID).artistImage}
                                    //title={`${this.state.thisTrack.name} album cover`}
                                    style={{ height: '80px', width: '80px', border: 'solid', borderColor: 'whitesmoke', margin: '20px' }}
                                />
                            </Col>
                            <Col style={{ backgroundColor: '#151E3F', padding: '15px' }}>
                                <Typography component="h6" variant="h6" style={{ textAlign: 'left', margin: '10px', color: 'whitesmoke' }}>
                                    {this.getTrack(item.trackID).name}
                                </Typography>
                                <Typography component="subtitle1" variant="subtitle1" style={{ textAlign: 'left', margin: '10px', color: 'whitesmoke' }}>
                                    {this.getTrack(item.trackID).artist}

                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" style={{ textAlign: 'left', margin: '10px', color: 'whitesmoke' }}>
                                    {`${dayjs(item.bookmarkedAt).fromNow()}`}
                                </Typography>
                            </Col>
                        </Row>
                    </Card>
                </Carousel.Item>)}


            </Carousel>
        </div>
    )

}

export default observer(Bookmarks)
