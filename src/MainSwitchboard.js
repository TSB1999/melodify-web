import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import React, { Component } from 'react';
import './meloApp.css';
import { Navbar } from 'react-bootstrap'

import home from './pages/home'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import main from './pages/main'
import NavBar from './components/bars/Navbar';
import UserStore from './stores/UserStores';
import axios from 'axios'

import AuthRoute from './util/AuthRoute'

import spotifyApi from './components/spotify_api/Spotify_API';
import jwtDecode from 'jwt-decode'
import Discover from './pages/Discover';
import Settings from './pages/Settings';
import Sidebar from './components/bars/Sidebar'
let playbackState = {}
let authenticated;
const token = sessionStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/'
    authenticated = false
  } else {
    authenticated = true
  }
}

class MainSwitchboard extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
      localStorage.setItem("spotifyAPI", `Bearer ${token}`)
    }

    UserStore.spotifyLoggedIn = token ? true : false

  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  componentDidMount() {
    if (UserStore.spotifyLoggedIn) {
      this.interval = setInterval(() => {
        spotifyApi.getMyCurrentPlaybackState().then((response) => {
          console.log(response)
          playbackState = {
            isPlaying: response.is_playing,
            repeat: response.repeat_state,
            shuffle: response.shuffle_state,
            id: response.item.id,
            image: response.item.album.images[0].url,
            name: response.item.name,
            artist: response.item.artists[0].name,
            album: response.item.album.name
          }
          console.log(playbackState)
          UserStore.playbackState = playbackState
        })
      }, 1000);
    }
  }

  render() {
    return (
      <div className="meloApp" >

        <Router>
          <Sidebar />

          <div className="container">

            <Switch>
              <AuthRoute exact path="/" component={home} authenticated={authenticated} />
              <AuthRoute exact path="/notifications" component={Notifications} authenticated={authenticated} />
              <AuthRoute exact path="/discover" component={Discover} authenticated={authenticated} />
              <AuthRoute exact path="/settings" component={Settings} authenticated={authenticated} />
              <AuthRoute exact path="/user/:meloID" component={Profile} />
              <AuthRoute exact path="/user/:meloID/post/:postID" component={Profile} />
              <AuthRoute exact path="/me" component={Profile} />
              <Route exact path="/home" component={main} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default MainSwitchboard

