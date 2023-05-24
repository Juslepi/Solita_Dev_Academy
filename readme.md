## Getting started

Instructions to get the project running locally

## Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

## Client

Create ./client/.env.local file with following contents

```
NEXT_PUBLIC_GOOGLE_KEY=<YOUR_API_KEY>
```

```
cd ./client
npm install
npm run dev
```

Get free api key <a href="https://developers.google.com/maps/documentation/embed/get-api-key">here</a>

## Server

Create ./server/.env file with following contents

```
MONGODB_URI=<MONGO_URI>
```

```
cd ./server
npm install
npm run dev
```

## Roadmap

#### Data import

- [x] Import data from the CSV files to a database or in-memory storage
- [x] Validate data before importing
- [x] Don't import journeys that lasted for less than ten seconds
- [x] Don't import journeys that covered distances shorter than 10 meters

#### Journey list view

- [x] List journeys
- [x] Pagination
- [x] Ordering
- [ ] Searching
- [ ] Filtering
- [x] For each journey show departure and return stations, covered distance in kilometers and duration in minutes

#### Station List

- [x] Station name
- [x] Station address
- [x] Total number of journeys starting from the station
- [x] Total number of journeys ending at the station
- [x] Station location on the map
- [ ] The average distance of a journey starting from the station
- [ ] The average distance of a journey ending at the station
- [ ] Top 5 most popular return stations for journeys starting from the station
- [ ] Top 5 most popular departure stations for journeys ending at the station
- [ ] Ability to filter all the calculations per month

## Built With

- TypeScript
- NextJS
- React
- NodeJS
- Mongoose
