'use strict';

const http = require('http');
const express = require('express');
const parse_input = require('./lib/parser');
const Case = require('./lib/case');

const app = express();
app.use(require('body-parser').json());
app.use(express.static(`${__dirname}/view`));

app.post('/', function (request, response) {

  const input = request.body.input;
  try {
    const input_parsed = parse_input(input);
    var out = '';

    input_parsed.forEach(c => {
      const test_case = new Case(c);
      test_case.executeOperation();
      out += test_case.output;
    });

    response.send({ out: out });
  } catch (err) {
    response.status(500).send({ message: err.message });
  }

});

const server = http.createServer(app);
const port = 3000
server.listen(port, err => {
  if (!err) {
    console.log(`Listening on port ${port}`);
  }
});