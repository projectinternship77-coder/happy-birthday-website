const text = "Happy Birthday, Bayko! ❤️";
let charIndex = 0;

function typeWriter() {
    if (charIndex < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 120);
    }
}

// Master function to unlock audio on first click
function showNextPage(pageNum) {
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic.paused) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio waiting for user gesture"));
    }
    
    document.querySelectorAll('.full-page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page${pageNum}`).classList.add('active');
}

function blowCandle() {
    const bgMusic = document.getElementById('bg-music');
    const celebration = document.getElementById('celebration-song');
    
    // 1. Visual Blow Out
    document.getElementById('flame').style.display = 'none';
    
    // 2. Confetti Explosion
    confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff74a4', '#ffffff', '#ff80ab']
    });

    // 3. Audio Switch
    bgMusic.pause();
    celebration.currentTime = 0;
    celebration.play();
    
    // Return to soft music after song ends
    celebration.onended = () => bgMusic.play();

    // 4. Reveal "I Love You"
    setTimeout(() => {
        document.getElementById('cake-box').classList.add('hidden');
        document.getElementById('love-message').classList.remove('hidden');
    }, 1000);
}

function zoomImage(slideElement) {
    const imgSrc = slideElement.querySelector('img').src;
    const caption = slideElement.querySelector('.image-caption').innerText;
    document.getElementById('zoom-img').src = imgSrc;
    document.getElementById('zoom-caption').innerText = caption;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeZoom() { document.getElementById('lightbox').style.display = 'none'; }

function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.cssText = `position:fixed; left:${Math.random()*100}vw; bottom:-5vh; font-size:${Math.random()*20+10}px; color:#ff74a4; opacity:${Math.random()}; pointer-events:none; transition:transform 6s linear; z-index:0;`;
    document.getElementById('hearts-container').appendChild(heart);
    setTimeout(() => heart.style.transform = `translateY(-110vh) rotate(${Math.random()*360}deg)`, 100);
    setTimeout(() => heart.remove(), 6000);
}

window.onload = () => {
    typeWriter();
    setInterval(createHeart, 300);
    const slider = document.getElementById('slider');
    slider.innerHTML += slider.innerHTML; // Duplicates for seamless scroll
};