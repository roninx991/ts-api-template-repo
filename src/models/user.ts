/** Required App Modules */
import mongoose from "../config/database";

let UserAuthSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String
    },
    type: {
        default: "user",
        type: String,
    },
    last_accessed: {
        default: new Date(Date.now()),
        required: true,
        type: Date,
    },
    ip_addr: {
        address: {
            required: true,
            type: String,
        },
        family: {
            required: true,
            type: String
        },
        port: {
            required: true,
            type: Number
        },
    }
});

export default mongoose.model("user_auth", UserAuthSchema);