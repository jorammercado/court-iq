import { Navigate, Route } from 'react-router-dom'

const ProtectedRoute = ({
  element: Component,
  currentUser,
  setCurrentUser,
  photoURL,
  setPhotoURL,
  currentUserPlaces,
  setCurrentUserPlaces,
}) => {
  return currentUser ? (
    <Component
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      photoURL={photoURL}
      setPhotoURL={setPhotoURL}
      currentUserPlaces={currentUserPlaces}
      setCurrentUserPlaces={setCurrentUserPlaces}
    />
  ) : (
    <Navigate to="/login" />
  )
}

export default ProtectedRoute
