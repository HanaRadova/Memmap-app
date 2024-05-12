const express = require('express')
const cors = require('cors');
const path = require('path');
const travelPlanRouter = require('./components/travelPlan/travelPlan.routes')
const locationRouter = require('./components/locations/locations.routes')
const photoRouter = require('./components/photos/photos.routes')


const app = express()
app.use(express.json({ limit: "50mb" }))
app.use(cors());
app.use('/travel-plan', travelPlanRouter)
app.use('/location', locationRouter)
app.use('/photo', photoRouter)

const assetsPath = path.join('./images');
app.use('/images', express.static(assetsPath));

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3000')
})
