var Formed = function(object, url, options, method) {
  if (!options) { options = {}; }
  this.object = object;
  this.url = url;
  this.options = options;
  this.method = method;
  
  // Reset or set some defaults here
  this.errors = this.options.errors ? true : false;
  this.object_name = this.object.__definition.name;
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

Formed.prototype.label = function(name, text, options) {
  if (!options) { options = {}; }
  if (!text) { text = toTitleCase(name); }
  
  if (!options.for) {
    options.for = this.object_name.toLowerCase() + "_" + name;
  }
  return "<label for=\"" + options.for + "\">" + text + "</label>";
};

Formed.prototype.input = function(name, options) {
  var out_str = "";
  
  if (!options.id) {
    options.id = this.object_name.toLowerCase() + "_" + name;
  }
  
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
    options_str = options_str + key.valueOf() + "";
    if (options[key] !== null) {
      options_str = options_str + "='" + options[key] + "' ";
    }else{
      options_str = options_str + " ";
    }
  }
  return options_str;
};

var toTitleCase = function(toTransform) {
  return toTransform.replace(/\b([a-z])/g, function (_, initial) {
      return initial.toUpperCase();
  });
}

module.exports = Formed;