import { Login } from '../Components/Login'

export const LoginPage = ({ currentUser, setCurrentUser, photoURL, setPhotoURL }) => {
  return (
    <div>
      <Login
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        photoURL={photoURL}
        setPhotoURL={setPhotoURL}
      />
    </div>
  )
}
