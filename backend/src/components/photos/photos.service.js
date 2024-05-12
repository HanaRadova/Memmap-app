const { Database } = require('../../database/data')
const Ajv = require('ajv')
const PhotoDAO = require('./photos.model')
const saveBase64Image = require("../../utils/saveImage");
const ajv = new Ajv()

const schema = {
  type: 'object',
  properties: {
    locationId: { type: 'string' }, // reference to location
    image: { type: 'string' },
    description: { type: 'string' },
    dateTime: {
      type: 'string',
      pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$', // Regular expression to validate YYYY-MM-DD
    }, // assuming 'dateTime' is a date in YYYY-MM-DD format
  },
  required: ['locationId'],
  additionalProperties: false,
}

const PhotosService = {
  getAllByLocationId: (req, res) => {
    const locationId = req.params.locationId
    const photoDao = new PhotoDAO(Database)
    res.send(photoDao.getAllByLocationId(locationId))
  },

  createPhoto: (req, res) => {
    const { image, locationId, dateTime, description } = req.body

    const valid = ajv.validate(schema, { image, locationId, dateTime, description })
    if (!valid) {
      res.status(400).send(ajv.errors)
    }

    const url = image ? saveBase64Image(image) : undefined

    const photoDao = new PhotoDAO(Database)

    const newPhoto = photoDao.create({ locationId, dateTime, url, description })

    if (!newPhoto) {
      return res.status(404).send('location not found')
    }

    return res.status(201).send(newPhoto)
  },

  getAllPhotos: (req, res) => {
    const photoDao = new PhotoDAO(Database)
    res.send(photoDao.getAll())
  }
}
module.exports = PhotosService
