
const userDetails = ({ user }) => {
    if(!user) return
    return(
    <div className="user-details">
        <p>
            <h3 style={{margin:0}}>Welcome {user.email}!</h3>
            <strong>Total Votes Cast: {user.numVotes}</strong>
            <br/>
            <strong>Voted this hour: </strong>{!user.voted ? "No" : "Yes"}
            <br/>
            <strong>Color to Play: </strong>{user.currentColor}
        </p>
    </div>)
}

export default userDetails