# step for start the project

$git clone https://github.com/bowiei/CSCI2720-web-application.git --single-branch --branch dbsetup </br>
$cd CSCI2720-web-application </br>
$npm install  </br>
$npm install react axios </br>
$npm run init-server </br>
$npm run server </br>
$start a new window , then npm start to open the client </br>
$npm start </br>

port 3000 : client </br>
port 5500 : server </br>

<<<<<<< HEAD
changed to port <bold> 5500 </bold> in pagesetup branch </br>
=======
>>>>>>> b9a2af8ab8c4fe52946a62d0f651ccb4c46983ca

go to http://localhost:5500/user check server is successful started. </br>

send data to backend server </br>
method: post, url:http://localhost:5500/user/register </br>
{username:user, password:password, role:admin} send request by postman </br>

