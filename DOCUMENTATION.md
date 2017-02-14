## I’m Game Documentation
					
Brian Hassett, Michael Chiang, Daniel Ritchie, Gwynn Dandridge-Perry
			
Hack Reactor Legacy Project - Modern Grasshoppers
					
				
					
## Contents			
						 							
1  Introduction
						 							
2  File Structure
						 							
3  Database Schema					
						 							
4  Server-Side
							
4.1 Routes 
4 4.2 DatabaseHelperFunctions
4 4.3 GiantBombAPIHelperFunctions
						 							
5  Client-Side
							
5.1 Files
5 5.2 UserAuthentication
						 							
6  Deployment
						 							
7  Socket.io


			
				
					
1 Introduction
					
Welcome to “I’m Game!” 

“I’m Game” is based on GameMon, an app for tracking what video games you have in your collection.  For us the next step was to make it interactive among users, so we turned the app into a social hub where users can connect and chat to coordinate their gaming sessions.

To do that, we added a way to view other user collections, and also a way for the user to find others to play a game with in real time:

With thousands of games available through the GiantBomb API, you can keep track of your collection, add and remove games, and keep track of details and information about your favorite games. When you’re ready for a gaming session, click the I’m Game button on a particular game you want to play and immediately connect with other gamers that are just as excited as you are.  Live chat helps you meet new friends and make plans for future party gaming sessions. 
								
					
2 File Structure
					
towering-cranes
   client					
     assets					
        favicon.ico
        imgame-collection.png
        imgame-details.png
        imgame-search.png
        social-hub-view.jpg
        Social-view.jpg
        user-card.jpg
        Octocat.png					
     home
        home.html	
    imgame
       imgame.html
       imgame.js				
     main
        gameCollection.js
        main.html
        modal.js
        search.js
        selectedGame.js
       toggle.js
    profile
       profileview.html
       profile.js					
     styles
        styles.css					
     app.js					
     index.html
   documentation				
     documentation.pdf
      documentation.tex
      documentation.toc				
   server							
     database
        databaseHelpers.js			 				
        db.js
     giantBomb					
        giantBombHelpers.js
     server.js
					
    .gitignore
    .editorconfig
    .gitattributes
    .gitignore
    .jshintrc
    .travis.yml
    CONTRIBUTING.md
    PRESS-RELEASE.md
    STYLE-GUIDE.md					
    package.json
    README.md


					
3 Database Schema
				
	 			
				
					
4 Server-Side
					
Server-side files hold the routes and the helper functions needed for the routing.			
					
4.1 Routes
					
Database Routes
					
• ’/users’
– POST - receives a username and password from the client and adds each to the database for a specific user • ’/games’	–  POST - receives a user and a game from the client and adds the game to that user’s collection in the database
–  DELETE - receives a game title and a user from the request body and removes the game from the users collection
–  GET - receives a username from the client as a parameter in the url and sends all of that users games back to the client
							
Giant Bomb API Routes				 											 							
’/games/search/keyword/:keyword’
– GET - receives a keyword from the client as a parameter and returns up to 10 games that match the keyword
						 							
’/games/search/id/:id’
– GET - receives a game id from the client as a parameter and returns up to 10 games that match the id					
					 					
4.2 Database Helper Functions
						 							
createUser - receives a user object from the server and either finds a user with that existing name or creates a new user
						 							
addGameToCollection - receives a username and a game object and adds the game to the specified users collection.
						 							
getGamesFromCollection - receives a username from the server and finds/returns all of that users games.
						 							
removeGameFromCollection - receives a username and a game from the server and deletes that game from the specified users collection
						
					 					
4.3 Giant Bomb API Helper Functions
					
Note: ES6 syntax used here in the request calls
					
• searchForGames - receives a search term and uses expresss request module to send that request to the Giant Bomb api.
									
– Example: To search for all Pokemon games our url in the options object would be the following: ‘http://www.giantbomb.com/api/search/?api key=$YOUR- API-KEY&format=json&query=”$pokemon”&resources=game‘
					
• getGameById - receives an id from and uses that id to get the game with the corresponding id form Giant Bomb.
					
– Example: To search for metroid prime and list its genres and name based on id do the following: ‘http://www.giantbomb.com/api/game/3030-4725/?api key=$YOUR- API-KEY&format=json&field list=genres,name‘
			
		
5 Client-Side
					
Front-end uses AngularJS with Materialize/Angular-materialize. Materialize/Angular-materialize can be substituted with Bootstrap or any other front-end framework. Angular-materialize is a set of AngularJS directives to use features in Materialize that requires jQuery. It is NOT the same as Angular Material.
					
Resources:
					
• AngularJS
• Angular-materialize • Material Icons
• Materialize CSS

					
5.1 Files
					
The roles of the different files are as follows: • /client/styles/styles.css
					
– Custom stylesheet for overrides and other styles not included in Materialize • /client/assets
					
– Images and other files to be used across client pages • /client/index.html
					
– Loads JS libraries
– Sets up header, navigation, and footer
					
• /client/app.js
– Handles client side routing to load templates in /client/main or /client/home
					
• /client/home/home.html
– Template for product landing page
												
– Default page if root directory is loaded or if an invalid url is provided • /client/main/main.html
					 							
–  Uses ternary operator on gameCollection to see if search sidebar should be displayed. If it should be displayed, the column width is set to 8, if not, it is set to 11.
					 							
–  Uses custom filter in gameCollection.js to allow filtering by title, franchise, platform, and genre
					 							
–  Allows collection view to change between list and grid and sort by title or release date
					 							
–  Holds modal markup that appears when a game is clicked on
							
• /client/main/modal.js
– Controller to load data into the scope for modal information
							
∗ similar games
• /client/main/gameCollection.js
					 							
–  Holds a factory that allows
			
∗  getUserCollection that loads a game collection for the signed-in user
			
∗  addGameToCollection adds a selected game to the current users collection
			
∗  removeGameFromCollection removes the selected game from the current users col-
									
lection
				 							
–  Holds a custom filter that takes in setFilter(filterOpt) as an input where filterOpt is an array
			
∗  custom filter checks for a match in the respective locations of all the objects and returns all matches
				
∗  first element of filterOpt is the search term to find
			
∗  second element is what type of filter term it is: text, platform, or genre
			
∗  returns all objects that will be displayed after filtering
				
∗  items holds all possible objects
									
• /client/main/search.js
									
– Holds a factory that allows ∗ searchByTerm
									
∗ searchById
								
							 						
					 					
5.2 User Authentication
					
We implemented a client-side authentication using Auth0. The toggle.js files holds the logic for the authentication. First, we instantiate a module gameMon.toggle. We include the dependency ’auth0’ in order to use the Angular wrapper for Auth0. We pass the domain and client id in as an argument to authProvider.
					
6
					
authProvider.init({			
								
domain: <our domain key>, clientID: <our client ID>	
								
});		
1 2 3 4
					
After this we create a controller, LoginController, which runs when a user clicks signup and when a user logs out. The important takeaway from this controller is its use of local storage. When the user logs in, their profile information and Auth0 access token is added to the browsers local storage. We set and remove the profile and token by calling localStorage.setItem and localStorage.removeItem. We are able to keep the user logged in or logged out by looking for a profile on their local browser and toggling the signup/sign out buttons accordingly with ng-if.
					
Resources:
					
• Auth0 Authentication Service • Auth0 with Angular Module
		
6 Deployment

					
7  Socket.io

Socket.io runs a server on top of a server.  It keeps a live-ear open for activity for socket.io code on the client page in order to facilitate real-time interactions between remote clients.

Socket can be run as a separate server that listens on a different port from the app or it can be implemented to listen to the same port as the app.  We’ve 
					
