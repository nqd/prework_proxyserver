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
* [x] Optional: Supports HTTPS
* [x] Optional: The `--loglevel` argument sets the logging chattiness
* [] Optional: The `--exec` argument proxies stdin/stdout to/from the destination program


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

And get the github api template:

```
curl -k https://localhost:8002 -H "x-destination-url: https://api.github.com" -v
* Rebuilt URL to: https://localhost:8002/
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8002 (#0)
* found 173 certificates in /etc/ssl/certs/ca-certificates.crt
* found 697 certificates in /etc/ssl/certs
* ALPN, offering http/1.1
* SSL connection using TLS1.2 / ECDHE_RSA_AES_128_GCM_SHA256
* 	 server certificate verification SKIPPED
* 	 server certificate status verification SKIPPED
* 	 common name: NQDINH (does not match 'localhost')
* 	 server certificate expiration date OK
* 	 server certificate activation date OK
* 	 certificate public key: RSA
* 	 certificate version: #1
* 	 subject: C=VN,ST=SG,L=SG,O=Me,OU=IT,CN=NQDINH,EMAIL=nqdinhddt@gmail.com
* 	 start date: Sat, 01 Oct 2016 15:07:19 GMT
* 	 expire date: Tue, 16 Feb 2044 15:07:19 GMT
* 	 issuer: C=VN,ST=SG,L=SG,O=Me,OU=IT,CN=NQDINH,EMAIL=nqdinhddt@gmail.com
* 	 compression: NULL
* ALPN, server did not agree to a protocol
> GET / HTTP/1.1
> Host: localhost:8002
> User-Agent: curl/7.47.0
> Accept: */*
> x-destination-url: https://api.github.com
> 
< HTTP/1.1 200 OK
< server: GitHub.com
< date: Sun, 02 Oct 2016 02:05:58 GMT
< content-type: application/json; charset=utf-8
< content-length: 2064
< connection: close
< status: 200 OK
< x-ratelimit-limit: 60
< x-ratelimit-remaining: 55
< x-ratelimit-reset: 1475376675
< cache-control: public, max-age=60, s-maxage=60
< vary: Accept, Accept-Encoding
< etag: "d251d84fc3f78921c16c7f9c99d74eae"
< x-github-media-type: github.v3
< access-control-expose-headers: ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval
< access-control-allow-origin: *
< content-security-policy: default-src 'none'
< strict-transport-security: max-age=31536000; includeSubdomains; preload
< x-content-type-options: nosniff
< x-frame-options: deny
< x-xss-protection: 1; mode=block
< x-served-by: 0e17b94a265a427d9cafe798ceea7c02
< x-github-request-id: 76441449:6FED:1EDC375:57F06B85
< 
{
  "current_user_url": "https://api.github.com/user",
  ...
}
* Closing connection 0
```


### Configuration

```
node index.js -h

Usage: node index.js [options]

Options:
  -p, --port     Specify a forwarding port
  -x, --host     Specify a forwarding host       [string] [default: "127.0.0.1"]
  -u, --url      Specify a forwarding destination                       [string]
  --ps, --port-ssl  Specify a forwarding port to secured https server
  --xs, --host-ssl  Specify a forwarding host to secured https server
                                                 [string] [default: "127.0.0.1"]
  --us, --url-ssl   Specify a forwarding secured https destination      [string]
  -l, --logfile  Specify a log file                                     [string]
  -h, --help     Show help                                             [boolean]
```

CLI arguments
- `--port`: The port of the destination server. Defaults to 80 or 8000 when a host is not specified.
- `--host`: The host of the destination server. Defaults to 127.0.0.1.
- `--url`: A single url that overrides the above host and port.
- `--logfile`: A file path to redirect logging to.
- `--port-ssl`: The port of the destination server through https connection. Default to 443 or 4443 when a host-ssl is not specified.
- `--host-ssl`: The host of the destination server through https connection. Default to 127.0.0.1.
- `--url-ssl`: A single url that overrides the above ssl host and port.

HTTP header:
- `x-destination-url`: The destination url on a per request basis.

### Logging

Level: `['emerg', 'alert', 'crit', 'err', 'warning', 'notice', 'info', 'debug']`


Last: Thanks. Looking forward to seeing you at the bootcamp.
