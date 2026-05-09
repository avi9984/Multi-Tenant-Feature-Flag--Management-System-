import Organization from "../models/Organization.js";
import jwt from "jsonwebtoken";

export const superAdminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (
        email !== process.env.SUPER_ADMIN_EMAIL ||
        password !== process.env.SUPER_ADMIN_PASSWORD
    ) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const token = jwt.sign(
        {
            role: "SUPER_ADMIN",
        },
        process.env.JWT_SECRET
    );

    res.json({
        token,
    });
};

export const createOrganization = async (req, res) => {
    const { name } = req.body;

    const org = await Organization.create({
        name,
    });

    res.json(org);
};

export const getOrganizations = async (req, res) => {
    const organizations = await Organization.find();

    res.json(organizations);
};