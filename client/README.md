# Client

This directory contains the client-side code for the Spoonful application.

## Commands

### Running the Development Server

To start the development server, run the following command. This will build the Docker image and start the container

```bash
docker-compose up --build 
```


### Running Tests

To run the test suite, use the following command:

```bash
docker-compose run --rm react-dev npm run test
```

**When to use:** Use this command to execute the unit and integration tests for the client application. The `--rm` flag will remove the container after the tests have run.

### Building for Production

To create a production build of the application, run the following command:

```bash
docker-compose run --rm react-dev npm run build
```

**When to use:** Use this command to bundle the application for deployment. The build artifacts will be located in the `dist` directory.
