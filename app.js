/*eslint no-console: 0*/

'use strict';

var express = require('express');
var path    = require('path');
var app     = express();
var request = require('request');
var bodyParser = require('body-parser')

var port = process.env.PORT || 3000 ;

app.use(bodyParser.json())

app.use(express.static(__dirname + '/dist/'));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
}
);

app.get('/api/worklists', function(req, res) {
    var url = 'http://ec2-52-10-19-65.us-west-2.compute.amazonaws.com/FHIRServer/patientRegistration/search';
    request(url, function (error, response, body) {
        if (error) {
            console.log('error ' + error);
        }
        if (!error && response.statusCode == 200) {
            //console.log(body); // Show the HTML for the Google homepage.
            res.json(JSON.parse(body));
        }
    });
});
app.post('/api/registerPatient', function(req, res) {
    	
	var datas = JSON.stringify(req.body);	
	
	var options = {
	    uri:'http://ec2-52-10-19-65.us-west-2.compute.amazonaws.com/FHIRServer/patientRegistration/register',
        method: 'POST',	
        headers: {           	  
	      "Content-Type":'application/json; charset=utf-8',
        },	
	    body:datas
    };
  
    request(options, function (error, response, body) {
        if (error) {
            console.log('error ' + error);
        }
        if (!error && response.statusCode == 200) {  
            res.json(body);
        } else {
			//console.log(body);
			//console.log(response.statusCode);
		}
    });
    
});

app.post('/api/saveVisit', function(req, res) {
    
	var datas = JSON.stringify(req.body);	
	
	var options = {
	    uri:'http://ec2-52-10-19-65.us-west-2.compute.amazonaws.com/FHIRServer/patientVisit/createVisit',
        method: 'POST',	
        headers: {           	  
	      "Content-Type":'application/json; charset=utf-8',
        },	
	    body:datas
    };
  
    request(options, function (error, response, body) {
        if (error) {
            console.log('error ' + error);
        }
        if (!error && response.statusCode == 200) {  
            res.json(body);
        } else {
			//console.log(body);
			//console.log(response.statusCode);
		}
    });    
});

app.get('/api/getVisits', function(req, res) {
    
	var datas = JSON.stringify(req.body);	
	var patientId = req.headers['patientid'];
	var options = {
	    uri:'http://ec2-52-10-19-65.us-west-2.compute.amazonaws.com/FHIRServer/patientVisit/searchVisits?patientReference='+patientId,
        method: 'GET',	
        headers: {           	  
	      "Content-Type":'application/json; charset=utf-8',
        },	
	    body:datas
    };
  
    request(options, function (error, response, body) {
        if (error) {
            console.log('error ' + error);
        }
        if (!error && response.statusCode == 200) {  
            res.json(JSON.parse(body));
        } else {
			//console.log(body);
			//console.log(response.statusCode);
		}
    });     
});

app.get('/api/getPatientDetail', function(req, res) {
    
	var datas = JSON.stringify(req.body);	
	var patientId = req.headers['patientid'];
	var options = {
	    uri:'http://ec2-52-10-19-65.us-west-2.compute.amazonaws.com/FHIRServer/patientRegistration/searchByID?id='+patientId,
        method: 'GET',	
        headers: {           	  
	      "Content-Type":'application/json; charset=utf-8',
        },	
	    body:datas
    };
  
    request(options, function (error, response, body) {
        if (error) {
            console.log('error ' + error);
        }
        if (!error && response.statusCode == 200) {  
            res.json(JSON.parse(body));
        } else {
			//console.log(body);
			//console.log(response.statusCode);
		}
    });   	
});


app.listen(port, function() {
    console.log('app is listening in PORT' + port);
});