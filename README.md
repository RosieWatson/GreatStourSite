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


## Frontend TODO
- [] Visualise historic sensor levels
  - [] On the map by using the date DatePicker
  - [] In the Sidebar: showing the past 30 days on a chart
- []Consume flood warning endpoint and add visulisation for this
- [] Handle the 'Flood alert' test mode (need to sort the flood alerting first)
- [] Create a modal containing enviornmental agency flood advice (we can link to this from our stystem availability message and flood banner)
- [] Make the sidebar list items 'tab-able'
- [] Add any Accessibility/Security considerations to the relevent lists above
