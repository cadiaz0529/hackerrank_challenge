'use strict';
/**
* Class representing an abstract operation (UPDATE or QUERY)
* @param type: Operation type (UPDATE or QUERY)
* @param x: Initial x-coordinate in case of QUERY, or simply x-coordinate in case of UPDATE
* @param y: Initial y-coordinate in case of QUERY, or simply y-coordinate in case of UPDATE
* @param z: Initial z-coordinate in case of QUERY, or simply z-coordinate in case of UPDATE
* @param x2: Final x-coordinate in case of QUERY
* @param y2: Final y-coordinate in case of QUERY
* @param z2: Final z-coordinate in case of QUERY
* @param W: Value of the matrix at position (x,y,z) in case of UPDATE
*/
module.exports = class Operation {
	constructor(params){
		this.type = params.type;
		this.x = params.x;
		this.y = params.y;
		this.z = params.z;
		this.x2 = params.x2;
		this.y2 = params.y2;
		this.z2 = params.z2;
		this.W = params.W;
	}

	/** 
    * Executes the operation on a given matrix.
    * @returns Output of QUERY operation, or null in case of QUERY
  	*/
	execute(matrix){
		if(this.type == "UPDATE"){
			matrix[this.x][this.y][this.z] = this.W;
		} else {
			return executeQuery(matrix, [this.x, this.y, this.z], [this.x2, this.y2, this.z2]);
		}
	}
}

/**
* Auxiliar function to execute a QUERY operation
* @returns Output of QUERY operation
*/
function executeQuery(matrix, coords1, coords2){
	var ans = 0;
	for (var i = coords1[0]; i <= coords2[0]; i++) {
		for (var j = coords1[1]; j <= coords2[1]; j++) {
			for (var k = coords1[2]; k <= coords2[2]; k++) {
				ans += matrix[i][j][k];
			}
		}
	}
	return ans;
}