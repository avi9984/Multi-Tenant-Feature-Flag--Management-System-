import FeatureFlag from "../models/FeatureFlag.js";

export const createFeatureFlag = async (req, res) => {
    try {
        const { featureKey, enabled } = req.body;

        const flag = await FeatureFlag.create({
            featureKey,
            enabled,
            organization: req.user.organization,
        });

        return res.status(201).json({
            status: "Success",
            message: "Created feature key sucessfully",
            data: flag
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};

export const getFeatureFlags = async (req, res) => {
    const flags = await FeatureFlag.find({
        organization: req.user.organization,
    });

    res.json(flags);
};

export const updateFeatureFlag = async (req, res) => {
    const flag = await FeatureFlag.findById(req.params.id);

    if (!flag) {
        return res.status(404).json({
            message: "Flag not found",
        });
    }

    flag.enabled = req.body.enabled;

    await flag.save();

    res.json(flag);
};

export const deleteFeatureFlag = async (req, res) => {
    await FeatureFlag.findByIdAndDelete(req.params.id);

    res.json({
        message: "Deleted successfully",
    });
};