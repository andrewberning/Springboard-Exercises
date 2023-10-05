/* 

HOW THE WEB WORKS EXERCISE 

Part One: Solidify Terminology

1. In your own terms, define the following terms:
What is HTTP ?
- Hypertext Transfer Protocol is the standard protocol in which browsers and servers can communicate.

2. What is a URL ?
- A URL is the address of a given unique resource on the Web.

3. What is DNS ?
- Domain Name Service translates the hostname into an IP address. ex. google.com ==> 123.45.67.89

4. What is a query string ?
- A query string is extra information at the end of a URL provided to the server . 

5. What are two HTTP verbs and how are they different ?
- GET - gets data from a specified resource.
- POST - sends data to a server to have something done.

6. What is an HTTP request ?
- It is a request sent from the client to a server following the HTTP protocol.

7. What is an HTTP response ?
- A response from a server sent to the client following the HTTP protocol.

8. What is an HTTP header ? Give a couple examples of request and response headers you have seen.
- Headers give extra information about the request or the response.
- Request Examples: the hostname, date of the browser, language the browser wants information in, and more
- Response Examples: Content Type, Date/Time of the browser, cookies, and more

9. What are the processes that happen when you type “http://somesite.com/some/page.html” into a browser?
- Turn name into an IP address using DNS
- Makes a request to that IP address with headers
- Server sends back a response
- The browser constructs the DOM from the response and gets other resources needed to build the DOM with other HTTP requests and gets a response from each request.

*/