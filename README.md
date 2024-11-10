# Nodemailer Micro-Service

Mail server running on _Node.js 16 with _Nodemailer_. This server can send HTML E-Mails with customizable templates and attachments.

## 1. How to configure docker-compose

Set up your docker-compose as the following example:

    version: '3.8'

    services:
    
    nodemailer:  
        image: 79.8.227.99:5512/im-tech/mail-server:1.0.0
        restart: unless-stopped
        ports:
        - "3000:3000"
        env_file:
        - .env
        volumes:
        - path/to/your/templates:/usr/src/app/templates

* _Env_: you need to configure your environement using an `.env` file. See `example.env` to find out which configuration parameters are currently accepted.
* _Templates_: you need to link the volume containing all your E-Mail templates to use them inside the container. Overwrite `path/to/your/templates` with the path to the folder containing your customized templates.

## 2. Creating custom E-Mail templates

Create an E-Mail Template (HTML and CSS only) and put it into the `templates` folder. The values that will need to be replaced dynamically at runtime need to be wrapped in double brackets (es: `{{ variable_name }}`). The values that replace the variables in the template have to be specified in the body of the API request.

For example, if the template contains the variable `{{ name }}`, its value must be specified in the request body like this:

    {
        ...
        "template": "template.html",
        "replacements": "'{\"name\": \"Mario\"}'"
        ...
    }

## 3. API Specifications

The OpenAPI specifications are available at the address `http://<server_ip>:<container_port>/api-docs` while the container is running.

## 4. External Docs

* OpenAPI 3: <https://swagger.io/specification/>
* Nodemailer: <https://nodemailer.com/usage/>