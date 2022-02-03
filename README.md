**Overview**

This application was built to track habits that I reflect on after each week to track my productivity and how I felt during/about my week. I am teaching myself web development and used this application as a gauge to test some of my current skills. I already do a version of this app in a spreadsheet and decided making a web application would be a good test project.

The production version of the application can be found @ https://danielshabittracker.herokuapp.com. Screenshots of the application can be seen at the bottom of this README .To view a sample account with data, open the application and use username: Daniel & Password: DanielF. Currently new users can only be created by making a post request on the back end. If you wish to have an account please email danielfleace15@gmail.com or message me on discord: DanDan#9622.
**Side note**: I am going to provide the password to the database in this README, therefore any entered data can be seen by anyone. Additionally making a certain get request to the back end will allow a user to view all user data in their web browser.

**The repositories**

The front end of the application is in the repository: https://github.com/DanielFleace1/habitTrackerFrontEnd and the backend of the application is in the repository: https://github.com/DanielFleace1/habitTrackerAppBackEnd. I used a production build of the front end repository and copied it to the back end repository to run the production version of the application. 

**Build dependencies**

The front end of the application is built using React. I started off with npx create-react-app in my directory and went from there. I used [axios](https://axios-http.com/docs/intro) for  making requests to the server, and  [Material UI](https://mui.com) for easy styling of the user interface.

The back end uses node.js and [express](https://expressjs.com/) framework. The habits/data are logged to a [MongoDB](https://www.mongodb.com/) (document database).I used [bcrypt](https://www.npmjs.com/package/bcrypt) for generating password hashes. This way a plaintext password does not have to be stored in the database. I used [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for token authentication forcing users to be logged in to use the application. 

See package.json in each respective repository for the complete list of dependencies.
This app is deployed using [Heroku](https://devcenter.heroku.com/).
 
**To deploy a local copy**

To deploy a local copy, fork or clone the back end repository to your local machine and run npm install to install the dependencies. Either configure a new database or use my Mongo database. To do so, create a process variable for MONGODB_URI witht the password ="mongodb+srv://habitTrackerDb:lRYzytlr5zj8DWeL@cluster0<area>.gjm4o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority". Additionally set a process variable of SECRET set equal to any string for token verification. Finally specify a port and then run npm run dev to spin up a local copy. npm run dev is a script to use nodemon. During development I used the package dotenv for process variables. View the controllers folder to see the current routes I used to make REST requests. As stated earlier this app uses a frontend production copied to the root of the backend to show the frontends main page as its main page.   Comment out ”app.use(express.static('build'))”  in  app.js to  work with just the server. During development I used Postman to test the server. 
 
The front end can be deployed by forking or cloning the front end repository and running npm install and npm start. The URL to make server requests to can be edited or specified in the pathway src/components/srcUtils/serverFunctions.js.

**App functionality**

Once logged in users are presented with a form of questions to submit. Users should select the duration (hours) completed during the day for the prompts “hours of sleep” and “focused work”, choose a value for “did you exercise”, and finally how they felt about their work, health and day overall on a scale of 1-10 for each respective prompt . Users are also provided with a text field to comment about any positive or negative notes about their day. The data for their previous 7 days (including current day) is displayed on the right hand side of the screen. Users should use the calendar picker on the top of the screen to select the day they wish to record data for. If a user misses a day they can come back and enter their data for that day. Users can make edits to a day by re-submitting the data for the selected day. Users will be asked "are you sure?" before the data is overwritten. Users can also delete data for entered days.

**Next features**

From a functionality perspective this app was launched as a MVP (minimum viable product) as a test of my skills. Three main features come to mind that would bring this app to be a more widely usable tool. 
- First for new users to be able to create their own accounts on the front end. 
- Next I would add an interactive data section so that users could select a time frame and habits they wish to view and their data would be returned in tabular or graphical format for visualization. 
- Third I would give the users the functionality to customize the preset habit prompts.  For example, users could add "time spent reading" or delete any habits they don't want to track. The habits I initially selected were based on what I most frequently think about. 
- Additionally I would like/need to spend more time on error handling and middleware on the backend, writing tests for the front end and the back end, applying scaling and security concerns and the improvement of the user interface. This app needs work to be responsive to smaller screen sizes. 

Thank you for taking the time to read my ReadMe. Feel free to email danielfleace15@gmail.com with any comments, feedback or concerns!

![Login Screen](LoginScreen.png)

![User Screen](habitsUserScreen.png)