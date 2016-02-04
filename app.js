/*eslint no-console: 0*/
/*eslint no-unused-vars: 0*/
'use strict';

var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
const FHIR_DOMAIN_URL = 'http://ec2-52-77-242-7.ap-southeast-1.compute.amazonaws.com/FHIRServer/';

app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist/'));

//var proxyUrl = 'http://' + '<username>' + ':' + '<password>' + '@' + 'cis-india-pitc-bangalorez.proxy.corporate.ge.com:' + 80;
// var proxyUrl='https_proxy=http://http-proxy.health.ge.com:88';



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
}
);

app.post('/api/proxyUrl', function(req, res, next) {
    // var patientData = req.body;	
    let url = req.headers.url;
    var uri = FHIR_DOMAIN_URL + url;


    var datas = JSON.stringify(req.body);
    var options = {
        uri: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: datas
    };

    request(options, function(error, response, body) {
        if (error) {
            next(error);
        } else {
            res.send(response);
        }
    });

});


app.get('/api/proxyUrl', function(req, res, next) {

    let url = req.headers.url;

    var uri = FHIR_DOMAIN_URL + url;

    var datas = JSON.stringify(req.body);
    var options = {
        uri: uri,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: datas
    };

    request(options, function(error, response, body) {
        if (error) {
            next(error);
        }
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        }
    });
});


app.get('/api/proxy', function(req, res, next) {

    let url = req.headers.url;

    var uri = FHIR_DOMAIN_URL + url;

    var datas = JSON.stringify(req.body);
    var options = {
        uri: uri,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: datas
    };
    
    request(options, function(error, response, body) {
        if (error) {
            next(error);
        } else {
            res.send(response);
        }
    });
});

app.get('/api/worklists', function(req, res, next) {
    var options = '';
    var datas = JSON.stringify(req.body);
    options = {
        uri: FHIR_DOMAIN_URL + 'patientRegistration/search',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: datas
    };


    request(options, function(error, response, body) {
        if (error) {
            next(error);
        }
        if (!error && response.statusCode == 200) {
            res.json(JSON.parse(body));
        }
    });
});

app.get('/api/getWorklists', function(req, res, next) {
    var options = '';
    var datas = JSON.stringify(req.body);
    var searchString = req.headers['searchstring'];
    if (typeof req.headers['searchstring'] !== 'undefined') {
        options = {
            uri: FHIR_DOMAIN_URL + 'patientRegistration/search?searchString=' + searchString,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: datas
        };
    } else {
        options = {
            uri: FHIR_DOMAIN_URL + 'patientRegistration/search',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: datas
        };
    }
    request(options, function(error, response, body) {
        if (error) {
            next(error);
        }
        if (!error && response.statusCode == 200) {
            try{
                res.json(JSON.parse(body));
            }catch(e){
                res.status(500).send(body);
//        		 next(body);
            }
           
        }
    });
});

// app.post('/api/registerPatient', function(req, res, next) {
//    //var patientData = req.body;	
//    var uri = FHIR_DOMAIN_URL + 'patientRegistration/register';	
//   
//    var datas = JSON.stringify(req.body);
//    var options = {
//        uri: uri,
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json; charset=utf-8'
//        },
//        body: datas
//    };
//
//    request(options, function(error, response, body) {
//        if (error) {
//            next(error);
//        }
//        else {
//            res.send(response);
//        }
//    });
//
// });
//
// app.post('/api/updatePatient', function(req, res, next) {
//    //var patientData = req.body;
//    var uri =  FHIR_DOMAIN_URL +'patientRegistration/update';			
// 
//    var datas = JSON.stringify(req.body);
//    var options = {
//        uri: uri,
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json; charset=utf-8'
//        },
//        body: datas
//    };
//
//    request(options, function(error, response, body) {
//        if (error) {
//            next(error);
//        }
//        else {
//            res.send(response);
//        }
//    });
//
// });
//
// app.post('/api/saveVisit', function(req, res, next) {
//
//    var datas = JSON.stringify(req.body);
//
//    var options = {
//        uri: FHIR_DOMAIN_URL + 'patientVisit/createVisit',
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json; charset=utf-8'
//        },
//        body: datas
//    };
//
//    request(options, function(error, response, body) {
//        if (error) {
//            next(error);
//        }
//        else {
//            res.send(response);
//        }
//    });
// });
//
// app.get('/api/getVisits', function(req, res, next) {
//    var datas = JSON.stringify(req.body);
//    var patientId = req.headers['patientid'];
//    var options = {
//        uri: FHIR_DOMAIN_URL + 'patientVisit/searchVisits?patientReference=' + patientId,
//        method: 'GET',
//        headers: {
//            'Content-Type': 'application/json; charset=utf-8'
//        },
//        body: datas
//    };
//
//    request(options, function(error, response, body) {
//        if (error) {
//            next(error);
//        }
//        if (!error && response.statusCode == 200) {
//            res.json(JSON.parse(body));
//        }
//    });
//
// });
//
// app.get('/api/getPatientDetail', function(req, res, next) {
//
//    var datas = JSON.stringify(req.body);
//    var patientId = req.headers['patientid'];
//    var options = {
//        uri: FHIR_DOMAIN_URL + 'patientRegistration/searchByID?id=' + patientId,
//        method: 'GET',
//        headers: {
//            'Content-Type': 'application/json; charset=utf-8'
//        },
//        body: datas
//    };
//
//    request(options, function(error, response, body) {
//        if (error) {
//            next(error);
//        }
//        if (!error && response.statusCode == 200) {
//            res.json(JSON.parse(body));
//        }
//    });
// });
//
// app.get('/api/getSubCenterDetails', function(req, res, next) {
//    var datas = JSON.stringify(req.body);
//    var options = {
//        uri: FHIR_DOMAIN_URL + 'organization/searchAllSC',
//        method: 'GET',
//        headers: {
//            'Content-Type': 'application/json; charset=utf-8'
//        },
//        body: datas
//    };
//
//    request(options, function(error, response, body) {
//        if (error) {
//            next(error);
//        }
//        if (!error && response.statusCode == 200) {
//            res.json(JSON.parse(body));
//        }
//    });
// });

app.listen(port, function() {
    console.log('app is listening in PORT' + port);
});