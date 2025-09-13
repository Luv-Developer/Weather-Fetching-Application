        // Add interactive animations to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseover', () => {
                button.querySelector('i').style.transform = 'scale(1.2)';
            });
            
            button.addEventListener('mouseout', () => {
                button.querySelector('i').style.transform = 'scale(1)';
            });
        });

        // Add slight delay to each button animation for staggered effect
        document.querySelectorAll('.btn').forEach((btn, index) => {
            btn.style.animationDelay = `${index * 0.1}s`;
        });