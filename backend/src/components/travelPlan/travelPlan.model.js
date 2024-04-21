const { generateUUID, saveDb } = require('../../database/data')

class TravelPlan {
  constructor(id, name, from, until, imageUrl) {
    this.id = id
    this.name = name
    this.from = from
    this.until = until
    this.imageUrl = imageUrl
  }
}

class TravelPlanDAO {
  constructor(db) {
    this.db = db
  }

  create({ name, from, until, imageUrl }) {
    const newTravelPlan = new TravelPlan(
      generateUUID(),
      name,
      from,
      until,
      imageUrl
    )

    this.db.travelPlans.push(newTravelPlan)
    saveDb()
  }

  getAll() {
    return this.db.travelPlans
  }

  getById(travelPlanId) {
    return this.db.travelPlans.find(
      (travelPLan) => travelPLan.id === travelPlanId
    )
  }
}

module.exports = { TravelPlanDAO }
