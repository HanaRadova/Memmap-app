import { useContext } from 'react'
import { AppStore } from '../store/appStore.js'

export const CreateTravelPlan = () => {
  const { value, setValue } = useContext(AppStore)

  return (
    <div>
      <h1>Create travel Plan</h1>
      <p>{value}</p>
    </div>
  )
}
