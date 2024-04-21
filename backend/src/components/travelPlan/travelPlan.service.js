const { Database } = require('../../database/data')
const Ajv = require('ajv')
const { TravelPlanDAO } = require('./travelPlan.model')

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

const TravelPlanService = {
  getAll: (req, res) => {
    const travelPlanDao = new TravelPlanDAO(Database)
    return res.send(travelPlanDao.getAll())
  },

  createTravelPlan: (req, res) => {
    const { name, from, until, image /**tady */ } = req.body

    const valid = ajv.validate(schema, { name, from, until, image })
    if (!valid) {
      return res.status(400).send(ajv.errors)
    }

    // img => base64 ( send this in body) (postman)
    // save image to files /decomprimujes z base64 na soubor a ten ulozis assets/uuid.jpg

    // generate url to saved image /assets/vygenerovanejnazev.jpg generateNewId()

    const imageUrl = 'url to the file of image' /// tady uloz path assets/vygenerovanejnazev.jpg

    const travelPlanDao = new TravelPlanDAO(Database)

    const newTravelPlan = travelPlanDao.create({ name, from, until, imageUrl })

    return res.status(201).send(newTravelPlan)
  },
}

module.exports = TravelPlanService
