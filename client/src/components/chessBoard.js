
const chessBoard = ({ user }) => {
    if(!user || !user.voted) return
    return(
    <div className="chessBoard">
        <h1>Total Votes Cast: {user.numVotes}</h1>
        <p><strong>Voted this hour: </strong>{!user.voted ? "No" : "Yes"}</p>
        <p>Color to Play: {user.currentColor}</p>

        
    </div>)
}

export default chessBoard