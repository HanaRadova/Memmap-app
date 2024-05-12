const {Database} = require('../../database/data')
const Ajv = require('ajv')
const LocationDAO = require('./locations.model')
const ajv = new Ajv()

const schema = {
    type: 'object',
    properties: {
        name: {type: 'string'},
        coordinations: {
            type: 'object',
            properties: {
                lat: {type: 'number'},
                lng: {type: 'number'}
            },
        },
        travelPlanId: {type: 'string'},
    },
    required: ['name', 'coordinations', 'travelPlanId'],
    additionalProperties: false,
}

const LocationsService = {
    getAllByLocationId: (req, res) => {
        const travelPlanId = req.params.travelPlanId
        const locationDao = new LocationDAO(Database)
        return res.send(locationDao.getAllByTravelId(travelPlanId))
    },

    createLocation: (req, res) => {
        const {name, coordinations, travelPlanId} = req.body

        const valid = ajv.validate(schema, {name, coordinations, travelPlanId})
        if (!valid) {
            return res.status(400).send(ajv.errors)
        }

        // save image to files
        // generate url to saved image

        const url = 'url to the file of image'

        const locationDao = new LocationDAO(Database)

        const newLocation = locationDao.create({
            name,
            coordinations,
            travelPlanId,
        })

        if (!newLocation) {
            return res.status(404).send('TravelPlan not found.')
        }

        return res.status(201).send(newLocation)
    },
}

module.exports = LocationsService
