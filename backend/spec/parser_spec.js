'use strict';

const parse_input = require('../lib/parser');
const Case = require('../lib/case');
const Operation = require('../lib/operation');

describe('Parser testing', function () {

  it('should parse operations properly', function () {
    const result = parse_input(`1
      5 3
      UPDATE 1 2 3 4
      QUERY 1 2 2 1 4 3
      UPDATE 1 1 1 2`);
    const operations = result[0].operations;
    expect(operations.length).toEqual(3);
    expect(operations[0].type).toEqual('UPDATE');
    expect(operations[1].type).toEqual('QUERY');
    expect(operations[2].type).toEqual('UPDATE');
    expect(operations[0].x).toEqual(0);
    expect(operations[0].y).toEqual(1);
    expect(operations[0].z).toEqual(2);
    expect(operations[0].W).toEqual(4);
    expect(operations[1].x).toEqual(0);
    expect(operations[1].y).toEqual(1);
    expect(operations[1].z).toEqual(1);
    expect(operations[1].x2).toEqual(0);
    expect(operations[1].y2).toEqual(3);
    expect(operations[1].z2).toEqual(2);
  });

  it('should should fail if there are missing cases', function () {
    try {
      const result = parse_input(`3
      1 1
      UPDATE 1 1 1 2
      2 3
      QUERY 1 1 1 1 1 1`);
      fail();
    } catch(error) {
      expect(error).toBeTruthy();
    }
  });

  it('should ignore extra cases', function () {
    try {
      const result = parse_input(`1
      1 1
      UPDATE 1 1 1 2
      2 3
      QUERY 1 1 1 1 1 1`);
      expect(result.length).toEqual(1);
    } catch(error) {
      fail(error.message);
    }
  });

  it('should catch errors in the format of the cases', function () {
    try {
      parse_input(`1
      2 3
      UPDATE 1 1 1 3`);
      fail();
    } catch(error) {
      expect(error.message).toEqual('Bad constructed test case: M is greater than number of operations');
    }

    try {
      parse_input(`1
      2 1
      UPDATE 1 1 3`);
      fail();
    } catch(error) {
      expect(error.message).toEqual('Bad constructed test case: invalid format for operation');
    }

  });

});