const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Use memory storage so we can upload buffer directly to Cloudinary
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  try {
    // Convert buffer to data URI and upload to Cloudinary
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(dataUri, { folder: 'rangvastrika' });

    return res.json({ url: result.secure_url });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ message: err.message || 'Upload failed' });
  }
});

module.exports = router;
