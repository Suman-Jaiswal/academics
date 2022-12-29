import connectDB from './backend/config/db.js'
import branchRoutes from './backend/routes/branch_route.js'
import slotRoutes from './backend/routes/slot_route.js'
import courseRoutes from './backend/routes/course_route.js'
import linkRoutes from './backend/routes/link_route.js'
import express from 'express'
import dotenv from 'dotenv'
// import cors from 'cors'

//dotenv config
dotenv.config()

//connect database
connectDB()

const app = express()

app.use(express.json())

app.use(cors(
   { origin: 'https://academics-iiti.netlify.app/' }
))


//API
app.get('/', (req, res) => {
   res.send('API is running...')
})
app.use('/api/branches', branchRoutes)
app.use('/api/slots', slotRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/links', linkRoutes)

const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))


