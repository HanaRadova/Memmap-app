const { Database } = require('../../database/data')
const Ajv = require('ajv')
const { TravelPlanDAO } = require('./travelPlan.model')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const saveBase64Image = require("../../utils/saveImage");

const ajv = new Ajv()

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    image: { type: 'string' },
    from: {
      type: 'string',
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', // Regular expression to validate YYYY-MM-DD
    },
    until: {
      type: 'string',
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', // Regular expression to validate YYYY-MM-DD
    },
  },
  required: ['name', 'from', 'until', 'image'],
  additionalProperties: false,
}

// Function to save base64 data as a file
function saveBase64AsFile(base64Data, filePath) {
  const buffer = Buffer.from(base64Data, 'base64')
  fs.writeFileSync(filePath, buffer)
}

const TravelPlanService = {
  getAll: (req, res) => {
    const travelPlanDao = new TravelPlanDAO(Database)
    return res.send(travelPlanDao.getAll())
  },

  createTravelPlan: (req, res) => {
    const { name, from, until, image } = req.body

    const valid = ajv.validate(schema, { name, from, until, image })
    if (!valid) {
      return res.status(400).send(ajv.errors)
    }

    const imageUrl = saveBase64Image(image)

    console.log('imageUrl', imageUrl)

    const travelPlanDao = new TravelPlanDAO(Database)

    const newTravelPlan = travelPlanDao.create({ name, from, until, imageUrl })

    return res.status(201).send(newTravelPlan)
  },

  getById: (req, res) => {
    const { id } = req.params
    const travelPlanDao = new TravelPlanDAO(Database)
    const travelPlan = travelPlanDao.getById(id)

    if (travelPlan) {
      return res.send(travelPlan)
    }

    return res.status(404).send({ message: 'Travel plan not found' })
  }
}

module.exports = TravelPlanService
