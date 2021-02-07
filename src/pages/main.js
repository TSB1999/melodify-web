import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { Card, Carousel, OverlayTrigger, Popover, Button, ButtonGroup, Row, Col, ProgressBar, Form, Dropdown, Image } from 'react-bootstrap'
import img1 from '/Users/tsb99/Documents/melodify/frontend/src/spotify-icon-2.png'
import { Scrollbar } from "react-scrollbars-custom";
import UserStore from '/Users/tsb99/Documents/melodify/frontend/src/stores/UserStores.js';
import spotifyApi from '../components/spotify_api/Spotify_API';
import Paper from '@material-ui/core/Paper'
import Post from '../components/Post'
import TrackQuery from '../components/TrackQuery'
import { observer } from 'mobx-react'
import Friends from '../components/Friends';
import Thumbs from '../components/Thumbs';
import Inbox from '../components/Inbox';
import NewTrack from '../components/NewTrack';
import relativeTime from 'dayjs/plugin/relativeTime'
import Bookmarks from '../components/Bookmarks';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SearchIcon from '@material-ui/icons/Search';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TimelineIcon from '@material-ui/icons/Timeline';
import InboxIcon from '@material-ui/icons/Inbox';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CircularProgress from '@material-ui/core/CircularProgress';
import CancelIcon from '@material-ui/icons/Cancel';
import ExploreIcon from '@material-ui/icons/Explore';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SpotifyPlayer from 'react-spotify-player';
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SaveIcon from '@material-ui/icons/Save';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import dayjs from 'dayjs'
import art1 from '/Users/tsb99/Documents/melodify/frontend/src/components/SampleArtworks/64f3a61a.jpg'
import art2 from '/Users/tsb99/Documents/melodify/frontend/src/components/SampleArtworks/64f3a61a.jpg'
import art3 from '/Users/tsb99/Documents/melodify/frontend/src/components/SampleArtworks/Drake-Nothing-Was-The-Same-deluxe-album-cover-web-optimised-820.jpg'
import art4 from '/Users/tsb99/Documents/melodify/frontend/src/components/SampleArtworks/ForgivingAllMyEnemies.PNG'
import art5 from '/Users/tsb99/Documents/melodify/frontend/src/components/SampleArtworks/Kendrick_Lamar_-_Damn.png'
import MediaRecommendCard from '/Users/tsb99/Documents/melodify/frontend/src/components/meloRecommend.js'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { Radar } from "react-chartjs-2";

let audioFeatures = {}

let topTracks = {}

let artistsTopTracksArray = []

let artistTopTracks = {}

let thisArtist = {}

let recentlyPlayed = {}

let itemSave = []

let totalRecentlyPlayed = []

let allUsers = []

let suggestion = []

let recommended = {}

let recommend = []

let topArtists = {}

let topArtistsArray = []

let str = ''

let isPaused = false

let dropDownTrack = 'Track'

let dropDownAlbum = 'Album'

let dropDownPlaylist = 'Playlist'

let chart1_2_options = {
    maintainAspectRatio: true,
    legend: {
        display: false
    },
    tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
    },
    responsive: true
};

let chartExample1 = {
    data1: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
            labels: [
                "Danceability",
                "Energy",
                "Valence",
                "Acoustic",
                "Instrumental",
                "Liveness",
                "Speechiness"
            ],
            datasets: [
                {
                    // label: "Audio Features", // label : song
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderColor: "#1f8ef1",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#1f8ef1",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#1f8ef1",
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 3,
                    data: [audioFeatures.danceability, audioFeatures.energy, audioFeatures.valence, audioFeatures.acousticness, audioFeatures.instrumentalness, audioFeatures.liveness, audioFeatures.speechiness]
                }
            ]
        };
    },
    options: chart1_2_options
}

export class main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: null,
            song_title: [],
            song: '',
            post: '',
            userStore: [],
            tab: 1,
            tab1: 1,
            tab2: 1,
            tab3: 1,
            dropDown: 'Track',
            searchTab: false
        }
    }

    componentDidMount() {
        console.log(UserStore.thisUserProfile)
        axios.get('/posts')
            .then(res => {
                console.log(res.data)
                UserStore.posts = res.data
            })
            .catch(err => console.log(err))

        if (JSON.stringify(UserStore.recentlyPlayed) != '[]') {
            axios.post('/user', {
                bio: '',
                website: '',
                location: '',
                bookmarked: '',
                playlists: '',
                recentlyPlayed: JSON.stringify(UserStore.recentlyPlayed),
                topArtists: '',
                topTracks: ''
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

        axios.get('/users',
            {
                headers: {
                    Authorization: sessionStorage.getItem('FBIdToken'), //the token is a variable which holds the token
                }
            })
            .then(res => {
                console.log(res.data)
                UserStore.allUsers = res.data.users
                allUsers = res.data.users
                res.data.users.map(item => {
                    totalRecentlyPlayed = totalRecentlyPlayed.concat(JSON.parse(item.recentlyPlayed))
                })
                totalRecentlyPlayed.sort(function (a, b) {
                    return new Date(b.playedAt) - new Date(a.playedAt)
                })
                console.log(totalRecentlyPlayed)
            })
            .catch(err => console.log(err))

        this.interval = setInterval(() => {
            axios.get(`https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${str}`, {
                headers: {
                    Authorization: localStorage.getItem('spotifyAPI')
                }
            }).then((res) => {

                res.data.tracks.map((track) => {
                    recommended = {
                        name: track.name,
                        popularity: track.popularity,
                        id: track.id,
                        explicit: track.explicit,
                        artistName: track.artists[0].name,
                        albumName: track.album.name,
                        image: track.album.images[0].url,
                        albumID: track.album.id
                    }
                    recommend.push(recommended)
                })
                UserStore.recommend = recommend
                console.log(UserStore.recommend)
            })
        }, 1000);

        // DEPENDENT ON USERSTORE.THISUSERPROFILE
        // axios
        //     .get(`/user/${JSON.parse(sessionStorage.getItem('thisUserProfile')).credentials.meloID}/suggested`,
        //         {
        //             headers: {
        //                 Authorization: sessionStorage.getItem('FBIdToken'), //the token is a variable which holds the token
        //             }
        //         })
        //     .then(res => {
        //         suggestion = res.data
        //         console.log(suggestion)
        //     })
        //     .catch(err => console.log(err))

        // axios
        // .get(`/user/${UserStore.thisUserProfile.credentials.meloID}/bookmarked`,
        //     {
        //         headers: {
        //             Authorization: sessionStorage.getItem('FBIdToken'), //the token is a variable which holds the token
        //         }
        //     })
        // .then(res => {
        //     console.log(res.data)
        // })
        // .catch(err => console.log(err))
    }

    componentDidUpdate() {
        sessionStorage.setItem('UserStore', JSON.stringify(UserStore))
        spotifyApi.getMyTopArtists({ limit: 3 }).then((data) => {           // for recommendation
            console.log(data)
            data.items.map((item) => {
                topArtists = {
                    artistName: item.name,
                    image: item.images[0].url,
                    id: item.id
                }
                topArtistsArray.push(topArtists)
                UserStore.topArtists = topArtistsArray
            })
            topArtistsArray.map(item => {
                if (str == '') {
                    str = `${item.id}`
                } else str = `${str},${item.id}`
            })
            console.log(str)
        })

        spotifyApi.getMyTopTracks().then((data) => {                       // for profile
            console.log(data.items)

            let items = []
            data.items.map((item) => {
                topTracks = {
                    name: item.name,
                    albumName: item.album.name,
                    artistName: item.artists[0].name,
                    trackName: item.name,
                    image: item.album.images[0].url,
                    id: item.id
                }
                items.push(topTracks)
                UserStore.topTracks = items
            })
        })

        // spotifyApi.getMyRecentlyPlayedTracks().then((data) => {
        //     let items = []
        //     console.log(data)
        //     data.items.map((item) => {
        //         recentlyPlayed = {
        //             id: item.track.id,
        //             playedAt: item.played_at,
        //             albumName: item.track.album.name,
        //             artistName: item.track.artists[0].name,
        //             trackName: item.track.name,
        //             image: item.track.album.images[0].url,
        //             spotifyID: UserStore.thisSpotifyProfile.name
        //         }
        //         items.push(recentlyPlayed)
        //         UserStore.recentlyPlayed = items
        //     })
        //     console.log(items)
        // })
    }

    searchTrack = (e) => {
        this.setState({ song_title: [] })
        var trackQuery = {
            id: '',
            title: '',
            artist: ''
        }
        if (this.state.dropDown == 'Track') {
            // Tracks
            e.preventDefault();
            spotifyApi.searchTracks(this.state.song).then((data) => {
                console.log(data)
                data.tracks.items.map((item) => (
                    trackQuery = {
                        id: item.id,
                        title: item.name,
                        artist: item.artists[0].name,
                        artistID: item.artists[0].id,
                        albumName: item.album.name,
                        image: item.album.images[0].url,
                        releaseDate: item.album.release_date,
                        popularity: item.popularity,
                        duration: item.duration_ms
                    },
                    this.setState({ searchTab: true }),
                    this.setState({ song_title: [...this.state.song_title, trackQuery] }),
                    this.setState({ song: '' })
                ));
                console.log(this.state.song_title)
            },
                function (err) {
                    console.error(err);
                })
        } else if (this.state.dropDown == 'Album') {
            // Albums
            e.preventDefault();
            spotifyApi.searchAlbums(this.state.song).then((data) => {
                console.log(data)
                data.albums.items.map((item) => (
                    trackQuery = {
                        id: item.id,
                        title: item.name,
                        artist: item.artists[0].name,
                        image: item.images[0].url
                    },
                    this.setState({ searchTab: true }),
                    this.setState({ song_title: [...this.state.song_title, trackQuery] }),
                    this.setState({ song: '' })
                ));
                console.log(this.state.song_title)
            },
                function (err) {
                    console.error(err);
                })
        } else if (this.state.dropDown == 'Artist') {
            // Albums
            e.preventDefault();
            spotifyApi.searchArtists(this.state.song, { limit: 3 }).then((data) => {
                console.log(data)
                data.artists.items.map((item) => (
                    trackQuery = {
                        id: item.id,
                        title: item.name,
                        artist: item.name,
                        image: item.images[0].url
                    },
                    this.setState({ searchTab: true }),
                    this.setState({ song_title: [...this.state.song_title, trackQuery] }),
                    this.setState({ song: '' })
                ));
                console.log(this.state.song_title)
            },
                function (err) {
                    console.error(err);
                })
        }
        else if (this.state.dropDown == 'Playlist') {
            // Albums
            e.preventDefault();
            spotifyApi.searchPlaylists(this.state.song).then((data) => {
                console.log(data)
                data.playlists.items.map((item) => (
                    trackQuery = {
                        id: item.id,
                        title: item.name,
                        artist: item.owner.display_name,
                        image: item.images[0].url
                    },
                    this.setState({ searchTab: true }),
                    this.setState({ song_title: [...this.state.song_title, trackQuery] }),
                    this.setState({ song: '' })
                ));
                console.log(this.state.song_title)
            },
                function (err) {
                    console.error(err);
                })
        }
    }

    postItem = (e) => {
        e.preventDefault();
        axios
            .post('/post', {
                trackID: UserStore.thisTrack.id,
                spotifyID: UserStore.thisSpotifyProfile.id,
                body: this.state.post,
                status: UserStore.thisTrack.status
            },
                {
                    headers: {
                        Authorization: sessionStorage.getItem('FBIdToken'), //the token is a variable which holds the token
                    }
                })
            .then(res => {
                console.log(res.data)
                axios.get('/posts')
                    .then(res => {
                        console.log(res.data)
                        UserStore.posts = res.data
                        this.setState({ tab2: 1 })
                    })
                    .catch(err => console.log(err))

                UserStore.thisTrack = []
                UserStore.trackLoaded = false
            })
            .catch(err => console.log(err))

        this.setState({
            post: ''
        })
    }

    onClick = (item) => {
        console.log(item)
        
        itemSave = item
        this.setState({ tab2: 3 })

        UserStore.thisTrack = {
            id: item.foundations.id,
            name: item.foundations.title,
            artist: item.foundations.artist,
            artistImage: item.foundations.image,
            status: 'Track'
        }
        UserStore.trackLoaded = true // and others



        //call getArtist
        //artists top tracks
        //audio features / audio analysis

        // spotifyApi.getArtist(item.id)
        //     .then((response) => {
        //         console.log(response)
        //     })
        //     .catch(err => console.log(err))

        

        // get related posts
        /**get  all posts
         * get trackID
         * get Track from spotify
         * check if item.name == name
         * if yes, return post
         * if no, continue
         */


    }

    cancel = () => {
        UserStore.thisTrack = [
            {
                artist: '',
                name: ''
            }
        ]
        UserStore.trackLoaded = false
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onChange1 = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        dayjs.extend(relativeTime)

        let recentPostsMarkup = UserStore.posts ? (
            UserStore.posts.map(post => <Post key={post.postID} post={post} allUsers={allUsers} />)
        ) : <CircularProgress style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />


        let bookmarks = UserStore.bookmarked ? (
            UserStore.bookmarked.map(bookmarks => <Bookmarks key={bookmarks.postID} bookmarks={bookmarks} />)
        ) : <CircularProgress style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />

        console.log(this.state.post)
        const popover = (
            <Popover id="popover-basic" style={{ width: '2000px', borderRadius: '25px', color: '#3E5C76' }}>
                <Popover.Title style={{ textAlign: 'center' }} as="h3">search results</Popover.Title>
                <Popover.Content>
                    <Card style={{ height: '135px', textAlign: 'center', backgroundColor: '#3E5C76', borderRadius: '20px' }}>
                        <Scrollbar className='scroll'>
                            <Card.Body>
                                {/* <TrackQuery song_title={this.state.song_title} dropDownStatus={this.state.dropDown} /> */}
                                {this.state.song_title.map((track) => (
                                    <NewTrack key={track.id} track={track} dropDownStatus={this.state.dropDown} />
                                ))}
                            </Card.Body>
                        </Scrollbar>
                    </Card>
                </Popover.Content>
            </Popover>
        );

        return (
            <div>
                <Grid container>
                    <Grid item sm={12} xs={12} style={{ padding: '0px' }}>
                        <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '10px', backgroundColor: '#007bff' }}>
                            <Card style={{ backgroundColor: 'whitesmoke', borderRadius: '5px', margin: '10px' }}>
                                <ButtonGroup
                                    aria-label="Basic example"
                                    className="btn-group-toggle float-left"
                                    data-toggle="buttons">
                                    {this.state.tab2 == 1 &&
                                        <Button style={{ color: '#007bff', backgroundColor: '#21295c' }} variant="primary" onClick={() => this.setState({ tab2: 1 })}><TimelineIcon /></Button>
                                    }
                                    {this.state.tab2 != 1 &&
                                        <Button style={{ backgroundColor: '#007bff', color: 'white' }} variant="primary" onClick={() => this.setState({ tab2: 1 })}><TimelineIcon /></Button>
                                    }
                                    {this.state.tab2 != 2 &&
                                        <Button variant="primary" onClick={() => this.setState({ tab2: 2 })}><NotificationsIcon /></Button>
                                    }
                                    {this.state.tab2 == 2 &&
                                        <Button style={{ color: '#007bff', backgroundColor: '#21295c' }} variant="primary" onClick={() => this.setState({ tab2: 2 })}><NotificationsIcon /></Button>
                                    }
                                    {this.state.tab2 != 3 &&
                                        <Button variant="primary" onClick={() => this.setState({ tab2: 3 })}><ExploreIcon /></Button>
                                    }
                                    {this.state.tab2 == 3 &&
                                        <Button style={{ color: '#007bff', backgroundColor: '#21295c' }} variant="primary" onClick={() => this.setState({ tab2: 3 })}><ExploreIcon /></Button>
                                    }
                                </ButtonGroup>
                            </Card>
                            <Card.Body style={{ height: '100%' }}>

                                {this.state.tab2 == 1 &&
                                    <p>{recentPostsMarkup}</p>
                                }
                                {/* {   this.state.tab2 == 2 &&
                                    NOTIFICATIONS
                                } */}

                                {this.state.tab2 == 3 &&
                                    <Row>
                                        {itemSave.foundations.title == itemSave.foundations.albumName &&
                                            <Col lg={8}>
                                                <Card style={{ backgroundColor: 'white', height: '270px', margin: '5px', borderRadius: '10px' }}>
                                                    <Card.Header>
                                                        <Dropdown as={ButtonGroup} style={{ width: '100%' }}>
                                                            <Button style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '15px', backgroundColor: 'white' }} variant="primary"><marquee style={{ backgroundColor: 'white', borderRadius: '5px', padding: '5px' }} behavior="scroll" direction="left"><h4 style={{ color: '#007bff' }}>{itemSave.foundations.albumName}</h4></marquee></Button>

                                                            <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '15px', backgroundColor: 'white', color: '#007bff' }} />

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Save</h4></Dropdown.Item>
                                                                <Dropdown.Item style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Explore</h4></Dropdown.Item>
                                                                <Dropdown.Item style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>News</h4></Dropdown.Item>
                                                                <Dropdown.Item style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Share</h4></Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        {/* <h4 style={{ backgroundColor: 'white', color: '#007bff', textAlign: 'center', padding: '5px', borderRadius: '10px' }}>{itemSave.albumName}</h4> */}
                                                    </Card.Header>
                                                    <Card.Body style={{ borderRadius: '10px', backgroundImage: `url(${itemSave.foundations.image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'center', background: 'cover' }}>
                                                        <Row style={{ marginBottom: '15px' }}>
                                                            <Col>
                                                                <div>
                                                                    <h4 style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px', textAlign: 'center', padding: '2px' }}>{(itemSave.foundations.popularity < 5) ? "Novice Amateur" : (itemSave.foundations.popularity < 7) ? "Amateur" : (itemSave.foundations.popularity < 10) ? "Advanced Amateur" : (itemSave.foundations.popularity < 20) ? "Novice Pro" : (itemSave.foundations.popularity < 35) ? "Pro" : (itemSave.foundations.popularity < 50) ? "Advanced Pro" : (itemSave.foundations.popularity < 70) ? "Blown" : (itemSave.foundations.popularity < 90) ? "Fame" : (itemSave.foundations.popularity < 95) ? "Icon" : "VIP"}{/*`${dayjs(itemSave.releaseDate).fromNow()}`*/}</h4>
                                                                </div>
                                                            </Col>

                                                            <Col>
                                                                <div style={{ paddingTop: '5px' }}>
                                                                    {/* {`Hot Rating : ${itemSave.popularity}`} */}
                                                                    {itemSave.foundations.popularity > 75 &&
                                                                        <ProgressBar variant="success" now={itemSave.foundations.popularity} />
                                                                    }
                                                                    {itemSave.foundations.popularity > 60 && itemSave.popularity < 76 &&
                                                                        <ProgressBar variant="info" now={itemSave.foundations.popularity} />
                                                                    }
                                                                    {itemSave.foundations.popularity < 61 &&
                                                                        <ProgressBar variant="warning" now={itemSave.foundations.popularity} />
                                                                    }
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row style={{ marginBottom: '10px' }}>
                                                            <Col>
                                                                {/* <Image src={itemSave.image} style={{ height: '120px', width: '120px', marginLeft: 'auto', marginRight: 'auto', display: 'block', borderRadius: '5px', border: 'solid', borderColor: '#21295c' }} /> */}
                                                                <SpotifyPlayer
                                                                    uri={`spotify:track:${itemSave.foundations.id}`}
                                                                    size={{
                                                                        width: '100%',
                                                                        height: 80,
                                                                    }}
                                                                    view={'coverart'}
                                                                    theme={'black'}
                                                                />
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col>
                                                                <div>
                                                                    <h4 style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '5px', textAlign: 'center', padding: '2px' }}>{`released ${dayjs(itemSave.foundations.releaseDate).fromNow()}`}</h4>
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                    </Card.Body>

                                                </Card>
                                            </Col>
                                        }
                                        {itemSave.foundations.title != itemSave.foundations.albumName &&
                                            <Col lg={4}>
                                                <Card style={{ backgroundColor: '#21295c', height: '270px', margin: '5px', border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                                                    <Card.Header>
                                                        <marquee behavior="scroll" direction="left"><h4 style={{ color: 'white', textAlign: 'center' }}>{itemSave.foundations.title}</h4></marquee>
                                                    </Card.Header>
                                                </Card>
                                            </Col>
                                        }

                                        {itemSave.foundations.title != itemSave.foundations.albumName &&
                                            <Col lg={4}>
                                                <Card style={{ backgroundColor: 'white', height: '270px', margin: '5px', border: 'solid', borderColor: '#21295c', borderRadius: '10px' }}>
                                                    <Card.Header>
                                                        <marquee style={{ backgroundColor: 'white', borderRadius: '5px', padding: '5px' }} behavior="scroll" direction="left"><h4 style={{ backgroundColor: 'white', color: '#007bff', textAlign: 'center' }}>{itemSave.foundations.albumName}</h4></marquee>
                                                    </Card.Header>
                                                    <Card.Body style={{ background: 'white', borderRadius: '10px' }}>
                                                        <Row>
                                                            <Col>
                                                                <Image src={itemSave.foundations.image} style={{ height: '110px', width: '110px', marginLeft: 'auto', marginRight: 'auto', display: 'block', borderRadius: '5px', border: 'solid', borderColor: '#21295c' }} />
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>

                                                </Card>
                                            </Col>
                                        }

                                        <Col lg={4}>
                                            <Card style={{ backgroundColor: 'white', height: '270px', margin: '5px', border: 'none', borderColor: '#21295c', borderRadius: '10px' }}>
                                                <Card.Header>
                                                    <Dropdown as={ButtonGroup} style={{ width: '100%', marginBottom: '5px' }}>
                                                        <Button style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '15px', backgroundColor: 'white' }} variant="primary"><marquee behavior="scroll" direction="left"><h4 style={{ color: '#007bff' }}>{itemSave.foundations.artist}</h4></marquee></Button>

                                                        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '15px', backgroundColor: 'white', color: '#007bff' }} />

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Follow</h4></Dropdown.Item>
                                                            <Dropdown.Item style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Explore</h4></Dropdown.Item>
                                                            <Dropdown.Item style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>News</h4></Dropdown.Item>
                                                            <Dropdown.Item style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Share</h4></Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    <Row style={{ marginTop: '3px', marginBotom: '3px' }}>
                                                        <Col lg={12}>
                                                            <div>
                                                                <h6 style={{ backgroundColor: 'white', color: '#007bff', textAlign: 'center', borderRadius: '10px', padding: '5px' }}>{(itemSave.foundations.popularity < 5) ? "Novice Amateur" : (itemSave.foundations.popularity < 7) ? "Amateur" : (itemSave.foundations.popularity < 10) ? "Advanced Amateur" : (itemSave.foundations.popularity < 20) ? "Novice Pro" : (itemSave.foundations.popularity < 35) ? "Pro" : (itemSave.foundations.popularity < 50) ? "Advanced Pro" : (itemSave.foundations.popularity < 70) ? "Blown" : (itemSave.foundations.popularity < 90) ? "Fame" : (itemSave.foundations.popularity < 95) ? "Icon" : "VIP"}</h6>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: '3px' }}>
                                                        <Col lg={12}>
                                                            <div >
                                                                <h6 style={{ color: '#21295c', textAlign: 'center', borderRadius: '10px' }}>Followers</h6>
                                                            </div>
                                                            <div>
                                                                <h6 style={{ backgroundColor: 'white', color: '#007bff', textAlign: 'center', borderRadius: '10px', padding: '5px' }}>{itemSave.artist.followers}</h6>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card.Header>
                                                <Card.Body style={{ backgroundImage: `url(${itemSave.artist.image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', backgroundPosition: 'center', background: 'cover', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                                    {/* <Carousel>
                                                        <Carousel.Item>
                                                            <Row>
                                                                <Col>
                                                                    <Image src={thisArtist.image} style={{ height: '95px', borderRadius: '10px', width: '95px', marginLeft: 'auto', marginRight: 'auto', display: 'block', border: 'solid', borderColor: '#21295c' }} />
                                                                </Col>
                                                            </Row>
                                                        </Carousel.Item>
                                                    </Carousel> */}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                }

                                {this.state.tab2 == 3

                                    // <Row>
                                    //     <Col lg={12}>
                                    //         <Card style={{ backgroundColor: '#007bff', height: '370px', margin: '5px', border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                                    //             {/* <Card.Header variant="primary">
                                    //                 <h2 style={{ textAlign: 'center', color: '#007bff', padding: '5px', borderRadius: '5px', borderTopRightRadius: '10px', borderBottomRightRadius: '15px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '15px', border: 'solid', borderColor: '#007bff' }}>Top Tracks</h2>
                                    //             </Card.Header> */}
                                    //             <Card.Body>
                                    //                 <Scrollbar>
                                    //                     {artistsTopTracksArray.map(item => <Row style={{ width: '95%', borderRadius: '15px', margin: '15px', border: 'solid', paddingTop: '2px', borderColor: '#007bff', backgroundColor: "#007bff" }}>

                                    //                         <Col lg={2} style={{ marginTop: 'auto', marginBottom: 'auto', display: 'block' }}>
                                    //                             <Button style={{ borderRadius: '5px', margin: '5px', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}> <h4 style={{ color: '#007bff' }}>1</h4> </Button>
                                    //                             <Button style={{ borderRadius: '5px', margin: '5px', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}> <ArrowDropUpIcon style={{ color: '#007bff' }} /></Button>
                                    //                         </Col>

                                    //                         <Col lg={8} style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', display: 'block', padding: '0px', backgroundColor: 'white', borderBottomLeftRadius: '7px', borderBottomRightRadius: '7px', borderBottom: 'solid', borderColor: 'white' }}>
                                    //                             <SpotifyPlayer
                                    //                                 uri={`spotify:track:${item.id}`}
                                    //                                 size={{
                                    //                                     width: '100%',
                                    //                                     height: 80,
                                    //                                 }}
                                    //                                 view={'coverart'}
                                    //                                 theme={'black'}
                                    //                             />
                                    //                         </Col>

                                    //                         <Col lg={2} style={{ marginTop: 'auto', marginBottom: 'auto', display: 'block' }}>
                                    //                             <Button style={{ borderRadius: '5px', margin: '5px', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}> <SaveIcon style={{ color: '#007bff' }} /> </Button>
                                    //                             <Button style={{ borderRadius: '5px', margin: '5px', backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}> <PostAddIcon style={{ color: '#007bff' }} /></Button>
                                    //                         </Col>
                                    //                     </Row>)}
                                    //                 </Scrollbar>
                                    //             </Card.Body>
                                    //         </Card>
                                    //     </Col>
                                    // </Row>

                                }

                                {this.state.tab2 == 3 &&
                                    <Row>
                                        <Col lg={4}>
                                            <Card style={{ backgroundColor: 'white', height: '200px', margin: '5px', border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                                                Audio Analysis
                                            </Card>
                                        </Col>
                                        <Col lg={8}>
                                            <Card style={{ backgroundColor: 'white', height: '200px', margin: '5px', border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                                                <Radar
                                                    data={chartExample1['data1']}
                                                    options={chartExample1.options}
                                                    style={{ width: '100%' }}
                                                />
                                            </Card>
                                        </Col>
                                    </Row>
                                }

                                {this.state.tab2 == 3 &&
                                    <Row>
                                        <Col>
                                            <Card style={{ backgroundColor: '#21295c', height: '200px', margin: '5px', border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                                                Related Posts
                                            </Card>
                                        </Col>
                                    </Row>
                                }

                            </Card.Body>
                        </Paper>
                    </Grid>

                    <Grid item sm={3} xs={12} style={{ position: 'fixed', right: '0', width: '100%', height: '100%' }}>
                        <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#007bff', borderLeft: 'none', borderColor: 'white', height: '100%' }}>
                            <Card style={{ backgroundColor: 'whitesmoke', margin: '5px', borderRadius: '10px' }}>
                                <ButtonGroup
                                    aria-label="Basic example"
                                    className="btn-group-toggle float-center"
                                    data-toggle="buttons">
                                    {this.state.tab == 1 &&
                                        <Button style={{ borderRadius: '10px', backgroundColor: '#21295c', color: '#007bff' }} onClick={() => this.setState({ tab: '1' })}><PostAddIcon /></Button>
                                    }
                                    {this.state.tab != 1 &&
                                        <Button style={{ borderRadius: '10px', backgroundColor: '#007bff', color: 'white' }} variant="primary" onClick={() => this.setState({ tab: '1' })}><PostAddIcon /></Button>
                                    }
                                    {this.state.tab == 2 &&
                                        <Button style={{ borderRadius: '10px', backgroundColor: '#21295c', color: '#007bff' }} variant="primary" onClick={() => this.setState({ tab: '2' })}><SearchIcon /></Button>
                                    }
                                    {this.state.tab != 2 &&
                                        <Button style={{ borderRadius: '10px' }} variant="primary" onClick={() => this.setState({ tab: '2' })}><SearchIcon /></Button>
                                    }
                                </ButtonGroup>
                            </Card>
                            <Card style={{ height: '200px', padding: '10px', borderRadius: '20px', margin: '5px', border: 'none', borderColor: 'whitesmoke', backgroundColor: '#007bff' }} >

                                <Card.Header style={{ borderRadius: '15px', marginBottom: '5px', borderBottom: 'solid', borderColor: 'white' }}>
                                    <Dropdown as={ButtonGroup} style={{ width: '100%' }}>
                                        {this.state.dropDown == 'Track' &&
                                            <Button onClick={() => this.setState({ dropDown: 'Track' })} style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '15px', backgroundColor: 'white' }} variant="primary"><h4 style={{ color: '#007bff' }}>Track</h4></Button>
                                        }
                                        {this.state.dropDown == 'Album' &&
                                            <Button onClick={() => this.setState({ dropDown: 'Album' })} style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '15px', backgroundColor: 'white' }} variant="primary"><h4 style={{ color: '#007bff' }}>Album</h4></Button>
                                        }
                                        {this.state.dropDown == 'Artist' &&
                                            <Button onClick={() => this.setState({ dropDown: 'Artist' })} style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '15px', backgroundColor: 'white' }} variant="primary"><h4 style={{ color: '#007bff' }}>Artist</h4></Button>
                                        }
                                        {this.state.dropDown == 'Playlist' &&
                                            <Button onClick={() => this.setState({ dropDown: 'Playlist' })} style={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '15px', backgroundColor: 'white' }} variant="primary"><h4 style={{ color: '#007bff' }}>Playlist</h4></Button>
                                        }

                                        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '15px', backgroundColor: 'white', color: '#007bff' }} />

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => this.setState({ dropDown: 'Track' })} style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Track</h4></Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ dropDown: 'Album' })} style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Album</h4></Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ dropDown: 'Artist' })} style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Artist</h4></Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ dropDown: 'Playlist' })} style={{ backgroundColor: 'white' }}><h4 style={{ color: '#007bff' }}>Playlist</h4></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Header>

                                <Card.Body style={{ padding: '5px', borderRadius: '15px', backgroundColor: '#007bff' }}>

                                    {this.state.tab == 1 && !UserStore.trackLoaded &&
                                        <form style={{ display: 'flex', height: '50px', margin: ' 0 10px 10px 10px' }} onSubmit={this.searchTrack}>
                                            {this.state.dropDown == 'Track' &&
                                                <input
                                                    type='text'
                                                    name='song'
                                                    style={{ flex: '10', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }}
                                                    placeholder='Search for a track...'
                                                    value={this.state.song}
                                                    onChange={this.onChange}
                                                />
                                            }
                                            {this.state.dropDown == 'Album' &&
                                                <input
                                                    type='text'
                                                    name='song'
                                                    style={{ flex: '10', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }}
                                                    placeholder='Search for an album...'
                                                    value={this.state.song}
                                                    onChange={this.onChange}
                                                />
                                            }
                                            {this.state.dropDown == 'Artist' &&
                                                <input
                                                    type='text'
                                                    name='song'
                                                    style={{ flex: '10', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }}
                                                    placeholder='Search for an artist...'
                                                    value={this.state.song}
                                                    onChange={this.onChange}
                                                />
                                            }
                                            {this.state.dropDown == 'Playlist' &&
                                                <input
                                                    type='text'
                                                    name='song'
                                                    style={{ flex: '10', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }}
                                                    placeholder='Search for a playlist...'
                                                    value={this.state.song}
                                                    onChange={this.onChange}
                                                />
                                            }

                                            {/* <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}> */}
                                            <Button
                                                type='submit'
                                                value='search'
                                                style={{ flex: '2 ', backgroundColor: 'white', borderRadius: '10px ', margin: '5px', border: 'solid', borderColor: 'white' }}
                                            >
                                                <SearchIcon style={{ color: '#007bff' }} />
                                            </Button>
                                            {/* </OverlayTrigger> */}
                                        </form>
                                    }

                                    {this.state.tab == 1 && UserStore.trackLoaded &&
                                        <form style={{ display: 'flex', height: '50px', margin: ' 0 10px 10px 10px' }} onSubmit={this.cancel}>
                                            {UserStore.thisTrack.status != 'Artist' &&
                                                <input
                                                    type='text'
                                                    name='song'
                                                    style={{ flex: '10', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }}
                                                    placeholder={`${UserStore.thisTrack.artist} - ${UserStore.thisTrack.name}`}
                                                    value={this.state.song}
                                                    onChange={this.onChange}
                                                    disabled={true}
                                                />
                                            }
                                            {UserStore.thisTrack.status == 'Artist' &&
                                                <input
                                                    type='text'
                                                    name='song'
                                                    style={{ flex: '10', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }}
                                                    placeholder={`${UserStore.thisTrack.artist}`}
                                                    value={this.state.song}
                                                    onChange={this.onChange}
                                                    disabled={true}
                                                />
                                            }
                                            <Button
                                                type='submit'
                                                value='cancel'
                                                style={{ flex: '2 ', backgroundColor: 'red', borderRadius: '10px ', color: 'whitesmoke', margin: '5px', border: 'solid', borderColor: '#151E3F' }}
                                            >
                                                <CancelIcon />
                                            </Button>
                                        </form>
                                    }

                                    {this.state.tab == 1 &&
                                        <form style={{ display: 'flex', height: '50px', margin: '0px' }} onSubmit={this.postItem}>
                                            {/* <input
                                                type='text'
                                                name='post'
                                                style={{ flex: '10', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }}
                                                placeholder='Make a Post...'
                                                value={this.state.post}
                                                onChange={this.onChange}
                                            /> */}
                                            <Form.Control onChange={this.onChange} as="textarea" value={this.state.post} rows="5" name='post' style={{ flex: '10', resize: 'none', padding: '10px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }} placeholder='Make a Post...' />

                                            <Button
                                                type='submit'
                                                value='post'
                                                style={{ flex: '2 ', backgroundColor: 'white', borderRadius: '10px ', margin: '5px', border: 'solid', borderColor: 'white' }}
                                            >
                                                <PostAddIcon style={{ color: '#007bff' }} />
                                            </Button>

                                        </form>
                                    }

                                    {this.state.tab == 2 &&
                                        <form style={{ display: 'flex', height: '50px', margin: '30px' }} onSubmit={this.searchTrack}>
                                            <input
                                                type='text'
                                                name='song'
                                                style={{ flex: '10', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: 'white', borderColor: '#007bff', color: '#007bff' }}
                                                placeholder='Search anything...'
                                                value={this.state.song}
                                                onChange={this.onChange}
                                            />
                                            {/* <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}> */}
                                            <Button
                                                type='submit'
                                                value='discover'
                                                style={{ flex: '4 ', backgroundColor: '#1db954', borderRadius: '10px ', color: 'white', margin: '5px', border: 'solid', borderColor: 'white' }}
                                            >
                                                <SearchIcon />
                                            </Button>
                                            {/* </OverlayTrigger> */}
                                        </form>
                                    }
                                </Card.Body>
                            </Card>

                            {!this.state.searchTab &&
                                <Card style={{ backgroundColor: 'whitesmoke', margin: '5px', borderRadius: '10px' }}>
                                    <ButtonGroup
                                        aria-label="Basic example"
                                        className="btn-group-toggle float-left"
                                        data-toggle="buttons">
                                        {this.state.tab1 == 1 &&
                                            <Button style={{ borderRadius: '10px', backgroundColor: '#21295c', color: '#007bff' }} onClick={() => this.setState({ tab1: 1 })}><EqualizerIcon /></Button>
                                        }
                                        {this.state.tab1 != 1 &&
                                            <Button style={{ borderRadius: '10px' }} variant="primary" onClick={() => this.setState({ tab1: 1 })}><EqualizerIcon /></Button>
                                        }
                                        {this.state.tab1 == 2 &&
                                            <Button style={{ borderRadius: '10px', backgroundColor: '#21295c', color: '#007bff' }} onClick={() => this.setState({ tab1: 2 })}><ExploreIcon /></Button>
                                        }
                                        {this.state.tab1 != 2 &&
                                            <Button style={{ borderRadius: '10px' }} variant="primary" onClick={() => this.setState({ tab1: 2 })}><ExploreIcon /></Button>
                                        }
                                    </ButtonGroup>
                                </Card>
                            }

                            {!this.state.searchTab &&
                                <Card style={{ backgroundColor: '#007bff', height: '270px', padding: ' 0 10px 10px 10px', borderRadius: '20px', margin: '5px', border: 'none', borderColor: 'whitesmoke' }}>

                                    {this.state.tab1 == 1 &&
                                        <div style={{ height: '100%' }}>
                                            <Card style={{ borderBottom: 'solid', borderRadius: '10px', padding: '3px', backgroundColor: 'white', borderColor: 'whitesmoke', marginTop: '3px' }}>
                                                <Row>
                                                    <Col lg={3} style={{ borderRight: 'solid', marginTop: 'auto', marginBottom: 'auto' }}>
                                                        <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                            <Col>
                                                                <Row>
                                                                    <Col lg={2}>
                                                                        <ArrowDropUpIcon style={{ color: '#9FD356' }} />
                                                                    </Col>
                                                                    <Col>
                                                                        <h4 style={{ textAlign: 'center', color: '#007bff' }}>1</h4>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                    <Col>
                                                        <Row>
                                                            <Col lg={3}>
                                                                <CardMedia
                                                                    // onClick={() => {
                                                                    //     UserStore.URI = `spotify:track:${item.id}`
                                                                    //     //this.setState({tab2 : '1'})
                                                                    // }}
                                                                    image={art4}
                                                                    //title={`${this.state.thisTrack.name} album cover`}
                                                                    style={{ height: '40px', width: '40px', border: 'none', borderColor: '#21295c', borderRadius: '10px' }}
                                                                />
                                                            </Col>
                                                            <Col style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                                                <h4 style={{ textAlign: 'center', color: '#007bff' }}>F.A.M.E.</h4>
                                                                {/* <marquee behavior="scroll" direction="left">Nights in the rain</marquee> */}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>

                                            <Card style={{ borderBottom: 'solid', borderRadius: '10px', padding: '3px', backgroundColor: 'white', borderColor: 'whitesmoke', marginTop: '3px' }}>
                                                <Row>
                                                    <Col lg={3} style={{ borderRight: 'solid', marginTop: 'auto', marginBottom: 'auto' }}>
                                                        <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                            <Col>
                                                                <Row>
                                                                    <Col lg={2}>
                                                                        <ArrowDropUpIcon style={{ color: '#9FD356' }} />
                                                                    </Col>
                                                                    <Col>
                                                                        <h4 style={{ textAlign: 'center', color: '#007bff' }}>2</h4>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>


                                                    <Col>
                                                        <Row>
                                                            <Col lg={3}>
                                                                <CardMedia
                                                                    // onClick={() => {
                                                                    //     UserStore.URI = `spotify:track:${item.id}`
                                                                    //     //this.setState({tab2 : '1'})
                                                                    // }}
                                                                    image={art1}
                                                                    //title={`${this.state.thisTrack.name} album cover`}
                                                                    style={{ height: '40px', width: '40px', border: 'none', borderColor: '#21295c', borderRadius: '10px' }}
                                                                />
                                                            </Col>
                                                            <Col style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                                                <h4 style={{ textAlign: 'center', color: '#007bff' }}>Ego Death</h4>
                                                                {/* <marquee behavior="scroll" direction="left">Nights in the rain</marquee> */}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>

                                            <Card style={{ borderBottom: 'solid', borderRadius: '10px', padding: '3px', backgroundColor: 'white', borderColor: 'whitesmoke', marginTop: '3px' }}>
                                                <Row>
                                                    <Col lg={3} style={{ borderRight: 'solid', marginTop: 'auto', marginBottom: 'auto' }}>
                                                        <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                            <Col>
                                                                <Row>
                                                                    <Col lg={2}>
                                                                        <ArrowDropDownIcon style={{ color: 'red' }} />
                                                                    </Col>
                                                                    <Col>
                                                                        <h4 style={{ textAlign: 'center', color: '#007bff' }}>3</h4>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                    <Col>
                                                        <Row>
                                                            <Col lg={3}>
                                                                <CardMedia
                                                                    // onClick={() => {
                                                                    //     UserStore.URI = `spotify:track:${item.id}`
                                                                    //     //this.setState({tab2 : '1'})
                                                                    // }}
                                                                    image={art5}
                                                                    //title={`${this.state.thisTrack.name} album cover`}
                                                                    style={{ height: '40px', width: '40px', border: 'none', borderColor: '#21295c', borderRadius: '10px' }}
                                                                />
                                                            </Col>
                                                            <Col style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                                                <h4 style={{ textAlign: 'center', color: '#007bff' }}>DAMN</h4>
                                                                {/* <marquee behavior="scroll" direction="left"><h4>2014 Forrest Hills Drive</h4></marquee> */}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>

                                            <Card style={{ borderBottom: 'solid', borderRadius: '10px', padding: '3px', backgroundColor: 'white', borderColor: 'whitesmoke', marginTop: '3px' }}>
                                                <Row>
                                                    <Col lg={3} style={{ borderRight: 'solid', marginTop: 'auto', marginBottom: 'auto' }}>
                                                        <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                                                            <Col>
                                                                <Row>
                                                                    <Col lg={2}>
                                                                        <ArrowDropDownIcon style={{ color: 'red' }} />
                                                                    </Col>
                                                                    <Col>
                                                                        <h4 style={{ textAlign: 'center', color: '#007bff' }}>4</h4>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                    <Col>
                                                        <Row>
                                                            <Col lg={3}>
                                                                <CardMedia
                                                                    // onClick={() => {
                                                                    //     UserStore.URI = `spotify:track:${item.id}`
                                                                    //     //this.setState({tab2 : '1'})
                                                                    // }}
                                                                    image={art3}
                                                                    //title={`${this.state.thisTrack.name} album cover`}
                                                                    style={{ height: '40px', width: '40px', border: 'none', borderColor: '#21295c', borderRadius: '10px' }}
                                                                />
                                                            </Col>
                                                            <Col style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                                                                <h4 style={{ textAlign: 'center', color: '#007bff' }}>Connect</h4>
                                                                {/* <marquee behavior="scroll" direction="left">Nights in the rain</marquee> */}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                            <Row>
                                                <Col>
                                                    <Button style={{ backgroundColor: 'white', marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%', marginTop: '3px', borderRadius: '20px' }}><h4 style={{ color: '#007bff' }}><bold>show more...</bold></h4></Button>
                                                </Col>

                                            </Row>

                                        </div>


                                    }


                                    {this.state.tab1 == 2 &&
                                        // <Thumbs />

                                        <div style={{ marginLeft: '0px', borderLeft: 'solid', borderRight: 'solid', borderBottom: 'solid', borderRadius: '25px', }}>
                                            <MediaRecommendCard />

                                            <div>
                                                <Button variant='primary' style={{ backgroundColor: 'white ', margin: '5px' }} onClick={() => this.postTrack(UserStore.playbackState.id)}><PostAddIcon style={{ color: '#007bff' }} /></Button>

                                                <IconButton aria-label="previous" >
                                                    <SkipPreviousIcon />
                                                </IconButton>
                                                {UserStore.isPlaying &&
                                                    <IconButton aria-label="play/pause">
                                                        <PlayArrowIcon />
                                                    </IconButton>
                                                }
                                                {!UserStore.isPlaying &&
                                                    <IconButton aria-label="play/pause">
                                                        <PauseIcon />
                                                    </IconButton>
                                                }
                                                <IconButton aria-label="next" onClick={this.nextTrack} >
                                                    <SkipNextIcon />
                                                </IconButton>
                                                {this.state.saved &&
                                                    <Button variant='primary' style={{ backgroundColor: 'white ', margin: '5px' }} onClick={() => this.saveTrack(UserStore.playbackState.id)}><SaveOutlinedIcon style={{ color: '#007bff' }} /></Button>
                                                }
                                                {!this.state.saved &&
                                                    <Button variant='primary' style={{ backgroundColor: 'white ', margin: '5px' }} onClick={() => this.saveTrack(UserStore.playbackState.id)}><SaveIcon style={{ color: '#007bff' }} /></Button>
                                                }
                                            </div>
                                        </div>
                                    }
                                    {/* </Card.Body> */}
                                </Card>
                            }

                            {!this.state.searchTab &&
                                <Card style={{ backgroundColor: 'whitesmoke', borderRadius: '10px', margin: '5px' }}>
                                    <ButtonGroup
                                        aria-label="Basic example"
                                        className="btn-group-toggle float-left"
                                        data-toggle="buttons">
                                        {this.state.tab3 == 1 &&
                                            <Button style={{ borderRadius: '10px', backgroundColor: '#21295c', color: '#007bff' }} variant="primary" onClick={() => this.setState({ tab3: 1 })}><ThumbsUpDownIcon /></Button>
                                        }
                                        {this.state.tab3 != 1 &&
                                            <Button style={{ borderRadius: '10px' }} variant="primary" onClick={() => this.setState({ tab3: 1 })}><ThumbsUpDownIcon /></Button>
                                        }
                                        {this.state.tab3 == 2 &&
                                            <Button style={{ borderRadius: '10px', backgroundColor: '#21295c', color: '#007bff' }} onClick={() => this.setState({ tab3: 2 })}><InboxIcon /></Button>
                                        }
                                        {this.state.tab3 != 2 &&
                                            <Button style={{ borderRadius: '10px' }} variant="primary" onClick={() => this.setState({ tab3: 2 })}><InboxIcon /></Button>
                                        }
                                    </ButtonGroup>
                                </Card>
                            }
                            {!this.state.searchTab &&
                                <Card style={{ backgroundColor: '#007bff', borderRadius: '20px', height: '200px', border: 'none', borderColor: 'whitesmoke' }}>
                                    {this.state.tab3 == 1 &&
                                        // <Thumbs />

                                        <div style={{ borderRadius: '20px', }}>
                                            <MediaRecommendCard />

                                            <Row>
                                                <Col style={{ padding: '3px' }}>
                                                    <Button /*onClick={() => console.log(item.name)}*/ style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><ThumbUpIcon style={{ color: '#21295c' }} /></Button>
                                                </Col>
                                                <Col style={{ padding: '3px' }}>
                                                    <Button /*onClick={() => this.postTrack(item)}*/ style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><PostAddIcon style={{ color: '#21295c' }} /></Button>
                                                </Col>
                                                {!this.state.saved &&
                                                    <Col style={{ padding: '3px' }}>
                                                        <Button /*onClick={() => this.saveTrack(item.id)}*/ style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><SaveOutlinedIcon style={{ color: '#21295c' }} /></Button>
                                                    </Col>
                                                }
                                                {this.state.saved &&
                                                    <Col style={{ padding: '3px' }}>
                                                        <Button /*onClick={() => this.saveTrack(item.id)} */ style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><SaveIcon style={{ color: '#21295c' }} /></Button>
                                                    </Col>
                                                }

                                                <Col style={{ padding: '3px' }}>
                                                    <Button /*onClick={() => console.log(item.name)}*/ style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block', backgroundColor: '#007bff', borderRadius: '10px' }}><ThumbDownIcon style={{ color: '#21295c' }} /></Button>
                                                </Col>

                                            </Row>
                                        </div>
                                    }

                                    {this.state.tab3 == 2
                                        // <Carousel indicators={false} interval={4000}>
                                        //     {suggestion.suggested.map((item) =>

                                        //         <Carousel.Item style={{ padding: '38px' }}>
                                        //             <CardHeader
                                        //                 style={{ backgroundColor: 'white', color: '#007bff', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                                        //                 avatar={
                                        //                     <Avatar aria-label="recipe" /*src={}*/ /*onClick={this.otherUserPage}*/ style={{ border: 'solid', borderColor: 'whitesmoke' }}>
                                        //                         {item.sender.substring(0, 1)}
                                        //                     </Avatar>
                                        //                 }
                                        //                 action={
                                        //                     <OverlayTrigger trigger="focus" placement="left" /*overlay={popoverMoreVert}*/>
                                        //                         <IconButton aria-label="settings">
                                        //                             <MoreVertIcon style={{ color: '#007bff' }} />
                                        //                         </IconButton>
                                        //                     </OverlayTrigger>
                                        //                 }
                                        //                 title={item.sender}
                                        //                 subheaderTypographyProps={{ color: 'primary' }}
                                        //                 subheader={dayjs(item.suggestedAt).fromNow()}
                                        //             />
                                        //             <div>
                                        //                 {item.type == 'Track' &&
                                        //                     <SpotifyPlayer
                                        //                         uri={`spotify:track:${item.trackID}`}
                                        //                         size={{
                                        //                             width: '100%',
                                        //                             height: 80,
                                        //                         }}
                                        //                         view={'coverart'}
                                        //                         theme={'black'}
                                        //                     />
                                        //                 }
                                        //                 {item.type == 'Album' &&
                                        //                     <SpotifyPlayer
                                        //                         uri={`spotify:album:${item.trackID}`}
                                        //                         size={{
                                        //                             width: '100%',
                                        //                             height: 80,
                                        //                         }}
                                        //                         view={'coverart'}
                                        //                         theme={'black'}
                                        //                     />
                                        //                 }
                                        //                 {item.type == 'Playlist' &&
                                        //                     <SpotifyPlayer
                                        //                         uri={`spotify:playlist:${item.trackID}`}
                                        //                         size={{
                                        //                             width: '100%',
                                        //                             height: 80,
                                        //                         }}
                                        //                         view={'coverart'}
                                        //                         theme={'black'}
                                        //                     />
                                        //                 }
                                        //                 {item.type == 'Artist' &&
                                        //                     <SpotifyPlayer
                                        //                         uri={`spotify:artist:${item.trackID}`}
                                        //                         size={{
                                        //                             width: '100%',
                                        //                             height: 80,
                                        //                         }}
                                        //                         view={'coverart'}
                                        //                         theme={'black'}
                                        //                     />
                                        //                 }
                                        //             </div>
                                        //         </Carousel.Item>)}
                                        // </Carousel>
                                    }
                                </Card>
                            }

                            {this.state.searchTab == true &&
                                <Card style={{ textAlign: 'center', backgroundColor: '#007bff', borderRadius: '20px', height: '550px', border: 'none', borderColor: 'white' }}>
                                    <Button onClick={() => this.setState({ searchTab: false })} style={{ backgroundColor: 'red', borderRadius: '10px' }}><h4><bold>return</bold></h4></Button>
                                    {/* <h4 style={{ backgroundColor: 'white', color: '#007bff', padding: '5px', borderRadius: '7px' }}>search results</h4> */}
                                    <Scrollbar>
                                        {this.state.song_title.map((track) => (
                                            <NewTrack key={track.id} track={track} dropDownStatus={this.state.dropDown} item={this.onClick} />
                                        ))}
                                    </Scrollbar>

                                </Card>
                            }

                        </Paper>


                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default observer(main)

