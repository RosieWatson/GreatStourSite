How to Run:
`docker build -t iot-g7 .`
Constructs dependancies, installs everything, prepares the distribustion firendly version of code and exposes ports ready to listen
`docker run -p 3000:3000 iot-g7:latest`
The built image is then used to create a container will executes the code with prebuilt dependancies.
This will run our web app on port 3000.

We have a script called 'backfilled.js' that runs when the docker container is built, this will fill the DB with the latest data for
both MQTT and the EA API meaning that you will be able to get a wide range of values to display and interact with.

About our Submission:
We have used Node.js as our run-time environment as this allowed us to write all of our code in JavaScript. 

We have used Express.js as our web application framework ontop of Node.js as this allowed us to easily created our own API endpoints to
make calls from the client side React app to the server.

Our database is hosted on Dragon and is therefore a MySql database. We have set up our own library for quering it that stops SQL injection
from being possible.

We have webpack to minify our code to help increase performance and reduce bandwidth, along with increasing its compatibility with other
versions of Node.

We have split our code out into well structured folders that split up our own API endpoints, library files, scripts, styles and the web
app itself.

We used React because our team had pre-existing knowledge and experience with using it and it gave us a component-based structure to
build our site with incrementally. It also allowed us to utilise state properties to maintain properties across components and render
specific elements.

We have used the following packages alongside the basic:
- antd: We used Ant Design Components as they're high quality and easily implemented with React and gave us vast functionality
    without the required complexity (e.g. Date Picker and Dialog/Modals)
- chart.js / react-chartjs-2: Gives us a react component for chart.js to provide us with component-based charts for our data, provides
    clean responsive charts for user interaction
- google-map-react: Provided us with a react component over the top of the Google Maps API, allowing us to render other React
    components directly over the map
- react-google-recaptcha: This provides us with a react component of the google recaptcha api
- less / less-loader: We used LESS styling because it's the base language extension system for CSS within Ant Design. It allowed
    us to structure our style sheets more clearly, primarily utilising nested selectors

We have a subscription service for flood warnings, that allows a user to subscribe to flood alerts based on their postcode. The user will
be notified by email for any flood warnings that could affect them.
- The user will only be notified about a flood once, UNLESS that flood has changed or details are updated
- The user will only be notified if a flood is in their area (based on the postcode they subscribed with)
If the user chooses to, they can unsubscribe their email and will no longer receive flood alerts.

We have implemented a test mode that provides the following functionality:
- Flood alert:
    - Triggers a mock flood alert, sending emails to all those subscribed
- Service availability:
    - Displays the service unable alert, showing that the results may not be reliable and links to general advice


Accessibility considerations:
- Responsive design for mobiles/tablets
- All interactive content can be navigated via the keyboard only, with focus outlines visible
- Colour contrast of at least 4.5:1 for normal text and 3:1 for large text (18pt)
- Skip to main content and skip over map content links to aid keyboard/screenreader users navigate
- Content in the interactive map is available in an alternative format (in text via the sidebar)
- Screen reader alternatives to non-text elements, such as map markers which have aria-labels
- Association between buttons and their respective labels
- Content contained in a single dashboard which is easily to way-find
- Inputs have effective instructions and clear error states
- Applying aria-hidden attributes and role='presentation' to elements that are for presentational use only
- We send off both a HTML and plain text version of the email to allow it to be compatiable with different browsers.
- The recaptcha only appears on the form if the person begins to post too many times, meaning it doesn't get in the way for anyone else.

Security Considerations:
- We have built a database library that is safe from SQL injection.
- We have store any private keys as environment variables and not committed them to the repo at any point.
- We have encrypted the emails with AES-256, which is the current TLS/SSL standard.
- All of the modules installed via NPM have no known vulnerabilities. This can be checked by running `npm audit`.
- All links to external sources are opened using 'noopener' and 'noreferrer' to prevent phishing attacks
- We have a recaptcha on the subscribe/unsubscribe forms to reduce the chance of it being polling too many time by a script.
