import connectDB from './backend/config/db.js'
import slotRoutes from './backend/routes/slot_route.js'
import courseRoutes from './backend/routes/course_route.js'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

//dotenv config
dotenv.config()

//connect database
connectDB()

const app = express()

app.use(express.json())

app.use(cors())

const __dirname = path.resolve();

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}


//API
app.use('/api/slots', slotRoutes)
app.use('/api/courses', courseRoutes)

const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))


