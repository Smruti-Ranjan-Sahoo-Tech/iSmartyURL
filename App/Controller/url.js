const { nanoid } = require("nanoid");
const URL = require('../Model/url.model');

const MAX_DOCS = 200000;

let handleGenerateNewShortUrl = async (req, res) => {
  try {
    const body = req.body;
    const rawUrl = body.url?.trim();

    if (!rawUrl) return res.status(400).json({ error: 'URL is required' });

    // ✅ Step 1: If URL already exists → return old shortID
    let existing = await URL.findOne({ originalUrl: rawUrl });
    if (existing) {
      const shortUrl = `${req.protocol}://${req.get('host')}/url/${existing.shortID}`;
      return res.render('home', { data: { id: existing.shortID, url: rawUrl, shortUrl } });
    }

    // ✅ Step 2: Check count
    const count = await URL.countDocuments();
    if (count >= MAX_DOCS) {
      // remove the oldest document (based on createdAt)
      const oldest = await URL.findOne().sort({ createdAt: 1 });
      if (oldest) {
        await URL.deleteOne({ _id: oldest._id });
      }
    }

    // ✅ Step 3: Create new shortID
    const shortID = nanoid(6);

    await URL.create({
      shortID,
      originalUrl: rawUrl
    });

    const shortUrl = `${req.protocol}://${req.get('host')}/url/${shortID}`;
    return res.render('home', { data: { id: shortID, url: rawUrl, shortUrl } });

  } catch (error) {
    console.error('Error in handleGenerateNewShortUrl:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
let handleShortId = async (req, res) => {
  try {
    const { shortID } = req.params;

    const record = await URL.findOneAndUpdate(
      { shortID },
      { $push: { visitHistory: { timestamp: Date.now(), ipAddress: req.ip } } },
      { new: true }
    );

    if (record) return res.redirect(record.originalUrl);

    return res.status(404).json({ error: 'URL not found' });

  } catch (error) {
    console.error('Error in handleShortId:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

let handleTest = (req, res) => {
  return res.send({ msg: "Hello beb >>>>>>>>>>>>>>>>>>" });
};

module.exports = { handleGenerateNewShortUrl, handleShortId, handleTest };
