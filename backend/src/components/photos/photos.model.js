const { generateUUID, saveDb } = require('../../database/data')
const LocationDAO = require('../locations/locations.model')

class Photo {
  constructor(id, url, locationId, dateTime, description) {
    this.id = id
    this.url = url
    this.locationId = locationId
    this.dateTime = dateTime
    this.description = description
  }
}

class PhotoDAO {
  constructor(db) {
    this.db = db
  }

  create({ url, locationId, dateTime, description }) {
    const locationDao = new LocationDAO(this.db)
    const foundLocation = locationDao.getLocationById(locationId)
    if (!foundLocation) {
      return
    }

    const newPhoto = new Photo(generateUUID(), url, locationId, dateTime, description)
    this.db.photos.push(newPhoto)
    saveDb()

    return newPhoto
  }

  getAllByLocationId(locationId) {
    return this.db.photos.filter((ph) => ph.locationId === locationId)
  }

  getAll() {
    return this.db.photos
  }
}

module.exports = PhotoDAO
