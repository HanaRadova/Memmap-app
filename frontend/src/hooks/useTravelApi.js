import { request } from '../api/genericPost.js'

export const useTravelApi = () => {
  const createTravelPlan = async (data) => {
    const [error, result] = await request('travel-plan', data)
    if (error) {
      console.error('Error creating travel plan:', error)
      return null
    }
    return result
  }

  const getAllTravelPlans = async () => {
    const [error, result] = await request('travel-plan', undefined, 'GET')
    if (error) {
      console.error('Error getting all travel plans:', error)
      return null
    }
    return result
  }

  const getTravelPlan = async (id) => {
    const [error, result] = await request(`travel-plan/${id}`, undefined, 'GET')
    if (error) {
      console.error('Error getting travel plan:', error)
      return null
    }
    return result
  }

  return {
    createTravelPlan,
    getAllTravelPlans,
    getTravelPlan,
  }
}
