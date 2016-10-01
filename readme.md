Prework: Proxy Server
===== 

[![Build Status](https://travis-ci.org/nqd/prework_proxyserver.svg)](https://travis-ci.org/nqd/prework_proxyserver)

This is a minimum Proxy Server for Node.js submitted as the [pre-work](http://courses.codepath.com/snippets/intro_to_nodejs/prework) requirement for CodePath.

Time spent: 12 hours.

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
```
curl -v POST http://localhost:8000 -d "hello world" -H "x-asdf: foobar"
* Rebuilt URL to: POST/
* Could not resolve host: POST
* Closing connection 0
curl: (6) Could not resolve host: POST
* Rebuilt URL to: http://localhost:8000/
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8000 (#1)
> POST / HTTP/1.1
> Host: localhost:8000
> User-Agent: curl/7.47.0
> Accept: */*
> x-asdf: foobar
> Content-Length: 11
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 11 out of 11 bytes
< HTTP/1.1 200 OK
< host: localhost:8000
< user-agent: curl/7.47.0
< accept: */*
< x-asdf: foobar
< content-length: 11
< content-type: application/x-www-form-urlencoded
< Date: Sat, 01 Oct 2016 13:13:16 GMT
< Connection: keep-alive
< 
* Connection #1 to host localhost left intact
hello world% 
```

### Proxy server
```
curl -v POST http://localhost:8001 -d "hello world" -H "x-asdf: foobar"
* Rebuilt URL to: POST/
* Could not resolve host: POST
* Closing connection 0
curl: (6) Could not resolve host: POST
* Rebuilt URL to: http://localhost:8001/
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8001 (#1)
> POST / HTTP/1.1
> Host: localhost:8001
> User-Agent: curl/7.47.0
> Accept: */*
> x-asdf: foobar
> Content-Length: 11
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 11 out of 11 bytes
< HTTP/1.1 200 OK
< host: localhost:8001
< user-agent: curl/7.47.0
< accept: */*
< x-asdf: foobar
< content-length: 11
< content-type: application/x-www-form-urlencoded
< connection: close
< date: Sat, 01 Oct 2016 13:14:04 GMT
< 
* Closing connection 1
hello world%
```

### Configuration

```
node index.js -h

Usage: node index.js [options]

Options:
  -p, --port     Specify a forwarding port
  -x, --host     Specify a forwarding host       [string] [default: "127.0.0.1"]
  -u, --url      Specify a forwarding destination                       [string]
  -l, --logfile  Specify a log file                                     [string]
  -h, --help     Show help                                             [boolean]
```

CLI arguments
- `--port`: The port of the destination server. Defaults to 80 or 8000 when a host is not specified.
- `--host`: The host of the destination server. Defaults to 127.0.0.1.
- `--url`: A single url that overrides the above host and port.
- `--logfile`: A file path to redirect logging to.

HTTP header:
- `x-destination-url`: The destination url on a per request basis.

Last: Thanks. Looking forward to seeing you at the bootcamp.
