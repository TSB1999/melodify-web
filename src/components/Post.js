import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Row, Col, Popover, Card as bootstrapCard, OverlayTrigger, Button, FormControl } from 'react-bootstrap'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import AddCommentIcon from '@material-ui/icons/AddComment';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SaveIcon from '@material-ui/icons/Save';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import SendIcon from '@material-ui/icons/Send';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import LaunchIcon from '@material-ui/icons/Launch';
import AlbumIcon from '@material-ui/icons/Album';
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import FaceIcon from '@material-ui/icons/Face';

import UserStore from '../stores/UserStores'
import { observer } from 'mobx-react';

import spotifyApi from '../components/spotify_api/Spotify_API';
import SpotifyPlayer from 'react-spotify-player';
import axios from 'axios';
import img1 from '/Users/tsb99/Documents/melodify/frontend/src/spotify-icon-2.png'
import { ButtonGroup, Container } from '@material-ui/core'

import { getUser } from './handler/post'

let bookmarks = []

const styles = {
    card: {
        marginBottom: 10
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    avatar: {
        backgroundColor: '#FF0000',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    a: {
        backgroundColor: '#1db954',
        color: 'white',
        padding: '5px',
        textDecoration: 'none',
        textTransform: 'bold',
        borderRadius: '15px',
        border: 'solid',
    }
}


class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            thisTrack: [],
            user: [],
            liked: false,
            saved: false,
            comment: '',
            bookmarked: false,
            bookmark: [],
            URI: '',
            profilePic: '',
            showComments: false,
            comments: [],
            newComment: false
        }
    }

    componentDidMount() {

        try {

            axios.get(`/user/${UserStore.thisUserProfile.credentials.meloID}/bookmarked`)
                .then(res => {
                    res.data.bookmarked.map(post => {
                        if (post.postID == this.props.post.postID && post.meloID == UserStore.thisUserProfile.credentials.meloID) {
                            this.setState({ bookmarked: true })
                        }
                    })
                })
                .catch(err => console.log(err))

            axios.get(`/user/${UserStore.thisUserProfile.credentials.meloID}/liked`)
                .then(res => {
                    res.data.liked.map(post => {
                        if (post.postID == this.props.post.postID && post.meloID == UserStore.thisUserProfile.credentials.meloID) {
                            this.setState({ liked: true })
                        }
                    })
                })
                .catch(err => console.log(err))

            axios.get(`/post/${this.props.post.postID}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({ comments: res.data.comments })
                    console.log(this.state.comments)
                })
                .catch(err => console.log(err))

            if (this.props.post.status == 'Track') {
                axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${this.props.post.trackID}`, {
                    headers: {
                        Authorization: localStorage.getItem('spotifyAPI')
                    }
                }).then((res) => {
                    console.log(res.data[0])
                    if (res.data[0] == true) {
                        this.setState({
                            saved: true
                        })
                    }
                })
            } else if (this.props.post.status == 'Album') {
                axios.get(`https://api.spotify.com/v1/me/albums/contains?ids=${this.props.post.trackID}`, {
                    headers: {
                        Authorization: localStorage.getItem('spotifyAPI')
                    }
                }).then((res) => {
                    console.log(res.data[0])
                    if (res.data[0] == true) {
                        this.setState({
                            saved: true
                        })
                    }
                })
            } else if (this.props.post.status == 'Artist') {
                axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${this.props.post.trackID}`, {
                    headers: {
                        Authorization: localStorage.getItem('spotifyAPI')
                    }
                }).then((res) => {
                    console.log(res.data[0])
                    if (res.data[0] == true) {
                        this.setState({
                            saved: true
                        })
                    }
                })
            } else if (this.props.post.status == 'Playlist') {
                axios.get(`https://api.spotify.com/v1/playlists/${this.props.post.trackID}/followers/contains?ids=${UserStore.thisUserProfile.credentials.spotifyID}`, {
                    headers: {
                        Authorization: localStorage.getItem('spotifyAPI')
                    }
                }).then((res) => {
                    console.log(res.data[0])
                    if (res.data[0] == true) {
                        this.setState({
                            saved: true
                        })
                    }
                })
            }

            spotifyApi.getUser(this.props.post.spotifyID)
                .then((response) => {
                    this.setState({ profilePic: response.images[0].url })
                })
                .catch(err => console.log(err))

        } catch (e) {
            console.log(e)
        }

    }

    componentDidUpdate() {
        spotifyApi.getUser(this.props.post.spotifyID)
            .then((response) => {
                this.setState({ profilePic: response.images[0].url })
            })
            .catch(err => console.log(err))
    }

    followArtist = () => {
        axios.put(`https://api.spotify.com/v1/me/following?type=artist&ids=${[this.state.thisTrack.artistID]}`, {
            headers: {
                Authorization: localStorage.getItem('spotifyAPI')
            }
        }).then((res) => {
            //console.log(res.data[0])
        })
    }

    likePost = () => {
        axios.get(`/post/${this.props.post.postID}/like`, {
            headers: {
                Authorization: sessionStorage.getItem('FBIdToken') //the token is a variable which holds the token
            }
        })
            .then(res => {
                console.log("success")
                this.setState({ liked: true })
            })
            .catch(err => console.log(err))
    }

    unlikePost = () => {
        axios.get(`/post/${this.props.post.postID}/unlike`, {
            headers: {
                Authorization: sessionStorage.getItem('FBIdToken') //the token is a variable which holds the token
            }
        })
            .then(res => {
                console.log("success")
                this.setState({ liked: false })
            })
            .catch(err => console.log(err))
    }

    saveTrack = () => {
        if (this.props.post.status == 'Track') {
            spotifyApi.addToMySavedTracks([this.props.post.trackID]).then((response) => {
                console.log(response)
                this.setState({ saved: true })
            })
        } else if (this.props.post.status == 'Album') {
            spotifyApi.addToMySavedAlbums([this.props.post.trackID]).then((response) => {
                console.log(response)
                this.setState({ saved: true })
            })
        } else if (this.props.post.status == 'Artist') {
            spotifyApi.followArtists([this.props.post.trackID]).then((response) => {
                console.log(response)
                this.setState({ saved: true })
            })
        } else if (this.props.post.status == 'Playlist') {
            axios.put(`https://api.spotify.com/v1/playlists/${this.props.post.trackID}/followers`, {
                "public": true
            },
                {
                    headers: {
                        Authorization: localStorage.getItem('spotifyAPI')
                    }
                }).then((res) => {
                    this.setState({
                        saved: true
                    })
                })
        }

    }

    bookmarkPost = () => {
        axios.get(`/post/${this.props.post.postID}/bookmark`, {
            headers: {
                Authorization: sessionStorage.getItem('FBIdToken')
            }
        })
            .then(res => {
                console.log("success")
                this.setState({ bookmarked: true })
            })
            .catch(err => console.log(err))
    }

    unbookmarkPost = () => {
        axios.get(`/post/${this.props.post.postID}/unbookmark`, {
            headers: {
                Authorization: sessionStorage.getItem('FBIdToken')
            }
        })
            .then(res => {
                console.log("success")
                this.setState({ bookmarked: false })
            })
            .catch(err => console.log(err))
    }

    deletePost = () => {
        axios.delete(`/post/${this.props.post.postID}`, {
            headers: {
                Authorization: sessionStorage.getItem('FBIdToken')
            }
        }).then((res) => {
            console.log(res)
            axios.get('/posts')
                .then(res => {
                    console.log(res.data)
                    UserStore.posts = res.data
                })
                .catch(err => console.log(err))
        })
    }

    makeComment = () => {
        axios
            .post(`/post/${this.props.post.postID}/comment`, {
                trackID: this.props.post.trackID,
                spotifyID: UserStore.thisSpotifyProfile.id,
                body: this.state.comment,
                meloID: this.state.thisTrack.meloID
            },
                {
                    headers: {
                        Authorization: sessionStorage.getItem('FBIdToken') //the token is a variable which holds the token
                    }
                })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
        this.setState({ comment: '' })
    }

    commentOnComment = (id) => {
        axios
            .post(`/post/${id}/comment`, {
                trackID: this.props.post.trackID, //none or trackID
                spotifyID: UserStore.thisSpotifyProfile.id,
                body: this.state.comment,
                meloID: this.state.thisTrack.meloID
            },
                {
                    headers: {
                        Authorization: sessionStorage.getItem('FBIdToken') //the token is a variable which holds the token
                    }
                })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    suggest = (recipient) => {
        axios
            .post(`/post/${this.props.post.postID}/suggest`, {
                recipient: recipient,
                type: this.props.post.status
            },
                {
                    headers: {
                        Authorization: sessionStorage.getItem('FBIdToken'), //the token is a variable which holds the token
                    }
                })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    preview = () => {
        UserStore.URI = `spotify:track:${this.props.post.trackID}`
    }

    clickArt = () => {
        //window.open(this.state.thisTrack.link, "_blank")
        UserStore.URI = `spotify:track:${this.props.post.trackID}`
    }
    otherUserPage = () => {
        //carry name with UserStore
        UserStore.otherUser = this.props.post.meloID
        this.props.history.push(`/user/${this.props.post.meloID}`)
        console.log(UserStore.otherUser)
    }

    launchTweet = () => {
        this.props.history.push(`/user/${this.props.post.meloID}/post/${this.props.post.postID}`)
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        dayjs.extend(relativeTime)
        const { classes, post: { body, createdAt, meloID, postID, likeCount, commentCount, trackID, spotifyID, bookmarkCount, status } } = this.props

        console.log(this.state.comments)

        const popover = (
            <Popover id="popover-basic" style={{ borderRadius: '25px', color: '#3E5C76', border: 'none' }}>
                <FormControl type="text-area" name="comment" value={this.state.comment} onChange={this.onChange} placeholder="make your comment..." className="mr-sm-2" style={{ width: '450px', height: '50px', backgroundColor: 'white', color: '#151E3F', borderRadius: '10px', border: 'NONE' }} />
            </Popover>
        );

        const commentCount1 = (
            <Popover id="popover-basic" style={{ borderRadius: '25px', backgroundColor: 'white', border: 'none' }}>
                <Popover.Content style={{ borderRadius: '25px', backgroundColor: 'white', border: 'none' }}>
                    <h4 style={{ color: '#007bff' }}>{commentCount}</h4>
                </Popover.Content>
            </Popover>
        );

        const hoverSave = (
            <Popover id="popover-basic" style={{ borderRadius: '25px', backgroundColor: 'white', border: 'none' }}>
                <Popover.Content style={{ borderRadius: '25px', backgroundColor: 'white', border: 'none' }}>
                    <h4 style={{ color: '#007bff' }}>saved</h4>
                </Popover.Content>
            </Popover>
        );

        const likeCount1 = (
            <Popover id="popover-basic" style={{ borderRadius: '25px', backgroundColor: 'white', border: 'none' }}>
                <Popover.Content style={{ borderRadius: '25px', backgroundColor: 'white', border: 'none' }}>
                    <h4 style={{ color: '#007bff' }}>{likeCount}</h4>
                </Popover.Content>
            </Popover>
        );

        const bookmarkCount1 = (
            <Popover id="popover-basic" style={{ borderRadius: '25px', backgroundColor: 'white', border: 'none' }}>
                <Popover.Content style={{ borderRadius: '25px', backgroundColor: 'white', border: 'none' }}>
                    <h4 style={{ color: '#007bff' }}>{bookmarkCount}</h4>
                </Popover.Content>
            </Popover>
        );

        const sendList = (
            <Popover id="popover-basic" style={{ borderRadius: '25px', backgroundColor: '#151E3F', border: 'none' }}>
                <Popover.Content style={{ borderRadius: '25px', backgroundColor: '#151E3F', border: 'none' }}>
                    <Container>
                        {UserStore.allUsers.map((user) => <Row>
                            <Button style={{ color: 'white', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', margin: '5px' }} onClick={() => this.suggest(user.meloID)}>{user.meloID}</Button>
                        </Row>)}
                    </Container>
                </Popover.Content>
            </Popover>
        );

        const popoverMoreVert = (
            <Popover id="popover-basic" style={{ color: '#3E5C76', backgroundColor: 'white', borderRadius: '15px', border: 'none' }}>
                <Popover.Content>
                    {/* {this.props.post.meloID == UserStore.thisUserProfile.credentials.meloID && */}
                    <IconButton onClick={this.deletePost}>
                        <DeleteIcon SendIcon style={{ color: '#DE9151' }} />
                    </IconButton>

                    <IconButton>
                        <SlowMotionVideoIcon style={{ color: '#007bff' }} />
                    </IconButton>
                    <IconButton>
                        <PersonAddIcon style={{ color: '#007bff' }} />
                    </IconButton>
                    {!this.state.bookmarked &&
                        <OverlayTrigger trigger="hover" placement="right" overlay={bookmarkCount1}>
                            <IconButton>
                                <BookmarkBorderIcon style={{ color: '#007bff' }} />
                            </IconButton>
                        </OverlayTrigger>
                    }
                    {this.state.bookmarked &&
                        <OverlayTrigger trigger="hover" placement="right" overlay={bookmarkCount1}>
                            <IconButton >
                                <BookmarkIcon style={{ color: '#007bff' }} />
                            </IconButton>
                        </OverlayTrigger>
                    }
                    <IconButton onClick={this.launchTweet}>
                        <LaunchIcon style={{ color: '#007bff' }} />
                    </IconButton>

                </Popover.Content>
            </Popover>
        );

        return (
            <Card className={classes.card} raised={true} style={{ borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>

                <CardHeader
                    style={{ backgroundColor: 'white', color: '#007bff' }}
                    avatar={
                        <Avatar aria-label="recipe" alt={meloID} src={this.state.profilePic} onClick={this.otherUserPage} style={{ border: 'solid', borderColor: 'whitesmoke' }}>
                            {meloID.substring(0, 1)}
                        </Avatar>
                    }
                    action={
                        <OverlayTrigger trigger="focus" placement="left" overlay={popoverMoreVert}>
                            <IconButton aria-label="settings">
                                <MoreVertIcon style={{ color: '#007bff' }} />
                            </IconButton>
                        </OverlayTrigger>
                    }
                    title={meloID}
                    subheaderTypographyProps={{ color: 'primary' }}
                    subheader={dayjs(createdAt).fromNow()}
                />

                <div className={classes.content} style={{ backgroundColor: '#007bff', borderTop: 'solid', borderTopColor: '#007bff' }}>


                    {status == 'Track' &&
                        <Row style={{ backgroundColor: 'white', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>
                            <Col >
                                <SpotifyPlayer
                                    uri={`spotify:track:${this.props.post.trackID}`}
                                    size={{
                                        width: '100%',
                                        height: 80,
                                    }}
                                    view={'coverart'}
                                    theme={'black'}
                                />
                            </Col>
                        </Row>
                    }

                    {status == 'Album' &&
                        <Row style={{ backgroundColor: '#60495A', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>
                            <Col >
                                <SpotifyPlayer
                                    uri={`spotify:album:${this.props.post.trackID}`}
                                    size={{
                                        width: '100%',
                                        height: 200,
                                    }}
                                    view={'coverart'}
                                    theme={'black'}
                                />
                            </Col>
                        </Row>
                    }
                    {status == 'Artist' &&
                        <Row style={{ backgroundColor: '#7B886F', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>
                            <Col >
                                <SpotifyPlayer
                                    uri={`spotify:artist:${this.props.post.trackID}`}
                                    size={{
                                        width: '100%',
                                        height: 200,
                                    }}
                                    view={'coverart'}
                                    theme={'black'}
                                />
                            </Col>
                        </Row>
                    }
                    {status == 'Playlist' &&
                        <Row style={{ backgroundColor: '#941C2F', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>
                            <Col >
                                <SpotifyPlayer
                                    uri={`spotify:playlist:${this.props.post.trackID}`}
                                    size={{
                                        width: '100%',
                                        height: 250,
                                    }}
                                    view={'coverart'}
                                    theme={'black'}
                                />
                            </Col>
                        </Row>
                    }

                    <Row>
                        <Col lg={12}>
                            <CardContent style={{ margin: '5px 5px 5px 5px', border: 'none', borderRadius: '15px', borderColor: '#151E3F' }}>
                                <h1 style={{ color: 'white', textAlign: 'center' }}>{body}</h1>
                            </CardContent>
                        </Col>
                    </Row>

                    <Row style={{ alignContent: 'center', padding: '5px', backgroundColor: 'white', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>

                        <Col>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>

                                <IconButton onClick={this.makeComment} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} >
                                    <AddCommentIcon style={{ color: '#007bff' }} />
                                </IconButton>
                            </OverlayTrigger>


                        </Col>

                        <Col>
                            {!this.state.liked &&
                                <OverlayTrigger trigger="hover" placement="right" overlay={likeCount1}>
                                    <IconButton onClick={this.likePost} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                        <FavoriteBorderIcon style={{ color: '#007bff' }} />
                                    </IconButton>
                                </OverlayTrigger>


                            }
                            {this.state.liked &&
                                <OverlayTrigger trigger="hover" placement="right" overlay={likeCount1}>
                                    <IconButton onClick={this.unlikePost} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                        <FavoriteIcon style={{ color: '#007bff' }} />
                                    </IconButton>
                                </OverlayTrigger>

                            }
                        </Col>

                        <Col>
                            {!this.state.saved &&
                                <IconButton onClick={this.saveTrack} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                    <SaveOutlinedIcon style={{ color: '#007bff' }} />
                                </IconButton>
                            }
                            {this.state.saved &&
                                <OverlayTrigger trigger="hover" placement="right" overlay={hoverSave}>
                                    <IconButton onClick={this.saveTrack} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                        <SaveIcon style={{ color: '#007bff' }} />
                                    </IconButton>
                                </OverlayTrigger>

                            }
                        </Col>

                        <Col>
                            <OverlayTrigger trigger="focus" placement="right" overlay={sendList}>
                                <IconButton style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                    <SendIcon style={{ color: '#007bff' }} />
                                </IconButton>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    {this.state.showComments == false && commentCount == 1 &&
                        <Button onClick={() => { this.setState({ showComments: !this.state.showComments }) }} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%', border: 'none', borderColor: ' white' }}>{`${commentCount} comment`}</Button>
                    }
                    {this.state.showComments == false && commentCount > 1 &&
                        <Button onClick={() => { this.setState({ showComments: !this.state.showComments }) }} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%', border: 'none', borderColor: ' white' }}>{`${commentCount} comments`}</Button>
                    }
                    {this.state.showComments &&
                        <Button onClick={() => { this.setState({ showComments: !this.state.showComments }) }} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%', border: 'none', borderColor: ' white', backgroundColor: 'red' }}>undo</Button>
                    }
                    {this.state.showComments &&
                        this.state.comments.map((comment) =>
                            < Card className={classes.card} raised={true} style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', border: 'none', borderColor: 'whitesmoke', marginTop: '10px' }}>

                                <CardHeader
                                    style={{ backgroundColor: 'white', color: '#007bff' }}
                                    avatar={
                                        <Avatar aria-label="recipe" alt={meloID} src={this.state.profilePic} onClick={this.otherUserPage} style={{ border: 'solid', borderColor: 'whitesmoke' }}>
                                            {comment.data.meloID.substring(0, 1)}
                                        </Avatar>
                                    }
                                    action={
                                        <OverlayTrigger trigger="focus" placement="left" overlay={popoverMoreVert}>
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon style={{ color: '#007bff' }} />
                                            </IconButton>
                                        </OverlayTrigger>
                                    }
                                    title={comment.data.meloID}
                                    subheaderTypographyProps={{ color: 'primary' }}
                                    subheader={dayjs(comment.data.createdAt).fromNow()}
                                />

                                <div className={classes.content} style={{ backgroundColor: '#007bff', borderTop: 'solid', borderTopColor: '#007bff' }}>


                                    {/* {status == 'Track' &&
                                        <Row style={{ backgroundColor: 'white', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>
                                            <Col >
                                                <SpotifyPlayer
                                                    uri={`spotify:track:${this.props.post.trackID}`}
                                                    size={{
                                                        width: '100%',
                                                        height: 80,
                                                    }}
                                                    view={'coverart'}
                                                    theme={'black'}
                                                />
                                            </Col>
                                        </Row>
                                    }

                                    {status == 'Album' &&
                                        <Row style={{ backgroundColor: '#60495A', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>
                                            <Col >
                                                <SpotifyPlayer
                                                    uri={`spotify:album:${this.props.post.trackID}`}
                                                    size={{
                                                        width: '100%',
                                                        height: 200,
                                                    }}
                                                    view={'coverart'}
                                                    theme={'black'}
                                                />
                                            </Col>
                                        </Row>
                                    }
                                    {status == 'Artist' &&
                                        <Row style={{ backgroundColor: '#7B886F', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>
                                            <Col >
                                                <SpotifyPlayer
                                                    uri={`spotify:artist:${this.props.post.trackID}`}
                                                    size={{
                                                        width: '100%',
                                                        height: 200,
                                                    }}
                                                    view={'coverart'}
                                                    theme={'black'}
                                                />
                                            </Col>
                                        </Row>
                                    }
                                    {status == 'Playlist' &&
                                        <Row style={{ backgroundColor: '#941C2F', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>
                                            <Col >
                                                <SpotifyPlayer
                                                    uri={`spotify:playlist:${this.props.post.trackID}`}
                                                    size={{
                                                        width: '100%',
                                                        height: 250,
                                                    }}
                                                    view={'coverart'}
                                                    theme={'black'}
                                                />
                                            </Col>
                                        </Row>
                                    } */}

                                    <Row>
                                        <Col lg={12}>
                                            <CardContent style={{ margin: '5px 5px 5px 5px', border: 'none', borderRadius: '15px', borderColor: '#151E3F' }}>
                                                <h1 style={{ color: 'white', textAlign: 'center' }}>{comment.data.body}</h1>
                                            </CardContent>
                                        </Col>
                                    </Row>

                                    <Row style={{ alignContent: 'center', padding: '5px', backgroundColor: 'white', borderRadius: '15px', border: 'none', borderColor: 'whitesmoke' }}>

                                        <Col>
                                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                                <IconButton onClick={() => this.commentOnComment(comment.postID)} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} >
                                                    <AddCommentIcon style={{ color: '#007bff' }} />
                                                </IconButton>
                                            </OverlayTrigger>


                                        </Col>

                                        <Col>
                                            {!this.state.liked &&
                                                <OverlayTrigger trigger="hover" placement="right" overlay={likeCount1}>
                                                    <IconButton onClick={this.likePost} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                        <FavoriteBorderIcon style={{ color: '#007bff' }} />
                                                    </IconButton>
                                                </OverlayTrigger>


                                            }
                                            {this.state.liked &&
                                                <OverlayTrigger trigger="hover" placement="right" overlay={likeCount1}>
                                                    <IconButton onClick={this.unlikePost} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                        <FavoriteIcon style={{ color: '#007bff' }} />
                                                    </IconButton>
                                                </OverlayTrigger>

                                            }
                                        </Col>

                                        <Col>
                                            {!this.state.saved &&
                                                <IconButton onClick={this.saveTrack} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                    <SaveOutlinedIcon style={{ color: '#007bff' }} />
                                                </IconButton>
                                            }
                                            {this.state.saved &&
                                                <OverlayTrigger trigger="hover" placement="right" overlay={hoverSave}>
                                                    <IconButton onClick={this.saveTrack} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                        <SaveIcon style={{ color: '#007bff' }} />
                                                    </IconButton>
                                                </OverlayTrigger>

                                            }
                                        </Col>

                                        <Col>
                                            <OverlayTrigger trigger="focus" placement="right" overlay={sendList}>
                                                <IconButton style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                    <SendIcon style={{ color: '#007bff' }} />
                                                </IconButton>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                    {comment.commentCount == 1 &&
                                        <Button onClick={() => { this.setState({ showComments: !this.state.showComments }) }} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%', border: 'none', borderColor: ' white' }}>{`${comment.commentCount} comment`}</Button>
                                    }
                                    {comment.commentCount > 1 &&
                                        <Button onClick={() => { this.setState({ showComments: !this.state.showComments }) }} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%', border: 'none', borderColor: ' white' }}>{`${comment.commentCount} comments`}</Button>
                                    }

                                </div>

                            </Card >
                        )

                    }


                </div>

            </Card >
        )
    }
}

export default withRouter(withStyles(styles)(observer(Post)));
