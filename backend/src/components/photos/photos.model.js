const { generateUUID, saveDb } = require('../../database/data')
const LocationDAO = require('../locations/locations.model')

class Photo {
  constructor(id, url, locationId, dateTime) {
    this.id = id
    this.url = url
    this.locationId = locationId
    this.dateTime = dateTime
  }
}

class PhotoDAO {
  constructor(db) {
    this.db = db
  }

  create({ url, locationId, dateTime }) {
    const locationDao = new LocationDAO(this.db)
    const foundLocation = locationDao.getLocationById(locationId)
    if (!foundLocation) {
      return
    }

    const newPhoto = new Photo(generateUUID(), url, locationId, dateTime)
    this.db.photos.push(newPhoto)
    saveDb()

    return newPhoto
  }

  getAllByLocationId(locationId) {
    return this.db.photos.filter((ph) => ph.locationId === locationId)
  }
}

module.exports = PhotoDAO
