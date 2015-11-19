'use strict';

var Command  = require( './command' );
var Parser   = require( './parser' );
var parser   = new Parser();

function Commander () {

}

Commander.prototype.parse = function ( command ) {
	var tempMeta = parser.execute( command.toString() );
	return this.createCommand( tempMeta );
};

Commander.prototype.createCommand = function ( tempMeta ) {

	var command = tempMeta._[ 0 ].toLowerCase();
	var data    = tempMeta._[ 1 ];

	return new Command( {
		'command' : command,
		'data'    : data,
		'meta'    : tempMeta,
		'handler' : require( [ './commands/', command ].join( '' ) )
	} );

};

module.exports = Commander;
