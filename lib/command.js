'use strict';

function Command ( meta ) {
	this.meta    = meta.meta;
	this.command = meta.command;
	this.data    = meta.data;
	this.handler = meta.handler;
}

Command.prototype.run = function ( socket ) {

	this.handler( JSON.parse( this.data ), socket );

};

module.exports = Command;
