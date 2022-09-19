# content-service

## Sender API

Endpoints:
* POST `/api/sender/files` 
  Creates a new file
  Accepts a form-encoded body
  Required fields: "file" (file), "senderId" (string), "receiverId" (string), "fileType" (string), "isPayable" ("true" / anything else interpreted as false)

## Consumer API

Endpoints
* GET `api/consumer/files`
  Get a list of all files (does not include content)
  Accepts query parameters used to filter files
  (TODO: Paginate result)
* GET `api/consumer/files/:id/content`
  Get file content
  Returns 403 if content is not paid
* POST `api/consumer/files/:id/payment`
  Initiate payment for file


## Run locally
Prerequisities: [Docker](https://docs.docker.com/get-started/#download-and-install-docker) & (Docker Compose)[https://docs.docker.com/compose/install/]. 

`docker-compose -f docker-compose-local.yml build`

`docker-compose -f docker-compose-local.yml up`

Docker compose will start:
* MySQL Database available at 127.0.0.1:33062
* Sender API available at 127.0.0.1:8000
* Consumer API available at 127.0.0.1:8002

## Authentication & Authorization proposal (not implemented)
* JWT-based authentication
  * Sender uses client credentials grant
  * Consumer authenticates user using authorization code grant or PKCE
  * JWT is included in request to Sender API/Consumer API
  * Sender API/Consumer API verfies token
* Authorization using OAuth scopes & subject
  * Sender API -> subject is used as senderId, not provided in form
  * Consumer API -> subject is used as receiverId, user may only access their own files

## Production setup proposal
* Managed SQL database (Cloud SQL/Amazon RDS)
* Deploy to Kubernetes (if existing infra), or other cloud service (e.g. Cloud Run)
* Assume existing authentication service used for issuing tokens

## Other thoughts
* Separate versions for Sender/Consumer (Versioning not implemented here)
* Better logging needed
* Documentation needed
