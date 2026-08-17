import React, { useEffect, useRef, useCallback } from 'react';

const StarBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let W, H;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    // Stars
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.3 + 0.2,
      a: Math.random() * 0.5 + 0.08,
      speed: Math.random() * 0.005 + 0.002,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    // Ambient glow orbs
    const orbs = [
      { x: 0.12, y: 0.18, r: 250, color: '34,211,238', a: 0.035 },
      { x: 0.88, y: 0.72, r: 200, color: '167,139,250', a: 0.03 },
      { x: 0.5, y: 0.92, r: 180, color: '232,93,93', a: 0.025 },
    ];

    // Network nodes
    const nodes = Array.from({ length: 22 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.5,
      color: ['34,211,238', '167,139,250', '232,93,93'][Math.floor(Math.random() * 3)],
    }));

    // Subtle hex grid
    const drawHexGrid = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(34,211,238,0.012)';
      ctx.lineWidth = 0.5;
      const size = 50;
      const h = size * Math.sqrt(3);
      for (let row = -1; row < H / h + 1; row++) {
        for (let col = -1; col < W / (size * 1.5) + 1; col++) {
          const cx = col * size * 1.5;
          const cy = row * h + (col % 2 ? h / 2 : 0);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = cx + size * 0.5 * Math.cos(angle);
            const py = cy + size * 0.5 * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Hex grid
      drawHexGrid();

      // Ambient orbs
      orbs.forEach(o => {
        const grad = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r);
        grad.addColorStop(0, `rgba(${o.color},${o.a})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x * W, o.y * H, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mouse interactive glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        grad.addColorStop(0, 'rgba(34,211,238,0.04)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mx, my, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stars
      stars.forEach(s => {
        s.a += s.speed * s.dir;
        if (s.a >= 0.65) s.dir = -1;
        if (s.a <= 0.04) s.dir = 1;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });

      // Network
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},0.3)`;
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            const a = (1 - d / 150) * 0.07;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(34,211,238,${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'linear-gradient(160deg, #030306 0%, #060610 40%, #0a0810 100%)',
      }}
    />
  );
};

export default StarBackground;
