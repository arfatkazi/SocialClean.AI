import UserContent from "../models/UserContent.js";

// Generic helper to insert dummy content
const insertDummyContent = async (userId, provider, type = "text") => {
  const dummyData = [
    {
      userId,
      provider,
      contentId: `${provider}-1`,
      type,
      text: `${provider} sample post 1`,
      mediaUrl:
        type === "image"
          ? `https://placehold.co/600x400?text=${provider}+Image+1`
          : null,
    },
    {
      userId,
      provider,
      contentId: `${provider}-2`,
      type,
      text: `${provider} sample post 2`,
      mediaUrl:
        type === "image"
          ? `https://placehold.co/600x400?text=${provider}+Image+2`
          : null,
    },
  ];

  await UserContent.insertMany(dummyData, { ordered: false });
  return dummyData.length;
};

// ----------------- Controllers -----------------

export const fetchTwitterPosts = async (req, res) => {
  try {
    const count = await insertDummyContent(req.user._id, "twitter", "text");
    res.json({ success: true, provider: "twitter", count });
  } catch (err) {
    res.status(500).json({ error: "Twitter fetch failed" });
  }
};

export const fetchInstagramPosts = async (req, res) => {
  try {
    const count = await insertDummyContent(req.user._id, "instagram", "image");
    res.json({ success: true, provider: "instagram", count });
  } catch (err) {
    res.status(500).json({ error: "Instagram fetch failed" });
  }
};

export const fetchFacebookPosts = async (req, res) => {
  try {
    const count = await insertDummyContent(req.user._id, "facebook", "text");
    res.json({ success: true, provider: "facebook", count });
  } catch (err) {
    res.status(500).json({ error: "Facebook fetch failed" });
  }
};

export const fetchGooglePhotos = async (req, res) => {
  try {
    const count = await insertDummyContent(
      req.user._id,
      "google-photos",
      "image"
    );
    res.json({ success: true, provider: "google-photos", count });
  } catch (err) {
    res.status(500).json({ error: "Google Photos fetch failed" });
  }
};
