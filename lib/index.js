exports.createForm = function(fields, data, errors) {
  if (!fields) { fields = [] };
  if (!data) { data = {} };
  if (!errors) { errors = {} };

  output = "";
  
  output = output + start_html_element('form');
  
  for (var i=0; i < fields.length; i++) {
    output = output + start_html_element('input', fields[i]);
  };
  
  output = output + end_html_element('form');
  
  return output;
};

start_html_element = function(element, args) {
  output = "";
  output = output + "<" + element ;
  
  if (args) {
    for(var key in args) {
    	var value = args[key];
    	if (!value) {
    	  output = output + " " + key;
    	}else{
    	  output = output + " " + key + "='" + value + "'";
    	};
    }
  };
  
  output = output + ">\n";
  
  return output;
};

end_html_element = function(element) {
  output = "";
  output = output + "</" + element + ">\n";
  return output;
};