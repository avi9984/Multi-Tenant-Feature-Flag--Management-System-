import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
        type: String,
        enum: ["SUPER_ADMIN", "ORG_ADMIN", "END_USER"],
        default: "END_USER"
    },

    organization: { type: ObjectId, ref: 'Organization' }
}, { timestamps: true, versionKey: false })

export default mongoose.model("User", userSchema);