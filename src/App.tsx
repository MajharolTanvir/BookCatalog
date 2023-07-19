/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import MainLayout from "./layouts/MainLayout"
import { setUser } from "./redux/features/auth/userSlice"
import { useAppDispatch } from "./redux/hook"

function App() {
  const dispatch = useAppDispatch()

  let user = null
  const userData = localStorage.getItem('user')
  
  if(userData){
    user = JSON.parse(userData)
  }

  dispatch(setUser(user))

  return (
    <>
      <MainLayout></MainLayout>
    </>
  )
}

export default App
