import { request } from '../api/genericPost.js'

export const usePhotoApi = () => {
  const createPhoto = async (data) => {
    const [error, result] = await request('photo', data)
    if (error) {
      console.error('Error creating photo:', error)
      return null
    }
    return result
  }

  const getAllByLocationId = async (locationId) => {
    const [error, result] = await request(
      `photo/${locationId}`,
      undefined,
      'GET'
    )
    if (error) {
      console.error(
        `Error fetching photos for location ID ${locationId}:`,
        error
      )
      return null
    }
    return result
  }

  const getAllPhotos = async () => {
    const [error, result] = await request('photo', undefined, 'GET')
    if (error) {
      console.error('Error fetching all photos:', error)
      return null
    }
    return result
  }

  return {
    createPhoto,
    getAllByLocationId,
    getAllPhotos,
  }
}
