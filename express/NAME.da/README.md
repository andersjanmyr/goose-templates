# {{titlecase .NAME}}

## Installation

```
$ npm install -g {{dasherized .NAME}}
```

## Usage

```
# Start server
$ {{dasherized .NAME}}

# Start server on a different port
$ NODE_ENV=production PORT=8080 npm start
```


## Development
```
# Clone repository
$ git clone https://github.com/andersjanmyr/{{dasherized .NAME}}
```

```
# Install dependencies
$ npm install
...

# Verify that everything is working
$ npm test
...

# Start a test watcher
$ npm run test-watch
...

# Start a server
$ npm start
DEVELOPMENT server started
Port: 3000
URL: http://localhost:3000

# Start a different version
$ NODE_ENV=production PORT=8080 npm start
PRODUCTION server started
Port: 8080
URL: http://localhost:8080

# Start a server with file watching
$ npm run watch

# Debugging
$ npm install -g node-inspector # Install node-inspector globally

$ node-inspector & # Start the inspector (&) in the background
Node Inspector v0.7.4
Visit http://127.0.0.1:8080/debug?port=5858 to start debugging.

$ npm run debug # Start debugging the server

$ npm run test-debug # Start debugging the tests
```
