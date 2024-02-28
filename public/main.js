const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  throw new Error("Tidak Support WebGL");
}

alert("Silahkan Klik OK");

// atur ukuran canvas yang digunakan
canvas.width = 800; // ini ukuran lebar dalam pixel
canvas.height = 600; // ini ukuran tinggi dalam pixel

// bersihkan layer
gl.clearColor(0, 0, 0, 1); // Updated alpha value to 1
gl.clear(gl.COLOR_BUFFER_BIT);

// membuat data koordinat titik
const points = [
  0.0, 0.0, // titik 1
  0.5, 0.2, // titik 2
  -0.1, 0.3, // titik 3
  0.3, -0.4, // titik 4
  -0.8, -0.2, // titik 5
  0.9, 0.7, // titik 6
  -0.4, 0.6, // titik 7
  0.7, -0.8, // titik 8
  -0.2, 0.5, // titik 9
  0.9, -0.6 // titik 10
];

// Membuat buffer untuk data posisi titik
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

// Membuat vertex shader
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
      gl_PointSize = 10.0; // Ukuran titik
      gl_Position = vec4(a_position, 0.0, 1.0); // Posisi titik
  }
`;

// Membuat fragment shader
const fragmentShaderSource = `
  void main() {
      gl_FragColor = vec4(1, 1, 0, 1); // Warna titik
  }
`;

// membuat prog shader dan menghubungkan shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER); // Added this line
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);

// Membuat program shader
const shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Mendapatkan lokasi atribut posisi dari shader
const positionAttributeLocation = gl.getAttribLocation(
  shaderProgram,
  "a_position"
);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

// Menggambar titik
gl.drawArrays(gl.POINTS, 0, 10); // Updated the number of points to draw
