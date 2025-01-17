const {
    Schema,
    model
} = require("mongoose");
// const artist = require("./artist");
const album = require("./albums");

const songSchema = Schema({

    album: {
        type: Schema.ObjectId,
        ref: "Album"
    },
    track: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        default: true
    },
    file: {
        type: Buffer,
        default:"song.mp3"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = model("Song", songSchema, "songs");