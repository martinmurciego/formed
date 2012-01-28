var Formed = function(object, url, options, errors) {
  if (!options) { options = {}; }
  this.object = object;
  this.url = url;
  this.options = options;
  this.method = this.options.method;
  
  delete this.options.method;
  
  // Reset or set some defaults here
  this.errors = errors || {};
  this.object_name = this.object.__factory.name;
};

Formed.prototype.start = function() {
  var str = '';

  str = str + "<form method=\"POST\" action=\"{url}\" {args}>".supplant(
    { url: this.url, 
      args: createOptionsString(this.options) }
  );

  if (!this.object.isNewRecord || this.method) {
    str = str + "\n<input type=\"hidden\" name=\"_method\" value=\"" + this.method + "\"/>";
  }
  return str;
};

Formed.prototype.label = function(name, text, options) {
  if (!options) { options = {}; }
  if (!text) { text = toTitleCase(name); }
  
  if (!options.for) {
    var for_attr = this.object_name.toLowerCase() + "_" + name;
  }else{
    var for_attr = options.for;
  }
  
  delete options.for;
  
  return "<label for=\"{for}\" {opts}>{text}</label>".supplant({
    for: for_attr,
    opts: createOptionsString(options),
    text: text
  });
};

Formed.prototype.input = function(name, options) {
  var str = "";
    
  if (!options.id) {
    options.id = this.object_name.toLowerCase() + "_" + name;
  }
  
  str = str + "<input name=\"{name}\" {options}".supplant({
    name: name,
    options: createOptionsString(options)
  });
  
  if (this.object[name]) {
    str = str + " value=\"{name}\"".supplant({
      name: this.object[name]
    });
  }
  return str + ">";
};

Formed.prototype.textarea = function(name, options) {
  var str = "";
  str = str + "<textarea ";
  str = str + "name=\"" + name + "\" ";
  str = str + createOptionsString(options) + ">";
  
  if (this.object[name]) {
     str = str + this.object[name];
  }
  return str + "</textarea>";
};

Formed.prototype.submit = function(text, options) {
  return "<input type=\"submit\" value=\"" + text + "\" " + createOptionsString(options) + "/>";
};

Formed.prototype.end = function() {
  return "</form>";
};

var createErrorString = function(text, tag, args) {
  if (!tag) { tag = 'div'; }
  if (!args){ args = {}; }
  return "<{tag} {args}>{text}<{tag}/>".supplant({ tag: tag, text: text, args: createOptionsString(args) });
}

var createOptionsString = function(options) {
  var options_str = "";
  var count = 0;
  for(var key in options){
    if (count > 0) {
      options_str = options_str + " ";
    };
    options_str = options_str + key.valueOf() + "";
    if (options[key] !== null) {
      options_str = options_str + "=\"" + options[key] + "\"";
    }
    count++;
  }
  
  return options_str;
};

var toTitleCase = function(toTransform) {
  return toTransform.replace(/\b([a-z])/g, function (_, initial) {
      return initial.toUpperCase();
  });
}

String.prototype.supplant = function (o) {
  return this.replace(/{([^{}]*)}/g,
    function (a, b) {
      var r = o[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    }
  );
};

module.exports = Formed;