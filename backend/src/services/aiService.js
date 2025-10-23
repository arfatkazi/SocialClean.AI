// backend/src/services/aiService.js

export const analyzeText = async (text) => {
  const lower = (text || "").toLowerCase();
  const reasons = [];
  let category = "Safe";
  let confidence = 50;

  // Detect phone/email
  const phoneRegex = /(\+?\d{3,}[\s-]?\d{3,}[\s-]?\d{3,})|(\d{10,})/;
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  if (phoneRegex.test(text) || emailRegex.test(text)) {
    category = "Private Info";
    reasons.push("Contains personal contact information (phone/email)");
    confidence = 90;
    return { category, confidence, reasons };
  }

  // Offensive words
  const offensiveWords = ["stupid", "dumb", "hate", "idiot", "sucks"];
  const found = offensiveWords.filter((w) => lower.includes(w));
  if (found.length > 0) {
    category = "Offensive";
    reasons.push(`Contains offensive language: ${found.join(", ")}`);
    confidence = 85;
    return { category, confidence, reasons };
  }

  // Default
  return { category: "Safe", confidence: 95, reasons: ["No issues detected"] };
};

export const analyzeImage = async (imageUrl) => {
  const lower = (imageUrl || "").toLowerCase();
  if (lower.includes("id") || lower.includes("passport")) {
    return {
      category: "Private Info",
      confidence: 90,
      reasons: ["Likely contains ID document"],
    };
  }
  return {
    category: "Safe",
    confidence: 90,
    reasons: ["No sensitive visual content detected"],
  };
};
