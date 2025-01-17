const {
    Schema,
    model
} = require("mongoose");
// const artist = require("./artist");
const albums = require("./albums");

const songSchema = Schema({

    albums: {
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
        type: String,
        default:"song.mp3"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    
});

module.exports = model("Song", songSchema, "songs");