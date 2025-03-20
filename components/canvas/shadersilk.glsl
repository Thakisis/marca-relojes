// The MIT License
// Copyright © 2024 Giorgi Azmaipharashvili
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// ===== ADJUSTABLE PARAMETERS =====
// Color parameters
#define DARK_GOLD vec3(0.12, 0.08, 0.02)    // Darkest gold color
#define MID_GOLD vec3(0.25, 0.18, 0.05)     // Medium gold color
#define BRIGHT_GOLD vec3(1.0, 0.8, 0.2)     // Brightest gold for highlights

// Fabric parameters
#define FABRIC_DENSITY 0.0006               // Detail density of the fabric texture
#define BASE_VARIATION 0.3                  // Amount of base color variation (0-1)
#define HIGHLIGHT_INTENSITY 2.0             // Intensity of bright highlights
#define HIGHLIGHT_SIZE 0.1                  // Size of highlights
#define HIGHLIGHT_THRESHOLD 0.3             // Highlight threshold (higher = fewer highlights)
#define HIGHLIGHT_CONTRAST 4.0              // Highlight sharpness
#define SHINE_INTENSITY 0.6                 // Intensity of dimensional shine

// Ripple parameters
#define RIPPLE_FREQUENCY_PRIMARY 5.0        // Primary ripple frequency
#define RIPPLE_FREQUENCY_SECONDARY 12.0     // Secondary ripple frequency
#define RIPPLE_AMPLITUDE 0.03               // Ripple movement amplitude
#define RIPPLE_SPEED 8.0                    // Ripple movement speed
#define RIPPLE_DIMENSION 0.005              // Ripple dimensional effect

#define INVERT 0
float noise(vec2 p) {
    return smoothstep(-0.5, 0.9, sin((p.x - p.y) * 555.0) * sin(p.y * 1444.0)) - 0.4;
}

float fabric(vec2 p) {
    const mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    float f = 0.4 * noise(p);
    f += 0.3 * noise(p = m * p);
    f += 0.2 * noise(p = m * p);
    return f + 0.1 * noise(m * p);
}

float silk(vec2 uv, float t) {
    float s = sin(RIPPLE_FREQUENCY_PRIMARY * (uv.x + uv.y + cos(2.0 * uv.x + 5.0 * uv.y)) + 
               sin(RIPPLE_FREQUENCY_SECONDARY * (uv.x + uv.y)) - t);
    s = 0.7 + 0.3 * (s * s * 0.5 + s);
    s *= 0.9 + 0.6 * fabric(uv * min(iResolution.x, iResolution.y) * FABRIC_DENSITY);
    return s * 0.9 + 0.1;
}

float silkd(vec2 uv, float t) {
    float xy = uv.x + uv.y;
    float d = (RIPPLE_FREQUENCY_PRIMARY * (1.0 - 2.0 * sin(2.0 * uv.x + 5.0 * uv.y)) + 
              RIPPLE_FREQUENCY_SECONDARY * cos(RIPPLE_FREQUENCY_SECONDARY * xy)) * 
              cos(RIPPLE_FREQUENCY_PRIMARY * (cos(2.0 * uv.x + 5.0 * uv.y) + xy) + 
              sin(RIPPLE_FREQUENCY_SECONDARY * xy) - t);
    return RIPPLE_DIMENSION * d * (sign(d) + 3.0);
}

float highlight(vec2 uv, float t) {
    vec2 dir = vec2(0.5, 0.5);
    float pattern = silk(uv + dir * HIGHLIGHT_SIZE, t) - silk(uv - dir * HIGHLIGHT_SIZE, t);
    return pow(max(0.0, pattern + HIGHLIGHT_THRESHOLD), HIGHLIGHT_CONTRAST) * HIGHLIGHT_INTENSITY; 
}

vec3 goldSilkColor(float base, float dimension, float highlightFactor) {
    // Start with very dark base
    vec3 c = DARK_GOLD;
    
    // Add subtle variation in the base fabric
    c = mix(c, MID_GOLD, base * BASE_VARIATION);
    
    // Add intense but small gold highlights only where needed
    c = mix(c, BRIGHT_GOLD, highlightFactor);
    
    // Add slight gold shine based on fabric dimension
    c += vec3(0.15, 0.12, 0.03) * max(0.0, dimension * SHINE_INTENSITY);
    
    return c;
}

void mainImage(out vec4 fragColor, vec2 fragCoord) {
    float mr = min(iResolution.x, iResolution.y);
    vec2 uv = fragCoord / mr;
    
    float t = iTime;
    // Apply ripple movement
    uv.y += RIPPLE_AMPLITUDE * sin(RIPPLE_SPEED * uv.x - t);
    
    // Apply mouse interaction
    if (iMouse.z > 1.0) {
        uv += smoothstep(0.5, 0.0, distance(iMouse.xy / mr, uv)) * 0.08;
    }
    
    // Calculate fabric properties
    float s = silk(uv, t);
    float d = silkd(uv, t);
    float h = highlight(uv, t);
    
    // Get final color
    vec3 c = goldSilkColor(s, d, h);
    
    // Enhance contrast
    c = pow(c, vec3(0.95));
    
    fragColor = vec4(c, 1);
}