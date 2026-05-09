import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId

const featureFlagSchema = new mongoose.Schema(
    {
        featureKey: { type: String, required: true },

        enabled: { type: Boolean, default: false },

        organization: { type: ObjectId, ref: "Organization" },
    }, { timestamps: true, versionKey: false });

export default mongoose.model("FeatureFlag", featureFlagSchema);