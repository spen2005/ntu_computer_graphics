 //*************************************************
    // Initialization functions
    //*************************************************
function initGL(canvas) {
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewportWidth  = canvas.width;
        gl.viewportHeight = canvas.height;
    } 
    catch (e) {
    }

    if (!gl) {
        alert("Could not initialise WebGL");
    }
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var shaderSource = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            shaderSource += k.textContent;
        }

        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } 
    else if (shaderScript.type == "vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } 
    else {
        return null;
    }

    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}