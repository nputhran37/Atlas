import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero = () => {
    const heroRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Animation observer for hero elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.animation = 'fadeUp 0.6s ease both';
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        const cards = document.querySelectorAll('.float-card, .hero-badge, h1, .hero-sub, .hero-actions');
        cards.forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });

        // THREE.JS SETUP
        if (!canvasRef.current || !heroRef.current) return;
        
        const canvas = canvasRef.current;
        const section = heroRef.current;
        let W = section.offsetWidth;
        let H = section.offsetHeight;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
        camera.position.set(0, 0, 8);

        // Lighting adapted to teal/lime
        const amb = new THREE.AmbientLight(0xe6f9af, 0.3); // lime ambient
        scene.add(amb);
        const pt1 = new THREE.PointLight(0x8bbeb2, 3, 20); // teal point
        pt1.position.set(3, 4, 4);
        scene.add(pt1);
        const pt2 = new THREE.PointLight(0x18314f, 2, 20); // navy point
        pt2.position.set(-4, -3, 3);
        scene.add(pt2);
        const pt3 = new THREE.PointLight(0xe6f9af, 1, 15); // lime point
        pt3.position.set(0, 0, 6);
        scene.add(pt3);

        // Materials adapted to new color scheme
        const mats = [
            new THREE.MeshStandardMaterial({ color: 0x8bbeb2, metalness: 0.8, roughness: 0.2 }), // teal
            new THREE.MeshStandardMaterial({ color: 0x18314f, metalness: 0.6, roughness: 0.3 }), // navy
            new THREE.MeshStandardMaterial({ color: 0xe6f9af, metalness: 0.7, roughness: 0.15, emissive: 0xe6f9af, emissiveIntensity: 0.05 }), // lime
            new THREE.MeshStandardMaterial({ color: 0x384e77, metalness: 0.7, roughness: 0.25 }), // slate
            new THREE.MeshStandardMaterial({ color: 0x0d0630, metalness: 0.5, roughness: 0.4 }), // deep
        ];

        const geos = [
            new THREE.IcosahedronGeometry(0.45, 0),
            new THREE.OctahedronGeometry(0.5, 0),
            new THREE.TetrahedronGeometry(0.45, 0),
            new THREE.BoxGeometry(0.6, 0.6, 0.6),
            new THREE.SphereGeometry(0.35, 8, 8),
            new THREE.CylinderGeometry(0, 0.45, 0.85, 5),
            new THREE.TorusGeometry(0.35, 0.14, 8, 16),
            new THREE.DodecahedronGeometry(0.42, 0),
        ];

        const meshes = [];
        const positions = [
            [-6, 3, 0], [6, 2, 1], [-5, -2, -1], [5, -3, 0],
            [-3, 5, -2], [3, 4, -1], [-7, 0, 1], [7, 1, -1],
            [0, 5, 2], [-4, -4, 0], [4, -5, 1], [2, -4, -1],
        ];

        positions.forEach((pos, i) => {
            const geo = geos[i % geos.length];
            const mat = mats[i % mats.length].clone();
            mat.transparent = true;
            mat.opacity = 0.55 + Math.random() * 0.3;
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(...pos);
            mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
            mesh.userData = {
                speed: 0.003 + Math.random() * 0.008,
                rotSpeed: { x: (Math.random() - 0.5) * 0.012, y: (Math.random() - 0.5) * 0.012, z: (Math.random() - 0.5) * 0.008 },
                floatOffset: Math.random() * Math.PI * 2,
                floatAmp: 0.15 + Math.random() * 0.2,
            };
            scene.add(mesh);
            meshes.push(mesh);
        });

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        document.addEventListener('mousemove', onMouseMove);

        let t = 0;
        let animationFrameId;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            t += 0.01;

            meshes.forEach(m => {
                m.rotation.x += m.userData.rotSpeed.x;
                m.rotation.y += m.userData.rotSpeed.y;
                m.rotation.z += m.userData.rotSpeed.z;
                m.position.y += Math.sin(t + m.userData.floatOffset) * 0.003;
            });

            camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
            camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.04;
            camera.lookAt(scene.position);

            pt1.intensity = 2.5 + Math.sin(t * 3.7) * 0.5;
            pt2.intensity = 1.8 + Math.sin(t * 2.3 + 1) * 0.4;

            renderer.render(scene, camera);
        };
        animate();

        const onResize = () => {
            W = section.offsetWidth;
            H = section.offsetHeight;
            renderer.setSize(W, H);
            camera.aspect = W / H;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', onResize);

        return () => {
            observer.disconnect();
            document.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
        };
    }, []);

    return (
        <section className="hero" ref={heroRef} id="hero-section">
            {/* 3D Canvas injected behind everything */}
            <canvas id="hero-canvas" ref={canvasRef}></canvas>

            <div className="hero-bg-grid"></div>
            <div className="hero-glow"></div>
            <div className="hero-glow2"></div>

            <div className="hero-inner">
                <div className="hero-badge">
                    <span className="badge-dot"></span>
                    Westfield University · Official Platform
                </div>
                <h1>Lost something?<br/>We'll help you<br/><em>find it.</em></h1>
                <p className="hero-sub">The official lost & found portal for Westfield University. Report, search, and reclaim your belongings — fast and hassle-free.</p>
                <div className="hero-actions">
                    <a href="#" className="btn-primary">🔍 Search Items</a>
                    <a href="#" className="btn-secondary">+ Report an Item</a>
                </div>
            </div>

            {/* Optional: You can keep the float cards or remove them since 3D objects are floating now.
                We'll keep them for extra flavor as they are in the original design. */}
            <div className="hero-float">
                <div className="float-card">
                    <div className="float-icon">🎒</div>
                    <div className="float-label">Backpack</div>
                    <div className="float-tag">Found · A Block</div>
                </div>
                <div className="float-card">
                    <div className="float-icon">📱</div>
                    <div className="float-label">Phone</div>
                    <div className="float-tag">Lost · Library</div>
                </div>
                <div className="float-card">
                    <div className="float-icon">🔑</div>
                    <div className="float-label">Keys</div>
                    <div className="float-tag">Found · Canteen</div>
                </div>
                <div className="float-card">
                    <div className="float-icon">🕶️</div>
                    <div className="float-label">Sunglasses</div>
                    <div className="float-tag">Found · Gym</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
