#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');

/**
* Hello server using express module
* It will respond to an event when it receives '/hello' request
* To test just run this with
* linux# node helloserver.js
* And see from a browser http://localhost:8666/hello
* @author Pello Xabier Altadill Izura
*/


var MyServer = function () {
	self = this;

    self.quotes = [{quote:'Judgement time',author:'Judge Dredd'},
                  {quote:'I am the law',author:'Judge Dredd'},
                  {quote:'I find your lack of faith disturbing',author:'Lord Vader'},
                  {quote:'It is pointless to resist, my son',author:'Dad Vader'},
                  {quote:'Te ponen buena nota porque eres mona',author:'Anhell'}
                    ];
    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };
        self.routes['/'] = function(req, res) {
            var index = Math.round((self.quotes.length-1) * Math.random());
            res.setHeader('Content-Type', 'text/html');
            res.send(JSON.stringify(self.quotes[index]));
        };
    };

        /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        var express = require('express');
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };

       /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
    	        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
                self.port = process.env.OPENSHIFT_NODEJS_PORT || 8666;
        //  Start the app on the specific interface (and port).
  self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });

        
    };

};




/**
 *  main():  Main code.
 */
var zapp = new MyServer();
zapp.initializeServer();
zapp.start();