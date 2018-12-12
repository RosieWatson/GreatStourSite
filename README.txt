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
- antd: This is a front-end component library. We used chose to use this as it provided us with a large choice of ready built, tried and tested
    components which could helps us create an attractive and accessible UI easily. It is designed to be used with React and gave us a vast functionality
    without the extra complexity (e.g. Date Picker and Dialog/Modals)
- chart.js / react-chartjs-2: Gives us a react component for chart.js to provide us with component-based charts for our data, provides
    clean responsive charts for user interaction
- google-map-react: Is a react-wrapper for the Google Maps API, allowing us to render other React
    components directly over the map, such as markers.
- react-google-recaptcha: A react-wrapper for the google recaptcha api.
- less / less-loader: We used LESS styling because it's the base language extension system for CSS within Ant Design. It allowed
    us to structure our stylesheets more clearly, primarily utilising nested selectors

Our map, using google-map-react, shows markers for each sensor along the river, along with their most recent level reading. Using the
postcode search, a user can move the map to their exact location to understand how the sensors are positioned relative to their location.
The user can also view specific history for a day on the map, by using the provided Date Picker. This will update the markers on the map
with the average values for the day chosen.

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
All other functionality can be tested by simply interacting with the site, such as viewing historical data by using adjusting the date picker,
or viewing the last 30 days of data for a sensor in the sidebar. 


We present the user with the most recent flood warnings for the area, showing details within the flood warning and a modal containing flood
advice and a link to the government flood advice website


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
- We send off both a HTML and plain text version of the email to allow it to be compatible with different browsers.
- We use Google's Invisible ReCaptcha to prevent spam or bot attacks for subscribe and unsubscribe points. This ReCaptcha will only display an input recaptcha (requiring user action), if it cannot determine that the user is human.

Security Considerations:
- We have built a database library that is safe from SQL injection.
- We have store any private keys as environment variables and not committed them to the repo at any point.
- We have encrypted the emails with AES-256, which is the current TLS/SSL standard.
- All of the modules installed via NPM have no known vulnerabilities. This can be checked by running `npm audit`.
- All links to external sources are opened using 'noopener' and 'noreferrer' to prevent phishing attacks
- We have a recaptcha on the subscribe/unsubscribe forms to reduce the chance of it being polling too many time by a script.
- The container starts off as a root user but finishes as a noboy user so there are no permissions left in the container, in case someone is able to get in.
