vroom = {
  interpolate: function (key, prop) {
    'use strict';
    if (Array.isArray(prop)) {
      return prop.map(function (p) { return p.outerHTML; }).join('');
    } else if (prop instanceof Element || prop instanceof HTMLDocument) {
      return prop.outerHTML;
    } else {
      return prop;
    }
  },
  htmlToElement: function (html) {
    'use strict';

    var template = document.createElement('template');
    template.innerHTML = html.trim();// Never return a text node of whitespace as the result
    return template.content.firstChild;
  },
  create: function (template, props) {
    'use strict';
    try {
      var html = typeof template === 'string' ? template : template.innerHTML;
      if (props) {
        html = html.replace(/({:)(\w+)(:})/g, function(match) {
          var key = match.slice(2, -2);
          return this.interpolate(key, props[key]);
        }.bind(this));
      }

      // if IE, use jQuery
      return window.document.documentMode ? $(html)[0] : this.htmlToElement(html);
    } catch (err) {
      // throw new Error('Vroom Error:', err);
      console.log(err);
    }
  }
}

// const container = document.getElementById("container");

// const div = document.getElementById("template-div");
// const strTemplate = document.getElementById("template-string");
// const td = document.getElementById("template-td");
// container.appendChild(vroom.create(div));
// container.appendChild(vroom.create(strTemplate));

// const blue = document.getElementById("template-blue");
// const blueClass = document.getElementById("template-blue-class");
// const vBlue = vroom.create(blue, {text: 'yo'});
// container.appendChild(vBlue);
// container.appendChild(vroom.create('<div class="blue">template as string with props: {:text:}</div>', {text: 'yo'}));
// container.appendChild(vroom.create(blueClass, {className: 'blue'}));

// const silver = document.getElementById("template-silver");
// container.appendChild(vroom.create(silver, {element: vBlue}));

// const li = document.getElementById("template-li");
// const fruits = ['house', 'banana', 'whale', 'cube'];
// const items = fruits.map(function (f) { return vroom.create(li, {fruit: f}) });

// const orange = document.getElementById("template-orange");
// container.appendChild(vroom.create(orange, {fruits: items}));

// const gold = document.getElementById("template-gold");
// container.appendChild(vroom.create(gold, {
//   fruits: fruits.map(function (f) { return vroom.create('<li>{:fruit:}</li>', {fruit: f}); })
// }));


// const red = document.getElementById("template-red");

