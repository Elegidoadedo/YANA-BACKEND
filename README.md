CHECK `.env` variables and rename `.env.sample` to `.env`

#  You Are Not Alone (YANA)

An app to help users in dangerous moments. Sending the location to all his/her contacts.

## User Stories
`404`: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

 `/` : As an anon I can see the Home page, with a Login button so that I can start using the app and a link to Signup page 


`Signup`: As an anon I can sign up in the platform so that I can start usinge app

`Logout`: As a user I can logout from the platform so no one else can use it.

`Dashboard`: As a user I can send SOS Alert and stop it, call 112 emergencies and navigate to the diferent sections of navbar.

`Profile`: as a user I can verify my user info, and check all my contacts

`profile-edit`: As a user I can update my user info, and add more contacts.

`sos`: As a User I can see alerts other uses sends. I can see their username, their avatar, and their actual geolocation. And I can click "I'm Going" button to notificate that i'm going there.

`messages`: As a user I can read all "I'm going" messages. And I can clean all messages.



## Backlog
------------------------------------------------------
- Use Live geolocation

- Upload image to Avatar

- Google Singup and login

- Send alerts to all users in a 1 km arround the geolocation.

- Hide url

- Make an API with the locations of ploice stations in Barcelona

- Generate a crime map based in the alerts sended

- Go Back button



## Routes

`/` - Homepage and login form

`/auth/signup` - Signup form

`/dashboard` - the main page, sos button an 112 call

`/profile` - show info about user

`/profile/edit` - Edit info form

`/profile/:id/messages` - Show messages

`/profile/:id/sos` - show sos alerts

`Signup Page`

`404 Page`

## Components (WIP)

form component
Props:
State:
Search component
Props:
State:
IO
Services
Auth Service
auth.login(user)
auth.signup(user)
auth.logout()
auth.me()
auth.getUser() // synchronous

# Server

## Models

### ** User model **

username - String // required

email - String // required & unique

password - String // required

Contacts - [ObjectID<User>]

SOS - [ObjectID<Alerts>]

message - [String]

 ### ** Alert model **

creator - [ObjectID<User>]
heroes - [ObjectID<User>]
Location -  Lat / Long
time - Date




## API Endpoints/Backend Routes

GET `/user`

POST `/user/`

PUT `/user`

DELETE `/user`

GET `/user/messages`

POST `/user/messages`

DELETE `/user/id/message`

GET `/alerts/`

POST `/alerts/id`

DELETE `/alert/id`



<!-- 

GET `/profile/:id`

GET `/profile/:id/messages`

GET `/profile/:id/sos`

POST `/profile/:id/sos`
body: username, alert id

GET `/dashboard`

POST `/dashboard`
body : user._id, date, location

POST `/auth/signup`put /alerts/id
delete /alerts
body:
username
email
password
avatar

POST `/`
body:
username
password

POST `/auth/logout`
body: (empty)

PATCH `/profile/:id/edit`
body:
username
password
avatar
Contacts

get /alerts
post /alerts
get /alerts/id
put /alerts/id
delete /alerts/id -->



## Git
### Front End:

https://github.com/Elegidoadedo/YANA---Front-End

### Back End:

https://github.com/Elegidoadedo/YANA-Back-end


## Deploy Link

## Slides

https://slides.com/josemorales-2/you-are-not-alone#/


