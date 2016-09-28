void main(){
	vec4 p = vec4(position, 1.0);
	gl_Position = projectionMatrix * modelViewMatrix * p;
}
