# RudraAssignment
Assignment 


to run this backend file ---
use git clone https://github.com/Nitesh0210kaushik/RudraAssignment.git  or download zip file

cd backend 

first run ----->>      npm install       --  to install  all its dependencies

to run -->  use command ---->        nodemon
index.js --- is the entry point --->       node index.js   can also be used to run

backend setup -->   i have used 0.0.0.0  instead of localhost , can use in localhost in db/confif.js/line3
 there is process env file , create one env file 
   EMAIL_USER= 
EMAIL_PASS=
PORT=5000
secret_key = 

use all this value of ursin config.env file

run nodemom

--------------------------------------------
to  register  user ----
use POST method  for testing api i.e.  use postman
http://localhost:5000/user/register ----------> to register the user

username , eamil and password to register

api to login -----------  use post 
http://localhost:5000/user/login              -----> to login  api


----------------------------------------
use get api fetch all the user
http://localhost:5000/user/userlist


------------------------------

to edit use put api in post man


http://localhost:5000/edit/{userId}

ex----http://localhost:5000/user/edit/64ff29e799316272d00dbffd
use like this to update


to delete----------

use delete api
http://localhost:5000/delete/{userId}
exapmple -http://localhost:5000/user/delete/64ff29e799316272d00dbffd





now ----------  to forgot password api

use config.env    use gmail and  there should be use app- nodemailer in gmail account, it should be authenticated

use post api -- for forgot password api

http://localhost:5000/pass/forgot-password
