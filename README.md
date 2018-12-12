# GreatStourSite

## To run
`npm start` and `npm run wp:watch`

## Database
- Set up mysql locally.
- Run the `Schema.sql` to create the DB and tables.
- When the server is started the tables will populate.

## Accessibility considerations
- Responsive design for mobiles/tablets
- All interactive content can be navigated via the keyboard only, with focus outlines visible
- Colour contrast of at least 4.5:1 for normal text and 3:1 for large text (18pt)
- Skip to main content and skip over map content links to aid keyboard/screenreader users navigate
- Content in the interactive map is available in an alternative format (in text via the sidebar)
- The content displayed in a chart is also available in text format 
- Screen reader alternatives to non-text elements, such as map markers which have aria-labels
- Association between buttons and their respective labels
- Content contained in a single dashboard which is easy to way-find
- Inputs have effective instructions and clear error states
- Applying aria-hidden attributes and role='presentation' to elements that are for presentational use only

## Security Considerations
- We have built a database library that is safe from SQL injection.
- We have store any private keys as environment variables and not commited them to the repo at any point.
- We have encrypted the emails with AES-256, which is the current TLS/SSL standard.
- All of the modules installed via NPM have no known vunerlabilities. This can be checked by running `npm audit`.
- All links to external sources are opened using 'noopener' and 'noreferrer' to prevent phishing attacks
