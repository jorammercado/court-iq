
import SignUpForm from "../Components/SignUpForm"

function SignUp({ setCurrentUser, currentUser }) {
    return (
        <div >
            <SignUpForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </div>
    )
}

export default SignUp




