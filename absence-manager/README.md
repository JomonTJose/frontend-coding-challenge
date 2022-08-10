## Instructions

-- Navigate to Server and Client folders
-- Open terminal in Server folder
    -- Run `npm i`
-- Open terminal in Client folder
    -- Run `npm i`
-- Run `npm start` in both Server and Client terminals
-- Server runs at http://localhost:3001
-- Client runs at http://localhost:3000
-- NodeJs API Connects to Personal MongoDb Cluster in Cloud (MongoDB) for retrieving data
-- In Client terminal, 
    -- Run `npm test` to run UI Unit tests

<p align="center">
  <img src="https://crewmeister.com/images/logo_crewmeister_without_text.svg" />
</p>

# 🚀 Crewmeister coding challenge - Frontend (React)

Hello and thanks in participating in the crewmeister coding challenge. This coding exercise will help us get a better feeling about your coding process.

If you have any questions, we're happy to help you. Reach the devs at challenge@crewmeister.com.

## Context

At Crewmeister we like to work closely with our clients, listening to their demands and developing solutions for their problems. One of the most requested features is a way for company owners to manage sickness and vacations of employees.

We decided to implement this feature for our clients and we are calling it the Absence Manager.

## Product Requirements

- [X] I want to see a list of absences including the names of the employees.
- [X] I want to see the first 10 absences, with the ability to paginate.
- [X] I want to see a total number of absences.
- [X] For each absence I want to see:
  - [X] Member name
  - [X] Type of absence
  - [X] Period
  - [X] Member note (when available)
  - [X] Status (can be 'Requested', 'Confirmed' or 'Rejected')
  - [X] Admitter note (when available)
- [X] I want to filter absences by type.
- [X] I want to filter absences by date.
- [X] I want to see a loading state until the list is available.
- [X] I want to see an error state if the list is unavailable.
- [X] I want to see an empty state if there are no results.
- [ ] (Bonus) I can generate an iCal file and import it into outlook.

## Your Mission

Create the React application that satisfies all must-have requirements above, plus any nice-to-have requirements you wish to include.

We provided a couple of JSON files with the mock data necessary to implement the screens, you can use the files straight into the frontend or create a small API (bonus), it's your choice.

You can use any boilerplate/approach you prefer (nextjs, create react app, ...), but try to keep it simple. We encourage you to use your favorite tools and packages to build a solid React application.

You can assume that you do not have to support legacy browsers. Feel free to use modern features such as **fetch** or **flexbox**.

(bonus) Host the website on the service of your choice (Heroku, AWS, GCloud, ...).

Optional: build the project and deploy (ie make it available as a static project) on Github Pages, otherwise please provide detailed instructions on how to start the project locally.

## Tech Requirements

-[X] React
-[X] Tests: Jest + react-testing-library / enzyme
-[X] Code Linter
- Redux is a plus.
-[X] Typescript is a plus.
-[X] CSSinJS is a plus: styled-components, styled-system, ...

