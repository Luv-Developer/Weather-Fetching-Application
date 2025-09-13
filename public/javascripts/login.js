
        // Password visibility toggle
        document.getElementById('passwordToggle').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
        
        // Create rain animation
        function createRain() {
            const rainContainer = document.getElementById('rainAnimation');
            const dropCount = 70;
            
            for (let i = 0; i < dropCount; i++) {
                const drop = document.createElement('div');
                drop.classList.add('drop');
                
                // Random properties for each drop
                const left = Math.random() * 100;
                const width = Math.random() * 2 + 1;
                const height = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                const duration = Math.random() * 1 + 0.5;
                
                drop.style.left = `${left}%`;
                drop.style.width = `${width}px`;
                drop.style.height = `${height}px`;
                drop.style.animationDelay = `${delay}s`;
                drop.style.animationDuration = `${duration}s`;
                
                rainContainer.appendChild(drop);
            }
        }
        
        // Show message function
        function showMessage(message, type) {
            // Remove any existing messages
            const existingMessage = document.querySelector('.message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            const messageEl = document.createElement('div');
            messageEl.className = `message ${type}`;
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                opacity: 0;
                transform: translateX(100px);
                transition: all 0.3s ease;
                max-width: 300px;
                background: ${type === 'success' ? '#4caf50' : '#f44336'};
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            `;
            
            document.body.appendChild(messageEl);
            
            // Animate in
            setTimeout(() => {
                messageEl.style.opacity = '1';
                messageEl.style.transform = 'translateX(0)';
            }, 10);
            
            // Animate out after 3 seconds
            setTimeout(() => {
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateX(100px)';
                setTimeout(() => {
                    messageEl.remove();
                }, 300);
            }, 3000);
        }
        
        // Initialize rain animation
        createRain();
        
        // Add focus effects to inputs
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });