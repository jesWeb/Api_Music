const {
    Schema,
    model
} = require("mongoose");

const artist = require("./artist");


const AlbumSchema = Schema({
    artist: {
        type: Schema.ObjectId,
        ref: "Artist"
    },
    title: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    },


});

module.exports = model("Album",AlbumSchema,"albums")