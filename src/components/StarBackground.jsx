import React, { useEffect, useRef } from 'react';

const StarBackground = () => {
  const canvasRef = useRef(null);

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

    // ── Stars ──
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.2,
      a: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.007 + 0.003,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));

    // ── Floating orbs (large glow blobs) ──
    const orbs = [
      { x: 0.15, y: 0.2,  r: 220, color: '34,211,238',   a: 0.045 },
      { x: 0.85, y: 0.7,  r: 180, color: '167,139,250',  a: 0.04 },
      { x: 0.5,  y: 0.9,  r: 160, color: '232,93,93',    a: 0.035 },
      { x: 0.7,  y: 0.15, r: 130, color: '34,211,238',   a: 0.03 },
    ];

    // ── Drifting network nodes ──
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.6,
      color: Math.random() > 0.5 ? '34,211,238' : '167,139,250',
    }));

    // ── Matrix rain columns ──
    const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const COL_W = 22;
    const cols = [];
    const initCols = () => {
      cols.length = 0;
      const count = Math.floor(W / COL_W);
      for (let i = 0; i < count; i++) {
        if (Math.random() > 0.78) {
          cols.push({
            x: i * COL_W + COL_W / 2,
            y: Math.random() * H * -1,
            speed: Math.random() * 1.2 + 0.5,
            chars: Array.from({ length: Math.floor(Math.random() * 12 + 5) }, () =>
              CHARS[Math.floor(Math.random() * CHARS.length)]
            ),
            alpha: Math.random() * 0.07 + 0.02,
          });
        }
      }
    };
    initCols();

    // ── Scanline grid ──
    const drawGrid = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(34,211,238,0.018)';
      ctx.lineWidth = 0.5;
      const gapX = 80, gapY = 80;
      for (let x = 0; x < W; x += gapX) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gapY) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();
    };

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Grid
      drawGrid();

      // Orbs
      orbs.forEach(o => {
        const grad = ctx.createRadialGradient(o.x * W, o.y * H, 0, o.x * W, o.y * H, o.r);
        grad.addColorStop(0, `rgba(${o.color},${o.a})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x * W, o.y * H, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Stars
      stars.forEach(s => {
        s.a += s.speed * s.dir;
        if (s.a >= 0.75) s.dir = -1;
        if (s.a <= 0.05) s.dir = 1;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });

      // Matrix rain
      ctx.font = '11px "JetBrains Mono", monospace';
      cols.forEach(col => {
        col.y += col.speed;
        if (col.y > H + 200) col.y = -200;
        col.chars.forEach((ch, i) => {
          const cy = col.y + i * 14;
          if (cy < 0 || cy > H) return;
          const brightness = Math.max(0, 1 - i / col.chars.length);
          const a = col.alpha * brightness;
          ctx.fillStyle = `rgba(34,211,238,${a.toFixed(3)})`;
          ctx.fillText(ch, col.x, cy);
        });
        // Refresh chars occasionally
        if (frame % 18 === 0) {
          const ri = Math.floor(Math.random() * col.chars.length);
          col.chars[ri] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      });

      // Network nodes + connections
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},0.4)`;
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) {
            const a = (1 - d / 160) * 0.09;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(34,211,238,${a})`;
            ctx.lineWidth = 0.8;
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
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'linear-gradient(135deg, #040408 0%, #060612 50%, #040408 100%)',
      }}
    />
  );
};

export default StarBackground;
