# CSCI2720-web-application

npm install @googlemaps/react-wrapper

# step for start the project

git clone url
git checkout branchName
npm install #to install the package.json
npm start

commit branch database and server-side route:

cd CSCI2720-web-application

to setup database connection  
don't run npm start, otherwise port 3000 cannot use.

run $ node .\src\router.js  
e.g. to add user
method: post, url:http://localhost:3000/user/register
{username:user, password:password, role:admin} send request by postman
