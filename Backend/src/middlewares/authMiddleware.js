import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user.model";

export const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            const { accessToken } = req.cookies;

            if (!accessToken) {
                return next(new ApiError(401, "No token provided"));
            }

            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

            const userInfo = await User.findOne({ _id: decoded._id, isBanned: false })
                .lean()
                .select("_id email username fullname role");

            if (!userInfo) {
                return next(new ApiError(401, "Invalid User"));
            }
            if (roles.length && !roles.includes(userInfo.role)) {
                return next(new ApiError(403, "Forbidden Access"));
            }

            req.user = userInfo;
            next();
        } catch (error) {
            return next(new ApiError(401, "Invalid Token"));
        }
    };
};
