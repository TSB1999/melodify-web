import React from "react";
import "./App.scss";
import { Login, Register } from "./login/index";
import UserStore from "../../stores/UserStores";
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import spotifyApi from '../../../src/components/spotify_api/Spotify_API'
import axios from 'axios'
var getPlaylists = {
  id: '',
  title: '',
  images: '',
  link: '',
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogginActive: true
    };

  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");

    UserStore.spotifyLoggedIn && spotifyApi.getMe().then((response) => {
      var thisProfile = {
        name: response.display_name,
        image: response.images[0].url,
        id: response.id,
        email: response.email
      }
      UserStore.thisSpotifyProfile = thisProfile
      console.log(response)
    })
  }

  changeState() {
    const { isLogginActive } = this.state;

    if (isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render() {
    const { isLogginActive } = this.state;
    const current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";

    if (UserStore.isLoggedIn === true) {
      axios.get('/user', {
        headers: {
          Authorization: sessionStorage.getItem('FBIdToken') //the token is a variable which holds the token
        }
      })
        .then(res => {
          UserStore.thisUserProfile = res.data
          sessionStorage.setItem('thisUserProfile', JSON.stringify(res.data))
          console.log(res.data)
        })
        .catch(err => console.log(err))
      this.props.history.push('/home')
    }

    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {isLogginActive && (
              <Login containerRef={ref => (this.current = ref)} />
            )}
            {!isLogginActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default withRouter(observer(App));
