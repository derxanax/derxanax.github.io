// Enhanced JavaScript for ZET Landing Page

class ZETLandingPage {
    constructor() {
        this.launchDate = new Date('2025-07-10T00:00:00');
        this.particles = [];
        this.init();
    }

    init() {
        this.updateCountdown();
        this.createParticles();
        this.setupScrollAnimations();
        this.setupInteractiveEffects();
        this.setupTerminalAnimation();
        
        // Start intervals
        setInterval(() => this.updateCountdown(), 1000);
        setInterval(() => this.animateParticles(), 50);
    }

    updateCountdown() {
        const now = new Date();
        const diff = this.launchDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            this.updateCountdownDisplay({ days, hours, minutes, seconds });
        } else {
            this.showLaunchMessage();
        }
    }

    updateCountdownDisplay({ days, hours, minutes, seconds }) {
        const elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        // Add pulse effect when numbers change
        Object.entries({ days, hours, minutes, seconds }).forEach(([key, value]) => {
            const element = elements[key];
            if (element && element.textContent !== value.toString()) {
                element.classList.add('pulse');
                setTimeout(() => element.classList.remove('pulse'), 500);
                element.textContent = value;
            }
        });
    }

    showLaunchMessage() {
        const titleElement = document.querySelector('.countdown-title');
        const countdownElement = document.querySelector('.countdown');
        
        if (titleElement && countdownElement) {
            titleElement.textContent = '🎉 ZET запущен!';
            countdownElement.innerHTML = `
                <div class="countdown-item pulse">
                    <span class="countdown-number">🚀</span>
                    <div class="countdown-label">Запущен!</div>
                </div>
            `;
        }
    }

    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        // Create 50 particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            particlesContainer.appendChild(particle);
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    animateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));

            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Add scroll animations to elements
        document.querySelectorAll('.feature-card, .terminal-demo, .cta-section').forEach(el => {
            el.classList.add('fade-in-on-scroll');
            observer.observe(el);
        });
    }

    setupInteractiveEffects() {
        // Add hover effects to feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.classList.add('interactive-hover', 'float-animation');
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Add glow effect to main title
        const mainTitle = document.querySelector('h1');
        if (mainTitle) {
            mainTitle.classList.add('glow-text');
        }

        // Add gradient border to countdown container (static)
        const countdownContainer = document.querySelector('.countdown-container');
        if (countdownContainer) {
            countdownContainer.classList.add('gradient-border');
        }

        // Enhanced CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.style.position = 'relative';
            ctaButton.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = ctaButton.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                `;
                
                ctaButton.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        }
    }

    setupTerminalAnimation() {
        const terminalContent = document.querySelector('.terminal-content');
        if (!terminalContent) return;

        // Make terminal lines appear with staggered animation
        const lines = terminalContent.querySelectorAll('div');
        lines.forEach((line, index) => {
            line.classList.add('code-line');
            line.style.animationDelay = `${index * 0.3}s`;
        });

        // Restart terminal animation periodically
        setInterval(() => {
            lines.forEach((line, index) => {
                line.style.animation = 'none';
                setTimeout(() => {
                    line.style.animation = `fadeInUp 0.8s ease-out forwards`;
                    line.style.animationDelay = `${index * 0.3}s`;
                }, 100);
            });
        }, 8000);

        // Add terminal cursor
        const promptSpan = document.querySelector('.terminal-prompt');
        if (promptSpan) {
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            cursor.textContent = '|';
            cursor.style.marginLeft = '5px';
            promptSpan.appendChild(cursor);
        }
    }

    // Mouse movement parallax effect
    setupParallaxEffect() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.feature-card').forEach((card, index) => {
                const speed = (index + 1) * 0.02;
                const x = (mouseX - 0.5) * speed * 50;
                const y = (mouseY - 0.5) * speed * 50;
                
                card.style.transform += ` translate3d(${x}px, ${y}px, 0)`;
            });
        });
    }

    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Easter egg: Konami code
            if (e.code === 'ArrowUp' && e.code === 'ArrowUp' && 
                e.code === 'ArrowDown' && e.code === 'ArrowDown') {
                this.showEasterEgg();
            }
            
            // 'Z' key for ZET info
            if (e.key.toLowerCase() === 'z' && !e.ctrlKey && !e.altKey) {
                this.showZETInfo();
            }
        });
    }

    showEasterEgg() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 20px;
                border-radius: 10px;
                z-index: 10000;
                text-align: center;
            ">
                <h3>🎉 Секретный код активирован!</h3>
                <p>Добро пожаловать в команду ZET разработчиков!</p>
                                 <button onclick="this.parentElement.remove()" style="
                     margin-top: 10px;
                     padding: 5px 10px;
                     background: #2d3748;
                     color: white;
                     border: none;
                     border-radius: 5px;
                     cursor: pointer;
                 ">Закрыть</button>
            </div>
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 5000);
    }

    showZETInfo() {
        console.log(`
        ███████╗███████╗████████╗
        ╚══███╔╝██╔════╝╚══██╔══╝
           ███╔╝ █████╗     ██║   
          ███╔╝  ██╔══╝     ██║   
         ███████╗███████╗   ██║   
         ╚══════╝╚══════╝   ╚═╝   
        
        ZET v1.0 - Conversational DevOps Agent
        Made with ❤️ by derx & ZAEAZAEX
        
        Press F12 to see this message!
        `);
    }
}

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the landing page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ZETLandingPage();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate particle positions
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
    });
});

// Performance optimization: pause animations when page is not visible
document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    if (document.hidden) {
        particles.forEach(p => p.style.animationPlayState = 'paused');
    } else {
        particles.forEach(p => p.style.animationPlayState = 'running');
    }
}); 
