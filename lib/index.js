var Formed = function(object, url, options, method) {
  if (!options) { options = {}; }
  this.object = object;
  this.url = url;
  this.options = options;
  this.method = method;
  
  // Reset or set some defaults here
  this.labels = this.options.labels ? true : false;
  this.errors = this.options.errors ? true : false;
};

Formed.prototype.start = function() {
  var str = '';
  str = str + "<form method='POST' ";
  str = str + "action='" + this.url + "' ";
  str = str + createOptionsString(this.options);
  str = str + ">";
  
  if (!this.object.isNewRecord || this.method) {
    str = str + "\n<input type=\"hidden\" name=\"_method\" value=\"" + this.method + "\" />";
  }
  return str;
};

Formed.prototype.input = function(name, options) {
  var out_str = "";
  out_str = out_str + "<input ";
  out_str = out_str + "name='" + name + "' ";
  out_str = out_str + createOptionsString(options);
  
  if (this.object[name]) {
     out_str = out_str + "value=\"" + this.object[name] + "\" ";
  }
  return out_str + ">";
};

Formed.prototype.textarea = function(name, options) {
  var out_str = "";
  out_str = out_str + "<textarea ";
  out_str = out_str + "name='" + name + "' ";
  out_str = out_str + createOptionsString(options) + ">";
  
  if (this.object[name]) {
     out_str = out_str + this.object[name];
  }
  return out_str + "</textarea>";
};

Formed.prototype.submit = function(text, options) {
  return "<input type=\"submit\" value=\"" + text + "\" " + createOptionsString(options) + "/>";
};

Formed.prototype.end = function() {
  return "</form>";
};

var createOptionsString = function(options) {
  var options_str = "";
  for(var key in options){
    options_str = options_str + key.valueOf() + " ";
    if (options[key] !== null) {
      options_str = options_str + "='" + options[key] + "' ";
    }
  }
  return options_str;
};

module.exports = Formed;