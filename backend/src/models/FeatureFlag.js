import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId

const featureFlagSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        description: { type: String, required: true },

        enabled: { type: Boolean, default: false },

        organization: { type: ObjectId, ref: "Organization" },

        createdBy: { type: ObjectId, ref: "User" },
    }, { timestamps: true, versionKey: false });

export default mongoose.model("FeatureFlag", featureFlagSchema);