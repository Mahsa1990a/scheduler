# Interview Scheduler
Scheduler is a SPA built with modern React, helps you stay on top of all the appointments.

The app allows users to either view, edit or delete already scheduled interviews as well as add new ones in available time slots throughout the week.

The data is obtained from an API server using PSQL database.

## Final Product :

### Homepage
Monday selected, notice the edit and delete buttons in the appointment block appear only when hovered.

!["Home page"](https://github.com/Mahsa1990a/scheduler/blob/master/docs/Home%20page.png?raw=true)

### Adding appointment
Add/Edit an appointment.

!["Adding appointment page"](https://github.com/Mahsa1990a/scheduler/blob/master/docs/Adding-appointment-page.png?raw=true)

### Deleting appointment
Confirmation message when trying to delete an appointment.

!["Deleting appointment page"](https://github.com/Mahsa1990a/scheduler/blob/master/docs/Deleting-appointment-page.png?raw=true)

### Updated spots
Updated page, notice the spots remaining changed.

!["Updated spots page"](https://github.com/Mahsa1990a/scheduler/blob/master/docs/Updated-spots-page.png?raw=true)


## Technology

Single-page application built with modern React practices such as hooks and functional components.

Front-End: HTML, SCSS, React

Back-End: Node, Express, PostgreSQL

## Dependencies

- React 16.9.0 or above
- Axios
- Classnames
- Node.js
- Express
- Node-postgres

## Testing

This app was extensively tested using the following technologies:

- Storybook for unit testing
- Jest for unit and integration testing
- Cypress for end to end testing

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
