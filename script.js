// Inicializar EmailJS con tu Public Key
emailjs.init("ioeOTFoxcV74jYCfy");

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('personalDataForm');
    const statusMessage = document.getElementById('status-message');
    
    // Efectos de validación en tiempo real
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Validación básica en tiempo real
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.style.borderColor = '#48bb78';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });
    });
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validar formulario antes de enviar
        if (!form.checkValidity()) {
            showMessage('Por favor, completa todos los campos obligatorios correctamente.', 'error');
            return;
        }
        
        // Mostrar estado de carga
        showMessage('<i class="fas fa-spinner fa-spin"></i> Enviando mensaje...', 'loading');
        
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim(),
            fecha: new Date().toLocaleString('es-ES'),
            ip: 'No disponible' // Podrías obtener la IP con un servicio externo
        };
        
        // Validaciones adicionales
        if (formData.firstName.length < 2) {
            showMessage('El nombre debe tener al menos 2 caracteres.', 'error');
            return;
        }
        
        if (formData.message.length < 10) {
            showMessage('El mensaje debe tener al menos 10 caracteres.', 'error');
            return;
        }
        
        // Enviar email usando EmailJS
        emailjs.send("service_lmyzuvt", "template_oxf4bgk", formData)
        .then(() => {
            // Éxito
            showMessage('<i class="fas fa-check-circle"></i> ¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            
            // Limpiar formulario
            form.reset();
            
            // Restaurar bordes normales
            inputs.forEach(input => {
                input.style.borderColor = '#e2e8f0';
            });
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        })
        .catch((error) => {
            // Error
            console.error("Error al enviar el mensaje:", error);
            showMessage('<i class="fas fa-exclamation-triangle"></i> Hubo un error al enviar el mensaje. Intenta nuevamente.', 'error');
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                statusMessage.style.display = 'none';
            }, 5000);
        });
    });
    
    // Función para mostrar mensajes
    function showMessage(message, type) {
        statusMessage.className = `status-message ${type}`;
        statusMessage.innerHTML = message;
        statusMessage.style.display = 'block';
        
        // Scroll suave al mensaje
        statusMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    // Efecto de partículas en el fondo (opcional)
    createParticles();
});

// Efecto de partículas decorativas en el fondo
function createParticles() {
    const colors = ['#667eea', '#764ba2', '#6b46c1', '#553c9a'];
    const body = document.body;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 6 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '-1';
        
        // Animación
        particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        
        body.appendChild(particle);
    }
    
    // Agregar keyframes para la animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(90deg);
            }
            50% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(180deg);
            }
            75% {
                transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(270deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Validación adicional para el email
document.getElementById('email')?.addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !isValidEmail(email)) {
        this.style.borderColor = '#f56565';
        showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
    }
});

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Efecto de confeti al enviar exitosamente (opcional)
function showConfetti() {
    const confettiColors = ['#667eea', '#764ba2', '#6b46c1', '#553c9a', '#9f7aea'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        // Remover después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    // Agregar keyframes para confeti
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);
}
