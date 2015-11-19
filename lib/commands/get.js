'use strict';

var fs = require( 'fs' );

module.exports = function ( request, socket ) {

	var stream = fs.createReadStream( [ __dirname, '../..', 'process-std', request.processId, request.read ].join( '/' ) );
	stream.pipe( socket );

};
