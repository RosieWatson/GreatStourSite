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
- Screen reader alternatives to non-text elements, such as map markers which have aria-labels
- Association between buttons and their respective labels
- Content contained in a single dashboard which is easily to way-find
- Inputs have effective instructions and clear error states
