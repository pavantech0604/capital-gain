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

void main() {
    vec2 uv = v_texCoord;
    vec3 color1 = vec3(0.05, 0.07, 0.1);
    vec3 color2 = vec3(0.06, 0.72, 0.5);
    
    float noise = sin(uv.x * 2.0 + u_time * 0.2) * cos(uv.y * 2.0 + u_time * 0.3);
    float glow = 0.05 / length(uv - 0.5 + 0.2 * vec2(sin(u_time * 0.1), cos(u_time * 0.15)));
    
    vec3 finalColor = mix(color1, color2 * 0.15, noise + glow);
    
    float grid = (sin(uv.x * 100.0) * 0.5 + 0.5) * (sin(uv.y * 100.0) * 0.5 + 0.5);
    finalColor += grid * 0.02;

    gl_FragColor = vec4(finalColor, 1.0);
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
      className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
