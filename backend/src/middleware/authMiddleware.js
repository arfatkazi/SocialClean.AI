// backend/src/middleware/authMiddleware.js
import { verifyToken } from "../utils/jwt.js";
import User from "../models/userSchema.js";

// ✅ Protect routes (check JWT and attach user)
export const protect = async (req, res, next) => {
  let token;

  try {
    // ✅ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    // ✅ Verify token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // ✅ Fetch user from DB
    const user = await User.findById(decoded.id).select(
      "-password -resetPasswordToken -resetPasswordExpire"
    );
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Attach user info to request (clean structure)
    req.user = {
      id: user._id.toString(),
      role: user.role || "user",
      subscription: user.subscription?.type || "free",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePic: user.profilePic,
    };

    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// ✅ Role-based access
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient role",
      });
    }
    next();
  };

// ✅ Subscription-based access
export const authorizeSubscription = (type) => (req, res, next) => {
  if (req.user.subscription !== type) {
    return res.status(403).json({
      success: false,
      message: `Requires ${type} subscription`,
    });
  }
  next();
};
