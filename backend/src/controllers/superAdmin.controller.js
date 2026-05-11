import Organization from "../models/Organization.js";
import jwt from "jsonwebtoken";

export const superAdminLogin = async (req, res) => {
    try {
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

        res.status(200).json({
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createOrganization = async (req, res) => {
    try {
        const { name } = req.body;

        const org = await Organization.create({
            name,
        });

        res.status(201).json(org);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();

        res.status(200).json(organizations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};