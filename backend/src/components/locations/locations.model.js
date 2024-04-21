const { generateUUID, saveDb } = require('../../database/data')
const { TravelPlanDAO } = require('../travelPlan/travelPlan.model')

class Location {
  constructor(id, name, coordinations, travelPlanId) {
    this.id = id
    this.name = name
    this.coordinations = coordinations
    this.travelPlanId = travelPlanId
  }
}

class LocationDAO {
  constructor(db) {
    this.db = db
  }

  create({ name, coordinations, travelPlanId }) {
    const travelPlanDao = new TravelPlanDAO(this.db)
    const travelPlan = travelPlanDao.getById(travelPlanId)

    if (!travelPlan) {
      return
    }

    const newLocation = new Location(
      generateUUID(),
      name,
      coordinations,
      travelPlanId
    )

    this.db.locations.push(newLocation)
    saveDb()
    return newLocation
  }

  getAllByTravelId(travelId) {
    console.log(this.db.locations)
    console.log(travelId)
    return this.db.locations.filter(
      (location) => location.travelPlanId === travelId
    )
  }

  getLocationById(locationId) {
    console.log(this.db.locations)
    console.log(locationId)

    return this.db.locations.find((location) => location.id === locationId)
  }
}

module.exports = LocationDAO
