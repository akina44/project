var canvas;
var gl;

var bufferNum1, bufferNum2, num1Vertices, num2Vertices;
var vPosition;
var transformationMatrix, transformationMatrixLoc;

var rot = 0;
var pos = vec2(0,0);
var scale = vec2(1,1);
var color = [1.0, 0, 0, 1];
var colorLoc;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Make the numbers
    num1Vertices = [ //vertices of digit '0'
        
    vec2(  -0.5,  0.3 ),//v0
	vec2(  -0.4,  0.3 ),//v1
    vec2(  -0.5,  0.2 ),//v4
	vec2(  -0.4,  0.2 ),//v5
	vec2(  -0.5,  -0.2 ),//v16
	vec2(  -0.4,  -0.2 ),//v17
	vec2(  -0.5,  -0.3 ),//v20                                                3
	vec2(  -0.4,  -0.3 ),//v21
	vec2(  -0.4,  -0.2 ),//v17
	vec2(  -0.2,  -0.3 ),//v22
	vec2(  -0.2,  -0.2 ),//v18
	vec2(  -0.1,  -0.3 ),//v23
	vec2(  -0.1,  -0.2 ),//v19
	vec2(  -0.1,  0.2 ),//v7
	vec2(  -0.2,  -0.2 ),//v18
	vec2(  -0.2,  0.2 ),//v6
	vec2(  -0.2,  0.3 ),//v2
	vec2(  -0.1,  0.2 ),//v7
	vec2(  -0.1,  0.3 ),//v3
	vec2(  -0.5,  0.2 ),//v4
	vec2(  -0.5,  0.3 ),//v0
		
    ];

    num2Vertices = [//vertices of digit '4'
	
	vec2(  0.2,  0.3 ),//v0
	vec2(  0.1,  0.3 ),//v1
	vec2(  0.2,  0.1 ),//v8
	vec2(  0.1,  0.1 ),//v9
	vec2(  0.2,  0.0 ),//v12
	vec2(  0.1,  0.0 ),//v13
	vec2(  0.4,  0.1 ),//v11
	vec2(  0.4,  0.0 ),//v15
	vec2(  0.1,  0.1 ),//v9
	vec2(  0.1,  0.0 ),//v13
	vec2(  0.4,  0.0 ),//v15
	vec2(  0.4,  0.1 ),//v11
	vec2(  0.3,  -0.3 ),//v22
	vec2(  0.4,  -0.3 ),//v23
	vec2(  0.3,  0.3 ),//v2
	vec2(  0.4,  0.3 ),//v3
	
    ];
	//burada sayıları çizmek için 15 tane kare kullanmaya çalıştım.
	//TODO: create and load geometry
	//function setGeometry(){
	vec2(  -0.2,  0.3 ),//v0
	vec2(  -0.1,  0.3 ),//v1
    vec2(  -0.2,  0.2 ),//v4
	vec2(  -0.1,  0.2 ),//v5 1st row 1st square with triangle_strip     must use for 0,2,3,4,5,6,7,8,9
	
	vec2(  -0.1,  0.3 ),//v1
	vec2(  0.1,  0.3 ),//v2
	vec2(  -0.1,  0.2 ),//v5
	vec2(  0.1,  0.2 ),//v6 1st row 2nd square       must use for 0,2,3,5,6,7,8,9
	
	vec2(  0.1,  0.3 ),//v2
	vec2(  0.2,  0.3 ),//v3
	vec2(  0.1,  0.2 ),//v6
	vec2(  0.2,  0.2 ),//v7 1st row 3rd square		must use for 0,1,2,3,4,5,6,7,8,9
	
	vec2(  -0.2,  0.2 ),//v4
	vec2(  -0.1,  0.2 ),//v5
	vec2(  -0.2,  0.1 ),//v8
	vec2(  -0.1,  0.1 ),//v9 2nd row 1st square    must use for 0,4,5,6,8,9
	
	vec2(  -0.1,  0.2 ),//v5
	vec2(  0.1,  0.2 ),//v6
	vec2(  -0.1,  0.1 ),//v9
	vec2(  0.1,  0.1 ),//v10 2nd row 2nd square    no use (always empty)
	
	vec2(  0.1,  0.2 ),//v6
	vec2(  0.2,  0.2 ),//v7
	vec2(  0.1,  0.1 ),//v10
	vec2(  0.2,  0.2 ),//v11 2nd row 3rd square     must use for 0,1,2,3,4,7,8,9
	
	vec2(  -0.2,  0.1 ),//v8
	vec2(  -0.1,  0.1 ),//v9 
	vec2(  -0.2,  -0.1 ),//v12
	vec2(  -0.1,  -0.1 ),//v13 3rd row 1st square    must use for 0,2,3,4,5,6,8,9
	
	vec2(  -0.1,  0.1 ),//v9
	vec2(  0.1,  0.1 ),//v10
	vec2(  -0.1,  -0.1 ),//v13
	vec2(  0.1,  -0.1 ),//v14 3rd row 2nd square      must use for 2,3,4,5,6,8,9
	
	vec2(  0.1,  0.1 ),//v10
	vec2(  0.2,  0.1 ),//v11
	vec2(  0.1,  -0.1 ),//v14
	vec2(  0.2,  -0.1 ),//v15 3rd row 3rd square     must use for 0,1,2,3,4,5,6,7,8,9
	
	vec2(  -0.2,  -0.1 ),//v12
	vec2(  -0.1,  -0.1 ),//v13
	vec2(  -0.2,  -0.2 ),//v16
	vec2(  -0.1,  -0.2 ),//v17 4th row 1st square    must use for 0,2,6,8,
	
	vec2(  -0.1,  -0.1 ),//v13
	vec2(  0.1,  -0.1 ),//v14
	vec2(  -0.1,  -0.2 ),//v17
	vec2(  0.1,  -0.2),//v18 4th row 2nd square      no use (always empty)
	
	vec2(  0.1,  -0.1 ),//v14
	vec2(  0.2,  -0.1 ),//v15
	vec2(  0.1,  -0.2 ),//v18
	vec2(  0.2,  -0.2),//v19 4th row 3rd square      must use for 0,1,3,4,5,6,7,8,9
	
	vec2(  -0.2,  -0.2 ),//v16
	vec2(  -0.1,  -0.2 ),//v17
	vec2(  -0.2,  -0.3 ),//v20
	vec2(  -0.1,  -0.3 ),//v21 5th row 1st square    must use for 0,2,3,5,6,8,9
	
	vec2(  -0.1,  -0.2 ),//v17
	vec2(  0.1,  -0.2 ),//v18
	vec2(  -0.1,  -0.3 ),//v21
	vec2(  0.1,  -0.3 ),//v22 5th row 2nd square    must use for 0,2,3,5,6,8,9
	
	vec2(  0.1,  -0.2 ),//v18
	vec2(  0.2,  -0.2 ),//v19
	vec2(  0.1,  -0.3 ),//v22
	vec2(  0.2,  -0.3 ),//v23 5th row 3rd square    must use for 0,1,2,3,4,5,6,7,8,9
	//}
	

    // Load the data into the GPU
    bufferNum1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(num1Vertices), gl.STATIC_DRAW );

    // Load the data into the GPU
    bufferNum2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(num2Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    transformationMatrixLoc = gl.getUniformLocation( program, "transformationMatrix" );
	colorLoc = gl.getUniformLocation(program,"u_color");
	document.getElementById("inp_number").oninput = function(event) {
        //TODO: fill here to adjust number to display input value
		
		console.log(event.data);
	
		
		
		
    };
	
    document.getElementById("inp_objX").oninput = function(event) {
        pos[0] = event.target.value;
    };
    document.getElementById("inp_objY").oninput = function(event) {
        pos[1] = event.target.value;
    };
    document.getElementById("inp_obj_scaleX").oninput = function(event) {
        scale[0] = event.target.value;
    };
    document.getElementById("inp_obj_scaleY").oninput = function(event) {
        scale[1] = event.target.value;
    };
    document.getElementById("inp_rotation").oninput = function(event) {
         rot = event.target.value;
    };
    document.getElementById("redSlider").oninput = function(event) {
        color[0] = event.target.value;
    };
    document.getElementById("greenSlider").oninput = function(event) {
        color[1] = event.target.value;
    };
    document.getElementById("blueSlider").oninput = function(event) {
        color[2] = event.target.value;
    };

    render();

};


function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );

	//TODO: send color to shader
	//TODO: calculate and send transformation matrix OK
	//TODO: draw digits
	
    transformationMatrix = mat4();
    transformationMatrix = mult(transformationMatrix, translate(pos[0], pos[1], 0));
    transformationMatrix = mult(transformationMatrix, rotateZ(rot));
    transformationMatrix = mult(transformationMatrix, scalem(scale[0], scale[1], 1));
	
    gl.uniformMatrix4fv( transformationMatrixLoc, false, flatten(transformationMatrix) );
    gl.uniform4fv(colorLoc, flatten(color) );

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 21 );
	
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 16 );

    window.requestAnimFrame(render);
}

