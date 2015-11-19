'use strict';

var Promise = require( 'bluebird' );
var fs      = Promise.promisifyAll( require( 'fs' ) );
var uuid    = require('node-uuid');
var spawn   = require( 'child_process' ).spawn;

function debug ( message ) {
	console.log( message );
}

module.exports = function ( testcase, socket ) {

	return new Promise( function ( resolve, reject ) {

		var id           = uuid.v4();
		var folder       = [ './process-std/', id ].join( '' );
		var stdoutPath   = [ folder, '/stdout' ].join( '' );
		var stderrPath   = [ folder, '/stderr' ].join( '' );
		var exitCodePath     = [ folder, '/exit_code' ].join( '' );

		fs.mkdirAsync( folder )
			.then( function () {

				var stdoutStream   = fs.createWriteStream( stdoutPath );
				var stderrStream   = fs.createWriteStream( stderrPath );
				var exitCodeStream = fs.createWriteStream( exitCodePath );

				var test  = spawn( './test.sh', [ testcase ] );

				debug( 'process: ', test.pid );

				test.stdout.on( 'data', function ( data ) {
					console.log( data.toString() );
					socket.write( data.toString() );
					stdoutStream.write( data.toString() );
				} );

				test.stderr.on( 'data', function ( data ) {
					stderrStream.write( data.toString() );
				} );

				test.on( 'close', function ( data ) {
					stdoutStream.end();
					stderrStream.end();
					exitCodeStream.write( data.toString() );
					exitCodeStream.end();
				} );

				return resolve( id );

			} )
			.catch( function ( error ) {
				return reject( error );
			} );

	} );

};
