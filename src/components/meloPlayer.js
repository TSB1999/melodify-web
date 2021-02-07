import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
// import art1 from '/Users/tsb99/Documents/melodify/frontend/src/components/SampleArtworks/64f3a61a.jpg'
import UserStore from '../../src/stores/UserStores'
import PauseIcon from '@material-ui/icons/Pause';
import { observer } from 'mobx-react'
import spotifyApi from '.././components/spotify_api/Spotify_API'
import axios from 'axios'
import InputSlider from './VolumeBar.js'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '20px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: '300px',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


export function MediaControlCard() {
    const classes = useStyles();
    const theme = useTheme();

    function next() {
        axios.post(`https://api.spotify.com/v1/me/player/next`, {
            headers: {
                Accept: 'application/json',
                Authorization: localStorage.getItem('spotifyAPI')
            }
        }).then((res) => {
            console.log(res.data[0])
            console.log('hi')
        })
        return
    }

    function previous(e) {
        e.preventDefault();
        spotifyApi.skipToPrevious().then((response) => {
            console.log(response)
        })
    }

    const seek = () => {
        spotifyApi.seek().then((response) => {
            console.log(response)
        })
    }



    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    {/* <marquee behavior="scroll" direction="left">
                        <Typography component="h5" variant="h5">
                            {UserStore.playbackState.name}
                        </Typography>
                    </marquee>
                    <Typography variant="subtitle1" color="textSecondary">
                        {UserStore.playbackState.artist}
                    </Typography> */}

                    <Typography variant="subtitle1" style={{ color: '#21295c' }}>
                        <marquee behavior="scroll" direction="left">
                            {UserStore.playbackState.name}
                        </marquee>
                    </Typography>
                    <h6 style={{ textAlign: 'center', backgroundColor: '#007bff', color: 'white', padding: '5px', borderRadius: '10px' }}>{UserStore.playbackState.artist}</h6>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="previous" onClick={previous}>
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    {UserStore.isPlaying &&
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon className={classes.playIcon} />
                        </IconButton>
                    }
                    {!UserStore.isPlaying &&
                        <IconButton aria-label="play/pause">
                            <PauseIcon className={classes.playIcon} />
                        </IconButton>
                    }
                    <IconButton aria-label="next" onClick={next}>
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </div>
                {/* <div className={classes.root} style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                    <div className={classes.margin} />
                    <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
                    <div className={classes.margin} />
                </div> */}
                {/** Friends listen */}
            </div>
            <CardMedia
                className={classes.cover}
                image={UserStore.playbackState.image}
                title="Live from space album cover"
            />
        </Card>
    );
}

export default observer(MediaControlCard)
