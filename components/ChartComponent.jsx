import { useEffect, useRef } from "react";

export default function ChartComponent({ data = [], height = 200 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Simple line drawing (minimal)
    if (data.length === 0) {
      ctx.fillStyle = "#94a3b8";
      ctx.fillText("No data", 10, 20);
      return;
    }

    const padding = 20;
    const w = canvas.width - padding * 2;
    const h = canvas.height - padding * 2;
    const max = Math.max(...data);
    const min = Math.min(...data);
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((val, i) => {
      const x = padding + (i / (data.length - 1 || 1)) * w;
      const y = padding + (1 - (val - min) / ((max - min) || 1)) * h;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      ctx.fillStyle = "#111827";
      ctx.fillRect(x-1, y-1, 2, 2);
    });

    ctx.stroke();
  }, [data]);

  return <canvas ref={canvasRef} width={600} height={height} className="w-full" />;
}