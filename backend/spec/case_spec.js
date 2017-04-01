'use strict';

const parse_input = require('../lib/parser');
const Case = require('../lib/case');
const Operation = require('../lib/operation');

describe('Case testing', function () {

  it('should initialize the matrix correctly', function () {
    const N = 2;
    const sample = new Case({ N, operations: [] });
    expect(sample.matrix.length).toEqual(N);
    expect(sample.matrix[0].length).toEqual(N);
    expect(sample.matrix[0][0].length).toEqual(N);
  });

  it('should initialize the matrix with zeros', function () {
    const N = 2;
    const sample = new Case({ N, operations: [] });
    for (var i = 0; i < N; i++) {
      for (var j = 0; j < N; j++) {
        for (var k = 0; k < N; k++) {
          expect(sample.matrix[i][j][k]).toEqual(0);
        }
      }
    }
  });

  it('should output correctly', function () {
    const sample = new Case({ 
      N: 3, 
      operations: [{ type: 'QUERY', x: 1, y: 1, z: 1, x2: 2, y2: 2, z2: 2, W: null}]
    });
    sample.executeOperation()
    expect(sample.output).toEqual(`0\n`);
  });

});

