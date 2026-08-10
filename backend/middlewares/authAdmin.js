import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const isAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized access");
        }

        const token = authHeader.split(" ")[1];
        // console.log("token", token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            throw new ApiError(401, "Unauthorized");
        }

        req.admin = decoded;

        next();
    } catch (error) {
        next(error);
    }
};