import React from "react";
import loginImg from "./../login.svg";
import axios from "axios";
import { Image } from 'react-bootstrap'
import UserStore from '../../../stores/UserStores'
// import Spotify_Image from '/Users/tsb99/Documents/melodify/frontend/src/spotify-icon-2.png'
import { observer } from 'mobx-react';

export class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }

  componentDidUpdate() {
    console.log(UserStore.thisSpotifyProfile.email)
  }

  setInputValue(property, val) {
    val = val.trim();
    this.setState({
      [property]: val
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('/login', userData)
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        })
        if (sessionStorage.getItem('FBIdToken') && this.state.email == UserStore.thisSpotifyProfile.email) {
          UserStore.isLoggedIn = true
        } else {
          alert(`Your email doesn't match the Spotify profile`)
        }
        console.log(res.data)
        //UserStore.meloID = res.data.meloID
      })
      .catch(err => {
        this.setState({
          errors: err,
          loading: false
        })
      })
    console.log(UserStore.isLoggedIn)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    //console.log(this.state.email)
    //console.log(this.state.password)

    const { errors, loading } = this.state;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header"></div>
        <div className="content">
          <div className="image">
            {
              <img src={loginImg} style={{ height: 300, width: 300 }} />
            }
          </div>
          {!UserStore.spotifyLoggedIn &&
            <div className="a">
              <a href='http://localhost:8888' style={{ borderRadius: '15px' }}> Authorize Spotify</a>
            </div>
          }

          <div className="form">
            <div className="form-group">
              <label htmlFor="username">meloID</label>
              <input type="text" name="email" placeholder="username" value={this.state.email} onChange={this.handleChange} style={{ borderRadius: '20px' }} />
            </div>
            <div className="form-group">
              <label htmlFor="password">password</label>
              <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} style={{ borderRadius: '20px' }} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn1" onClick={this.handleSubmit} style={{ borderRadius: '10px' }}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default observer(Login)