exports.createForm = function(options) {
  if (!options) {
    options = {}
  };
  
  return create_html_element('form', {}, true)
};

create_html_element = function(element, args, should_close) {
  if (!should_close) {should_close = false};
  output = "";
  output = output + "<" + element + ">\n";
  if (should_close) {
    output = output + "</" + element + ">\n";
  };
  return output;
};