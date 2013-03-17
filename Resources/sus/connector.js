/*global L, Ti, Titanium, models, sus, cust*/
/*jslint nomen: true, sloppy : true, plusplus: true, vars: true, newcap: true*/
var Connector = function(conn, data, onLoad, onError) {
	try {
		var contenttype, enctype, connectiontype;
		if (!(conn.url)) {
			throw new Error('URL not set');
		}
		if (!(data) && (conn.connectiontype === 'POST')) {
			throw new Error('no form data specified');
		}
		if (!(conn.contenttype)) {
			contenttype = 'application/x-www-form-urlencoded';
		} else {
			contenttype = conn.contenttype;
		}
		if (!(conn.enctype)) {
			enctype = 'text/html';
		} else {
			enctype = conn.enctype;
		}
		if (!(conn.connectiontype)) {
			if (data) {
				connectiontype = 'POST';
			} else {
				connectiontype = 'GET';
			}
		} else if (conn.connectiontype !== 'POST' && conn.connectiontype !== 'GET' && conn.connectiontype !== 'PUT' && conn.connectiontype !== 'DELETE') {
			throw new Error('invalid connection type');
		}

		if (!(onLoad)) {
			throw new Error('onLoad must be a function');
		} 
		if (!(onError)) {
			throw new Error('onError must be a function');
		} 
		var xhr = Titanium.Network.createHTTPClient();
		
		xhr.open(conn.connectiontype, conn.url, true);
		xhr.setRequestHeader('Content-Type', contenttype);
		xhr.setRequestHeader('enctype', enctype);
		xhr.setRequestHeader("X-Requested-With", "Titanium");
		xhr.setRequestHeader("X-API-KEY", "xu897Epunar6WrAJeQUzUbusaREcrEY7be3h");
		xhr.validatesSecureCertificate = false;
		xhr.enableKeepAlive = false;
		
		if (data) {
			xhr.send(data);
		} else {
			xhr.send();
		}
		
		xhr.onload = onLoad;
		xhr.onerror = onError;
		
	} catch(ex) {
	    
		Ti.API.error(ex.message || ex);
		
	} finally {
	    
		if (!(this instanceof Connector)) {
			return new Connector(conn, data, onLoad, onError);
		}
	
	}
};
exports.create = function(conn, data, onLoad, onError) {
	var connector = new Connector(conn, data, onLoad, onError);
	return connector;
};
