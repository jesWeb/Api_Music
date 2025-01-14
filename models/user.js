const {
    Schema,
    model
} = require("mongoose");

//dfinir esquma de bd

const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,

    },
    nick: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        //no devolver 
        select: false
    },
    role: {
        type: String,
        default: "role_user",
        select: false
    },
    image: {
        type: String,
        default: "user.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    },

});

module.exports = model("User", UserSchema, "users");