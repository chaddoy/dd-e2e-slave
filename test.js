'use strict';

var net       = require( 'net' );
var Commander = require( './lib/commander' );
var commander = new Commander();

var server = net.createServer( function ( socket ) {

	socket.on( 'data', function ( data ) {

		commander.parse( data ).run( socket );

	} );

	socket.on( 'error', function ( data ) {
		console.log( data );
	} );

	socket.on( 'end', function ( data ) {
		console.log( 'Ended' );
	} );

} );

server.listen( 3434, function () {
	console.log( 'listening' );
} );
