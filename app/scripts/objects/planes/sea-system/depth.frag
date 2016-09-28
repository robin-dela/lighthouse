uniform float time;

void main() {

    vec3 offset = vec3(
        sin(position.x * 10.0 + time) * 15.0,
        sin(position.y * 10.0 + time + 31.512) * 15.0,
        sin(position.z * 10.0 + time + 112.512) * 15.0
    );

    vec3 pos = position + offset;

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);

    gl_Position = projectionMatrix * viewMatrix * worldPosition;

}
