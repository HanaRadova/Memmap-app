const { Database } = require('../../database/data')
const Ajv = require('ajv')
const PhotoDAO = require('./photos.model')
const ajv = new Ajv()

const schema = {
  type: 'object',
  properties: {
    locationId: { type: 'string' }, // reference to location
    image: { type: 'string' },
    dateTime: {
      type: 'string',
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', // Regular expression to validate YYYY-MM-DD
    }, // assuming 'dateTime' is a date in YYYY-MM-DD format
  },
  required: ['locationId', 'image', 'dateTime'],
  additionalProperties: false,
}

const PhotosService = {
  getAllByLocationId: (req, res) => {
    const locationId = req.params.locationId
    const photoDao = new PhotoDAO(Database)
    res.send(photoDao.getAllByLocationId(locationId))
  },

  createPhoto: (req, res) => {
    const { image, locationId, dateTime } = req.body

    const valid = ajv.validate(schema, { image, locationId, dateTime })
    if (!valid) {
      res.status(400).send(ajv.errors)
    }

    // save image to files
    // generate url to saved image

    const url = 'url to the file of image'

    const photoDao = new PhotoDAO(Database)

    const newPhoto = photoDao.create({ locationId, dateTime, url })

    if (!newPhoto) {
      return res.status(404).send('location not found')
    }

    return res.status(201).send(newPhoto)
  },
}
module.exports = PhotosService
