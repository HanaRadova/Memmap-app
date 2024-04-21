const express = require('express')
const PhotoService = require('./photos.service')

const photoRouter = express.Router()

photoRouter.post('/', PhotoService.createPhoto)
photoRouter.get('/:locationId', PhotoService.getAllByLocationId)

module.exports = photoRouter
