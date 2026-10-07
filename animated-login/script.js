/**
 * NexusAuth &bull; Interactive Animated Login Script
 * Features:
 * - Dynamic Vector Pupil Eye-Tracking
 * - Peek-a-boo Paws on Password Focus & Visibility Toggle
 * - 3D Perspective Tilt Physics on Card
 * - Ambient Particle Canvas System
 * - Smooth Sliding Form Tabs (Sign In / Sign Up)
 * - Real-time Password Strength Meter
 * - Modern Form Validation & Animated Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const mascotWrapper = document.getElementById('mascotWrapper');
  const leftPupil = document.getElementById('leftPupilGroup');
  const rightPupil = document.getElementById('rightPupilGroup');
  const leftEyeWhite = document.querySelector('#eyesGroup ellipse:nth-child(1)');
  const rightEyeWhite = document.querySelector('#eyesGroup ellipse:nth-child(2)');
  const mascotSvg = document.getElementById('mascotSvg');

  const cardContainer = document.getElementById('cardContainer');
  const glassCard = document.getElementById('glassCard');

  const signInTab = document.getElementById('signInTab');
  const signUpTab = document.getElementById('signUpTab');
  const tabsIndicator = document.getElementById('tabsIndicator');
  const formsSlider = document.getElementById('formsSlider');
  const formSubtitle = document.getElementById('formSubtitle');

  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const signInEmail = document.getElementById('signInEmail');
  const signInPassword = document.getElementById('signInPassword');
  const signUpName = document.getElementById('signUpName');
  const signUpEmail = document.getElementById('signUpEmail');
  const signUpPassword = document.getElementById('signUpPassword');
  const agreeTerms = document.getElementById('agreeTerms');

  const strengthMeter = document.getElementById('strengthMeter');
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');

  const togglePasswordBtns = document.querySelectorAll('.toggle-password-btn');
  const toastContainer = document.getElementById('toastContainer');

  // Mascot State Tracking
  let isCoveringEyes = false;
  let isPeeking = false;
  let isLookingAtInput = false;

  /* ==========================================================
     1. Interactive SVG Mascot & Eye-Tracking System
     ========================================================== */

  // Calculate eye center coordinates in viewport space
  function getElementCenter(el) {
    if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  // Handle pupil position based on cursor target coordinates
  function updatePupils(targetX, targetY) {
    if (isCoveringEyes && !isPeeking) return;

    const leftCenter = getElementCenter(leftEyeWhite);
    const rightCenter = getElementCenter(rightEyeWhite);
    const maxOffset = 5.5; // Maximum pupil travel distance inside eye white

    // Left Pupil calculation
    const dxL = targetX - leftCenter.x;
    const dyL = targetY - leftCenter.y;
    const angleL = Math.atan2(dyL, dxL);
    const distL = Math.min(maxOffset, Math.hypot(dxL, dyL) / 35);
    const xL = Math.cos(angleL) * distL;
    const yL = Math.sin(angleL) * distL;
    leftPupil.style.transform = `translate(${xL.toFixed(2)}px, ${yL.toFixed(2)}px)`;

    // Right Pupil calculation
    const dxR = targetX - rightCenter.x;
    const dyR = targetY - rightCenter.y;
    const angleR = Math.atan2(dyR, dxR);
    const distR = Math.min(maxOffset, Math.hypot(dxR, dyR) / 35);
    const xR = Math.cos(angleR) * distR;
    const yR = Math.sin(angleR) * distR;
    rightPupil.style.transform = `translate(${xR.toFixed(2)}px, ${yR.toFixed(2)}px)`;
  }

  // Track Mouse movement across window
  window.addEventListener('mousemove', (e) => {
    if (!isLookingAtInput && !isCoveringEyes) {
      updatePupils(e.clientX, e.clientY);
    }
  });

  // Mascot Blinking Cycle
  function triggerBlink() {
    if (isCoveringEyes) return;
    mascotWrapper.classList.add('mascot-blinking');
    setTimeout(() => {
      mascotWrapper.classList.remove('mascot-blinking');
    }, 150);
  }

  function scheduleNextBlink() {
    const delay = Math.random() * 3500 + 2500; // Between 2.5s and 6s
    setTimeout(() => {
      triggerBlink();
      scheduleNextBlink();
    }, delay);
  }
  scheduleNextBlink();

  // Mascot Reactions: Nod & Shake
  function triggerMascotNod() {
    mascotWrapper.classList.add('nodding');
    setTimeout(() => mascotWrapper.classList.remove('nodding'), 750);
  }

  function triggerMascotShake() {
    mascotWrapper.classList.add('shaking');
    setTimeout(() => mascotWrapper.classList.remove('shaking'), 550);
  }

  // Look down at non-password inputs
  const textInputs = [signInEmail, signUpName, signUpEmail];
  textInputs.forEach(input => {
    if (!input) return;
    input.addEventListener('focus', () => {
      isLookingAtInput = true;
      const rect = input.getBoundingClientRect();
      updatePupils(rect.left + 50, rect.top + 15);
    });

    input.addEventListener('blur', () => {
      isLookingAtInput = false;
    });

    // Follow typing slightly
    input.addEventListener('input', () => {
      if (isLookingAtInput) {
        const rect = input.getBoundingClientRect();
        const cursorShift = Math.min(rect.width - 20, input.value.length * 8);
        updatePupils(rect.left + 25 + cursorShift, rect.top + 20);
      }
    });
  });

  // Peekaboo Paws behavior on Password Fields
  const passwordInputs = [signInPassword, signUpPassword];
  passwordInputs.forEach(passInput => {
    if (!passInput) return;

    passInput.addEventListener('focus', () => {
      const isVisible = passInput.getAttribute('type') === 'text';
      if (isVisible) {
        setMascotPeek();
      } else {
        setMascotCoverEyes();
      }
    });

    passInput.addEventListener('blur', (e) => {
      // Small timeout to allow toggle button clicks without resetting prematurely
      setTimeout(() => {
        const activeEl = document.activeElement;
        const isStillPassword = activeEl && (activeEl.classList.contains('password-input') || activeEl.classList.contains('toggle-password-btn'));
        if (!isStillPassword) {
          resetMascotPaws();
        }
      }, 100);
    });
  });

  function setMascotCoverEyes() {
    isCoveringEyes = true;
    isPeeking = false;
    mascotWrapper.classList.add('covering-eyes');
    mascotWrapper.classList.remove('peeking');
  }

  function setMascotPeek() {
    isCoveringEyes = true;
    isPeeking = true;
    mascotWrapper.classList.add('covering-eyes');
    mascotWrapper.classList.add('peeking');
    // Direct pupil towards the password field while peeking!
    const activePass = document.activeElement.classList.contains('password-input') ? document.activeElement : signInPassword;
    if (activePass) {
      const rect = activePass.getBoundingClientRect();
      updatePupils(rect.right - 40, rect.top + 15);
    }
  }

  function resetMascotPaws() {
    isCoveringEyes = false;
    isPeeking = false;
    mascotWrapper.classList.remove('covering-eyes');
    mascotWrapper.classList.remove('peeking');
  }

  // Mascot Click easter egg
  mascotWrapper.addEventListener('click', () => {
    triggerMascotNod();
    showToast('Hello there! Ready to authenticate? 🚀', 'info', 2500);
  });

  /* ==========================================================
     2. Password Visibility Toggle
     ========================================================== */
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const inputContainer = btn.closest('.input-container');
      const input = inputContainer.querySelector('.password-input');
      const eyeOpen = btn.querySelector('.eye-open-icon');
      const eyeClosed = btn.querySelector('.eye-closed-icon');

      const isCurrentlyPassword = input.getAttribute('type') === 'password';

      if (isCurrentlyPassword) {
        input.setAttribute('type', 'text');
        eyeOpen.classList.add('hidden');
        eyeClosed.classList.remove('hidden');
        setMascotPeek();
      } else {
        input.setAttribute('type', 'password');
        eyeOpen.classList.remove('hidden');
        eyeClosed.classList.add('hidden');
        setMascotCoverEyes();
      }
      input.focus();
    });
  });

  /* ==========================================================
     3. 3D Perspective Tilt Physics on Card
     ========================================================== */
  let isHoveringCard = false;

  cardContainer.addEventListener('mouseenter', () => {
    isHoveringCard = true;
  });

  cardContainer.addEventListener('mouseleave', () => {
    isHoveringCard = false;
    cardContainer.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isHoveringCard && window.innerWidth > 768) return;

    const rect = glassCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Limit maximum tilt angle
    const maxTilt = 8;
    const rotateY = Math.max(-maxTilt, Math.min(maxTilt, (mouseX / (rect.width / 2)) * maxTilt));
    const rotateX = Math.max(-maxTilt, Math.min(maxTilt, -(mouseY / (rect.height / 2)) * maxTilt));

    cardContainer.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  /* ==========================================================
     4. Tab Navigation (Sign In vs Create Account)
     ========================================================== */
  function switchToSignIn() {
    signInTab.classList.add('active');
    signUpTab.classList.remove('active');
    signInTab.setAttribute('aria-selected', 'true');
    signUpTab.setAttribute('aria-selected', 'false');

    tabsIndicator.style.transform = 'translateX(0%)';
    formsSlider.classList.remove('show-signup');
    formSubtitle.textContent = 'Enter your credentials to access your console';
    clearErrors();
    resetMascotPaws();
  }

  function switchToSignUp() {
    signUpTab.classList.add('active');
    signInTab.classList.remove('active');
    signUpTab.setAttribute('aria-selected', 'true');
    signInTab.setAttribute('aria-selected', 'false');

    tabsIndicator.style.transform = 'translateX(100%)';
    formsSlider.classList.add('show-signup');
    formSubtitle.textContent = 'Join Nexus and build the future today';
    clearErrors();
    resetMascotPaws();
  }

  signInTab.addEventListener('click', switchToSignIn);
  signUpTab.addEventListener('click', switchToSignUp);

  /* ==========================================================
     5. Password Strength Meter
     ========================================================== */
  if (signUpPassword) {
    signUpPassword.addEventListener('input', () => {
      const val = signUpPassword.value;
      let score = 0;

      if (val.length >= 6) score++;
      if (val.length >= 10) score++;
      if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      let width = 0;
      let color = '#ef4444';
      let message = 'Too weak';

      if (val.length === 0) {
        width = 0;
        message = 'Enter at least 6 characters';
        color = 'transparent';
      } else if (score <= 2) {
        width = 25;
        color = '#ef4444'; // Red
        message = 'Weak password';
      } else if (score === 3) {
        width = 50;
        color = '#f59e0b'; // Amber
        message = 'Moderate strength';
      } else if (score === 4) {
        width = 75;
        color = '#3b82f6'; // Blue
        message = 'Good password';
      } else {
        width = 100;
        color = '#10b981'; // Green
        message = 'Very strong password ✨';
      }

      strengthFill.style.width = `${width}%`;
      strengthFill.style.backgroundColor = color;
      strengthText.textContent = message;
      strengthText.style.color = color;
    });
  }

  /* ==========================================================
     6. Ripple Click Effect on Buttons
     ========================================================== */
  document.querySelectorAll('.submit-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = this.querySelector('.btn-ripple');
      if (!ripple) return;

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.animation = 'none';
      // Trigger reflow
      ripple.offsetHeight;
      ripple.style.animation = 'rippleEffect 0.6s linear';
    });
  });

  /* ==========================================================
     7. Form Validation & Toast System
     ========================================================== */
  function setError(input, errorElement, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('has-error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }

  function clearError(input, errorElement) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('has-error');
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
  }

  function clearErrors() {
    document.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));
    document.querySelectorAll('.error-msg').forEach(em => {
      em.textContent = '';
      em.classList.remove('visible');
    });
  }

  // Clear errors dynamically on input
  [signInEmail, signInPassword, signUpName, signUpEmail, signUpPassword].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      const errorMsg = input.closest('.form-group').querySelector('.error-msg');
      if (errorMsg) clearError(input, errorMsg);
    });
  });

  // Toast Notification Engine
  function showToast(message, type = 'info', duration = 3500) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-msg">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => toast.remove(), 320);
    }, duration);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Handle Sign In Submission
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    const emailVal = signInEmail.value.trim();
    const passVal = signInPassword.value;
    const emailErr = document.getElementById('signInEmailError');
    const passErr = document.getElementById('signInPasswordError');

    if (!emailVal) {
      setError(signInEmail, emailErr, 'Please enter your email address');
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      setError(signInEmail, emailErr, 'Please enter a valid email (e.g. name@domain.com)');
      isValid = false;
    }

    if (!passVal) {
      setError(signInPassword, passErr, 'Please enter your password');
      isValid = false;
    } else if (passVal.length < 6) {
      setError(signInPassword, passErr, 'Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) {
      triggerMascotShake();
      showToast('Please correct the highlighted errors.', 'error');
      return;
    }

    // Process Simulated Authentication
    const submitBtn = document.getElementById('signInSubmitBtn');
    submitBtn.classList.add('loading');

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      triggerMascotNod();
      showToast(`Welcome back, ${emailVal.split('@')[0]}! Redirecting... 🎉`, 'success', 4000);
      resetMascotPaws();
    }, 1200);
  });

  // Handle Sign Up Submission
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    let isValid = true;

    const nameVal = signUpName.value.trim();
    const emailVal = signUpEmail.value.trim();
    const passVal = signUpPassword.value;
    const nameErr = document.getElementById('signUpNameError');
    const emailErr = document.getElementById('signUpEmailError');
    const passErr = document.getElementById('signUpPasswordError');

    if (!nameVal) {
      setError(signUpName, nameErr, 'Please enter your full name');
      isValid = false;
    }

    if (!emailVal) {
      setError(signUpEmail, emailErr, 'Please enter your email address');
      isValid = false;
    } else if (!validateEmail(emailVal)) {
      setError(signUpEmail, emailErr, 'Please enter a valid email address');
      isValid = false;
    }

    if (!passVal) {
      setError(signUpPassword, passErr, 'Please choose a password');
      isValid = false;
    } else if (passVal.length < 6) {
      setError(signUpPassword, passErr, 'Password must be at least 6 characters');
      isValid = false;
    }

    if (!agreeTerms.checked) {
      showToast('Please accept the Terms & Privacy to create an account.', 'error');
      isValid = false;
    }

    if (!isValid) {
      triggerMascotShake();
      return;
    }

    // Process Simulated Account Creation
    const submitBtn = document.getElementById('signUpSubmitBtn');
    submitBtn.classList.add('loading');

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      triggerMascotNod();
      showToast(`Account created for ${nameVal}! You can now sign in. 🚀`, 'success', 4000);
      setTimeout(() => {
        switchToSignIn();
        signInEmail.value = emailVal;
      }, 1500);
    }, 1300);
  });

  // Social Sign In Click handler
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.getAttribute('title');
      triggerMascotNod();
      showToast(`Connecting with ${provider}...`, 'info', 2000);
    });
  });

  // Forgot Password Link handler
  document.getElementById('forgotPasswordLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    const email = signInEmail.value.trim();
    if (email && validateEmail(email)) {
      showToast(`Password reset link dispatched to ${email}`, 'info', 3000);
    } else {
      showToast('Enter your email above and click forgot password again.', 'info', 3000);
      signInEmail.focus();
    }
  });

  /* ==========================================================
     8. Ambient Particle Canvas Animation System
     ========================================================== */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 42;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 0.8;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.baseAlpha = this.alpha;
        this.pulseSpeed = Math.random() * 0.02 + 0.008;
        this.pulseAngle = Math.random() * Math.PI * 2;
        // Subtle color variety between cyan and soft purple
        this.color = Math.random() > 0.4 ? '147, 197, 253' : '192, 132, 252';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        this.pulseAngle += this.pulseSpeed;
        this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.15;

        // Wrap around borders
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${Math.max(0.1, this.alpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connect near particles with subtle glowing lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.strokeStyle = `rgba(167, 139, 250, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }
});
