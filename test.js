var $container = $("#container"),
    template1 = $('#t1')[0],
    template2 = $('#t2')[0],
    template3 = $('#t3')[0],
    template4 = $('#t4')[0];
    template5Item = $('#t5-item')[0];
    template5List = $('#t5-list')[0];

// simple templating
$container.append( vroom.create(template1) );
$container.append( vroom.create('<div>No props, template as string</div>') );

// interpolation of props
$container.append( vroom.create(template2, {content: 'Props as content'}) );
$container.append( vroom.create(template3, {className: 'bold'}) );

// nesting
var vElement = vroom.create('<div>Yeah it does</div>');
$container.append( vroom.create(template4, {element: vElement}) );

// iteration
var fruits = ['iteration', 'house', 'banana', 'whale', 'cube'];
var vItems = fruits.map(function (fruit) {
    return vroom.create(template5Item, {fruit: fruit})
});
$container.append( vroom.create(template5List, {fruits: vItems}) );

// iteration with template as string
$container.append( vroom.create(template5List, {
    fruits: vItems
}) );


