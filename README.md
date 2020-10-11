Application deployment:

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

