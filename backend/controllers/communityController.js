const mongoose = require('mongoose');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

exports.getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // We might want to allow unauthenticated users to view the feed
    let userId = null;
    if (req.header('Authorization')) {
      const jwt = require('jsonwebtoken');
      try {
        const token = req.header('Authorization').split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        userId = new mongoose.Types.ObjectId(verified.userId || verified.id);
      } catch (err) {
        // Ignore invalid token for feed viewing
      }
    }

    const pipeline = [
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'author'
        }
      },
      { $unwind: '$author' },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'post',
          as: 'likes'
        }
      },
      {
        $lookup: {
          from: 'comments',
          let: { postId: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$post', '$$postId'] } } },
            { $sort: { createdAt: -1 } },
            { $limit: 3 },
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'commentAuthor'
              }
            },
            { $unwind: '$commentAuthor' },
            {
              $project: {
                _id: 1,
                text: 1,
                createdAt: 1,
                'commentAuthor.name': 1,
                'commentAuthor.avatar': 1
              }
            }
          ],
          as: 'recentComments'
        }
      },
      {
        $addFields: {
          likesCount: { $size: '$likes' },
          isLikedByMe: userId ? { $in: [userId, '$likes.user'] } : false
        }
      },
      {
        $project: {
          likes: 0,
          'author.password': 0,
          'author.email': 0,
          'author.phone': 0,
          'author.authProvider': 0,
          'author.googleId': 0
        }
      }
    ];

    const posts = await Post.aggregate(pipeline);
    
    const total = await Post.countDocuments();

    res.json({
      success: true,
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total
    });
  } catch (error) {
    console.error('Error fetching feed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch community feed.' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { imageUrl, caption, location } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Image URL is required' });
    }

    const post = new Post({
      user: req.user.id,
      imageUrl,
      caption,
      location
    });

    await post.save();
    
    // Populate author
    await post.populate('user', 'name avatar');

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, message: 'Failed to create post.' });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      res.json({ success: true, liked: false, message: 'Post unliked' });
    } else {
      await Like.create({ post: postId, user: userId });
      res.json({ success: true, liked: true, message: 'Post liked' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ success: false, message: 'Failed to toggle like.' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, message: 'Comment text is required' });
    }

    const comment = new Comment({
      post: postId,
      user: req.user.id,
      text
    });

    await comment.save();

    await comment.populate('user', 'name avatar');

    res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ success: false, message: 'Failed to add comment.' });
  }
};

exports.getComments = async (req, res) => {
  try {
     const postId = req.params.postId;
     const comments = await Comment.find({ post: postId })
        .sort({ createdAt: -1 })
        .populate('user', 'name avatar');
     
     res.json({ success: true, comments });
  } catch (error) {
     console.error('Error fetching comments:', error);
     res.status(500).json({ success: false, message: 'Failed to fetch comments.' });
  }
};
