// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light theme
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

/// CV Download Functionality
const downloadCV = document.getElementById('downloadCV');

downloadCV.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Method 1: Direct download
    const link = document.createElement('a');
    link.href = 'assets/documents/Kawsar_Mahmud_Shishir_CV.pdf';
    link.download = 'Kawsar_Mahmud_Shishir_CV.pdf';
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showNotification('CV downloaded successfully!', 'success');
});
// Skills Animation
function animateSkills() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = `${width}%`;
            }
        });
    }, { threshold: 0.5 });
    
    skillProgresses.forEach(progress => {
        observer.observe(progress);
    });
}

/// Certificate Download Tracking
function setupCertificates() {
    const downloadLinks = document.querySelectorAll('.cert-link.download-link');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const certName = link.closest('.certification-card').querySelector('h4').textContent;
            
            // Show download confirmation
            showNotification(`Downloading ${certName}...`, 'success');
            
            // You can add analytics here if needed
            console.log(`Certificate downloaded: ${certName}`);
            
            // The download will happen automatically due to the download attribute
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupCertificates();
});

// Simple file upload alternative (optional)
function setupCVUpload() {
    const cvUpload = document.createElement('input');
    cvUpload.type = 'file';
    cvUpload.accept = '.pdf';
    cvUpload.style.display = 'none';
    cvUpload.id = 'cvUpload';
    document.body.appendChild(cvUpload);
    
    // Add upload option to right-click on download button
    downloadCV.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        cvUpload.click();
    });
    
    cvUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            // You can handle the uploaded file here
            showNotification('CV updated successfully!', 'success');
        }
    });
}

// Call this if you want upload functionality
// setupCVUpload();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();
    }, 1000);
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                const nav = document.querySelector('nav ul');
                if (nav.style.display === 'flex') {
                    nav.style.display = 'none';
                }
            }
        }
    });
});

// Profile Image Upload Simulation
const profileImg = document.getElementById('profileImg');
const imageContainer = document.querySelector('.image-container');



// Notification System
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.transform = 'translateX(100%)';
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
    } else {
        notification.style.backgroundColor = '#2196F3';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active style for navigation links
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        color: var(--primary-color) !important;
    }
    
    nav a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (for smaller screens)
function createMobileMenu() {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('nav ul');
        const headerContent = document.querySelector('.header-content');
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-btn')) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            mobileMenuBtn.style.background = 'none';
            mobileMenuBtn.style.border = 'none';
            mobileMenuBtn.style.color = 'var(--text-color)';
            mobileMenuBtn.style.fontSize = '1.5rem';
            mobileMenuBtn.style.cursor = 'pointer';
            mobileMenuBtn.style.display = 'flex';
            mobileMenuBtn.style.alignItems = 'center';
            mobileMenuBtn.style.justifyContent = 'center';
            mobileMenuBtn.style.width = '40px';
            mobileMenuBtn.style.height = '40px';
            mobileMenuBtn.style.borderRadius = '50%';
            mobileMenuBtn.style.transition = 'var(--transition)';
            
            mobileMenuBtn.addEventListener('mouseenter', () => {
                mobileMenuBtn.style.backgroundColor = 'var(--card-bg)';
            });
            
            mobileMenuBtn.addEventListener('mouseleave', () => {
                mobileMenuBtn.style.backgroundColor = 'transparent';
            });
            
            mobileMenuBtn.addEventListener('click', () => {
                if (nav.style.display === 'flex') {
                    nav.style.display = 'none';
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                } else {
                    nav.style.display = 'flex';
                    nav.style.flexDirection = 'column';
                    nav.style.position = 'absolute';
                    nav.style.top = '100%';
                    nav.style.left = '0';
                    nav.style.width = '100%';
                    nav.style.backgroundColor = 'var(--bg-color)';
                    nav.style.boxShadow = '0 10px 20px var(--shadow)';
                    nav.style.padding = '20px 0';
                    nav.style.zIndex = '99';
                    
                    // Style the nav items for mobile
                    Array.from(nav.children).forEach(li => {
                        li.style.margin = '10px 0';
                        li.style.textAlign = 'center';
                    });
                    
                    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                }
            });
            
            headerContent.appendChild(mobileMenuBtn);
        }
    } 
    else {
        // Remove mobile menu button and reset nav display for larger screens
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.remove();
        }
        
        const nav = document.querySelector('nav ul');
        if (nav) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
            nav.style.position = 'static';
            nav.style.width = 'auto';
            nav.style.backgroundColor = 'transparent';
            nav.style.boxShadow = 'none';
            nav.style.padding = '0';
            
            // Reset nav items style
            Array.from(nav.children).forEach }}}