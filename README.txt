How to Run:
- Something something docker

About our Submission:
We have used Node.js as our run-time environment as this allowed us to write all of our code in JavaScript. 

[Bit about front end]

We have used Express.js as our web application framework ontop of Node.js as this allowed us to easily created our own API endpoints to
make calls from the client side React app to the server.

Our database is hosted on Dragon and is therefore a MySql database. We have set up our own library for quering it that stops SQL injection
from being possible.

We have webpack to minify our code to help increase performance and reduce bandwidth, along with increasing its compatibility with other
versions of Node.

We have split our code out into well structured folders that split up our own API endpoints, library files, scripts, styles and the web
app itself. 

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
- We have store any private keys as environment variables and not commited them to the repo at any point.
- We have encrypted the emails with AES-256, which is the current TLS/SSL standard.
- All of the modules installed via NPM have no known vunerlabilities. This can be checked by running `npm audit`.
- All links to external sources are opened using 'noopener' and 'noreferrer' to prevent phishing attacks
- We have a recaptcha on the subscribe/unsubsribe forms to reduce the chance of it being polling too many time by a script.
