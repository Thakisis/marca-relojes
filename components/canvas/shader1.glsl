  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec3 col = u_color;
    float t = u_time * 0.5; // Ajustar la velocidad del tiempo
    
    
    // Ajustar las coordenadas del mouse para que estén en el rango adecuado
    vec2 mousePos = vec2(u_mouse.x / u_resolution.x, 1.0 - u_mouse.y / u_resolution.y);
    
    // Utilizar la posición del mouse para modificar las ondas
    
    float offsetX = (mousePos.x - 0.5) * 0.5;
    float offsetY = (mousePos.y - 0.5) * 0.5;
    vec2 n = vec2(1);
    vec2 q = vec2(1);
    vec2 p = uv; //+ vec2(offsetX, offsetY); // Añadir el offset del mouse
    
    float d = dot(p, p);
    float S = 8.0; // Ajustar la escala de las ondas para que sean más suaves
    
    // float a = -0.005;
    float a = 0.1;
    mat2 m = rotate2D(2.0);
    for (float j = 0.0; j < 6.0; j++) {
        p = m * p; // Corregir la asignación aquí
        
        n = m * n; // Corregir la asignación aquí
        
        q = p * S + t * 4.0 + sin(t * 1.0 - d * 8.0) * 0.0018 + 3.0 * j - 0.35 * n;
        a += dot(cos(q) / S, vec2(0.2));
        n -= sin(q);
        S *= 1.1; // Ajustar la velocidad de las ondas
    }
    col = vec3(0.0002, 0.0007, 0.0018) * (a  + 0.082) + 0.05 * a + a + d * 0.03 + u_color; // Darker water colors
    
    
    // col = vec3(0.0007, 0.0028, 0.007) * (a + 0.182) + 1.0 * a + a + d; // Darker water colors
    
    // Añadir brillo simulado
    vec2 center = vec2(0.0001, 0.0001);
    float dist = distance(uv, center);
    float glow = smoothstep(0.00, 0.00, dist); // Darker and narrower glow
    
    // col += vec3(0.0039, 0.00157, 0.00392) * glow;
    
    // col += vec3(0.0000, 0.00, 0.000);
    
    // Output to screen
    gl_FragColor = vec4(col, 1.0);