'use strict';

const Operation = require('./operation');

/**
 * A class abstraction of a test case block.
 * @param N: Matrix size.
 * @param matrix: Matrix used for making operations.
 * @param operations: Array of operations (only the parameters of each operation).
 * @param output: Output to be sent in the response.
 */
module.exports = class Case {
	constructor(params){
		this.N = params.N;
		this.matrix = [];
		this.operations = params.operations;
		this.output = "";
		this.createMatrix();
	}

	/**
    * Creates a new N * N * N matrix filled with zeros
    */
	createMatrix(){
		this.matrix = [];
	    for(var i=0; i < this.N; i++) {
	    	this.matrix[i] = [];
	    	for(var j=0; j < this.N; j++) {
	    		this.matrix[i][j] = [];
	    		for(var k=0; k < this.N; k++) {
	    			this.matrix[i][j][k] = 0;
	    		}
	    	}
	    }
	}

	/**
	* Executes all the operations contained in a Case
	*/
	executeOperation(){
		this.operations.forEach(op => {
			const operationObject = new Operation(op);
			const result = operationObject.execute(this.matrix);
			if (result != null) {
				this.output += toString(result)+"\n";
			}
	    });
	}
}