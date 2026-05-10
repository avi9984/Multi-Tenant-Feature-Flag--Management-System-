import FeatureFlag from "../models/FeatureFlag.js";

export const checkFeature = async (req, res) => {
    try {
        const { featureKey, organizationId } = req.body;

        const feature = await FeatureFlag.findOne({
            featureKey,
            organization: organizationId,
        });

        if (!feature) {
            return res.json({
                enabled: false,
            });
        }

        res.json({
            enabled: feature.enabled,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};