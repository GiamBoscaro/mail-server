# Nodemailer Microservice

Mail server running on Node 16 with Nodemailer. This server can send HTML E-Mails with customizable templates and attachments.

## Index

* [Development](#development)
  * [Run on Local Machine](#run-on-local-machine)
  * [Testing](#testing)
* [Deployment](#deployment)
* [Usage](#usage)
  * [API Specifications](#api-specifications)
  * [Creating Custom E-Mail Templates](#creating-custom-e-mail-templates)
* [References](#references)

## Development

### Run on Local Machine

To run the server in your local machine, first install the dependencies:

```sh
npm i
```

then run the service in dev mode with:

```sh
npm run dev
```

### Testing

Run the unit tests with:

```sh
npm run test
```

## Deployment

Configure your `docker-compose.yml` as the following example:

```yaml
version: '3.8'

services:

nodemailer:  
    image: ghcr.io/giamboscaro/arm64v8/mail-service:1.1.0-alpine
    restart: unless-stopped
    env_file: .env
    ports:
        - 3000:3000
    volumes:
        - path/to/your/templates:/usr/src/app/templates
    healthcheck:
        test: ["CMD", "wget", "--no-verbose", "--spider", "--tries=1", "http://localhost:3000/"]
        interval: 2s
        timeout: 5s
        retries: 10
```

Customize the required configuration:

* _Env_: configure your environement using an `.env` file. See `example.env` to find out which configuration parameters are currently accepted.
* _Templates_: link the volume containing all your E-Mail templates to use them inside the container. Overwrite `path/to/your/templates` with the path to the folder containing your customized templates.

Then start up the container with:

```sh
docker compose up -d
```

## Usage

### API Specifications

The OpenAPI specifications cna be seen in the [openapi.yaml](./api/openapi.yaml) file. The  API documentation is also available at [localhost:3000/api-docs](http://localhost:3000/api-docs) while the container is running.

### Creating Custom E-Mail Templates

It is possible to create custom E-Mail Templates (HTML and CSS only) and put them into the `templates` folder. The values that will need to be replaced dynamically at runtime need to be wrapped in double brackets (es: `{{ variable_name }}`). The values that replace the variables in the template have to be specified in the request body when calling the API.

For example, if the template contains the variable `{{ name }}`, its value must be specified in the request body like this:

```json
{
    // ...
    "template": "template.html",
    "replacements": "{'name': 'Mario'}"
    // ...
}
```

## References

* [OpenAPI 3 Specifications](https://swagger.io/specification/)
* [Nodemailer Usage](https://nodemailer.com/usage/)