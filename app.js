var rest = require('restler');
var express = require("express");
const path = require('path');

var app = express();
app.use(express.json());
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.post('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});



app.get("/getData", function (clientReq, clientRes) {

    var id = clientReq.query.docId;
    rest.get('http://localhost:5984/mycompany/' + id, {
        "username": "saurabh",
        "password": "rajukumar@123"

    }).on('complete', function (result) {
        if (result instanceof Error) {
            //console.log('Error:', result.message);
            clientRes.write('{"error":true, "reason": result.message}');
            clientRes.end();
        } else {
            //console.log(result);
            clientRes.write(JSON.stringify(result));
            clientRes.end();
        }


    });

});

app.post("/postdata", function (clientReq, clientRes) {
    //console.log("hiii")
    console.log(clientReq.body),

        rest.put('http://localhost:5984/mycompany/' + clientReq.body._id, {
            "username": "saurabh",
            "password": "rajukumar@123",

            data: JSON.stringify(clientReq.body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .on('complete', function (data, response) {
                clientRes.write(JSON.stringify(data));
                clientRes.end();
            });



});


app.get("/allData", function (clientReq, clientRes) {

    rest.get('http://localhost:5984/mycompany/_all_docs',  {
        "username": "saurabh",
        "password": "rajukumar@123"

    }).on('complete', function (result) {
        if (result instanceof Error) {
            //console.log('Error:', result.message);
            clientRes.write('{"error":true, "reason": result.message}');
            clientRes.end();
        } else {
            //console.log(result);
            clientRes.write(JSON.stringify(result));
            clientRes.end();
        }


    });

});

console.log("starting");
app.listen(8080, function () {
    console.log("Server started");
});


