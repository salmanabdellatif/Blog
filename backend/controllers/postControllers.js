import Post from '../models/post.js'
import { v4 as uuidv4 } from 'uuid'
import uploadPostPhoto from '../middleware/uploadPostPhoto.js'

const createPost = async (req, res, next) => {
  try {
    uploadPostPhoto.single('postPhoto')(req, res, async function (err) {
      if (err) {
        const error = new Error(
          'An unknown error occured when uploading ' + err.message
        )
        next(error)
      }
      if (!req.file) {
        const error = new Error('please provide post photo')
        return next(error)
      }
      const { title, caption, content } = req.body
      const post = new Post({
        title,
        caption,
        content,
        slug: uuidv4(),
        photo: req.file.buffer,
        user: req.user._id,
      })
      const createdPost = await post.save()
      return res.json(createdPost)
    })
  } catch (error) {
    next(error)
  }
}
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
    if (!post) {
      return res.status(404).json('post not found')
    }

    uploadPostPhoto.single('postPhoto')(req, res, async function (err) {
      if (err) {
        const error = new Error(
          'An unknown error occured when uploading ' + err.message
        )
        next(error)
      }
      const { title, caption, content } = req.body
      post.title = title || post.title
      post.caption = caption || post.caption
      post.content = content || post.content
      if (req.file) {
        post.photo = req.file.buffer || post.photo
      }

      const updatedPost = await post.save()
      return res.status(200).json(updatedPost)
    })
  } catch (error) {
    next(error)
  }
}
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug })
    if (!post) {
      return res.status(404).json('post not fount')
    }

    return res.status(200).json('post successfully deleted')
  } catch (error) {
    next(error)
  }
}
const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate({
      path: 'user',
      select: ['avatar', 'name'],
    })
    if (!post) {
      return res.status(404).json('post not found')
    }
    return res.status(200).json(post)
  } catch (error) {
    next(error)
  }
}
const getAllPosts = async (req, res, next) => {
  try {
    const filter = req.query.keywords
    let where = {}
    if (filter) {
      where.title = { $regex: filter, $options: 'i' }
    }
    let query = Post.find(where)
    const page = parseInt(req.query.page) || 1 // current page
    const pageSize = parseInt(req.query.limit) || 10 // document per page
    const skip = (page - 1) * pageSize // documents to be skipped
    const total = await Post.find(where).countDocuments() // total documents
    const pages = Math.ceil(total / pageSize) // pages number

    res.header({
      'x-filter': filter,
      'x-totalcount': JSON.stringify(total),
      'x-currentpage': JSON.stringify(page),
      'x-pagesize': JSON.stringify(pageSize),
      'x-totalpagecount': JSON.stringify(pages),
    })

    if (page > pages) {
      return res.json([])
    }
    const result = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: 'user',
          select: ['avatar', 'name', 'verified'],
        },
      ])
      .sort({ updatedAt: 'desc' })
    console.log(result.length)
    return res.json(result)
  } catch (error) {
    next(error)
  }
}

export { createPost, updatePost, deletePost, getPost, getAllPosts }
