const ThemeManager = {
    init() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);
        
        const themeSwitch = document.getElementById('theme-switch');
        const themeIcon = themeSwitch.querySelector('.theme-icon');
        
        // Set initial icon
        themeIcon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
        
        themeSwitch.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Fade out
            themeIcon.style.opacity = '0';
            
            // Change icon and fade in
            setTimeout(() => {
                themeIcon.textContent = newTheme === 'light' ? '☀️' : '🌙';
                themeIcon.style.opacity = '1';
                this.setTheme(newTheme);
            }, 150);
        });
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});