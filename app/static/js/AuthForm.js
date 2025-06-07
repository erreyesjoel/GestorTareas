class AuthForm {
    constructor() {
        this.isLoginMode = true;
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Elementos principales
        this.formTitle = document.getElementById('form-title');
        this.formSubtitle = document.getElementById('form-subtitle');
        this.loginForm = document.getElementById('login-form');
        this.registroForm = document.getElementById('registro-form');
        this.switchLink = document.getElementById('switch-link');
        this.switchText = document.getElementById('switch-text');
        this.formContainer = document.querySelector('.form-container');
    }

    attachEventListeners() {
        // Cambio entre login y registro
        this.switchLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMode();
        });

        // Toggle password visibility para ambos formularios
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wrapper = e.target.closest('.input-wrapper');
                const input = wrapper.querySelector('input[type="password"]');
                const eyeOpen = wrapper.querySelector('#eye-open');
                const eyeClosed = wrapper.querySelector('#eye-closed');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    eyeOpen.classList.add('hidden');
                    eyeClosed.classList.remove('hidden');
                } else {
                    input.type = 'password';
                    eyeOpen.classList.remove('hidden');
                    eyeClosed.classList.add('hidden');
                }
            });
        });
    }

    toggleMode() {
        this.isLoginMode = !this.isLoginMode;
        
        // Añadir clase de animación
        this.formContainer.classList.add('switching');
        
        setTimeout(() => {
            this.updateFormContent();
            this.formContainer.classList.remove('switching');
        }, 300);
    }

    updateFormContent() {
        if (this.isLoginMode) {
            // Modo Login
            this.formTitle.textContent = 'Iniciar Sesión';
            this.formSubtitle.textContent = 'Accede a tu cuenta para gestionar tus tareas';
            this.loginForm.classList.remove('hidden');
            this.registroForm.classList.add('hidden');
            this.switchText.innerHTML = '¿No tienes cuenta? <a href="#" id="switch-link">Regístrate aquí</a>';
        } else {
            // Modo Registro
            this.formTitle.textContent = 'Crear Cuenta';
            this.formSubtitle.textContent = 'Únete y comienza a organizar tus tareas';
            this.loginForm.classList.add('hidden');
            this.registroForm.classList.remove('hidden');
            this.switchText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="switch-link">Inicia sesión</a>';
        }

        // Reattach event listener para el nuevo link
        const newSwitchLink = document.getElementById('switch-link');
        newSwitchLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMode();
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AuthForm();
            });

// Añadir animaciones CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Añadir efectos de partículas en el fondo (opcional)
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particlesContainer.appendChild(particle);
    }

    document.body.appendChild(particlesContainer);
}

// Añadir animación de partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Crear partículas después de un breve delay
setTimeout(createFloatingParticles, 1000);