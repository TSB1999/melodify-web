import React, { Component } from 'react'
import { Carousel, Row, Col } from 'react-bootstrap'
import Card from '@material-ui/core/Card'
import { CardMedia, Typography } from '@material-ui/core'
// import img1 from '/Users/tsb99/Documents/melodify/frontend/src/spotify-icon-2.png'
import UserStore from '../stores/UserStores'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const Friends = () => {
    dayjs.extend(relativeTime)
    console.log(UserStore.URI)
    let { timeline } = this.props


    return (
        <div>
            <Carousel>
                {timeline.map(item => <Carousel.Item interval={500}>

                    <Card style={{ backgroundColor: '#007bff' }}>
                        <Row>
                            <Col lg={4} style={{ backgroundColor: '#007bff' }}>
                                <CardMedia
                                    onClick={() => UserStore.URI = `spotify:track:${item.id}`}
                                    image={item.image}
                                    //title={`${this.state.thisTrack.name} album cover`}
                                    style={{ height: '50px', width: '50px', border: 'solid', borderColor: 'whitesmoke', margin: '20px' }}
                                />
                            </Col>
                            <Col style={{ backgroundColor: '#007bff', padding: '5px' }}>
                                <Typography component="h6" variant="h6" style={{ textAlign: 'left', margin: '10px', color: 'whitesmoke' }}>
                                    {item.trackName.length > 17 &&
                                        `${item.trackName.substring(0, 17)}...`
                                    }
                                    {!(item.trackName.length > 17) &&
                                        item.trackName
                                    }
                                </Typography>
                                <Typography component="subtitle1" variant="subtitle1" style={{ textAlign: 'left', margin: '10px', color: 'whitesmoke' }}>
                                    {item.artistName.length > 17 &&
                                        `${item.artistName.substring(0, 17)}...`
                                    }
                                    {!(item.artistName.length > 17) &&
                                        item.artistName
                                    }
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" style={{ textAlign: 'left', margin: '10px', color: 'whitesmoke' }}>
                                    {`${dayjs(item.playedAt).fromNow()} from ${item.spotifyID}`}
                                </Typography>
                            </Col>
                        </Row>
                    </Card>
                </Carousel.Item>)}


            </Carousel>
        </div>
    )
}

export default observer(Friends)
