import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import notFoundMiddleware from './middleware/not-found.js'

// Routes
import userRoutes from './routers/userRoutes.js'
import postRoutes from './routers/postRoutes.js'
import commentRoutes from './routers/commentRoutes.js'
import postCategoriesRoutes from './routers/postCategoriesRoutes.js'

dotenv.config()
const app = express()
app.use(express.json())

connectDB()

app.get('/', (req, res) => {
  res.send('server is running...')
})

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/post-categories', postCategoriesRoutes)

// error handler middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
