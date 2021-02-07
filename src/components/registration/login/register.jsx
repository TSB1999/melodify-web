import React from "react";
import { Image } from 'react-bootstrap'
import UserStore from '../../../stores/UserStores'
import Spotify_Image from '../../../../src/spotify-icon-2.png'
import { observer } from 'mobx-react';
import axios from 'axios'

export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      meloID: '',
      spotifyID: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });

    const newUserData = {
      email: UserStore.thisSpotifyProfile.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      meloID: this.state.meloID,
      spotifyID: UserStore.thisSpotifyProfile.id
    };
    axios.post('/signup', newUserData)
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        if (sessionStorage.getItem('FBIdToken')) {
          UserStore.isLoggedIn = true
        }
      })
      .catch(err => {
        this.setState({
          errors: err,
          loading: false
        })
      })
    console.log(UserStore.isLoggedIn)
  }

  render() {
    console.log(this.state.meloID)
    console.log(this.state.confirmPassword)
    console.log(this.state.password)
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header"></div>
        <div className="content">
          <div className="image">
            {!UserStore.spotifyLoggedIn &&
              <img src={Spotify_Image} style={{ height: 200, width: 200 }} />
            }
            {UserStore.spotifyLoggedIn &&
              <Image src={UserStore.thisSpotifyProfile.image} roundedCircle style={{ height: '200px', width: '200px', border: 'inset' }} />
            }
          </div>
          {UserStore.spotifyLoggedIn &&
            <div className="a">
              <a href='http://localhost:8888' > Not You?</a>
            </div>
          }
          {!UserStore.spotifyLoggedIn &&
            <div className="a">
              <a href='http://localhost:8888' style={{ borderRadius: '15px' }}> Authorize Spotify</a>
            </div>
          }

          <div className="form">
            <div className="form-group">
              <label htmlFor="username">meloID</label>
              <input type="text" name="meloID" placeholder="meloID" value={this.state.meloID} onChange={this.handleChange} style={{ borderRadius: '15px' }} />
            </div>
            <div className="form-group">
              <label htmlFor="email">password</label>
              <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} style={{ borderRadius: '15px' }} />
            </div>
            <div className="form-group">
              <label htmlFor="password">confirm password</label>
              <input type="password" name="confirmPassword" placeholder="confirm password" value={this.state.confirmPassword} onChange={this.handleChange} style={{ borderRadius: '15px' }} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn1" onClick={this.handleSubmit} style={{ borderRadius: '10px' }}>
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default observer(Register)