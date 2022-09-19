# content-service

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
