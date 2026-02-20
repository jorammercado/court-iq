import { Navigate, Route } from 'react-router-dom'

const PublicRoute = ({
  element: Component,
  currentUser,
  setCurrentUser,
  photoURL,
  setPhotoURL,
  currentUserPlaces,
  setCurrentUserPlaces,
}) => {
  return !currentUser ? (
    <Component
      setCurrentUser={setCurrentUser}
      currenUser={currentUser}
      photoURL={photoURL}
      setPhotoURL={setPhotoURL}
      currentUserPlaces={currentUserPlaces}
      setCurrentUserPlaces={setCurrentUserPlaces}
    />
  ) : (
    <Navigate to={`/loggedInPage`} />
  )
}

export default PublicRoute
