//stage
var stage = new Konva.Stage({
    container: "bucket",
    width: 400,
    height: 400
})


//Layer
var layer = new Konva.Layer({

})


//Shape
var circle = new Konva.Circle({
    x: stage.width()/2,
    y: stage.height()/2,
    radius: 60,
    fill: 'blue',
    stroke: 'red',
    strokeWidth: 4,
    shadowOffsetX: 20,
    shadowOffsetY: 20,
    shadowBlur: 30
})


//Shape to Layer
layer.add(circle);

// Layer to stage.
stage.add(layer);