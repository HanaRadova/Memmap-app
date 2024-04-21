const express = require('express')
const TravelPlanService = require('./travelPlan.service')

const travelPlanRotuer = express.Router()

travelPlanRotuer.post('/', TravelPlanService.createTravelPlan)
travelPlanRotuer.get('/', TravelPlanService.getAll)

module.exports = travelPlanRotuer
