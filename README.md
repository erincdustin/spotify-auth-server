# Wind Chime Spotify Auth Server

This is the backend authentication server used to sign users in and give the WindChime app playlist editing scope.

Wind Chime combines your current weather conditions with a selected genre (or your top artists) to make a custom Spotify playlist that fits the mood of the weather.

[Link to live app](https://erins-windchime-app.erincdustin.now.sh)


Third party APIs used:

[Spotify](https://developer.spotify.com/documentation/web-api/reference/)

[OpenWeatherMap](https://openweathermap.org/current)

## Set up

Complete the following steps to set up the server:

1. Clone this repository to your local machine `git clone https://github.com/erincdustin/spotify-auth-server.git`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
7. From your Spotify developer account, create a new app to obtain credentials.  In the callback section of the app details, add `http://localhost:8888/callback`
6. Input your environmental variables for your Spotify Client ID and Secret.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`


## Deploying

1. When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" 
2. In your Spotify developer account, navigate to your app details and add a new callback address at <YOUR HEROKU URI>/callback
3. `npm run deploy` will push to this remote's master branch

## Technology Used

Node and Express