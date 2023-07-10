
const userDetails = ({ user }) => {
    if(!user) return
    return(
    <div className="user-details">
        <p>
            <h4 style={{margin:0}}>welcome {user.email}!</h4>
            <strong>total votes cast:</strong> {user.numVotes}
            <br/>
            <strong>voted this hour: </strong>{!user.voted ? "no" : "yes"}
            <br/>
            <strong>color to play: </strong>{user.currentColor}
        </p>
    </div>)
}

export default userDetails