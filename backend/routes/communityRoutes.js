const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const communityController = require('../controllers/communityController');

// Public route to view feed (or optional auth)
router.get('/feed', communityController.getFeed);

// Protected routes
router.post('/posts', verifyToken, communityController.createPost);
router.post('/posts/:postId/like', verifyToken, communityController.toggleLike);
router.post('/posts/:postId/comments', verifyToken, communityController.addComment);
router.get('/posts/:postId/comments', communityController.getComments);

module.exports = router;
