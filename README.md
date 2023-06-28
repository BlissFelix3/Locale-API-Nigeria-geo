# Locale API

This is an Locale Application built using Node.js Nest framework, which provides geographical, specifically for regions, states and local governments but includes several other metadatas.

This API uses a database of location data and a caching mechanism for better performance. You will need an API key for authorization. The API endpoints and functionality can be found below.

---

## Stack

<div align="center">

<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="">![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)</a>
<a href="">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
<a href="">![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)</a>
<a href="">![Swagger UI](https://img.shields.io/badge/Swagger-UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)</a>
<a href="">![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)</a>

</div>

## Useful Links

- [Swagger API Docs](https://locale-api.onrender.com/api)
- [Hosted Link](https://locale-api.onrender.com/)

## Installation

```bash
$ npm install
```

## Running the app

```bash

$ npm run start:dev

```

## Test

```bash

$ npm run test

```

### Prerequisites

- Node.js: Follow this guide to install Node.js: [Node.js Installation Guide](https://nodejs.org/en/download)
- Nest CLI: Install it by running `npm install -g @nestjs/cli`.
- MongoDB: Follow this guide to install and setup MongoDB: [MongoDB Tutorial](https://docs.mongodb.com/manual/installation)
- Redis: Follow this guide to install Redis: [Redis Installation Guide](https://redis.io/download)

## Endpoints
The API will be accessible at `http://localhost:3000/` or `https://locale-api.onrender.com/api`.

### Signup User

- Route: auth/signup
- Method: POST
- Body:

```
{
    "username": "John Does",
    "email": "john@gmail.com",
    "password": "password23",

}

```

- Responses

Success

```javascript
{
    "api_key" : " generated key"
    "message": "Key can only be generated once and refreshes after an hour: save key"
}
```

- Response statusCodes

```javascript
  - 201: success || Created
  - 409: error || Conflict Error
  - 400: error || Bad Request
  - 500: error || Internal Server Error
```

---

### GET /search/all

Retrieve all state information.

**Parameters:**

- `page` (optional): Page number for pagination (default: 1).
- `limit` (optional): Number of results per page (default: 10).
- `sortField` (optional): Field to sort the results by.
- `sortOrder` (optional): Sort order (`asc` or `desc`).
- `filter` (optional): Filter the results by state, region, or LGAs.
- `populationGt` (optional): Filter the results by population greater than a value.
- `populationLt` (optional): Filter the results by population less than a value.
- `capital` (optional): Filter the results by exact match on the capital field.
- `slogan` (optional): Filter the results by exact match on the slogan field.
- `landmass` (optional): Filter the results by exact match on the landmass field.
- `dialect` (optional): Filter the results by exact match on the dialect field.
- `map` (optional): Filter the results by exact match on the map field.
- `latitude` (optional): Filter the results by exact match on the latitude field.
- `longitude` (optional): Filter the results by exact match on the longitude field.
- `website` (optional): Filter the results by exact match on the website field.
- `created_date` (optional): Filter the results by exact match on the created_date field.
- `created_by` (optional): Filter the results by exact match on the created_by field.
- `senatorial_districts` (optional): Filter the results by exact match on the senatorial_districts field (supports multiple values).
- `past_governors` (optional): Filter the results by exact match on the past_governors field (supports multiple values).
- `borders` (optional): Filter the results by exact match on the borders field (supports multiple values).
- `known_for` (optional): Filter the results by exact match on the known_for field (supports multiple values).

**Filter Samples For Postman:**

1. ##### No parameters: Get All Information
###### Request Type: GET
- URL: http://base_url/search/all

2. ##### Filtering with filter parameter: This filter only applies to state, region and lgas names.
###### Request Type: GET
URL: http://base_url/search/all?filter=states/regions/lgas

3. ##### Filtering with populationGt and populationLt parameters: These filters apply to the population field.
###### Request Type: GET
- URL: http://base_url/search/all?populationGt=1000000&populationLt=5000000(Don't go below the overall population minium no. 1,704,515)

4. ##### Exact match on a single field: This tests exact match filtering on one field, such as capital.
###### Request Type: GET
- URL: http://base_url/search/all?capital=Ikeja

5. ##### Exact match on multiple fields: This tests exact match filtering on multiple fields.
###### Request Type: GET
- URL: http://your_base_url/search/all?capital=Abuja&slogan=Unity%20and%20Faith

6. ##### Exact match on an array field: This tests exact match filtering on an array field, such as senatorial_districts.
###### Request Type: GET
URL: http://base_url/search/all?past_governors=Babatunde%20Fashola&past_governors=Bola%20Tinubu(On swagger add two string items)
`Or`
###### Request Type: GET
URL: http://base_url/search/all?past_governors[]=Babatunde%20Fashola(If you want to search for just one info in the array/. Works for Postman only)

- `Do for other array fields e.g borders, knownfor etc`

7. ##### Sorting with sortField and sortOrder: These control the order of the results.
###### Request Type: GET
URL: http://base_url/search/all?sortField=state&sortOrder=asc

8. ##### Using page and limit parameters: These control pagination and the number of results per page.
###### Request Type: GET
URL: http://base_url/search/all?page=1&limit=10

**Response:**

- Status: 200 OK
- Body: Array of state information objects.

### GET /search/state/:query

Search for states by state name.

**Parameters:**

- `query`: The query string to search for.

**Response:**

- Status: 200 OK
- Body: Array of state information objects matching the search query.

### GET /search/lga/:query

Search for LGAs (Local Government Areas) by LGA name.

**Parameters:**

- `query`: The query string to search for.

**Response:**

- Status: 200 OK
- Body: Array of state information objects containing LGAs matching the search query.

### GET /search/region/:query

Search for regions by region name.

**Parameters:**

- `query`: The query string to search for.

**Response:**

- Status: 200 OK
- Body: Array of state information objects matching the search query.

### GET /search/state/lgas

Retrieve LGAs (Local Government Areas) for a specific state.

**Parameters:**

- `state`: The state name.

**Response:**

- Status: 200 OK
- Body: JSON of LGAs for the specified state.

### GET /search/region/states

Retrieve States for a specific region.

**Parameters:**

- `region`: The region name.

**Response:**

- Status: 200 OK
- Body: JSON of states for the specified region.

## License

Nest is [MIT licensed](LICENSE).
