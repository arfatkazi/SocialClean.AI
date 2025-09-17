import { verifyToken } from "../utils/jwt.js";
import User from "../models/userSchema.js";

// Protect routes (check JWT and attach user)
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = verifyToken(token);
      if (!decoded) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid or expired token" });
      }

      // Fetch user from DB (exclude sensitive fields)
      const user = await User.findById(decoded.id).select(
        "-password -resetPasswordToken -resetPasswordExpire"
      );

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      // Attach user info to request
      req.user = {
        id: user._id,
        role: user.role,
        subscription: user.subscription.type,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic,
      };

      next();
    } catch (error) {
      console.error("❌ Auth middleware error:", error);
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }
};

// Role-based access control
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied: insufficient role" });
    }
    next();
  };

// Subscription-based access control
export const authorizeSubscription = (type) => (req, res, next) => {
  if (req.user.subscription !== type) {
    return res
      .status(403)
      .json({ success: false, message: `Requires ${type} subscription` });
  }
  next();
};
