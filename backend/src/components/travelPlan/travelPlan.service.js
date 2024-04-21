const { Database } = require('../../database/data')
const Ajv = require('ajv')
const { TravelPlanDAO } = require('./travelPlan.model')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

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

    // Assuming you have the actual base64 image data in the request body
    const base64Image = req.body.image
    const imagePath = path.join(__dirname, '../../src/pic.jpg') // Path to your image file
    saveBase64AsFile(base64Image, imagePath)

    // Generate a unique image URL using UUID
    const uniqueId = uuidv4()
    const imageUrl = `/assets/${uniqueId}.jpg`

    const travelPlanDao = new TravelPlanDAO(Database)

    const newTravelPlan = travelPlanDao.create({ name, from, until, imageUrl })

    return res.status(201).send(newTravelPlan)
  },
}

module.exports = TravelPlanService
