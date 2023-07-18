# communalChess
Chess Game where anyone who signs up is assigned a color and can vote on the next move every 20 minutes.
Developed on a MERN stack using MVC architecture.

Home page of logged in user. Displays user data from MongoDB using an API.
Searchable dropdown with JavaScript of possible moves of current chess position.
Disallows move selection when not users turn.
![image](https://github.com/PatPinello/communalChess/assets/68654707/701170ba-adff-4676-aa41-a4f3fde23ef0)

User Authentication using JWT <br>
![image](https://github.com/PatPinello/communalChess/assets/68654707/0dda8d21-ff76-48e0-b299-7dc6a8b7667a)
<br>Safe password encryption and storage using salt and Bcrypt hashing algorithm.
Reroutes to log in or signup page when user doesn't have correct permissions.

In progress:
Checking all players who have voted in current 20 minutes and ranking their votes using MongoDB and the API.
