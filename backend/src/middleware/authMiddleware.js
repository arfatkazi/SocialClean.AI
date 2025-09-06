import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// Protect routes (JWT verification)
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB
      const user = await User.findById(decoded.id).select(
        "-password -resetPasswordToken -resetPasswordExpire"
      );
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      // Attach user + role + subscription to req
      req.user = {
        id: user._id,
        role: user.role,
        subscription: user.subscription.type,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic,
      };

      next(); // Continue to next middleware/controller
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

// Optional: Role-based access control
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
  };

// Optional: Subscription-based access control
export const authorizeSubscription = (type) => (req, res, next) => {
  if (req.user.subscription !== type) {
    return res
      .status(403)
      .json({ success: false, message: `Requires ${type} subscription` });
  }
  next();
};
