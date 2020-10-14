# WEATHER APPLICATION

## Application development with **DOCKER**, **CONTINOUS INTEGRATION**:

To be able to develope the application and visualize the changes in real time (continuous integration) with Docker there have been setup a dockerfile.dev and docker-compose.yml.

To setup the development environment follow these steps:

1. Startup: in the same directory as the docker-compose.yml file type *docker-compose up --build* for the first time. Second time and so on type *docker-compose up*.

Then you are free to develope the app and visualize the changes in real time.

2. Shut down: in the same directory as the docker-compose.yml file type *docker-compose down*

## Application local deployment with **DOCKER**:

In order to test the application with docker, a dockerfile was created to test the application in a node alpine base image. The process to test the application in a local environment using docker is:

1. BUILD the image: docker build -t <dockerID>/<projectName>:latest .

2. RUN the image: docker run -p 8080:3000 <docker Image name>

3. Open browser and type: localhost:8080

## Application deployment to **Heroku**:

1. Having heroku CLI installed, type the command: 

 heroku create <aplication name>

 The output should two URLs, the first is the application endpoint and the second one . This will also create one more remote for the repository in heroku.

 2. Go to package.json and in scripts section add the command to run the application

 "start": "node src/app.js"

 Heroku will run the command npm run start. In the package.json there is specified the first command to run.

 3. Set the port specified by Heroku and also for local deployments in app.js

 const port = process.env.PORT || 3000 // First referred to heroku deployment. Second to local deployment

 app.listen(port...)

4. Push the code into the remote heroku

git push heroku master

