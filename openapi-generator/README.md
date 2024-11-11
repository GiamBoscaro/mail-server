# OPENAPI 3.0 GENERATOR

## How to generate the server code

1. Write or paste the OpenAPI 3 specification in the `openapi.yaml` file.
2. Run the `generate.sh` script with:

```shell
sh generate.sh
```

3. The server code will be saved in the `out` folder.

## How to update the server code

1. Copy the latest API definition file from the server (usually found in `api/openapi.yaml`) into the `openapi.yaml` file.
2. Make the required changes in the `openapi.yaml` file.
3. Generate the new server code with with:

```shell
sh generate.sh
```

4. The server code will be save in the `out` folder.

**ATTENTION:**: The server code is generated with the first server configured in the `servers` section of the `openapi.yaml`.

The generated code is pristine, it means that there is no business code written in it, so it cannot be directly copied into the current project, but the changes need to be merged manually.

* The following folders can be overwritten:

```sh
.openapi-generator/
api/
utils/
```

* The following folders need to be merged manually:

```sh
services/
controllers/
```

The suggested procedure is the following:

1. Overwrite `/services/index.js`
2. Add all the newly added APIs from the new `*Service.js` file to the matching project `*Service.js` file. Add them also to the `module.exports` at the end of the file.
3. Add all the newly added APIs from the new `*Controller.js` file to the matching project `*Controller.js` file. Add them also to the `module.exports` at the end of the file.
4. Run the server and verify that everything is running without any exception.
