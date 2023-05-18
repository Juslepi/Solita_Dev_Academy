## Roadmap

#### Data import

[ ] - Import data from the CSV files to a database or in-memory storage
[ ] - Validate data before importing
[x] - Don't import journeys that lasted for less than ten seconds
[x] - Don't import journeys that covered distances shorter than 10 meters

#### Journey list view

[x] - List journeys
[x] - Pagination
[x] - Ordering
[] - Searching
[] - Filtering
[x] - For each journey show departure and return stations, covered distance in kilometers and duration in minutes

#### Station List

[x] - Station name
[x] - Station address
[x] - Total number of journeys starting from the station
[x] - Total number of journeys ending at the station
[x] - Station location on the map
[] - The average distance of a journey starting from the station
[] - The average distance of a journey ending at the station
[] - Top 5 most popular return stations for journeys starting from the station
[] - Top 5 most popular departure stations for journeys ending at the station
[] - Ability to filter all the calculations per month

## Built With

- TypeScript
- NextJS
- React
- NodeJS
- Mongoose
