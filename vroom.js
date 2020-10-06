/*
{{ }}       for evaluation
{{= }}      for interpolation
{{! }}      for interpolation with encoding
{{# }}      for compile-time evaluation/includes and partials
{{## #}}    for compile-time defines
{{? }}      for conditionals
{{~ }}      for array iteration
*/

vroom = function (template, props) {
  'use strict';

  var htmlToElement = function (html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  };

  var getPropVal = function (propName, prop) {
    if (propName[0] === '$') {
      return prop.outerHTML;
    } else {
      return prop;
    }
  }

  var html = template.innerHTML;

  if (props) {
    html = template.innerHTML.replace(/({:)\$?(\w+)(:})/g, function(match) {
      var propName = match.slice(2, -2),
        prop = props[propName];
      if (Array.isArray(prop)) {
        return prop.map(function (p) { return p[0].outerHTML; }).join('');
      } else {
        getPropVal(propName, prop);
      };
    });
  }
  return htmlToElement(html);
}

const container = document.getElementById("container");
const green = document.getElementById("template-green");
const blue = document.getElementById("template-blue");
const silver = document.getElementById("template-silver");
const red = document.getElementById("template-red");
const orange = document.getElementById("template-orange");
const gold = document.getElementById("template-gold");

container.appendChild(vroom(green));
const vBlue = vroom(blue, {text: 'yo'});
container.appendChild(vBlue);
container.appendChild(vroom(silver, {$text: vBlue}));
container.appendChild(vroom(red, {strings: ['yo', 'whats', 'up']}));
container.appendChild(vroom(orange));
container.appendChild(vroom(gold));