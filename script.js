const CONFIG = {
    // CUSTOMIZE THESE VALUES
    NAME: "Rithiksha",
    AGE: 20,
    BIRTHDAY: "July 7", // Format: "Month Day"
    
    IMAGE_COUNT: 10, // Number of images in assets/images/
    
    // Add birthday messages
    MESSAGES: [
        { text: "Happy Birthday, Princess! 🎂!", author: "With Best Wishes  ❤️" },
        { text: "En life-la ivlo caring, kind, wonderful friend-ah irukkuradhukku unakku evlo thanks sonnalum podhadhu... Thank you for everything! 💕✨", author: "Kishor" },
        { text: "Namma journey enga ponaalum, en heart-la un idam eppovume maaradhu... nee en best friend dhaan. ✨💞", author: "Forever Best Friend" },
        { text: "Eppovume sirichitte iru, shine pannitte iru, nee ippo irukkura amazing person ah appadiye iru... un presence nala dhaan indha world innum brighter ah beautiful ah irukku. ☀️❤️✨", author: "Your Best Friend" },
        { text: "Un life full-ah endless happiness, nalla health, periya success, marakka mudiyadha beautiful memories ellam nirainjirukkanum. Eppovume ippadiye sirichitte iru. Happy Birthday, Princess! 👑❤️🎉✨", author: "Kishor" },
    ],
};

// ===================================================
// IMAGE LOADING SYSTEM
// ===================================================

let loadedPhotos = [];

function generatePlaceholder(index) {
    const colors = [
        { bg: '#00d4ff', text: 'white' },
        { bg: '#ff006e', text: 'white' },
        { bg: '#8f00ff', text: 'white' },
        { bg: '#00a8cc', text: 'white' },
        { bg: '#ff1744', text: 'white' },
        { bg: '#76ff03', text: 'black' },
    ];
    
    const color = colors[index % colors.length];
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='${color.bg.replace('#', '%23')}' width='300' height='300'/%3E%3Ctext x='50%25' y='40%25' fill='${color.text}' font-size='48' text-anchor='middle' dominant-baseline='middle' font-family='Arial' font-weight='bold'%3EMemory%3C/text%3E%3Ctext x='50%25' y='60%25' fill='${color.text}' font-size='36' text-anchor='middle' dominant-baseline='middle' font-family='Arial'%3E${index + 1}%3C/text%3E%3C/svg%3E`;
}

async function loadPhotos() {
    // Dynamically verified image loading is managed inside loadMemories with onerror fallbacks
    return Promise.resolve();
}

// ===================================================
// AUDIO SYNTHESIS & SFX ENGINE (Local Music Box Synth Pad)
// ===================================================
const SoundFX = {
    ctx: null,
    ambientOsc1: null,
    ambientOsc2: null,
    ambientGain: null,
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    playHover() {
        this.init();
        if (!this.ctx || this.ctx.state === 'suspended') return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        // Cozy Music Box Pluck (Sine wave high-pitches)
        osc.type = 'sine';
        const notes = [1046.50, 1174.66, 1318.51, 1567.98]; // C6, D6, E6, G6 pentatonic scales
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        
        osc.frequency.setValueAtTime(randomNote, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    },
    playClick() {
        this.init();
        if (!this.ctx || this.ctx.state === 'suspended') return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        // Soft Wooden Chime Note
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5 note
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    },
    playUnlock() {
        this.init();
        if (!this.ctx || this.ctx.state === 'suspended') return;
        const now = this.ctx.currentTime;
        
        // Aesthetic Ascending Lullaby Harp
        const arpeggio = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        arpeggio.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.02, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.4);
        });
    },
    playAmbient() {
        this.init();
        if (!this.ctx || this.ambientOsc1) return;
        
        // Cozy Twin Chord Sine Pad
        this.ambientOsc1 = this.ctx.createOscillator();
        this.ambientOsc2 = this.ctx.createOscillator();
        this.ambientGain = this.ctx.createGain();
        
        this.ambientOsc1.connect(this.ambientGain);
        this.ambientOsc2.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);
        
        this.ambientOsc1.type = 'sine';
        this.ambientOsc1.frequency.setValueAtTime(110.00, this.ctx.currentTime); // A2 fundamental
        
        this.ambientOsc2.type = 'sine';
        this.ambientOsc2.frequency.setValueAtTime(165.00, this.ctx.currentTime); // E3 fifth
        
        this.ambientGain.gain.setValueAtTime(0.025, this.ctx.currentTime);
        
        this.ambientOsc1.start();
        this.ambientOsc2.start();
    },
    stopAmbient() {
        if (this.ambientOsc1) {
            try { this.ambientOsc1.stop(); this.ambientOsc2.stop(); } catch(e) {}
            this.ambientOsc1 = null;
            this.ambientOsc2 = null;
        }
    }
};

// ===================================================
// THREE.JS SCENE SETUP
// ===================================================

let scene, camera, renderer, particles, totalParticles = 0;
let currentStage = 0;
let isTransitioning = false;
let floatingFooterAnimationId = null;

// Particle Interactive Attractor Vectors
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});
window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        targetMouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        targetMouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
});

// Interactive Heart Custom Canvas Point Texture
function createHeartTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#ff6b8b';
    ctx.beginPath();
    ctx.moveTo(32, 20);
    ctx.bezierCurveTo(32, 16, 26, 8, 16, 8);
    ctx.bezierCurveTo(6, 8, 6, 20, 6, 20);
    ctx.bezierCurveTo(6, 32, 18, 44, 32, 54);
    ctx.bezierCurveTo(46, 44, 58, 32, 58, 20);
    ctx.bezierCurveTo(58, 20, 58, 8, 48, 8);
    ctx.bezierCurveTo(38, 8, 32, 16, 32, 20);
    ctx.closePath();
    ctx.fill();
    
    return new THREE.CanvasTexture(canvas);
}

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050812, 100, 500);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );
    camera.position.z = 50;

    // Renderer
    const canvas = document.getElementById("canvas");
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050812, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Create particles
    createParticleSystem();

    // Handle resize
    window.addEventListener("resize", onWindowResize);

    // Start animation
    animate();
}

let heartParticles;

function createParticleSystem() {
    // Standard Blue Stars
    const geometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;

        velocities[i] = (Math.random() - 0.5) * 0.5;
        velocities[i + 1] = (Math.random() - 0.5) * 0.5;
        velocities[i + 2] = (Math.random() - 0.5) * 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Dynamic Floating Heart Particles System
    const heartGeometry = new THREE.BufferGeometry();
    const heartCount = 300;
    const hPositions = new Float32Array(heartCount * 3);
    const hVelocities = new Float32Array(heartCount * 3);

    for (let i = 0; i < heartCount * 3; i += 3) {
        hPositions[i] = (Math.random() - 0.5) * 200;
        hPositions[i + 1] = (Math.random() - 0.5) * 200;
        hPositions[i + 2] = (Math.random() - 0.5) * 200;

        hVelocities[i] = (Math.random() - 0.5) * 0.3;
        hVelocities[i + 1] = (Math.random() - 0.5) * 0.3;
        hVelocities[i + 2] = (Math.random() - 0.5) * 0.3;
    }

    heartGeometry.setAttribute("position", new THREE.BufferAttribute(hPositions, 3));
    heartGeometry.setAttribute("velocity", new THREE.BufferAttribute(hVelocities, 3));

    const heartMaterial = new THREE.PointsMaterial({
        color: 0xffc0cb,
        size: 1.8,
        map: createHeartTexture(),
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        alphaTest: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    heartParticles = new THREE.Points(heartGeometry, heartMaterial);
    scene.add(heartParticles);

    totalParticles = particleCount + heartCount;
}

function updateParticles() {
    const positions = particles.geometry.attributes.position.array;
    const velocities = particles.geometry.attributes.velocity.array;

    // Interpolate mouse coordinates smoothly
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;
    const mouseVector = new THREE.Vector3(mouseX * 100, mouseY * 100, 0);

    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Gravitational Attractor Force Calculation
        const dx = positions[i] - mouseVector.x;
        const dy = positions[i + 1] - mouseVector.y;
        const dz = positions[i + 2] - mouseVector.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 40) {
            velocities[i] -= (dx / dist) * 0.02;
            velocities[i + 1] -= (dy / dist) * 0.02;
            velocities[i + 2] -= (dz / dist) * 0.02;
        }

        // Bounce at boundaries
        if (Math.abs(positions[i]) > 100) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 100) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 100) velocities[i + 2] *= -1;
    }

    particles.geometry.attributes.position.needsUpdate = true;

    // Fluid Heart Particles Physics
    if (heartParticles) {
        const hPos = heartParticles.geometry.attributes.position.array;
        const hVel = heartParticles.geometry.attributes.velocity.array;

        for (let i = 0; i < hPos.length; i += 3) {
            hPos[i] += hVel[i];
            hPos[i + 1] += hVel[i + 1];
            hPos[i + 2] += hVel[i + 2];

            const dx = hPos[i] - mouseVector.x;
            const dy = hPos[i + 1] - mouseVector.y;
            const dz = hPos[i + 2] - mouseVector.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 50) {
                hVel[i] -= (dx / dist) * 0.01;
                hVel[i + 1] -= (dy / dist) * 0.01;
                hVel[i + 2] -= (dz / dist) * 0.01;
            }

            if (Math.abs(hPos[i]) > 100) hVel[i] *= -1;
            if (Math.abs(hPos[i + 1]) > 100) hVel[i + 1] *= -1;
            if (Math.abs(hPos[i + 2]) > 100) hVel[i + 2] *= -1;
        }

        heartParticles.geometry.attributes.position.needsUpdate = true;
    }
}

function animate() {
    requestAnimationFrame(animate);

    updateParticles();
    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0002;

    // Camera smooth movements based on stage
    const targetZ = 40 + currentStage * 2;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===================================================
// STAGE MANAGEMENT
// ===================================================

const stages = [
    "stage-opening",
    "stage-vault",
    "stage-progress",
    "stage-memories",
    "stage-gifts",
    "stage-wishes",
    "stage-ceremony",
    "stage-legend",
    "stage-final",
];

function getStageElement(stageName) {
    return document.getElementById(stageName);
}

function hideAllStages() {
    stages.forEach((stageName) => {
        const element = getStageElement(stageName);
        if (element) {
            element.classList.add("stage-hidden");
        }
    });
}

function showStage(stageIndex) {
    if (isTransitioning) return;
    
    isTransitioning = true;

    // Trigger glitch screen active aberration overlay
    const app = document.getElementById("app");
   // if (app) app.classList.add("glitch-active");
    
    hideAllStages();
    
    setTimeout(() => {
        const stageName = stages[stageIndex];
        const element = getStageElement(stageName);
        if (element) {
            element.classList.remove("stage-hidden");
            currentStage = stageIndex;
            
            // Trigger progress bar animation on progress stage
            if (stageIndex === 2) {
                animateProgressBar();
            }

            // Sync Constellation Connection Lines
            if (stageIndex === 3) {
                setTimeout(updateConstellationConnections, 100);
            }

            // Sync Nav Dots
            updateMinimap();

            // Custom sound chimes per stage
            if (stageIndex === 2 || stageIndex === 6 || stageIndex === 7) {
                SoundFX.playUnlock();
            } else {
                SoundFX.playClick();
            }
        }
        isTransitioning = false;

        setTimeout(() => {
            if (app) app.classList.remove("glitch-active");
        }, 150);
    }, 600);
}

// ===================================================
// INITIALIZATION & AUTO-PROGRESSION
// ===================================================

async function initializeApp() {
    // Load photos first
    await loadPhotos();
    
    // Update UI with user data
    document.getElementById("progress-level").textContent = `LEVEL ${CONFIG.AGE} HUMAN`;
    document.getElementById("progress-age").textContent = `AGE: ${CONFIG.AGE}`;
    document.getElementById("progress-years").textContent = CONFIG.AGE;
    document.getElementById("progress-xp").textContent = `${CONFIG.AGE * 365} XP`;
    
    const progressPercent = Math.min(CONFIG.AGE / 100 * 100, 100);
    document.getElementById("progress-percent").textContent = `${Math.round(progressPercent)}%`;
    
    document.getElementById("legend-name").textContent = CONFIG.NAME;
    document.getElementById("legend-age").textContent = `${CONFIG.AGE} YEARS`;
    document.getElementById("legend-date").textContent = CONFIG.BIRTHDAY;

    // Load memories
    loadMemories();

    // Load wishes/messages
    loadWishes();

    // Setup buttons
    setupButtonListeners();

    // Setup Custom Interactive Systems
    setupMinimap();
    setupAudioToggle();
    setupWishSubmission();
    setupExportListener();
    
    // Setup Cozy Sentiment Features
    setupNicknamePrompt();
    setupReasonsDeck();
    setupPaletteToggle();
    setupCandleBlow();

    // Start opening sequence
    showStage(0);
}

function setupButtonListeners() {
    // Vault button
    const vaultBtn = document.getElementById("vault-btn");
    if (vaultBtn) {
        vaultBtn.addEventListener("click", () => showStage(2));
        vaultBtn.addEventListener("touchend", (e) => {
            e.preventDefault();
            showStage(2);
        });
    }

    // Progress button
    const progressBtn = document.getElementById("progress-btn");
    if (progressBtn) {
        progressBtn.addEventListener("click", () => showStage(3));
        progressBtn.addEventListener("touchend", (e) => {
            e.preventDefault();
            showStage(3);
        });
    }

    // Memories button
    const memoriesBtn = document.getElementById("memories-btn");
    if (memoriesBtn) {
        memoriesBtn.addEventListener("click", () => showStage(4));
        memoriesBtn.addEventListener("touchend", (e) => {
            e.preventDefault();
            showStage(4);
        });
    }

    // Gifts button
    const giftsBtn = document.getElementById("gifts-btn");
    if (giftsBtn) {
        giftsBtn.addEventListener("click", () => showStage(5));
        giftsBtn.addEventListener("touchend", (e) => {
            e.preventDefault();
            showStage(5);
        });
    }

    // Wishes button
    const wishesBtn = document.getElementById("wishes-btn");
    if (wishesBtn) {
        wishesBtn.addEventListener("click", () => showStage(6));
        wishesBtn.addEventListener("touchend", (e) => {
            e.preventDefault();
            showStage(6);
        });
    }

    // Ceremony button
    const ceremonyBtn = document.getElementById("ceremony-btn");
    if (ceremonyBtn) {
        ceremonyBtn.addEventListener("click", () => {
            showStage(7);
            startCounterAnimation();
        });
        ceremonyBtn.addEventListener("touchend", (e) => {
            e.preventDefault();
            showStage(7);
            startCounterAnimation();
        });
    }

    // Legend button
    const legendBtn = document.getElementById("legend-btn");
    if (legendBtn) {
        legendBtn.addEventListener("click", () => showStage(8));
        legendBtn.addEventListener("touchend", (e) => {
            e.preventDefault();
            showStage(8);
        });
    }
}

// ===================================================
// MEMORY CONSTELLATION
// ===================================================

function loadMemories() {
    const container = document.getElementById("memories-container");
    container.innerHTML = "";

    for (let i = 1; i <= CONFIG.IMAGE_COUNT; i++) {
        const photoUrl = `assets/images/image${i}.jpg`;
        const memoryItem = document.createElement("div");
        memoryItem.className = "memory-item";

        const img = document.createElement("img");

        // Listeners attached BEFORE assigning src to handle fast/cached loading properly
        img.onload = () => {
            memoryItem.appendChild(img);
            // Polaroid cursive bottom captions
            const caption = document.createElement("div");
            caption.className = "polaroid-caption";
            caption.textContent = `Memory ${i} 💕`;
            memoryItem.appendChild(caption);
        };

        img.onerror = () => {
            memoryItem.className = "memory-item placeholder-item";
            memoryItem.innerHTML = `
                <div class="glowing-placeholder-content">
                    <span class="placeholder-icon">✨</span>
                    <span class="placeholder-text">Memory ${i}</span>
                </div>
            `;
        };

        img.src = photoUrl;
        img.alt = `Memory ${i}`;

        const handleClick = (e) => {
            if (e) e.preventDefault();
            const isPlaceholder = memoryItem.classList.contains("placeholder-item");
            openMemory(isPlaceholder ? null : photoUrl, `Memory ${i}`, isPlaceholder);
        };

        memoryItem.addEventListener("click", handleClick);
        memoryItem.addEventListener("touchend", handleClick);

        // UI Chime Integration
        memoryItem.addEventListener("mouseenter", () => SoundFX.playHover());

        container.appendChild(memoryItem);
    }
    
    // Bind connection redraws to window resizes
    window.addEventListener("resize", updateConstellationConnections);
}

function openMemory(photoUrl, caption, isPlaceholder = false) {
    const modal = document.getElementById("memory-modal");
    const imageElement = document.getElementById("memory-image");
    const captionElement = document.getElementById("memory-caption");

    if (isPlaceholder) {
        imageElement.style.backgroundImage = 'none';
        imageElement.innerHTML = `
            <div class="glowing-placeholder-content">
                <span class="placeholder-icon" style="font-size: clamp(48px, 10vw, 64px);">✨</span>
                <span class="placeholder-text" style="font-size: clamp(16px, 4vw, 20px);">Locked Memory</span>
            </div>
        `;
    } else {
        imageElement.style.backgroundImage = `url(${photoUrl})`;
        imageElement.innerHTML = '';
    }
    captionElement.textContent = caption;

    modal.classList.remove("stage-hidden");

    const closeBtn = document.getElementById("memory-close");
    closeBtn.addEventListener("click", closeMemory);
    document.getElementById("memory-modal-backdrop").addEventListener("click", closeMemory);
}

function closeMemory() {
    const modal = document.getElementById("memory-modal");
    modal.classList.add("stage-hidden");
}

// ===================================================
// DIGITAL GIFT CHAMBER
// ===================================================

const giftContents = [
    "💌 Dear Princess, thank you for coming into my life. You are one of the most precious friends I have ever had. Happy Birthday! ❤️",
    "🌸 Every memory with you is special. No matter how much time passes, our friendship will always remain one of my favorite chapters in life",
    "🎁 My biggest gift to you is this wish: May you always smile, achieve every dream, stay healthy, and be surrounded by happiness. Happy Birthday, Princess! 👑",
];

function setupGiftListeners() {
    for (let i = 1; i <= 3; i++) {
        const giftElement = document.getElementById(`gift-${i}`);
        if (giftElement) {
            giftElement.addEventListener("click", () => animateAndOpenGift(giftElement, i - 1));
            giftElement.addEventListener("touchend", (e) => {
                e.preventDefault();
                animateAndOpenGift(giftElement, i - 1);
            });
            giftElement.addEventListener("mouseenter", () => SoundFX.playHover());
        }
    }

    const closeGiftBtn = document.getElementById("gift-close");
    if (closeGiftBtn) {
        closeGiftBtn.addEventListener("click", closeGift);
    }
    
    const giftBackdrop = document.querySelector(".gift-modal-backdrop");
    if (giftBackdrop) {
        giftBackdrop.addEventListener("click", closeGift);
    }
}

function animateAndOpenGift(element, index) {
    element.classList.add("unwrapping");
    SoundFX.playUnlock();
    setTimeout(() => {
        openGift(index);
        element.classList.remove("unwrapping");
    }, 800);
}

function openGift(index) {
    const modal = document.getElementById("gift-modal");
    const contentElement = document.getElementById("gift-content");

    contentElement.textContent = giftContents[index];
    modal.classList.remove("stage-hidden");
}

function closeGift() {
    const modal = document.getElementById("gift-modal");
    modal.classList.add("stage-hidden");
}

// ===================================================
// WISHES FROM UNIVERSE
// ===================================================

function loadWishes() {
    const container = document.getElementById("wishes-container");
    container.innerHTML = "";

    CONFIG.MESSAGES.forEach((message, index) => {
        const wishCard = document.createElement("div");
        wishCard.className = "wish-card";

        wishCard.innerHTML = `
            <div class="wish-text">"${message.text}"</div>
            <div class="wish-author">— ${message.author}</div>
        `;

        container.appendChild(wishCard);
    });
}

// ===================================================
// CEREMONY ANIMATION
// ===================================================

function startCounterAnimation() {
    setTimeout(() => {
        const counterElement = document.querySelector(".ceremony-counter");
        if (counterElement) {
            const target = parseInt(counterElement.dataset.target);
            animateCounter(counterElement, 0, target, 1500);
        }
    }, 500);
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(start + (end - start) * easeOutQuad(progress));
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Trigger neon ceremony confetti explosion & unlocks
            triggerConfetti();
            SoundFX.playUnlock();
        }
    }

    requestAnimationFrame(update);
}

function triggerConfetti() {
    const container = document.querySelector(".ceremony-particles");
    if (!container) return;
    container.innerHTML = "";
    const colors = ['#00d4ff', '#ff006e', '#8f00ff', '#ffffff'];

    for (let i = 0; i < 60; i++) {
        const p = document.createElement("div");
        p.className = "ceremony-confetti";
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = `50%`;
        p.style.top = `50%`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        p.style.setProperty('--rot', `${Math.random() * 360}deg`);

        container.appendChild(p);
    }
}

function easeOutQuad(t) {
    return t * (2 - t);
}

// ===================================================
// PROGRESS BAR ANIMATION
// ===================================================

function animateProgressBar() {
    setTimeout(() => {
        const fillElement = document.getElementById("progress-fill");
        const progressPercent = Math.min(CONFIG.AGE / 100 * 100, 100);
        fillElement.style.width = `${progressPercent}%`;
    }, 500);
}

// ===================================================
// FLOATING FOOTER ANIMATION
// ===================================================

function startFloatingFooterAnimation() {
    let floatingElement = document.querySelector(".floating-footer-text");
    if (!floatingElement) {
        floatingElement = document.createElement("div");
        floatingElement.className = "floating-footer-text";
        document.body.appendChild(floatingElement);
    }
}

// ===================================================
// TOUCH & MOUSE INTERACTIONS
// ===================================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left - go to next stage
        if (currentStage < stages.length - 1 && !isTransitioning) {
            showStage(currentStage + 1);
        }
    } else if (touchEndX > touchStartX + 50) {
        // Swiped right - go to previous stage
        if (currentStage > 0 && !isTransitioning) {
            showStage(currentStage - 1);
        }
    }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && currentStage < stages.length - 1 && !isTransitioning) {
        showStage(currentStage + 1);
    } else if (e.key === "ArrowLeft" && currentStage > 0 && !isTransitioning) {
        showStage(currentStage - 1);
    }
});

// ===================================================
// WINDOW LOAD
// ===================================================

window.addEventListener("load", () => {
    initThreeJS();
    initializeApp();
    setupGiftListeners();
    startFloatingFooterAnimation();
});

// ===================================================
// PERFORMANCE OPTIMIZATION
// ===================================================

// Reduce particle count on mobile
function optimizeForMobile() {
    if (window.innerWidth < 768) {
        // Already optimized in Three.js setup
        // Can add more optimizations here if needed
    }
}

optimizeForMobile();

// ===================================================
// CUSTOM CYBER EVENT CONTROLLERS
// ===================================================

function setupAudioToggle() {
    const btn = document.getElementById("sound-toggle");
    const icon = document.getElementById("sound-icon");
    if (!btn) return;

    btn.addEventListener("click", () => {
        SoundFX.init();
        if (SoundFX.ctx.state === 'suspended') {
            SoundFX.ctx.resume().then(() => {
                SoundFX.playAmbient();
                icon.textContent = "🔊";
            });
        } else {
            if (SoundFX.ambientOsc1) {
                SoundFX.stopAmbient();
                icon.textContent = "🔇";
            } else {
                SoundFX.playAmbient();
                icon.textContent = "🔊";
            }
        }
        SoundFX.playUnlock();
    });
}

function setupMinimap() {
    const dots = document.querySelectorAll(".minimap-dot");
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            if (!isTransitioning && currentStage !== index) {
                showStage(index);
            }
        });
        dot.addEventListener("mouseenter", () => SoundFX.playHover());
    });
}

function updateMinimap() {
    const dots = document.querySelectorAll(".minimap-dot");
    dots.forEach((dot, index) => {
        if (index === currentStage) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function setupWishSubmission() {
    const submitBtn = document.getElementById("wish-submit");
    const input = document.getElementById("wish-input");
    const container = document.getElementById("wishes-container");
    if (!submitBtn || !input) return;

    const castWish = () => {
        const text = input.value.trim();
        if (!text) return;

        const wishCard = document.createElement("div");
        wishCard.className = "wish-card new-user-wish";
        wishCard.innerHTML = `
            <div class="wish-text">"${text}"</div>
            <div class="wish-author">— Guest Oracle</div>
        `;
        container.insertBefore(wishCard, container.firstChild);
        input.value = "";

        SoundFX.playUnlock();

        // Launch rising cosmic particle
        const wishStage = document.getElementById("stage-wishes");
        if (wishStage) {
            const particle = document.createElement("div");
            particle.className = "rising-wish-particle";
            particle.textContent = "✨";
            particle.style.left = `${Math.random() * 80 + 10}%`;
            wishStage.appendChild(particle);
            setTimeout(() => particle.remove(), 4000);
        }
    };

    submitBtn.addEventListener("click", castWish);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") castWish();
    });
}

function setupExportListener() {
    const exportBtn = document.getElementById("export-btn");
    if (!exportBtn) return;

    exportBtn.addEventListener("click", () => {
        const canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext("2d");

        // Canvas BG
        ctx.fillStyle = "#050812";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Border gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#ff85a2');
        gradient.addColorStop(0.5, '#ff006e');
        gradient.addColorStop(1, '#8f00ff');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 15;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        
        ctx.font = "bold 24px 'Segoe UI', Arial";
        ctx.fillStyle = "#b0b8d4";
        ctx.fillText("CELEBRATE THE MOMENT", canvas.width / 2, 120);

        ctx.font = "bold 48px 'Segoe UI', Arial";
        ctx.fillStyle = "#ff85a2";
        ctx.fillText(selectedNickname.toUpperCase(), canvas.width / 2, 220);

        ctx.font = "bold 18px 'Segoe UI', Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("OUR PRINCRESS", canvas.width / 2, 260);

        ctx.fillStyle = "#b0b8d4";
        ctx.font = "20px 'Segoe UI', Arial";
        ctx.fillText(`AGE MILESTONE: ${CONFIG.AGE} YEARS`, canvas.width / 2, 360);
        ctx.fillText(`DATE CELEBRATED: ${CONFIG.BIRTHDAY}`, canvas.width / 2, 400);

        ctx.font = "bold 24px 'Segoe UI', Arial";
        ctx.fillStyle = "#ff006e";
        ctx.fillText("A PRINCESS SHINES BRIGHTER TODAY", canvas.width / 2, 480);

        const link = document.createElement("a");
        link.download = `princess_certificate_${selectedNickname.toLowerCase()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

// ===================================================
// COZY SENTIMENT DYNAMIC CONTROLLERS
// ===================================================

let selectedNickname = "Rithiksha";

function setupNicknamePrompt() {
    const prompt = document.getElementById("nickname-prompt");
    const options = document.querySelectorAll(".nick-opt-btn");
    const customInput = document.getElementById("custom-nick");
    const customSubmit = document.getElementById("custom-nick-submit");

    if (!prompt) return;

    // Show nickname overlay after opening sequences end
    setTimeout(() => {
        const textContainer = document.querySelector(".opening-text-container");
        if (textContainer) textContainer.classList.add("stage-hidden");
        prompt.classList.remove("stage-hidden");
        SoundFX.playUnlock();
    }, 8200);

    const applyNameAndGo = (name) => {
        selectedNickname = name || CONFIG.NAME;
        
        // Sync name dynamically to the pages
        document.getElementById("legend-name").textContent = selectedNickname.toUpperCase();
        
        showStage(1);
    };

    options.forEach(opt => {
        opt.addEventListener("click", () => {
            SoundFX.playClick();
            applyNameAndGo(opt.dataset.name);
        });
    });

    if (customSubmit && customInput) {
        customSubmit.addEventListener("click", () => {
            const val = customInput.value.trim();
            if (val) {
                SoundFX.playClick();
                applyNameAndGo(val);
            }
        });
    }
}

const reasonsList = [
    "Un smile paatha, cloudiest day kooda warm sunshine maari maaridudhu. ☀️✨",
    "You have the kindest heart and always make everyone feel loved and safe. 💕",
    "Nee romba smart, creative... un mela nambikkai vachuko, nee nenacha edhaiyum kandippa achieve pannuva. 👑❤️✨",
    "Nee indha world-la irukkuradhe oru gift maari... un presence nala indha ulagam innum happya beautiful ah irukku. 🌸❤️✨",
    "Nee unmaiyave one and only... unna en universe-la vachirukkuradhu enakku kidaicha romba azhagana gift. ✨❤️"
];
let currentReasonIdx = 0;

function setupReasonsDeck() {
    const card = document.getElementById("reasons-card");
    const text = document.getElementById("reasons-text");
    const frontSpan = card ? card.querySelector(".reasons-card-front span") : null;
    if (!card || !text) return;

    card.addEventListener("click", () => {
        SoundFX.playClick();
        card.classList.toggle("flipped");

        if (card.classList.contains("flipped")) {
            text.textContent = reasonsList[currentReasonIdx];
            currentReasonIdx = (currentReasonIdx + 1) % reasonsList.length;
        } else {
            setTimeout(() => {
                if (frontSpan) frontSpan.textContent = `Tap to reveal reason #${currentReasonIdx + 1} 🌸`;
            }, 300);
        }
    });
}

let activePalette = "cosmic";

function setupPaletteToggle() {
    const btn = document.getElementById("palette-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
        SoundFX.playClick();
        const body = document.body;
        if (activePalette === "cosmic") {
            body.classList.add("palette-cotton");
            activePalette = "cotton";
        } else if (activePalette === "cotton") {
            body.classList.remove("palette-cotton");
            body.classList.add("palette-sunset");
            activePalette = "sunset";
        } else {
            body.classList.remove("palette-sunset");
            activePalette = "cosmic";
        }
        updateThreeJSPalette();
    });
}

function updateThreeJSPalette() {
    if (!particles) return;
    let pColor = 0x00d4ff;
    let hColor = 0xff6b8b;
    if (activePalette === "cotton") {
        pColor = 0xff85a2;
        hColor = 0xf7aef8;
    } else if (activePalette === "sunset") {
        pColor = 0xff9f43;
        hColor = 0xff4757;
    }
    particles.material.color.setHex(pColor);
    if (heartParticles) heartParticles.material.color.setHex(hColor);
}

function updateConstellationConnections() {
    const canvas = document.getElementById("constellation-canvas");
    const container = document.getElementById("memories-container");
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const items = container.querySelectorAll(".memory-item");
    const coords = [];

    items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const wrapperRect = canvas.getBoundingClientRect();
        
        const x = rect.left - wrapperRect.left + rect.width / 2;
        const y = rect.top - wrapperRect.top + rect.height / 2;
        coords.push({ x, y });
    });

    ctx.strokeStyle = activePalette === "sunset" ? "rgba(255, 159, 67, 0.4)" : "rgba(255, 133, 162, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    for (let i = 0; i < coords.length - 1; i++) {
        ctx.moveTo(coords[i].x, coords[i].y);
        ctx.lineTo(coords[i + 1].x, coords[i + 1].y);
    }
    ctx.stroke();
}

function setupCandleBlow() {
    const candle = document.getElementById("ceremony-candle");
    const flame = document.getElementById("candle-flame");
    if (!candle || !flame) return;

    const blowOut = () => {
        if (flame.classList.contains("blown-out")) return;

        flame.classList.add("blown-out");
        SoundFX.playUnlock();

        // Release star particles
        triggerConfetti();

        const text2 = document.querySelector(".ceremony-text-2");
        if (text2) text2.textContent = "MAKE A WISH UNLOCKED! ✨";

        setTimeout(() => {
            showStage(7);
        }, 2200);
    };

    candle.addEventListener("click", blowOut);
    candle.addEventListener("touchend", (e) => {
        e.preventDefault();
        blowOut();
    });
}

// Listen for visibility changes to pause animations when tab is not visible
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        renderer.render(scene, camera);
    }
});