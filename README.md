# step for start the project

#### Clone Project

` $git clone https://github.com/bowiei/CSCI2720-web-application.git --single-branch --branch dbsetup `

` $cd CSCI2720-web-application `

#### Install Project Dependency

` $npm install `

#### Server setup

` $npm run server `

As the first run may only construct the collections for database, you may need to run server twice for full initization of database.

##### Port checking
` sudo lsof -i :5500 `
##### Port killing
` sudo kill -9 {PID} `

These port cmd may help.

#### Client setup 

Start a new terminal, run 
` $npm start `

Now you can visit http://localhost:3000 for client and http://localhost:5500/user to check server is successful started or not.

port 3000 : client </br>
port 5500 : server </br>

send data to backend server </br>
method: post, url:http://localhost:5500/user/register </br>
{username:user, password:password, role:admin} send request by postman </br>
