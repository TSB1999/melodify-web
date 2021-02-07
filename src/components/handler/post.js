const axios = require('axios')

exports.getUser = (res) => {
    const thisTrack = {
        id: res.id,
        name: res.name,
        album: res.album.name,
        artist: res.album.artists[0].name,
        artistID: res.artists[0].id,
        artistImage: res.album.images[0].url,
        link: res.external_urls.spotify
    }
    return thisTrack
}

