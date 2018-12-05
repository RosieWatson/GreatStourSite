# GreatStourSite

## To run
`npm start` and `npm run wp:watch`

## Database
- Set up mysql locally.
- Run the `Schema.sql` to create the DB and tables.
- When the server is started the tables will populate.

## Accessibility considerations
- Responsive design for mobiles/tablets
- Ensured focus outlines are present on all interactable elements (for keyboard only users)
- Colour contrast of at least 4.5:1 for normal text and 3:1 for large text (18pt)
- Skip to main content link
- Content in the interactive map is available in an alternative format

## Security Considerations
- We have built a database library that is safe from SQL injection.
- We have store any private keys as environment variables and not commited them to the repo at any point.
- We have encrypted the emails with AES-256, which is the current TLS/SSL standard.
