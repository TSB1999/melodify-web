import React, { Component } from 'react'
import { Card, Row, Col, Button, ButtonGroup, Image, Carousel, ProgressBar, Container, FormControl, OverlayTrigger, Popover, Dropdown, Form } from 'react-bootstrap'
import UserStore from '../stores/UserStores';
import Coverflow from 'react-coverflow';
import img1 from '/Users/tsb99/Documents/melodify/frontend/src/spotify-icon-2.png'
import { observer } from 'mobx-react';
import Paper from '@material-ui/core/Paper'
import LanguageIcon from '@material-ui/icons/Language';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { CardMedia, Typography, StylesProvider } from '@material-ui/core'
import SubjectIcon from '@material-ui/icons/Subject';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import SettingsIcon from '@material-ui/icons/Settings';
import axios from 'axios'
import spotifyApi from '../components/spotify_api/Spotify_API';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Radar } from "react-chartjs-2";
import Post from '/Users/tsb99/Documents/melodify/frontend/src/components/Post.js'
import LaunchIcon from '@material-ui/icons/Launch';
import FaceIcon from '@material-ui/icons/Face';
import AlbumIcon from '@material-ui/icons/Album';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Scrollbar from 'react-scrollbars-custom'
import Grid from '@material-ui/core/Grid'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import ExploreIcon from '@material-ui/icons/Explore';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TimelineIcon from '@material-ui/icons/Timeline';
import InboxIcon from '@material-ui/icons/Inbox';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TrackQuery from '../components/TrackQuery'
import Thumbs from '../components/Thumbs';
import Inbox from '../components/Inbox';
import SpotifyPlayer from 'react-spotify-player';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatIcon from '@material-ui/icons/Chat';
import AddCommentIcon from '@material-ui/icons/AddComment';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
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
import SaveIcon from '@material-ui/icons/Save';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { Card as MaterialCard, CardHeader, Avatar, IconButton, CardContent } from '@material-ui/core';

let topTracks = {}

let userTopTracks = []

let userTopArtists = []

let userPlaylists = []

let artistTopTracks = {}

let artistsTopTracksArray = []

let getPlaylists = {}


let topArtists = {}

let audioFeatures = {}

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
          label: "Streams", // label : song
          fill: false,
          // backgroundColor: gradientStroke,
          // borderColor: "#1f8ef1",
          // borderWidth: 2,
          // borderDash: [],
          // borderDashOffset: 0.0,
          // pointBackgroundColor: "#1f8ef1",
          // pointBorderColor: "rgba(255,255,255,0)",
          // pointHoverBackgroundColor: "#1f8ef1",
          // pointBorderWidth: 20,
          // pointHoverRadius: 4,
          // pointHoverBorderWidth: 15,
          // pointRadius: 4,
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
          borderWidth: 1,
          data: [audioFeatures.danceability, audioFeatures.energy, audioFeatures.valence, audioFeatures.acousticness, audioFeatures.instrumentalness, audioFeatures.liveness, audioFeatures.speechiness]
        }
      ]
    };
  }
}

export class Profile extends Component {
  constructor(props) {

    super(props);

    this.state = {
      active: 0,
      edit: false,
      bio: '',
      website: '',
      location: '',
      tab: 1,
      tab1: 1,
      tab2: 1,
      tab3: 1,
      comments: [],
      artistsTopTracks: ''
    };
  }

  componentDidMount() {

    const name = this.props.match.params.meloID

    const post = this.props.match.params.postID

    console.log(post)

    axios.get(`/post/${this.props.match.params.postID}`)
      .then(res => {
        console.log(res.data)
        this.setState({ comments: res.data.comments })
      })
      .catch(err => console.log(err))

    if (!name && !post) {
      axios.get(`/user/${UserStore.thisUserProfile.credentials.meloID}`)
        .then(res => {
          console.log(res.data)
          UserStore.currentUserPosts = res.data.posts
          console.log(res.data)
        })
        .catch(err => console.log(err))

      UserStore.playlist = []

      spotifyApi.getUserPlaylists(UserStore.thisSpotifyProfile.id).then((data) => {
        console.log(UserStore.playlist)
        data.items.map((item) => (
          getPlaylists = {
            id: item.id,
            title: item.name,
            images: item.images[0].url,
            link: item.external_urls.spotify

          },
          UserStore.playlist = [...UserStore.playlist, getPlaylists]
        ));
        console.log(UserStore.playlist)

        axios
          .post('/user', {
            bio: '',
            website: '',
            location: '',
            bookmarked: '',
            playlists: JSON.stringify(UserStore.playlist),
            recentlyPlayed: '',
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
      })

      // spotifyApi.getMyTopTracks().then((data) => {
      //   console.log(data.items)

      //   let items = []
      //   data.items.map((item) => {
      //     topTracks = {
      //       name: item.name,
      //       albumName: item.album.name,
      //       artistName: item.artists[0].name,
      //       trackName: item.name,
      //       image: item.album.images[0].url,
      //       id: item.id
      //     }
      //     items.push(topTracks)
      //     UserStore.topTracks = items
      //   })
      //   console.log(JSON.stringify(items))
      //   axios
      //     .post('/user', {
      //       bio: '',
      //       website: '',
      //       location: '',
      //       bookmarked: '',
      //       playlists: '',
      //       recentlyPlayed: '',
      //       topArtists: '',
      //       topTracks: JSON.stringify(items)
      //     },
      //       {
      //         headers: {
      //           Authorization: sessionStorage.getItem('FBIdToken'), //the token is a variable which holds the token
      //         }
      //       })
      //     .then(res => {
      //       console.log(res.data)
      //     })
      //     .catch(err => console.log(err))
      // },
      //   function (err) {
      //     console.error(err);
      //   })

      spotifyApi.getMyTopArtists().then((data) => {
        console.log(data)
        let items = []
        data.items.map((item) => {
          topArtists = {
            artistName: item.name,
            image: item.images[0].url,
            id: item.id
          }
          items.push(topArtists)
          UserStore.topArtists = items
        })
        console.log(items)
        axios
          .post('/user', {
            bio: '',
            website: '',
            location: '',
            bookmarked: '',
            playlists: '',
            recentlyPlayed: '',
            topArtists: JSON.stringify(items),
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
      })
      
    } else if (post) {

    }
    else {
      axios.get(`/user/${name}`)
        .then(res => {
          console.log(res.data)
          UserStore.currentUserPosts = res.data.posts
          UserStore.currentUser = res.data.user
          userTopTracks = JSON.parse(res.data.user.topTracks)
          userTopArtists = JSON.parse(res.data.user.topArtists)
          userPlaylists = JSON.parse(res.data.user.playlists)
          console.log(userPlaylists)
        })
        .catch(err => console.log(err))

      UserStore.playlist = []

      spotifyApi.getUserPlaylists(UserStore.currentUser.spotifyID).then((data) => {
        console.log(UserStore.playlist)
        data.items.map((item) => (
          getPlaylists = {
            id: item.id,
            title: item.name,
            images: item.images[0].url,
            link: item.external_urls.spotify
          },
          UserStore.playlist = [...UserStore.playlist, getPlaylists]
        ));
        console.log(UserStore.playlist)


      })

      spotifyApi.getUser(UserStore.currentUser.spotifyID)
        .then((response) => {
          this.setState({ profilePic: response.images[0].url })
        })
    }
  }
  getArtistsTopTracks = (id) => {
    spotifyApi.getArtistTopTracks(id, 'US', { limit: 3 }).then((data) => {
      console.log(UserStore.playlist)
      artistsTopTracksArray = []
      data.tracks.map((item) => (
        artistTopTracks = {
          name: item.name,
          artistName: item.artists[0].name,
          image: item.album.images[0].url,
          popularity: item.popularity,
        },
        artistsTopTracksArray.push(artistTopTracks)
      ))
    })
    return artistsTopTracksArray
  }


  toggleEdit = () => {
    if (this.state.edit == true) {
      axios
        .post('/user', {
          bio: this.state.bio,
          website: this.state.website,
          location: this.state.location,
          bookmarked: '',
          playlists: '',
          recentlyPlayed: ''
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

      this.setState({ edit: false })
    } else {
      this.setState({ edit: true })
    }
  }

  tracks = () => {
    this.setState({ tab: 3 })
  }

  goBack = () => {
    if (this.state.active != 0)
      this.setState({ active: this.state.active - 1 })
  }

  goForward = () => {
    if (this.state.active != UserStore.playlist.length - 1)
      this.setState({ active: this.state.active + 1 })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  getAudioFeaturesForTrack = () => {
    spotifyApi.getAudioFeaturesForTrack('3FigWC4Kgj0YB1tc6WMwJL').then((data) => {
      console.log(data)
      audioFeatures = {
        danceability: data.danceability,
        energy: data.energy,
        valence: data.valence,
        acousticness: data.acousticness,
        instrumentalness: data.instrumentalness,
        liveness: data.liveness,
        speechiness: data.speechiness
      }
    })
  }


  render() {
    dayjs.extend(relativeTime)

    const popover = (
      <Popover id="popover-basic" style={{ width: '2000px', borderRadius: '25px', color: '#3E5C76' }}>
        <Popover.Title style={{ textAlign: 'center' }} as="h3">search results</Popover.Title>
        <Popover.Content>
          <Card style={{ height: '135px', textAlign: 'center', backgroundColor: '#3E5C76', borderRadius: '20px' }}>
            <Scrollbar className='scroll'>
              <Card.Body>
                <TrackQuery song_title={this.state.song_title} />
              </Card.Body>
            </Scrollbar>
          </Card>
        </Popover.Content>
      </Popover>
    );

    let recentPostsMarkup = UserStore.posts ? this.props.match.params.postID ? UserStore.posts.map(post => {
      if (post.postID == this.props.match.params.postID) {
        return <Post key={post.postID} post={post} />
      } else return
    }) : UserStore.currentUserPosts.map(post => <Post key={post.postID} post={post} />) : <p><CircularProgress /></p>

    let comments = this.state.comments ? this.state.comments.map(comment => <Post key={comment.postID} post={comment} />) : <p><CircularProgress /></p>

    return (
      <div>
        <Grid container>

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
              <Card style={{ height: '200px', padding: '10px', borderRadius: '20px', margin: '5px', border: 'solid', borderColor: 'whitesmoke', backgroundColor: '#007bff' }} >

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

                      <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
                        <Button
                          type='submit'
                          value='search'
                          style={{ flex: '2 ', color: 'white', borderRadius: '10px ', margin: '5px', border: 'solid', borderColor: 'white' }}
                        >
                          <SearchIcon />
                        </Button>
                      </OverlayTrigger>
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
                        style={{ flex: '2 ', color: 'white', borderRadius: '10px ', margin: '5px', border: 'solid', borderColor: 'white' }}
                      >
                        <PostAddIcon />
                      </Button>

                    </form>
                  }

                  {this.state.tab == 2 &&
                    <form style={{ display: 'flex', height: '50px', margin: '30px' }} onSubmit={this.searchTrack}>
                      <input
                        type='text'
                        name='song'
                        style={{ flex: '12', padding: '5px', borderRadius: '10px', border: 'solid', backgroundColor: '#F0F2FA', borderColor: '#151E3F' }}
                        placeholder='Search anything...'
                        value={this.state.song}
                        onChange={this.onChange}
                      />
                      <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
                        <Button
                          type='submit'
                          value='discover'
                          style={{ flex: '4 ', backgroundColor: '#DBEBC0', borderRadius: '10px ', color: '#151E3F', margin: '5px', border: 'solid', borderColor: '#151E3F' }}
                        >
                          <SearchIcon />
                        </Button>
                      </OverlayTrigger>
                    </form>
                  }
                </Card.Body>
              </Card>

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
              <Card style={{ backgroundColor: '#007bff', height: '270px', padding: ' 0 10px 10px 10px', borderRadius: '20px', margin: '5px', border: 'solid', borderColor: 'whitesmoke' }}>


                {/* <Card.Header style={{ backgroundColor: 'white', borderRadius: '15px', marginLeft: 'auto', marginRight: 'auto', display: 'block', border: 'none', margin: '10px', borderBottom: 'solid', borderColor: '#21295c' }}>

                                    {this.state.tab1 == 2 &&
                                        <h3 style={{ textAlign: 'center', color: '#007bff' }}>Explore</h3>
                                    }
                                    {this.state.tab1 == 1 &&
                                        <h3 style={{ textAlign: 'center', color: '#007bff' }}>Trending</h3>
                                    }

                                </Card.Header> */}
                {/* <Card.Body style={{ height: '100%', borderRadius: '15px', width: '100%', backgroundColor: '#0077f6'}}> */}

                {this.state.tab1 == 1 &&
                  <div style={{ height: '100%' }}>
                    <Card style={{ borderBottom: 'solid', borderRadius: '10px', padding: '3px', backgroundColor: '#0077f6', borderColor: 'whitesmoke', marginTop: '3px' }}>
                      <Row>
                        <Col lg={3} style={{ borderRight: 'solid', marginTop: 'auto', marginBottom: 'auto' }}>
                          <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                            <Col>
                              <ArrowDropUpIcon style={{ color: '#9FD356' }} />
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
                              <h4 style={{ textAlign: 'center', color: 'whitesmoke' }}>F.A.M.E.</h4>
                              {/* <marquee behavior="scroll" direction="left">Nights in the rain</marquee> */}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>

                    <Card style={{ borderBottom: 'solid', borderRadius: '10px', padding: '3px', backgroundColor: '#0077f6', borderColor: 'whitesmoke', marginTop: '3px' }}>
                      <Row>
                        <Col lg={3} style={{ borderRight: 'solid', marginTop: 'auto', marginBottom: 'auto' }}>
                          <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                            <Col>
                              <ArrowDropUpIcon style={{ color: '#9FD356' }} />
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
                              <h4 style={{ textAlign: 'center', color: 'whitesmoke' }}>Ego Death</h4>
                              {/* <marquee behavior="scroll" direction="left">Nights in the rain</marquee> */}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>

                    <Card style={{ borderBottom: 'solid', borderRadius: '10px', padding: '3px', backgroundColor: '#0077f6', borderColor: 'whitesmoke', marginTop: '3px' }}>
                      <Row>
                        <Col lg={3} style={{ borderRight: 'solid', marginTop: 'auto', marginBottom: 'auto' }}>
                          <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                            <Col>
                              <ArrowDropDownIcon style={{ color: 'red' }} />
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
                              <h4 style={{ textAlign: 'center', color: 'whitesmoke' }}>DAMN</h4>
                              {/* <marquee behavior="scroll" direction="left"><h4>2014 Forrest Hills Drive</h4></marquee> */}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>

                    <Card style={{ borderBottom: 'solid', borderRadius: '10px', padding: '3px', backgroundColor: '#0077f6', borderColor: 'whitesmoke', marginTop: '3px' }}>
                      <Row>
                        <Col lg={3} style={{ borderRight: 'solid', marginTop: 'auto', marginBottom: 'auto' }}>
                          <Row style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                            <Col>
                              <ArrowDropDownIcon style={{ color: 'red' }} />
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
                              <h4 style={{ textAlign: 'center', color: 'whitesmoke' }}>Connect</h4>
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

            </Paper>


          </Grid>

          <Grid item sm={12} xs={12}>
            <Paper elevation={24} variant="elevation" style={{ borderRadius: '10px', padding: '5px', backgroundColor: '#007bff', borderLeft: 'none', borderColor: 'white', height: '100%' }}>
              {!this.props.match.params.postID &&
                <Row>
                  <Col lg={4}>
                    <Row>
                      <Col>
                        <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '10px', color: '#007bff', backgroundColor: 'white', borderRadius: '15px' }}>
                          Top Tracks
                        </Typography>
                      </Col>
                    </Row>
                    <Carousel indicators={false} style={{ border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                      {!this.props.match.params.meloID &&
                        UserStore.topTracks.map(item => <Carousel.Item interval={500}>
                          <Row style={{ backgroundColor: '#007bff', marginLeft: 'auto', marginRight: 'auto', borderRadius: '15px' }}>
                            <Col style={{ borderRadius: '20px' }}>
                              <CardMedia
                                //onClick={() => window.open(this.state.thisTrack.link, "_blank")}
                                image={item.image}
                                //title={`${this.state.thisTrack.name} album cover`}
                                style={{ height: '120px', width: '120px', border: 'solid', borderColor: 'whitesmoke', margin: '20px', borderRadius: '15px' }}
                              />
                            </Col>
                          </Row>

                          <Row style={{ backgroundColor: 'white', height: '113px' }}>
                            <Col>
                              <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '5px', color: 'white', backgroundColor: '#007bff', borderRadius: '15px' }}>
                                {item.trackName.length > 30 &&
                                  `${item.trackName.substring(0, 29)}...`
                                }
                                {!(item.trackName.length > 30) &&
                                  item.trackName
                                }
                              </Typography>

                              <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center', margin: '10px', color: '#007bff' }}>
                                {item.artistName}
                              </Typography>
                            </Col>
                          </Row>


                        </Carousel.Item>)
                      }

                      {/**Other**/}
                      {this.props.match.params.meloID &&
                        userTopTracks.map(item => <Carousel.Item interval={500}>
                          <Row style={{ backgroundColor: '#007bff', marginLeft: 'auto', marginRight: 'auto', borderRadius: '15px' }}>
                            <Col style={{ borderRadius: '20px' }}>
                              <CardMedia
                                //onClick={() => window.open(this.state.thisTrack.link, "_blank")}
                                image={item.image}
                                //title={`${this.state.thisTrack.name} album cover`}
                                style={{ height: '120px', width: '120px', border: 'solid', borderColor: 'whitesmoke', margin: '20px', borderRadius: '15px' }}
                              />
                            </Col>
                          </Row>

                          <Row style={{ backgroundColor: 'white', height: '113px' }}>
                            <Col>
                              <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '5px', color: 'white', backgroundColor: '#007bff', borderRadius: '15px' }}>
                                {item.trackName.length > 30 &&
                                  `${item.trackName.substring(0, 29)}...`
                                }
                                {!(item.trackName.length > 30) &&
                                  item.trackName
                                }
                              </Typography>

                              <Typography variant="subtitle1" color="textSecondary" style={{ textAlign: 'center', margin: '10px', color: '#007bff' }}>
                                {item.artistName}
                              </Typography>
                            </Col>
                          </Row>


                        </Carousel.Item>)
                      }


                    </Carousel>
                  </Col>
                  <Col lg={4}>

                    <Row >
                      <Col>
                        <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '10px', color: '#007bff', backgroundColor: 'white', borderRadius: '15px' }}>
                          {!this.props.match.params.meloID &&
                            UserStore.thisUserProfile.credentials.meloID
                          }
                          {this.props.match.params.meloID &&
                            this.props.match.params.meloID
                          }
                        </Typography>

                      </Col>
                    </Row>

                    <Carousel indicators={false} style={{ border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                      <Carousel.Item>

                        <Row style={{ backgroundColor: '#007bff', marginLeft: 'auto', marginRight: 'auto', borderRadius: '15px' }}>
                          <Col lg={3} style={{ borderRadius: '20px' }}>
                            {!this.props.match.params.meloID &&
                              <CardMedia
                                // onClick={() => window.open(item.link, "_blank")}
                                image={UserStore.thisSpotifyProfile.image}
                                //title={`${this.state.thisTrack.name} album cover`}
                                style={{ height: '120px', width: '120px', border: 'solid', borderColor: 'whitesmoke', margin: '20px', borderRadius: '15px' }}
                              />
                            }
                            {this.props.match.params.meloID &&
                              <CardMedia
                                // onClick={() => window.open(item.link, "_blank")}
                                image={this.state.profilePic}
                                //title={`${this.state.thisTrack.name} album cover`}
                                style={{ height: '120px', width: '120px', border: 'solid', borderColor: 'whitesmoke', margin: '20px', borderRadius: '15px' }}
                              />
                            }
                          </Col>
                        </Row>


                        <Row style={{ backgroundColor: 'white', height: '113px' }}>

                          <Col lg={6} style={{ padding: '5px' }}>
                            <Button style={{ backgroundColor: 'white', color: '#007bff', border: 'none', float: 'right' }}> <u>{`0 Following`}</u></Button>
                          </Col>
                          <Col lg={6} style={{ padding: '5px' }}>
                            <Button style={{ backgroundColor: 'white', color: '#007bff', border: 'none', float: 'left' }}> <u>{`0 Followers`}</u></Button>
                          </Col>

                          <Col>
                            {/* <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '5px', color: 'white', backgroundColor: '#007bff', borderRadius: '15px' }}>
                              {!this.state.edit &&
                                <Col>
                                  {UserStore.thisUserProfile.credentials.bio}
                                </Col>
                              }
                              {this.state.edit &&
                                <Col>
                                  <FormControl type="text-area" name="bio" value={this.state.bio} onChange={this.handleChange} placeholder="bio" className="mr-sm-2" style={{ backgroundColor: '#151E3F', color: 'whitesmoke', borderRadius: '10px' }} />
                                </Col>
                              }
                            </Typography> */}
                            <Button style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}><SettingsIcon /></Button>
                          </Col>

                        </Row>
                      </Carousel.Item>
                      {/* <Carousel.Item>
                        edit profile details from settings button redirect
                      </Carousel.Item> */}
                    </Carousel>
                  </Col>
                  <Col lg={4}>
                    <Row >
                      <Col>
                        <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '10px', color: '#007bff', backgroundColor: 'white', borderRadius: '15px' }}>
                          Top Artists
                            </Typography>
                      </Col>
                    </Row>
                    <Carousel indicators={false} interval={750} style={{ border: 'solid', borderColor: 'white', borderRadius: '10px' }}>
                      {this.props.match.params.meloID &&
                        userTopArtists.map(item => <Carousel.Item>

                          <Row style={{ backgroundColor: '#007bff', marginLeft: 'auto', marginRight: 'auto', borderRadius: '15px' }}>
                            <Col lg={3} >
                              <CardMedia
                                onClick={() => window.open(item.link, "_blank")}
                                image={item.image}
                                //title={`${this.state.thisTrack.name} album cover`}
                                style={{ height: '120px', width: '120px', border: 'solid', borderColor: 'whitesmoke', margin: '20px', borderRadius: '15px' }}
                              />
                            </Col>
                          </Row>

                          <Row style={{ backgroundColor: 'white', height: '120px' }}>
                            <Col>
                              <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '5px', color: 'white', backgroundColor: '#007bff', borderRadius: '15px' }}>
                                {item.artistName}
                              </Typography>
                            </Col>

                          </Row>


                        </Carousel.Item>)}

                      {!this.props.match.params.meloID &&
                        UserStore.topArtists.map(item => <Carousel.Item>

                          <Row style={{ backgroundColor: '#007bff', marginLeft: 'auto', marginRight: 'auto', borderRadius: '15px' }}>
                            <Col lg={3} >
                              <CardMedia
                                onClick={() => window.open(item.link, "_blank")}
                                image={item.image}
                                //title={`${this.state.thisTrack.name} album cover`}
                                style={{ height: '120px', width: '120px', border: 'solid', borderColor: 'whitesmoke', margin: '20px', borderRadius: '15px' }}
                              />
                            </Col>
                          </Row>

                          <Row style={{ backgroundColor: 'white', height: '120px' }}>
                            <Col>
                              <Typography component="h6" variant="h6" style={{ textAlign: 'center', margin: '5px', color: 'white', backgroundColor: '#007bff', borderRadius: '15px' }}>
                                {item.artistName}
                              </Typography>
                            </Col>

                          </Row>


                        </Carousel.Item>)}
                    </Carousel>
                  </Col>
                </Row>
              }

              {!this.props.match.params.postID &&
                <Card style={{ padding: '10px', border: 'none', borderRadius: '20px', backgroundColor: '#007bff', marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%' }}>
                  <Card.Header style={{ textAlign: 'center', margin: '5px', backgroundColor: 'white', borderRadius: '15px' }}>
                    <Row>
                      <Col>
                        <Button onClick={this.goBack}><ArrowBackIcon /></Button>
                      </Col>
                      <Col>
                        <h3 style={{ textAlign: 'center', color: '#007bff' }}>Your Playlists...</h3>
                      </Col>
                      <Col>
                        <Button onClick={this.goForward}><ArrowForwardIcon /></Button>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    {!this.props.match.params.meloID &&
                      <Coverflow
                        width={150}
                        height={150}
                        displayQuantityOfSide={2.5}
                        navigation={false}
                        enableHeading={false}
                        infiniteScroll={false}
                        active={this.state.active}
                      >
                        {UserStore.playlist.map(item => <img src={item.images} data-action="http://andyyou.github.io/react-coverflow/" style={{ borderRadius: '20px', width: '100px', height: '100px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />)}
                      </Coverflow>
                    }

                    {this.props.match.params.meloID &&
                      <Coverflow
                        width={150}
                        height={150}
                        displayQuantityOfSide={2.5}
                        navigation={false}
                        enableHeading={false}
                        infiniteScroll={false}
                        active={this.state.active}
                      >
                        {userPlaylists.map(item => <img src={item.images} data-action="http://andyyou.github.io/react-coverflow/" style={{ borderRadius: '20px', width: '100px', height: '100px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />)}
                      </Coverflow>
                    }
                  </Card.Body>

                </Card>
              }


              <Card style={{ padding: '10px', border: 'none', borderRadius: '20px', backgroundColor: '#007bff', marginLeft: 'auto', marginRight: 'auto', display: 'block', width: '100%' }}>
                {!this.props.match.params.postID &&
                  <Card.Header style={{ textAlign: 'center', margin: '5px', backgroundColor: 'white', borderRadius: '15px' }}><h3 style={{ textAlign: 'center', color: '#007bff' }}>Your Zone...</h3></Card.Header>
                }
                <Card.Body>
                  <p>{recentPostsMarkup}</p>
                </Card.Body>
              </Card>

              {/* {this.props.match.params.meloID &&
                <Row style={{ margin: '10px' }}>
                  <Card style={{ padding: '10px', borderRadius: '20px', backgroundColor: '#007bff', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>
                    <Card.Header style={{ backgroundColor: '#151E3F', borderRadius: '15px' }}>
                      <h3 style={{ color: 'white' }}>comments...</h3>
                    </Card.Header>
                    <Card.Body>
                      <p>{comments}</p>
                    </Card.Body>
                  </Card>
                </Row>
              } */}

            </Paper>
          </Grid>
        </Grid >
      </div >
    )
  }
}

export default observer(Profile)

