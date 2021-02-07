import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import Card from '@material-ui/core/Card'
import { CardMedia, Typography } from '@material-ui/core'
// import img1 from '/Users/tsb99/Documents/melodify/frontend/src/spotify-icon-2.png'
import UserStore from '../stores/UserStores'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import axios from 'axios'

let suggestion = []

const Inbox = () => {

    dayjs.extend(relativeTime)
    console.log(UserStore.URI)

    return (
        <div>
            {/* <Container>
                    {this.props.suggested.map((item) => <Row>
                        <Button style={{ color: 'white', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', margin: '5px' }}>{item.trackID}</Button>
                    </Row>)}
                </Container> */}
        </div>
    )
}

export default observer(Inbox)
