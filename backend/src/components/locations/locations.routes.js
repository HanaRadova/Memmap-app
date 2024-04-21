const express = require('express')
const LocatinoService = require('./locations.service')

const locationRouter = express.Router()

locationRouter.get('/:travelPlanId', LocatinoService.getAllByLocationId)
locationRouter.post('/', LocatinoService.createLocation)

module.exports = locationRouter
