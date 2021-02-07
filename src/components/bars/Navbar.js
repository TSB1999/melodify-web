import React, { Component } from 'react'
import { Navbar, Nav, FormControl, Button, Form, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserStore from "../../stores/UserStores"
import { observer } from 'mobx-react';
import axios from 'axios'
import img1 from '../../../src/spotify-icon-2.png'


const NavBar = () => {

    const signout = () => {
        UserStore.isLoggedIn = false
        sessionStorage.removeItem('FBIdToken');
        sessionStorage.removeItem('UserStore')
        delete axios.defaults.headers.common['Authorization']
        window.location.href = '/'
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{ marginRight: 'auto', marginLeft: 'auto', display: 'block', width: "0%" }}>
                    <img
                        alt=""
                        src={img1}
                        width="48"
                        height="48"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
            </Navbar>

        </div>
    )

}

export default observer(NavBar)
