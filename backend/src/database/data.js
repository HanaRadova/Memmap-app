const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

const generateUUID = () => uuidv4()

function loadDb() {
  let data = {
    travelPlans: [],
    locations: [],
    photos: [],
  }
  try {
    const filePath = path.join(__dirname, 'data.json')
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    console.error(error)
  }
  return data
}

const Database = loadDb()

const saveDb = () => {
  try {
    const filePath = path.join(__dirname, 'data.json')
    const data = fs.writeFileSync(filePath, JSON.stringify(Database), 'utf8')
  } catch (error) {
    console.error(error)
  }
}

module.exports = { Database, saveDb, generateUUID }
