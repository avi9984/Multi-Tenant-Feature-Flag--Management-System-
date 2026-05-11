import FeatureFlag from "../models/FeatureFlag.js";

export const createFeatureFlag = async (req, res) => {
    try {
        const { name, description, enabled } = req.body;

        const flag = await FeatureFlag.create({
            name,
            description,
            enabled,
            organization: req.user.organization,
            createdBy: req.user.id,
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
    try {
        const flags = await FeatureFlag.find({
            organization: req.user.organization,
        });

        res.status(200).json(flags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateFeatureFlag = async (req, res) => {
    try {
        const flag = await FeatureFlag.findById(req.params.id);

        if (!flag) {
            return res.status(404).json({
                message: "Flag not found",
            });
        }

        flag.enabled = req.body.enabled;

        await flag.save();

        res.status(200).json(flag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteFeatureFlag = async (req, res) => {
    try {
        const deletedFlag = await FeatureFlag.findByIdAndDelete(req.params.id);

        if (!deletedFlag) {
            return res.status(404).json({
                message: "Feature not found",
            });
        }

        res.status(200).json({
            message: "Deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};