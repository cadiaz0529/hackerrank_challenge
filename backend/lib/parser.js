'use strict';

/**
 * Parses the input (which is a multi-line text) as serialized object.
 * @returns Object with the parsed information { n_lines, cases: [{N, M, operations: [{ OP, x, y, z, W, x2, y2, z2 }] }] }.
 */
module.exports = function parse_input(input){
  const lines = input.split("\n");
  const n_cases = parseInt(lines.shift());

  /** 
   * Parses a test case block.
   * @returns An array with the operations that have to be done (in a serialized format)
   * @throws Error if the test case block is badly constructed in the input
  */
  function parseCase() {
	const testCaseHead = /(\d+)\s+(\d+)/g.exec(lines.shift());
	if (testCaseHead == null){
	  throw new Error('Bad constructed test case: there is no N nor M');
	}
	const N = testCaseHead[1];
	const M = testCaseHead[2];
	var operations = [];

	for(var i=0; i<M; i++){
	  operations.push(parseOperation());
	}

	return { N, operations };
  }

  /** 
   * Parses a single operation (which can be UPDATE or QUERY).
   * @returns An object with the information of the given operation
   * @throws Error if the operation's format is not valid
  */
  function parseOperation(){
	const textOperation = /(UPDATE|QUERY)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)(\s+(\d+)\s+(\d+))?/g.exec(lines.shift());
	if (textOperation == null){
	  throw new Error('Bad constructed test case: invalid format for operation');
	}

	var operation = {
	  type: textOperation[1],
	  x: parseInt(textOperation[2]),
	  y: parseInt(textOperation[3]),
	  z: parseInt(textOperation[4]),
	  x2: null,
	  y2: null,
	  z2: null,
	  W: null
	};

	if(textOperation[6] != null){
	  operation.x2 = parseInt(textOperation[5]),
	  operation.y2 = parseInt(textOperation[7]),
	  operation.z2 = parseInt(textOperation[8]),
	} else {
	  operation.W = parseInt(textOperation[5]),
	}

	return operation;
  }

  //Now we construct the test cases array and return it
  var test_cases = [];

  for (var i=0; i < n_cases; i++) {
	test_cases.push(parseCase());
  }

  return test_cases;
};