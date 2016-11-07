const assert = require('assert');
const alasqlNode = require('../node-red-contrib-alasql');

const REDStub = {
	nodes: {
		registerType: function(typeName, fn){
			REDStub.types[typeName] = fn;
		},
		createNode: function(node, config){
			// Nothing
			node.onCreateNode(node,config);
		}
	},
	// 
	types:[]
};

const Node = function(){
	this.events = {}; // hook for input
};

Node.prototype.on = function(eventName, fn){
	this.events[eventName] = fn;
};

Node.prototype.send = function(msg){
	if(this.onSend) this.onSend(msg);
};

Node.prototype.error = function(err, msg){
	if(this.onError) this.onError(err,msg);
};

Node.prototype.createNode = function(node,config){
	if(this.onCreateNode) this.onCreateNode(node,config);
};

describe('01. Simple test', function(){
	it('1. Register type', function(done){
		alasqlNode(REDStub);
		assert(REDStub.types.alasql);
		done();
	});

	it('2. Create node test', function(done){
		var node = new Node();
		node.onSend = function(msg) {
			console.log(43,msg);
			// /assert.deepEqual(msg.payload,[{'1':1}]);
			done();
		};
		node.onError = function(err, msg) {
			console.log(48,'error',err,msg);
			done();
		};

		node.onCreateNode = function(nd, config) {
			console.log(57,nd, config);
			done();
		};

		REDStub.types.alasql.bind(node)({
			query:'SELECT 123'
		});
//		console.log(node);
		node.events.input({payload:{}});
	});
});

