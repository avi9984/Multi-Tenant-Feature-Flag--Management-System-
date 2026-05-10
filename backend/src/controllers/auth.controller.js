import User from "../models/User.js";
import Organization from "../models/Organization.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { name, email, password, organizationId } = req.body;

        const organization = await Organization.findById(organizationId);

        if (!organization) {
            return res.status(404).json({
                message: "Organization not found",
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "ORG_ADMIN",
            organization: organizationId,
        });

        res.status(201).json({
            message: "Signup successful",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const token = generateToken(user);

        res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
