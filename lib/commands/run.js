'use strict';

var goRun = require( '../../' );

module.exports = function ( request, socket ) {

	return goRun( request.testCase, socket );

};
