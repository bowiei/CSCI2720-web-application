# step for start the project


> $git clone https://github.com/bowiei/CSCI2720-web-application.git --single-branch --branch dbsetup </br>
> $cd CSCI2720-web-application </br>

> $npm install  </br>

> $npm run server </br>
First run for collection 
Second run for inserting DB
You need to kill the port for second $npm run server

start a new window , then npm start to open the client </br>
> $npm start </br>

port 3000 : client </br>
port 5500 : server </br>

go to http://localhost:5500/user check server is successful started. </br>

send data to backend server </br>
method: post, url:http://localhost:5500/user/register </br>
{username:user, password:password, role:admin} send request by postman </br>
