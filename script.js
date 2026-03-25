document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation
    const navbar = document.getElementById('navbar');
    const navContainer = document.getElementById('nav-container');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
            navContainer.classList.remove('h-20');
            navContainer.classList.add('h-[70px]');
        } else {
            navbar.classList.remove('nav-scrolled');
            navContainer.classList.add('h-20');
            navContainer.classList.remove('h-[70px]');
        }
    });

    // 2. Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const menuLinks = menu.querySelectorAll('a');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const icon = btn.querySelector('i');
        if (menu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Reveal on Scroll Animation
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);
    reveal(); // Trigger once on load to reveal elements currently in view

    // 4. Menu Filtering Logic
    const filterBtns = document.querySelectorAll('.menu-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active styles from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('bg-pink-600', 'text-[#0A0A0A]', 'border-pink-600');
                b.classList.add('bg-zinc-900/50', 'text-gray-300', 'border-zinc-700');
            });
            
            // Add active styles to the clicked button
            btn.classList.add('bg-pink-600', 'text-[#0A0A0A]', 'border-pink-600');
            btn.classList.remove('bg-zinc-900/50', 'text-gray-300', 'border-zinc-700');

            const filterValue = btn.getAttribute('data-filter');

            // Filter items with a smooth fade effect
            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // small timeout allows display:block to apply before opacity transitions
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Wait for transition to finish before hiding
                }
            });
        });
    });
});
