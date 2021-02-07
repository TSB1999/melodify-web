import React, { Component } from 'react'
import NewTrack from './NewTrack';

export class TrackQuery extends Component {
    render() {
        return this.props.song_title.map((track) => (
            <NewTrack key={track.id} track={track} dropDownStatus = {this.props.dropDownStatus} item  = {this.props.item}/>
        ));
    }
}

export default (TrackQuery)
