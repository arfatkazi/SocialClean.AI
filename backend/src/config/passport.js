import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as InstagramStrategy } from "passport-instagram";
import User from "../models/userModel.js";

// =================
// Google Strategy
// =================
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/photoslibrary.readonly",
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            password: Math.random().toString(36).slice(-8),
            oauth: {
              googlePhotos: { accessToken, refreshToken, expiry: new Date() },
            },
            location: { country: "unknown" },
          });
        } else {
          user.oauth.googlePhotos = {
            accessToken,
            refreshToken,
            expiry: new Date(),
          };
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// =================
// Facebook Strategy
// =================
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails?.[0]?.value || `${profile.id}@facebook.com`;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            firstName: profile.name.givenName || "Facebook",
            lastName: profile.name.familyName || "User",
            email,
            password: Math.random().toString(36).slice(-8),
            oauth: {
              facebook: { accessToken, refreshToken, expiry: new Date() },
            },
            profilePic: profile.photos?.[0]?.value,
            location: { country: "unknown" },
          });
        } else {
          user.oauth.facebook = {
            accessToken,
            refreshToken,
            expiry: new Date(),
          };
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// =================
// Twitter Strategy
// =================
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/callback",
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let email = profile.emails?.[0]?.value || `${profile.id}@twitter.com`;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            firstName: profile.displayName || "Twitter",
            lastName: "User",
            email,
            password: Math.random().toString(36).slice(-8),
            oauth: {
              twitter: {
                accessToken: token,
                refreshToken: tokenSecret,
                expiry: new Date(),
              },
            },
            profilePic: profile.photos?.[0]?.value,
            location: { country: "unknown" },
          });
        } else {
          user.oauth.twitter = {
            accessToken: token,
            refreshToken: tokenSecret,
            expiry: new Date(),
          };
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// =================
// Instagram Strategy
// =================
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      callbackURL: "/auth/instagram/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails?.[0]?.value || `${profile.id}@instagram.com`;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            firstName: profile.displayName || "Instagram",
            lastName: "User",
            email,
            password: Math.random().toString(36).slice(-8),
            oauth: {
              instagram: { accessToken, refreshToken, expiry: new Date() },
            },
            profilePic: profile.photos?.[0]?.value,
            location: { country: "unknown" },
          });
        } else {
          user.oauth.instagram = {
            accessToken,
            refreshToken,
            expiry: new Date(),
          };
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// =================
// Session handling
// =================
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
