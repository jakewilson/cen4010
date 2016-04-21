var http = require('http');
function serialize(obj) {
  var str = [];
  for(var p in obj){
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

function xhr(method, endpoint, data, callback) {
  if(typeof(data) == 'object') {
    data = serialize(data);
  }
  var http_options = {
    port: 3000,
    method: method,
    path: endpoint,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
    },
  };

  var req = http.request(http_options, callback);
  req.write(data);
  req.end();
}

function post(endpoint, data, callback) {
  xhr('POST', endpoint, data, callback);
}

function get(endpoint, data, callback) {
  xhr('GET', endpoint, data, callback);
}

module.exports = {
  xhr: xhr,
  get: get,
  post: post,
  serializeData: serialize,
}