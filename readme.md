Prework: Proxy Server
===== 

[![Build Status](https://travis-ci.org/nqd/prework_proxyserver.svg)](https://travis-ci.org/nqd/prework_proxyserver)

This is a minimum Proxy Server for Node.js submitted as the [pre-work](http://courses.codepath.com/snippets/intro_to_nodejs/prework) requirement for CodePath.

Time spent: 10 hours.

Completed:
* [x] Required: Requests to port `8000` are echoed back with the same HTTP headers and body
* [x] Required: Requests/reponses are proxied to/from the destination server
* [x] Required: The destination server is configurable via the `--host`, `--port`  or `--url` arguments
* [x] Required: The destination server is configurable via the `x-destination-url` header
* [x] Required: Client requests and respones are printed to stdout
* [x] Required: The `--logfile` argument outputs all logs to the file specified instead of stdout
* [x] Optional: `-h` argument prints CLI API
* [] Optional: The `--exec` argument proxies stdin/stdout to/from the destination program
* [] Optional: The `--loglevel` argument sets the logging chattiness
* [] Optional: Supports HTTPS


Walkthough Gif
![](https://raw.githubusercontent.com/nqd/prework_proxyserver/master/nqdinh-submission.gif)

Another version of the [walkthough in asciicast](https://asciinema.org/a/cgpemafskkd396k94jqqnd8dc)


## Starting the server:
``` bash
npm install
npm run test    // run tests
npm run start   // run the proxy and actual echo server
```

## Features

### Echo server

### Proxy server

### Configuration



Last: Thanks. Looking forward to seeing you at the bootcamp.