import FeatureFlag from "../models/FeatureFlag.js";

export const checkFeature = async (req, res) => {
    try {
        const { featureKey, organizationId } = req.body;

        const feature = await FeatureFlag.findOne({
            name: featureKey,
            organization: organizationId,
        });

        if (!feature) {
            return res.status(404).json({
                message: "Feature not found",
            });
        }

        res.status(200).json({
            enabled: feature.enabled,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};