#pragma glslify: pnoise = require(glsl-noise/periodic/3d)

varying vec2  v_uv;
varying vec3  v_line_color;
varying vec3 vNormal;
varying vec3 vWorldPosition;


uniform float time;
uniform float speed;
uniform float elevation;
uniform float noise_range;
uniform float perlin_passes;
uniform float sombrero_amplitude;
uniform float sombrero_frequency;
uniform vec3  line_color;
varying float z;

#define M_PI 3.1415926535897932384626433832795
// chunk(shadowmap_pars_vertex);

void main()
{
    gl_PointSize = 1.;
    v_uv          = uv;
    v_line_color   = line_color;

    // First perlin passes

    float displacement  = pnoise( .4 * position + vec3( 0, speed * time, 0 ), vec3( 100.0 ) ) * 1. * noise_range;

    if( perlin_passes > 2.0 ){
      displacement       += pnoise( 2. * position + vec3( 0, speed * time * 5., 0 ), vec3( 100. ) ) * .3 * noise_range;
      displacement       += pnoise( 8. * position + vec3( 0, speed * time * 20., 0 ), vec3( 100. ) ) * .1 * noise_range;

    }
    else if(perlin_passes > 1.0){
      displacement       += pnoise( 8. * position + vec3( 0, speed * time * 20., 0 ), vec3( 100. ) ) * .1 * noise_range;
    }


    float distance = sqrt(((uv.x-0.5) * (uv.x-0.5)) + ((uv.y-0.5) * (uv.y-0.5)));
    float z = (sombrero_amplitude * sin(((time * 0.5 * speed) - (distance * sombrero_frequency)) * M_PI));


    // Sinus
    displacement = displacement + (sin(position.x / 2. - M_PI / 2.)) * elevation;

    vec3 newPosition = vec3(position.x,position.y,displacement + z);


    z = newPosition.z;

    vNormal = normalMatrix * normal;

    vec4 worldPosition = projectionMatrix * modelViewMatrix * vec4( newPosition, 1. );
    // chunk(shadowmap_pars_vertex);

    vWorldPosition = worldPosition.xyz;

    gl_Position = worldPosition;
}
