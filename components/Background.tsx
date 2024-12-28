"use client"
import { PropsWithChildren, useEffect, useRef } from 'react';

const SPEED = 4;
const DRAG = 0.01;
const NEIGHBOR_RADIUS = 100;
const ALIGNMENT = 30;
const COHESION = 10;
const SEPARATION = 30;
const SEPARATION_RING = 0.3;
const COLOR_LERP = 1;

function calculateAngularForce(current: number, target: number): number {
    const TWO_PI = 2 * Math.PI;

    // Normalize angles to [0, 2π)
    current = current % TWO_PI;
    target = target % TWO_PI;

    // Calculate shortest angular error
    let error = target - current;
    if (error > Math.PI) error -= TWO_PI;
    if (error < -Math.PI) error += TWO_PI;

    return error;
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function sum(x: number[]) {
    return x.reduce((a, b) => a + b, 0);
}

class Boid {
    x = 0;
    y = 0;
    vx = 0;
    vy = 0;
    size = 0;
    speed = 0;
    angle = 0;
    angularVelocity = 0;

    r = 0; 
    g = 0;
    b = 0;
    leader_r = 0; 
    leader_g = 0;
    leader_b = 0;
}

class Game {

    private boids: Boid[] = [];

    constructor(
        private ctx: CanvasRenderingContext2D,
    ) {}

    start() {
        const { width, height } = this.ctx.canvas;

        for (let i = 0; i < 100; i++) {
            const b = new Boid();
            b.x = Math.random() * width;
            b.y = Math.random() * height;
            b.angle = Math.random() * 6.28;
            b.angularVelocity = (Math.random() - 0.5) * 1;

            b.size = 4 + 3 * Math.random();
            b.speed = SPEED * b.size;

            const c = 0.8;
            b.r = b.leader_r = (1 - c) + c * Math.random();
            b.g = b.leader_g = (1 - c) + c * Math.random();
            b.b = b.leader_b = (1 - c) + c * Math.random();

            this.boids.push(b);
        }
    }

    getFlock(self: Boid) {
        const { width, height } = this.ctx.canvas;
        const neighbors: { boid: Boid, dist: number }[] = [];

        for (const boid of this.boids) {
            let nearestDist = 1e10;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    const x = boid.x + i * width;
                    const y = boid.y + j * height;

                    const dist = Math.hypot(x - self.x, y - self.y);
                    nearestDist = Math.min(nearestDist, dist);
                }
            }
            if (nearestDist < NEIGHBOR_RADIUS) {
                neighbors.push({ boid, dist: nearestDist });
            }
        }
        return neighbors;
    }

    update(dt: number) {
        const { width, height } = this.ctx.canvas;

        for (const boid of this.boids) {

            const neightboring = this.getFlock(boid);
            const others = neightboring.filter(b => b.boid != boid);
            const closest = others.filter(b => b.dist < NEIGHBOR_RADIUS * SEPARATION_RING);

            if (others.length > 0) {
                // color
                const leader_r = neightboring[0].boid.leader_r;
                const leader_g = neightboring[0].boid.leader_g;
                const leader_b = neightboring[0].boid.leader_b;
                boid.r = lerp(boid.r, leader_r, COLOR_LERP * dt);
                boid.g = lerp(boid.g, leader_g, COLOR_LERP * dt);
                boid.b = lerp(boid.b, leader_b, COLOR_LERP * dt);

                let sum_of_forces = 0;

                // alignment
                const avg_vx = sum(others.map(b => b.boid.vx)) / others.length;
                const avg_vy = sum(others.map(b => b.boid.vy)) / others.length;
                const alignment_angle = Math.atan2(avg_vy, avg_vx);
                const alignment_force = calculateAngularForce(boid.angle, alignment_angle);
                sum_of_forces += ALIGNMENT * alignment_force;

                // cohesion
                const avg_x = sum(others.map(b => b.boid.x)) / others.length;
                const avg_y = sum(others.map(b => b.boid.y)) / others.length;
                const avg_x_rel = avg_x - boid.x;
                const avg_y_rel = avg_y - boid.y;
                const cohesion_angle = Math.atan2(avg_y_rel, avg_x_rel);
                const cohesion_force = calculateAngularForce(boid.angle, cohesion_angle);
                sum_of_forces += COHESION * cohesion_force;

                // separation
                if (closest.length > 0) {
                    const avg_near_x = sum(closest.map(b => b.boid.x)) / closest.length;
                    const avg_near_y = sum(closest.map(b => b.boid.y)) / closest.length;
                    const avg_near_x_rel = avg_near_x - boid.x;
                    const avg_near_y_rel = avg_near_y - boid.y;
                    const separation_angle = Math.atan2(-avg_near_y_rel, -avg_near_x_rel);
                    const separation_force = calculateAngularForce(boid.angle, separation_angle);
                    sum_of_forces += SEPARATION * separation_force;
                }

                boid.angularVelocity += sum_of_forces * dt;
            }

            boid.angle += dt * boid.angularVelocity;
            boid.angularVelocity *= DRAG * dt;

            boid.vx = boid.speed * Math.cos(boid.angle);
            boid.vy = boid.speed * Math.sin(boid.angle);
            boid.x += boid.vx * dt;
            boid.y += boid.vy * dt;

            boid.x = (boid.x + width) % width;
            boid.y = (boid.y + height) % height;
        }
    }

    draw() {
        const { ctx } = this;
        const { width, height } = ctx.canvas;

        // clear
        ctx.clearRect(0, 0, width, height);
        
        // boids
        // ctx.strokeStyle = '#ffffff';
        // ctx.lineWidth = 1;

        for (const boid of this.boids) {
            ctx.translate(boid.x, boid.y);
            ctx.rotate(boid.angle);

            const col = [ boid.r, boid.g, boid.b ]
                .map(c => Math.min(Math.max(0, Math.floor(255 * c)), 255))
                .join(', ');
            ctx.fillStyle = `rgb(${col})`;
            // console.log(ctx.fillStyle);

            const a = boid.size;
            const b = boid.size;

            ctx.beginPath();
            ctx.moveTo(-0.5*a, 0);
            ctx.lineTo(-a, b);
            ctx.lineTo(a, 0);
            ctx.lineTo(-a, -b);
            ctx.lineTo(-0.5*a, 0);
            ctx.fill();
            // ctx.stroke();
            
            ctx.resetTransform();
        }
    }
}


interface BackgroundProps {

}

const Background = ({}: PropsWithChildren<BackgroundProps>) => {
    const divRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const resize = () => {
        const rect = divRef.current!.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const canv = canvasRef.current!;
        canv.width = width;
        canv.height = height;
    };

    useEffect(() => {
        resize();

        const canv = canvasRef.current!;
        const ctx = canv.getContext('2d');
        if (!ctx) return;

        const game = new Game(ctx);
        game.start();

        let isRunning = true;

        let lastMillis = new Date().getMilliseconds();

        const animate = () => {
            if (isRunning) {
                requestAnimationFrame(animate);
            }

            const newMillis = new Date().getMilliseconds();
            const dt = (newMillis - lastMillis) / 1000.0;
            lastMillis = newMillis;

            if (dt > 0) {
                game.update(dt);
                game.draw();
            }
        };
        requestAnimationFrame(animate);

        return () => {
            isRunning = false;
        };
    }, []);

    return (
        <div className='w-full h-full overflow-hidden fade-in blur-sm saturate-150' ref={divRef} onResize={resize}>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default Background;