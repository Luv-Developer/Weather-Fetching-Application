
        // Button functionality
        document.getElementById('logoutBtn').addEventListener('click', function() {
            showMessage('Logging out... Redirecting to login page.', 'info');
            
            // Simulate logout process
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });

        document.getElementById('homeBtn').addEventListener('click', function() {
            showMessage('Returning to homepage...', 'info');
            
            // Simulate navigation to homepage
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });

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
                background: ${type === 'info' ? '#2196f3' : type === 'success' ? '#4caf50' : '#f44336'};
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
        
        // Add some interactive effects to stat cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });