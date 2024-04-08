import { Schema, model } from 'mongoose'

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    photo: { type: Buffer, required: [true, 'please provide image'] },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    tags: [{ type: String }],
    categories: [{ type: Schema.Types.ObjectId, ref: 'PostCategory' }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id', // post id will be stored in the comment model
  foreignField: 'post', // "post" field in the "Comment" model contains the "_id" of the post
})

const Post = model('Post', postSchema)
export default Post
