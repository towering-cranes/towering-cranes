## I’m Game Documentation
					
- __Product Owner__: Brian Hassett
- __Scrum Master__: Michael Chiang
- __Development Team__: Daniel Ritchie, Gwynn Dandridge-Perry
			
Hack Reactor Legacy Project - Modern Grasshoppers
					
## Contents			
						 							
1.  Introduction
						 							
2.  File Structure
						 							
3.  Database Schema					
						 							
4.  Server-Side
							
- 4.1 Routes 
- 4 4.2 DatabaseHelperFunctions
- 4 4.3 GiantBombAPIHelperFunctions
						 							
5.  Client-Side
							
- 5.1 Files
- 5.2 User Authentication
						 							
6. Deployment
						 							
7. Socket.io


## 1. Introduction
					
Welcome to “I’m Game!” 

“I’m Game” is based on GameMon, an app for tracking what video games you have in your collection.  For us the next step was to make it interactive among users, so we turned the app into a social hub where users can connect and chat to coordinate their gaming sessions.

To do that, we added a way to view other user collections, and also a way for the user to find others to play a game with in real time:

With thousands of games available through the GiantBomb API, you can keep track of your collection, add and remove games, and keep track of details and information about your favorite games. When you’re ready for a gaming session, click the I’m Game button on a particular game you want to play and immediately connect with other gamers that are just as excited as you are.  Live chat helps you meet new friends and make plans for future party gaming sessions. 
								
					
## 2. File Structure
					
towering-cranes
- client					
 - assets					
      - favicon.ico
      - imgame-collection.png
      - imgame-details.png
      - imgame-search.png
      - social-hub-view.jpg
      - Social-view.jpg
      - user-card.jpg
      - Octocat.png					
     - home
       - home.html	
    - imgame
       - imgame.html
       - imgame.js				
    - main
       - gameCollection.js
       - main.html
       - modal.js
       - search.js
       - selectedGame.js
       - toggle.js
   - profile
      - profileview.html
      - profile.js					
    - styles
       - styles.css					
    - app.js					
    - index.html
  - documentation				
    - documentation.pdf
    - documentation.tex
    -  documentation.toc				
  - server							
    - database
       - databaseHelpers.js			 				
       - db.js
    - giantBomb					
       - giantBombHelpers.js
    - server.js
    - gitignore
    - editorconfig
    - gitattributes
    - gitignore
    - jshintrc
    - travis.yml
    - CONTRIBUTING.m
    - PRESS-RELEASE.md
    - STYLE-GUIDE.md					
    - package.json
    - README.md
					
## 3. Database Schema
			
## 4. Server-Side
					
Server-side files hold the routes and the helper functions needed for the routing.			
					
## 4.1 Routes
					
Database Routes
					
- ’/users’ POST - receives a username and password from the client and adds each to the database for a specific user 
- ’/games’	POST - receives a user and a game from the client and adds the game to that user’s collection in the database
- DELETE - receives a game title and a user from the request body and removes the game from the users collection
- GET - receives a username from the client as a parameter in the url and sends all of that users games back to the client
							
Giant Bomb API Routes				 											 							
’/games/search/keyword/:keyword’
- GET - receives a keyword from the client as a parameter and returns up to 10 games that match the keyword
						 							
’/games/search/id/:id’
- GET - receives a game id from the client as a parameter and returns up to 10 games that match the id					
					 					
## 4.2 Database Helper Functions
						 							
createUser - receives a user object from the server and either finds a user with that existing name or creates a new user
						 							
addGameToCollection - receives a username and a game object and adds the game to the specified users collection.
						 							
getGamesFromCollection - receives a username from the server and finds/returns all of that users games.
						 							
removeGameFromCollection - receives a username and a game from the server and deletes that game from the specified users collection
						
					 					
## 4.3 Giant Bomb API Helper Functions
					
Note: ES6 syntax used here in the request calls
					
• searchForGames - receives a search term and uses expresss request module to send that request to the Giant Bomb api.
									
– Example: To search for all Pokemon games our url in the options object would be the following: ‘http://www.giantbomb.com/api/search/?api key=$YOUR- API-KEY&format=json&query=”$pokemon”&resources=game‘
					
• getGameById - receives an id from and uses that id to get the game with the corresponding id form Giant Bomb.
					
– Example: To search for metroid prime and list its genres and name based on id do the following: ‘http://www.giantbomb.com/api/game/3030-4725/?api key=$YOUR- API-KEY&format=json&field list=genres,name‘
			
		
## 5. Client-Side
					
Front-end uses AngularJS with Materialize/Angular-materialize. Materialize/Angular-materialize can be substituted with Bootstrap or any other front-end framework. Angular-materialize is a set of AngularJS directives to use features in Materialize that requires jQuery. It is NOT the same as Angular Material.
					
Resources:
					
- AngularJS
- Angular-materialize • Material Icons
- Materialize CSS

					
## 5.1 Files
					
The roles of the different files are as follows:
• /client/styles/styles.css				
- Custom stylesheet for overrides and other styles not included in Materialize • /client/assets
- Images and other files to be used across client pages • /client/index.html				
- Loads JS libraries
- Sets up header, navigation, and footer
					
• /client/app.js
- Handles client side routing to load templates in /client/main or /client/home
					
• /client/home/home.html
- Template for product landing page
												
- Default page if root directory is loaded or if an invalid url is provided • /client/main/main.html
					 							
- Uses ternary operator on gameCollection to see if search sidebar should be displayed. If it should be displayed, the column width is set to 8, if not, it is set to 11.
					 							
- Uses custom filter in gameCollection.js to allow filtering by title, franchise, platform, and genre
					 							
- Allows collection view to change between list and grid and sort by title or release date
					 							
- Holds modal markup that appears when a game is clicked on
							
• /client/main/modal.js
- Controller to load data into the scope for modal information
						
• /client/main/gameCollection.js				 							
- Holds a factory with following functions:
  - getUserCollection that loads a game collection for the signed-in user
  - addGameToCollection adds a selected game to the current user’s collection
  - removeGameFromCollection removes the selected game from the current user’s collection	
- Holds a custom filter that takes in setFilter(filterOpt) as an input where filterOpt is an array
  - checks for a match in the respective locations of all the objects and returns all matches
  - first element of filterOpt is the search term to find
  - second element is what type of filter term it is: text, platform, or genre
  - returns all objects that will be displayed after filtering
  - items holds all possible objects

- /client/main/search.js
  - Holds a factory with searchByTerm and searchById functions
- /client/imgame/imgame.js
  - Controller for I’m Game view (imgame.html)
  - Grabs the game name for a specific game from the “gametitle” route parameter
  - Updates the user’s “I’m game” status to a specific game via a post request
  - Upon a successful post request, sends a get request to get all users who are currently “I’m game” for the same game
  - Continuously updates the users list through a setInterval call
- client/imgame/imgame.html
  - In addition to being the view for imgame.js, holds a script for socket.io chat (see Section 7 below)
- client/profile/profile.js
  - Controller for viewing another user’s profile
  - Similar to gameCollection.js, except grabs user nickname from route params and sends a post request based on that information. Also,  there is no ability to remove or add games or change “I’m game” status

										
					 					
## 5.2 User Authentication
					
We implemented a client-side authentication using Auth0. The toggle.js files holds the logic for the authentication. First, we instantiate a module gameMon.toggle. We include the dependency ’auth0’ in order to use the Angular wrapper for Auth0. We pass the domain and client id in as an argument to authProvider.
										
authProvider.init({							
domain: <our domain key>, clientID: <our client ID>	
								
After this we create a controller, LoginController, which runs when a user clicks signup and when a user logs out. The important takeaway from this controller is its use of local storage. When the user logs in, their profile information and Auth0 access token is added to the browser's local storage. We set and remove the profile and token by calling localStorage.setItem and localStorage.removeItem. We are able to keep the user logged in or logged out by looking for a profile on their local browser and toggling the signup/sign out buttons accordingly with ng-if.

We implemented Google auth and Facebook SSO as additional social providers for Auth0. For client-side authentication, Auth0 uses client credentials to get an access token and then follows the same procedure of being added to the browser's local storage. 
					
Resources:
					
- Auth0 Authentication Service
- Auth0 with Angular Module
		
## 6. Deployment

Modern Grasshoppers used Heroku to deploy the app. 

We recommend using a JAWSDB addon if deploying to Heroku. App uses a JAWSDB environment variable and didn’t work well when using a different MySQL addon service. 

For advice, we suggest that a single member on your team rebase and push to your Heroku master. 	
					
## 7. Socket.io

Socket.io runs a server on top of a server.  It keeps a live-ear open for activity for socket.io code on the client page in order to facilitate real-time interactions between remote clients.

Socket can be run as a separate server that listens on a different port from the app or it can be implemented to listen to the same port as the app.  We’ve set it up on the same port.

It is important to set up the express server and have it listen to a port first before setting io to pay attention to the server (line 8-12 before line 19 of server.js).

On connection the socket is set to an instance of ‘socket’ which gets pushed to an array of live connections for tracking purposes.  This will let you know that the socket is working and how many connections are being made at any point in time.

Then data is transferred back and forth between the client and the server via event-listeners that catch each other’s data based on an event name (like ‘send message’).  The client then displays the message to the user, while the server would take the data and emit or broadcast it to live sockets.  These can be targeted by name if a name variable is passed from the client, or just broadcast generally to all sockets or namespaces.

In our implementation ‘room’ designates the game that a user has indicated they want to play and a unique chat is created just for the time that people remain in the ‘room’. ‘Send message’ is the event that transfers the text from the input box between the client view of the room and the server and back.
					
