'use strict';

const parse_input = require('../lib/parser');
const Case = require('../lib/case');
const Operation = require('../lib/operation');

describe('Operation testing', function () {

  describe('UPDATE', function () {

    it('should return correctly under index reference', function () {
      const operation = new Operation({ type: 'UPDATE', x: 1, y: 0, z: 1, W: 5, x2: null, y2: null, z2: null });
      var sample = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];

      operation.execute(sample);

      expect(sample[1][0][1]).toEqual(5);
      expect(sample[1][1][2]).toBeUndefined();
    });

    it('should return a falsy value', function () {
      const operation = new Operation({ type: 'UPDATE', x: 1, y: 1, z: 1, W: 1, x2: null, y2: null, z2: null });
      var sample = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
      expect(operation.execute(sample)).toBeFalsy();
    });

  });

  describe('QUERY', function () {
    
    it('should operate according to instructions', function () {
      const operation = new Operation({ type: 'QUERY', x: 0, y: 0, z: 0, x2: 1, y2: 1, z2: 1 });
      
      expect(operation.execute([[[0, 0], [0, 0]], [[0, 0], [0, 0]]])).toEqual(0);
      expect(operation.execute([[[0, 0], [0, 1]], [[1, 0], [0, 1]]])).toEqual(3);
      expect(operation.execute([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])).toEqual(36);
      expect(operation.execute([[[0, 0, 1], [0, 1, 2], [0 , 0, 0]], [[4, 0, 1], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [1, 1, 1], [0, 0, 0]]])).toEqual(5);
    });

  });

});