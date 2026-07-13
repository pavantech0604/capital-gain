"use client";

import { useRef, useEffect } from "react";

export function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const observer = new ResizeObserver(syncSize);
    observer.observe(canvas);
    syncSize();

    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const glCtx = gl as WebGLRenderingContext;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;

float noise(vec2 p) {
    return sin(p.x * 1.5 + u_time * 0.15) * cos(p.y * 1.5 + u_time * 0.12) +
           0.5 * sin(p.x * 3.0 - u_time * 0.22) * cos(p.y * 4.0 + u_time * 0.18);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 aspectUv = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

    // Premium Warm Ivory Background (#FAF8F4)
    vec3 baseColor = vec3(0.98, 0.97, 0.957); 
    
    // Premium Orange Brand Color (#E67E22)
    vec3 orangeGlow = vec3(0.90, 0.49, 0.135);
    
    // Premium Gold Accent (#C9A227)
    vec3 goldGlow = vec3(0.79, 0.64, 0.15);

    // Noise fields for color distribution
    float n1 = noise(aspectUv * 1.8 + vec2(sin(u_time * 0.05), cos(u_time * 0.08)) * 0.5);
    float n2 = noise(aspectUv * 2.5 - vec2(cos(u_time * 0.07), sin(u_time * 0.04)) * 0.4);

    // Create glowing blobs
    float blob1 = smoothstep(0.1, 0.9, 0.45 / (length(aspectUv - vec2(sin(u_time * 0.12) * 0.6, cos(u_time * 0.09) * 0.4)) + 0.5));
    float blob2 = smoothstep(0.1, 0.9, 0.30 / (length(aspectUv - vec2(cos(u_time * 0.08) * 0.7, sin(u_time * 0.15) * 0.5)) + 0.6));

    // Combine colors based on blobs and noise (subtle color washes on the light background)
    vec3 mixedColor = mix(baseColor, orangeGlow, clamp(n1 + blob1, 0.0, 1.0) * 0.06);
    mixedColor = mix(mixedColor, goldGlow, clamp(n2 * blob2, 0.0, 1.0) * 0.03);

    // Refined dashboard dot grid overlay (36px cell spacing)
    vec2 gridSpace = v_texCoord * vec2(u_resolution.x / 36.0, u_resolution.y / 36.0);
    vec2 gridFract = fract(gridSpace);
    float dots = smoothstep(0.92, 0.96, 1.0 - length(gridFract - 0.5));
    
    // Fade dots near edges (vignette effect)
    float vignette = smoothstep(0.0, 0.5, uv.x) * smoothstep(1.0, 0.5, uv.x) *
                     smoothstep(0.0, 0.5, uv.y) * smoothstep(1.0, 0.5, uv.y);
                     
    mixedColor -= dots * 0.02 * vignette; // Darker dots on light background

    gl_FragColor = vec4(mixedColor, 1.0);
}`;

    const createShader = (type: number, src: string) => {
      const s = glCtx.createShader(type)!;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      return s;
    };

    const prog = glCtx.createProgram()!;
    glCtx.attachShader(prog, createShader(glCtx.VERTEX_SHADER, vs));
    glCtx.attachShader(prog, createShader(glCtx.FRAGMENT_SHADER, fs));
    glCtx.linkProgram(prog);
    glCtx.useProgram(prog);

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      glCtx.STATIC_DRAW
    );

    const pos = glCtx.getAttribLocation(prog, "a_position");
    glCtx.enableVertexAttribArray(pos);
    glCtx.vertexAttribPointer(pos, 2, glCtx.FLOAT, false, 0, 0);

    const uTime = glCtx.getUniformLocation(prog, "u_time");
    const uRes = glCtx.getUniformLocation(prog, "u_resolution");

    let animId: number;

    const render = (t: number) => {
      syncSize();
      glCtx.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) glCtx.uniform1f(uTime, t * 0.001);
      if (uRes) glCtx.uniform2f(uRes, canvas.width, canvas.height);
      glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
