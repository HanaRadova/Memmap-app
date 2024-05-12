import { request } from '../api/genericPost.js'

export const useLocationApi = () => {
  const createLocation = async (data) => {
    const [error, result] = await request('location', data)
    if (error) {
      console.error('Error creating location:', error)
      return null
    }
    return result
  }

  const getAllByTravelPlanId = async (travelPlanId) => {
    const [error, result] = await request(
      `location/${travelPlanId}`,
      undefined,
      'GET'
    )
    if (error) {
      console.error(
        `Error fetching locations for travel plan ID ${travelPlanId}:`,
        error
      )
      return null
    }
    return result
  }

  return {
    createLocation,
    getAllByTravelPlanId,
  }
}
