# Node Sample Connector

A reference project demonstrating the basics of a polling custom connector in [Workgrid](https://www.workgrid.com).

## What is this?

This project demonstrates the basics of creating a custom connector in Workgrid using NodeJS. The project suports sending both information and approval notifications to users within Workgrid as well polling Workgrid for actions taken by users.

## Setting Up

### Requirements

* NodeJS version ^8.10

### Typical Steps

1. Clone this repo
2. Run `npm install`

### Get an Organization

You will need an Organization within Workgrid to do anything.  Please contact us to signup for [Workgrid](https://www.workgrid.com).

### Create a Space

Once you have an organization you will need a space to test with.  It's recommended to create a testing space when playing with notifications and connectors: [Create a Space](https://www.workgrid.com/docs/manage-your-space/).

Be sure you add at least yourself to that space as well.

### Create a Custom Connector
Once you have created a space within your organization, navigate to Connectors, and create a new Custom Connector. Provide a name and logo URL for the connector, while leaving the webhook URL blank as this will be a polling connector. Capture the Client ID and Client Secret from the console.

### Configure this Project

You will notice a `.env.example` file located in this project.  Copy that file to `.env` file and edit it's contents.

The Space ID needs to be the space id you get from the spaces overview page in the admin panel: [View Space ID](https://www.workgrid.com/docs/manage-your-space/#Viewing-the-Space-ID)

The `CLIENT_ID` and `CLIENT_PASSWORD` should be the values you received when creating the Custom Connector.

The `USER_EMAIL` should be the email address you signed up for Workgrid with. All cards sent by this connector will be sent to this user. 

The `BASE_API_URL` and `TOKEN_URL` environment variables can remain untouched, unless you working in a Workgrid installation using a dedicated tenant.

### Run the connector

Once configuration is complete with the `.env` file, the following scripts are available:

Send an FYI card to To Know with a link:
```
npm run sendFyi
```

Send an approval card to To DO:
```
npm run sendApproval
```

Process user events from Workgrid (User must interact with an approval card before events will be available)
```
npm run processEvents
```

Congratulations you now have a simple Custom Connector running.  Also checkout the [NavitOS](https://github.com/Workgrid/NavitOS) project to run a local version of the Workgrid Toolbar so you can interact with your custom connector.
