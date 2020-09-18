Every app starts from idea, and from planning what app should do and how it should be used.
We need to white a few diagrams, and pictures what the main flows.

For app that collects feedback for apps - the main flow should be something like this.
User signs up via Google OAuth (sign with 'google' account) -> (Express, MongoDB, PassportJS)
User pays for email credits via stripe -> (Stripe + MongoDB)
User creates a new "campaign" -> (React + Redux)
User enters a list of emails to send question survey to -> (React + Redux + Redux Form)
App sends emails to list -> (Email Provider)
Surveys clicks on links in email to provide feedback -> (Express, MongoDB, Email Provider)
App tabulate feedback -> (MongoDB ?)
User can see report of all survey responses. (React + Redux + MongoDB)

Architecture:
React App <-> Express API Server <-> MongoDB. Client doesn't talk to DB directly.

OAuth login.
We show user - "Login with google". User clicks -> redirecting him to google (with our app ID) where google asks user
"Do you grant permission for this app (ID) to get info about yourself?" -> User clicks yes, Google gives our app "user
code" means User has granted permission, app asks google to exchange "user code" on information about the User, google
returns to the app User profile. App create a User record in DB, and gives User cookies (e.g. JWT). Further User
requests to App User makes with cookies.
All things that related to google auth - is passportJS http://www.passportjs.org/ library responsibilities.
https://console.developers.google.com/ - here we can add a appID.
Your need to setup your application: enable Google+ API to get OAuth2.0. Create a ClientID - which brings you to setup
consent screen - screen that google shows User so he can grant app the permission to get his data.
ClientID - Public token (key) of our app in google developers console. ClientSecret - is a private token (key), don't
share it.
Also to avoid redirect "redirect_uri_mismatch" error - you need to provide a valid links you setup to redirect to.
Those links Google with match with it's "hackers base", if everything is ok - than google will send user access' code
to your app, with this access code you can ask google to get info about the user or some more stuff. So access
code is like a permission to access user info from your app, but it expires with time, that's why google sends you the
Refresh token, with this token you can get new access token.
Google complaining about the redirect mismatch - that's the heroku proxy fault.

In passport JS we can ask for scope of information user should give access to e.g. we can ask for photos from google
drive, contact list, calendar, a lot of stuff.

When you get the User profile, you can generate a token based on this profile and ask passport.js to stick this token
to the user cookie. This can be done with implementation of serialize function in passport.js, which gets a User model
as an argument and serialize it to token.
When User will return to our app with his token - another function that we need to implement is deserialize, that gets
token as an argument and returns the User model.

cookieSession and passport
cookieSession when request comes in, extracts all cookie data from request and adds it to req.session property, so
passport don't have to worry about cookie, it has to grab data from req.session property and deserialize it to req.user.
So req.session - it's a cookieSession's work, req.user - passport's work.
When we send the request cookieSession grabs data from req.session (?) and assign it to response cookie.

Express says that we can also use express-session package instead of cookie-session. Difference is between storing
cookie data inside the app. Cookie-session stores the encrypted user id, and all stuff that we add to cookie, so only
thing we need to do is decrypt it (which) done by cookie-session and cookie data in our needs.
Express-session stores in cookie only session id, it has it's session id storage where it can find a match of session id
and user data that this session id is belong to.
So cookie-session stores add data inside cookie, express-session - stores user data outside cookie. The nice thing in
express-session is that we can store a lot of data for particular session, because we don't need to pass all the stuff
via network to client, but the bad thing is we make our session not stateless on the server side. + we need to setup
external session storage, which makes our server on one dependency more.
===============================================
Some theory about login.
HTTP is stateless, about next request. So to login, server got to give you something (like JWT, cookie), that would give
you ability to say that you've been here lately, and you have rights to get this info you're asking.
If we talking about cookie-based authentication, server should add header "Set-Cookie": "aldskfluh" with some token to
response, browser will see this specific header, and store it in his memory, and automatically will append this header to
each further request (if you writing test with REST lib, you need to add it by yourself of course).

Simple login flow is different from OAuth flow.
Simple login: User sign up with login/pass, server stores them, User login with login/pass - server search the match and
know who's logged in.
OAuth flow - User sign up with Google, server stores his profile data gotten from Google, User login - server once again
goes to google to get profile data and search for match among created Users, then it understands who's logged in.
This a third-party (Google in this case) relation, but we make an assumption that data of the profile (e.g. UserID)
won't change with time, and User can always login to our app and sees his data.

When User logs out - server invalidate, unset, or expire "Set-Cookie" header, which makes user session invalid.

================================================
Mongo & mongoose
Mongo - it's about collections, and rows in these collections. It's pretty basic.
Mongoose - it's a js library above the Mongo, there are schemes, Models.
Model class - works with single collection, with addition features like inserting a record, find records, filter, so on.
Model class also gives us access to instance(s) of rows. It returns record, or records - depends what have you asked.

===============================================
React app
React has his own server, that is responsible for the UI, for JS.
Express server - responsible for the backend and for generating and providing JSON data.
TIP: express by default DOESN"T PARSE POST request body, so use app.use(express.json()) or "body-parser" package.

In dev mode - there will be two separate servers react dev server and express. That's why we need react-proxy set up, to
not hardcoded all the links when we want user to be redirected to express, but keep the relative style. React server
gives us live-reload and linting mostly, so there not much magic in it.
In prod mode, we build react prod build "npm run build", and there will be only one server that will return production
html and bundle from "build" directory, where create-react-app stored it after we ask him to make us a prod build.
So when we keep relative links in our code - we don't need super-prod-checks in our code, everything will work in prod
and in dev.
So there will be only our express server, but what about routes that we've defined in React app like "/surveys""?
express server if gets request to some url it doesn't know about will return index html file to the client, that's the
only thing he can do, in client\build\index.html file there is a link to script that index want to get from express -
client\build\static\js\main.4f595ecb.chunk.js which is going to load the react library, and react library with react
Router inside will se that "/surveys" request and understood that he needs to return the right component.
So we need to explain express server that if he gets something he doesn't know - return the index.html and if he gets
the get main.js script request - return actual script or any other asset (like css file or else).
See schemes for more info.

Thing with proxying request in dev mode from one server to another have a few strengths:
1. Cookies included automatically only to request from client to domain source html comes from, so when we requesting
something from the client side with same domain - cookies will be included, and then on backend we'll redirect req to
another server, if we'll request something directly from API and UI comes from another domain (in dev), cookie will be
lost.
2. CORS, cross origin resource sharing request would be captured, and browser needs you to provide special permission
for that stuff if we'll request different domain or different port from first source, and we don't want thins headache.

React proxy is greedy, it takes all request that starts with '/auth/google', means it will take '/auth/google/whatever'

We'll try to keep all data/redux layer/logic in src/index.js, and all render/react layer/logic in App.js

React-redux provides a layer of connection between redux state and react components.
Note about where we should keep state. If there no affect on application state from component, then keep state on
component level. If you realize that change this component state affects, or needed somewhere else in the app, or some
other component will use it - then create action creator, action, reducer, and add this logic in redux level.

React-router is a basic library with routing, React-router-dom for all apps that somehow working with dom,
React-router-native is for the react-native apps.

```jsx
import {
  BrowserRouter, // tells how to behave, looks for current url - and decide what page it should draw.
  Route, // rule that decide between certain route that user can visit, and components that will be visible on the screen
  Switch, // looks through its children <Route>s and renders the first one that matches the current URL.
} from "react-router-dom";

// exact - means only for this path it will be visible. If not - it will be visible everywhere.
<Route exact path={'/myPath'} render={() => <MyComponent />}/> // one way
<Route exact path={'/myPath'}><MyComponent/></Route> // another way
<Route exact path={'/myPath'} component={MyComponent}/> // one more way
```

https://materializecss.com/ - library to get predefined css styles for elements.
There is one more popular library for React - MaterialUI, but this library is javascript based styles, this means that
css styles is added by javascript, not plain old css, witch is more harder to override and customise, that's why we
picked up "materialize css"
Webpack that comes with create-react-app package, and beside it compiles all js modules and files in one, it cat also
include other extensions like css, called loaders, so when we are adding css import in our js files webpack will add
them also.

a vs Link (from React Router)
We use anchor, when we want User to be redirected to completely different html document, in different domain, like login
via google. \
We use Link (React Router) when we wont to navigate User to some other route hosted by React Router inside our
application. There nice features of [Link](https://reactrouter.com/web/api/Link). 
```jsx
<Link to="/news">News</Link>
<Link to={{pathname: "/news", search: "?sort=name", hash: "#the-hash",}}>News</Link>
```


About payment.
Don't store raw credit card numbers, or store them in your DB, or process payment on your side. Always use outside
payment service (vendor) that will handle all these stuff on it's side. We will use billing system mock, but for prod -
we could use "stripe". Js plugin - "react-stripe-checkout".

Custom env variables in React app - https://create-react-app.dev/docs/adding-custom-environment-variables/
Basically same stuff, but we need to add REACT_APP_ before variables in React app.
we can add one time vars set "REACT_APP_NOT_SECRET_CODE=abcdef" && npm start / REACT_APP_NOT_SECRET_CODE=abcdef npm start
or via .env file

fetch('/api/surveys', {method: "POST", body: JSON.stringify({title: '', subject: ''}),
 headers: { "Content-Type": "application/json" }}).then(console.log, console.log)

Redux Form - helping to add complicated logic form to app, it has it's own reducer, so we don't need to add a lot of
logic in redux store.

Localtunnel - package that gives your local PC to be reachable from outside network. But it doesn't work)
ngrok - nice, but they wanted money for static proxy url + you need to install stuff, so I've picked up ssh.localhost.run

ideas to expand app:
Error handling
Improve the design
Ability to delete survey
Survey sorting
improve the code linter, pre commit hook, readme