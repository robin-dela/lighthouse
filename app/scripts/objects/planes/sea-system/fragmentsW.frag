varying vec2 v_uv;
varying vec3 v_line_color;

varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform vec3 lightPosition;
uniform float lightMinIntensity;
uniform float lightIntensity;

uniform float alphaMap;

#define M_PI 3.1415926535897932384626433832795

// chunk(shadowmap_pars_fragment);

void main(void)
{
   vec4 temp;

   float finalAlpha = sin(v_uv.x * M_PI);
   temp = vec4(v_line_color, finalAlpha);

   vec3 lightDirection = normalize(lightPosition - vWorldPosition);

   vec3 outgoingLight = vec3(1.0);
   // chunk(shadowmap_pars_fragment);

   float c = lightMinIntensity + max(0.0, dot(vNormal, lightDirection)) * lightIntensity;
   vec4 light = vec4(c, c, c, alphaMap);

   gl_FragColor = temp * light;

}
