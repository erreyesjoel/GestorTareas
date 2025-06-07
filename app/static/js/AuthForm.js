class AuthForm {
    constructor() {
        this.isLoginMode = true;
        this.isLoading = false;
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Elementos principales
        this.formTitle = document.getElementById('form-title');
        this.formSubtitle = document.getElementById('form-subtitle');
        this.authForm = document.getElementById('auth-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.switchLink = document.getElementById('switch-link');
        this.switchText = document.getElementById('switch-text');
        this.formContainer = document.querySelector('.form-container');
        
        // Grupos de inputs
        this.nameGroup = document.getElementById('name-group');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.nameInput = document.getElementById('name');
        
        // Botón de toggle password
        this.togglePasswordBtn = document.getElementById('toggle-password');
        this.eyeOpen = document.getElementById('eye-open');
        this.eyeClosed = document.getElementById('eye-closed');
        
        // Elementos de loading
        this.btnText = this.submitBtn.querySelector('span');
        this.btnLoading = this.submitBtn.querySelector('.btn-loading');
    }

    attachEventListeners() {
        // Cambio entre login y registro
        this.switchLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMode();
        });

        // Submit del formulario
        this.authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Toggle password visibility
        this.togglePasswordBtn.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });

        // Validación en tiempo real
        this.emailInput.addEventListener('blur', () => {
            this.validateEmail();
        });

        this.passwordInput.addEventListener('input', () => {
            this.validatePassword();
        });

        if (this.nameInput) {
            this.nameInput.addEventListener('blur', () => {
                this.validateName();
            });
        }

        // Efectos visuales en focus
        this.addFocusEffects();
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
            this.btnText.textContent = 'Iniciar Sesión';
            this.switchText.innerHTML = '¿No tienes cuenta? <a href="#" id="switch-link">Regístrate aquí</a>';
            this.nameGroup.classList.add('hidden');
            
            // Limpiar campo nombre
            this.nameInput.value = '';
            this.nameInput.removeAttribute('required');
        } else {
            // Modo Registro
            this.formTitle.textContent = 'Crear Cuenta';
            this.formSubtitle.textContent = 'Únete y comienza a organizar tus tareas';
            this.btnText.textContent = 'Crear Cuenta';
            this.switchText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="switch-link">Inicia sesión</a>';
            this.nameGroup.classList.remove('hidden');
            this.nameInput.setAttribute('required', '');
        }

        // Reattach event listener para el nuevo link
        const newSwitchLink = document.getElementById('switch-link');
        newSwitchLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMode();
        });

        // Limpiar estados de validación
        this.clearValidationStates();
    }

    togglePasswordVisibility() {
        const isPassword = this.passwordInput.type === 'password';
        
        this.passwordInput.type = isPassword ? 'text' : 'password';
        this.eyeOpen.classList.toggle('hidden', isPassword);
        this.eyeClosed.classList.toggle('hidden', !isPassword);
    }

    async handleSubmit() {
        if (this.isLoading) return;

        const isValid = this.validateForm();
        if (!isValid) return;

        this.setLoading(true);

        // Simular llamada a API
        try {
            await this.simulateAPICall();
            
            const formData = this.getFormData();
            
            if (this.isLoginMode) {
                console.log('Login attempt:', { email: formData.email });
                this.showSuccess('¡Inicio de sesión exitoso!');
            } else {
                console.log('Registration attempt:', formData);
                this.showSuccess('¡Cuenta creada exitosamente!');
            }
        } catch (error) {
            this.showError('Ha ocurrido un error. Inténtalo de nuevo.');
        } finally {
            this.setLoading(false);
        }
    }

    validateForm() {
        let isValid = true;

        // Validar email
        if (!this.validateEmail()) {
            isValid = false;
        }

        // Validar password
        if (!this.validatePassword()) {
            isValid = false;
        }

        // Validar nombre en modo registro
        if (!this.isLoginMode && !this.validateName()) {
            isValid = false;
        }

        return isValid;
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const wrapper = this.emailInput.parentElement;

        if (!email) {
            this.setInputState(wrapper, 'error');
            return false;
        }

        if (!emailRegex.test(email)) {
            this.setInputState(wrapper, 'error');
            return false;
        }

        this.setInputState(wrapper, 'success');
        return true;
    }

    validatePassword() {
        const password = this.passwordInput.value;
        const wrapper = this.passwordInput.parentElement;

        if (!password) {
            this.setInputState(wrapper, 'error');
            return false;
        }

        if (password.length < 6) {
            this.setInputState(wrapper, 'error');
            return false;
        }

        this.setInputState(wrapper, 'success');
        return true;
    }

    validateName() {
        if (this.isLoginMode) return true;

        const name = this.nameInput.value.trim();
        const wrapper = this.nameInput.parentElement;

        if (!name) {
            this.setInputState(wrapper, 'error');
            return false;
        }

        if (name.length < 2) {
            this.setInputState(wrapper, 'error');
            return false;
        }

        this.setInputState(wrapper, 'success');
        return true;
    }

    setInputState(wrapper, state) {
        wrapper.classList.remove('error', 'success');
        if (state !== 'normal') {
            wrapper.classList.add(state);
        }
    }

    clearValidationStates() {
        const wrappers = document.querySelectorAll('.input-wrapper');
        wrappers.forEach(wrapper => {
            this.setInputState(wrapper, 'normal');
        });
    }

    getFormData() {
        const data = {
            email: this.emailInput.value.trim(),
            password: this.passwordInput.value
        };

        if (!this.isLoginMode) {
            data.name = this.nameInput.value.trim();
        }

        return data;
    }

    setLoading(loading) {
        this.isLoading = loading;
        this.submitBtn.disabled = loading;
        
        if (loading) {
            this.btnText.style.opacity = '0';
            this.btnLoading.classList.remove('hidden');
        } else {
            this.btnText.style.opacity = '1';
            this.btnLoading.classList.add('hidden');
        }
    }

    async simulateAPICall() {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular éxito/error aleatorio (90% éxito)
        if (Math.random() < 0.1) {
            throw new Error('API Error');
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos dinámicos
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px',
            zIndex: '1000',
            animation: 'slideInRight 0.3s ease-out',
            background: type === 'success' 
                ? 'linear-gradient(135deg, #10b981, #059669)' 
                : 'linear-gradient(135deg, #ef4444, #dc2626)'
        });

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    addFocusEffects() {
        const inputs = document.querySelectorAll('input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'translateY(-2px)';
            });

            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'translateY(0)';
            });
        });
    }
}

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

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AuthForm();
});

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