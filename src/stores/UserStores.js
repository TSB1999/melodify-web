import { extendObservable } from 'mobx';


/**
* UserStore
*/
class UserStore {
  constructor() {
    if (sessionStorage.getItem('UserStore')) {
      extendObservable(this, {


        isLoggedIn: JSON.parse(sessionStorage.getItem('UserStore')).isLoggedIn,

        spotifyLoggedIn: JSON.parse(sessionStorage.getItem('UserStore')).spotifyLoggedIn,

        thisSpotifyProfile: JSON.parse(sessionStorage.getItem('UserStore')).thisSpotifyProfile,

        thisUserProfile: JSON.parse(sessionStorage.getItem('UserStore')).thisUserProfile,

        playlist: JSON.parse(sessionStorage.getItem('UserStore')).playlist,

        thisTrack: JSON.parse(sessionStorage.getItem('UserStore')).thisTrack,

        bookmarked: JSON.parse(sessionStorage.getItem('UserStore')).bookmarked,

        recentlyPlayed: JSON.parse(sessionStorage.getItem('UserStore')).recentlyPlayed,

        liked: JSON.parse(sessionStorage.getItem('UserStore')).liked,

        URI: JSON.parse(sessionStorage.getItem('UserStore')).URI,

        topTracks: JSON.parse(sessionStorage.getItem('UserStore')).topTracks,

        topArtists: JSON.parse(sessionStorage.getItem('UserStore')).topArtists,

        audioFeatures: JSON.parse(sessionStorage.getItem('UserStore')).audioFeatures,

        currentUserPosts: JSON.parse(sessionStorage.getItem('UserStore')).currentUserPosts,

        otherUser: JSON.parse(sessionStorage.getItem('UserStore')).otherUser,

        currentUser: JSON.parse(sessionStorage.getItem('UserStore')).currentUser,

        otherPlaylist: JSON.parse(sessionStorage.getItem('UserStore')).otherPlaylist,

        profilePic: JSON.parse(sessionStorage.getItem('UserStore')).profilePic,

        comments: JSON.parse(sessionStorage.getItem('UserStore')).comments,

        recommend: JSON.parse(sessionStorage.getItem('UserStore')).recommend,

        trackLoaded: JSON.parse(sessionStorage.getItem('UserStore')).trackLoaded,
        
        suggested: JSON.parse(sessionStorage.getItem('UserStore')).suggested,

        allUsers: JSON.parse(sessionStorage.getItem('UserStore')).allUsers,

        playbackState: JSON.parse(sessionStorage.getItem('UserStore')).playbackState
        

      })
    } else {
      extendObservable(this, {


        isLoggedIn: false,
        spotifyLoggedIn: false,
        thisSpotifyProfile: [],
        thisUserProfile: [],
        playlist: [],
        thisTrack: [],
        bookmarked: [],
        recentlyPlayed: [],
        liked: [],
        saved : false,
        track : [],
        URI : 'spotify:track:4pUUhsc8fmZqnsPaOSU5CP',
        posts : [],
        topTracks : [],
        topArtists : [],
        audioFeatures : [],
        currentUserPosts : [],
        otherUser : '',
        currentUser : [],
        otherPlaylist : [],
        profilePic : '',
        comments : [],
        recommend : [],
        trackLoaded : false,
        suggested : [],
        allUsers : [],
        playbackState : []
      })
    }

    
  }
}

export default new UserStore();
