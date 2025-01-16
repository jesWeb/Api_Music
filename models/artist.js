const {
    Schema,
    model
} = require("mongoose");

const ArtistShema = Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        default: "album.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("Arist", ArtistShema, "artists");