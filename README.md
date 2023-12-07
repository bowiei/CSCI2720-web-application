# step for start the project

$git clone https://github.com/bowiei/CSCI2720-web-application.git --single-branch --branch dbsetup
$cd CSCI2720-web-application
$npm install 
$npm run init-server
$npm run server
$start a new window , then npm start to open the client
$npm start

port 3000 : client
port 5000 : server

go to http://localhost:5000/user check server is successful started.

send data to backend server
method: post, url:http://localhost:5000/user/register
{username:user, password:password, role:admin} send request by postman
