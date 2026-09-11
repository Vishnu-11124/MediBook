import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const isDoctor = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Unauthorized access");
    }

    const dToken = authHeader.split(" ")[1];

    const decoded = jwt.verify(dToken, process.env.JWT_SECRET);

    if (decoded.role !== "doctor") {
      throw new ApiError(403, "Doctor access required");
    }

    req.doctorId = decoded.id;

    next();
  } catch (error) {
    next(error);
  }
};
