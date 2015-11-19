'use strict';

var argv = require( 'minimist' );

function Parser () {
}

Parser.prototype.execute = function ( command ) {
	return argv( command.trim().split( /\s+/ ) );
};

module.exports = Parser;
