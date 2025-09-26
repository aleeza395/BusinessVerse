const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const Fuse = require("fuse.js");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const normalizeCategory = (category) => category.trim().toLowerCase();

app.post("/api/:category", (req, res) => {
  const { category } = req.params;
  const { idea } = req.body;

  const filePath = path.join(
    __dirname,
    "data",
    `${normalizeCategory(category)}.json`
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Category not found" });
  }

  try {
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);

    const businessList = jsonData.business_data || [];

    const fuse = new Fuse(businessList, {
      keys: [
        "business_type",
        "category",
        "related_ideas",
        "suggested_strategies",
        "unique_selling_point.examples_of_usps",
        "target_market.definition",
        "target_market.example",
      ],
      includeScore: true,
      threshold: 0.4,
    });

    const trimmedIdea = idea.toLowerCase().trim();

    const results = fuse.search(trimmedIdea);

    if (results.length > 0) {
      return res.json([results[0].item]);
    }
  } catch (err) {
    console.error("Error reading file:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
