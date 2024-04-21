const express = require('express')
const travelPlanRotuer = require('./components/travelPlan/travelPlan.routes')
const locationRouter = require('./components/locations/locations.routes')
const photoRouter = require('./components/photos/photos.routes')

const app = express()
app.use(express.json())
app.use('/travel-plan', travelPlanRotuer)
app.use('/location', locationRouter)
app.use('/photo', photoRouter)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
