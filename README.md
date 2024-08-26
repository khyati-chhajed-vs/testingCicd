# Vianaar

## Overview

An App for Vianaar Home owners to manage bookings and requests.

## Requirements

For development, you will only need Node.js installed.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v18.18.x

    $ npm --version
    v10.x.x

## Install

    $ git clone {clone repository url}
    $ cd vianaar-backend
    $ npm install

## Set Up Environment Variables

Create .env file at the root of the project and add the following environment variables:

```
SERVER_RDS_HOST=<put value here>
SERVER_RDS_USERNAME=<put value here>
SERVER_RDS_PASSWORD=<put value here>
SERVER_RDS_DB=<put value here>
EMAIL_SENDER=""
REGION=<put value here>
RDS_SCHEMA="public"
```

## Run

    $ npm run start-dev

## Access Admin Panel

You can explore the admin panel at <your-server-url>/admin
