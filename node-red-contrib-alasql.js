
module.exports = function(RED) {
	var alasql = require('alasql');

	function AlasqlNodeIn(config) {
		RED.nodes.createNode(this,config);
        var node = this;
        node.query = config.query;
		node.on("input", function(msg) {
			var sql = this.query||'SELECT * FROM ?';
			var bind = Array.isArray(msg.payload) ? [msg.payload] : [[msg.payload]];
			alasql.promise(sql, bind)
				.then(function(res){
					msg.payload = res;
					node.send(msg);
				}).catch(function(err){
					node.error(err,msg);
				});
		});
			
	}
	RED.nodes.registerType("alasql",AlasqlNodeIn);
};
