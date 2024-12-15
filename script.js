// Handle Loading Screen
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded");

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark-theme", savedTheme === "dark");
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
});

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-theme");
    themeToggle.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
});

// Form Validation
document.querySelector('form').addEventListener('submit', function (e) {
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    let valid = true;

    // Username validation
    if (username.value.trim() === '') {
        valid = false;
        username.style.border = '2px solid red';
        alert('Username is required!');
    } else {
        username.style.border = '1px solid #ddd';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        valid = false;
        email.style.border = '2px solid red';
        alert('Enter a valid email!');
    } else {
        email.style.border = '1px solid #ddd';
    }

    // Prevent form submission if invalid
    if (!valid) e.preventDefault();
});

// Bar Chart in Canvas
// Ensure the canvas element is properly targeted
const canvas = document.getElementById('myCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    // Initialize the Chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Math', 'Science', 'English', 'History', 'Art'],
            datasets: [
                {
                    label: 'Student Grades',
                    data: [85, 90, 78, 88, 92],
                    backgroundColor: ['#81D4FA', '#0288D1', '#B39DDB', '#FFAB91', '#AED581'],
                    hoverBackgroundColor: ['#0288D1', '#81D4FA', '#9575CD', '#FF7043', '#8BC34A'],
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.raw}`,
                    },
                },
            },
        },
    });
}



//   scroll
// Highlight Active Navigation Link
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const fromTop = window.scrollY;

    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});


// Back-to-Top Button
const backToTop = document.querySelector('.back-to-top');
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Playback Speed Controls
// Playback Speed and Fullscreen
document.querySelectorAll('.media-item').forEach((item) => {
    const video = item.querySelector('video');
    const playbackButtons = item.querySelectorAll('.playback-speed');

    playbackButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const speed = parseFloat(button.dataset.speed);
            video.playbackRate = speed;
        });
    });

    const fullscreenButton = item.querySelector('[id^="fullscreen-btn"]');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
    }
});

// Media Search Filter
document.getElementById('media-search').addEventListener('input', function () {
    const searchQuery = this.value.toLowerCase();
    const mediaItems = document.querySelectorAll('.media-item');

    mediaItems.forEach(item => {
        const title = item.querySelector('p')?.textContent.toLowerCase();
        if (title && title.includes(searchQuery)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});


//   carousel
// Carousel Functionality
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange slides side by side
slides.forEach((slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
});

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current');
    targetSlide.classList.add('current');
};

// Next Button
nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current');
    const nextSlide = currentSlide.nextElementSibling;
    if (nextSlide) moveToSlide(track, currentSlide, nextSlide);
});

// Previous Button
prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current');
    const prevSlide = currentSlide.previousElementSibling;
    if (prevSlide) moveToSlide(track, currentSlide, prevSlide);
});


// FAQ Accordion
document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.display === 'block';

        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach((faq) => {
            faq.style.display = 'none';
        });

        // Toggle the current answer
        answer.style.display = isOpen ? 'none' : 'block';
    });
});


// skills js
// Skills Progress Bar Animation
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.progress');

const animateSkills = () => {
  skillBars.forEach((bar) => {
    const targetWidth = bar.textContent;
    bar.style.width = targetWidth;
  });
};

// Trigger animation on scroll
window.addEventListener('scroll', () => {
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
    animateSkills();
  }
});

// email
// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate fields
    if (!name || !email || !message) {
        alert('Please fill out all fields before submitting.');
        return;
    }

    try {
        // Initialize EmailJS
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your public key from EmailJS

        // Send email using EmailJS
        await emailjs.send('service_v83k3w1', 'template_tmtk0rr', {
            from_name: name,
            from_email: email,
            message: message,
        });

        alert('Message sent successfully!');
        document.getElementById('contact-form').reset(); // Clear the form
    } catch (err) {
        alert('Failed to send message. Try again later.');
        console.error('Error sending message:', err);
    }
});

  
  // Smooth Scroll for Navigation
document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill out all fields before submitting.');
        return;
    }

    try {
        emailjs.init('YOUR_PUBLIC_KEY'); // Initialize EmailJS
        await emailjs.send('service_v83k3w1', 'template_tmtk0rr', {
            from_name: name,
            from_email: email,
            message: message,
        });

        // Show confirmation modal
        const modal = document.getElementById('confirmation-modal');
        modal.style.display = 'flex';

        // Clear form fields
        document.getElementById('contact-form').reset();

        // Close modal on click
        document.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal on outside click
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    } catch (err) {
        alert('Failed to send message. Try again later.');
        console.error(err);
    }
});

// scroll
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollPosition = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollPosition / documentHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});


// Testimonials Carousel
const testimonialTrack = document.querySelector('.testimonials-carousel .carousel-track');
const testimonialSlides = Array.from(testimonialTrack.children);
const nextTestimonialButton = document.querySelector('.testimonials-carousel .next');
const prevTestimonialButton = document.querySelector('.testimonials-carousel .prev');
const testimonialSlideWidth = testimonialSlides[0].getBoundingClientRect().width;

// Arrange slides side by side
testimonialSlides.forEach((slide, index) => {
  slide.style.left = `${testimonialSlideWidth * index}px`;
});

const moveToTestimonial = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current');
  targetSlide.classList.add('current');
};

// Next Button
nextTestimonialButton.addEventListener('click', () => {
  const currentSlide = testimonialTrack.querySelector('.current');
  const nextSlide = currentSlide.nextElementSibling || testimonialSlides[0]; // Loop back to start
  moveToTestimonial(testimonialTrack, currentSlide, nextSlide);
});

// Previous Button
prevTestimonialButton.addEventListener('click', () => {
  const currentSlide = testimonialTrack.querySelector('.current');
  const prevSlide =
    currentSlide.previousElementSibling || testimonialSlides[testimonialSlides.length - 1]; // Loop to end
  moveToTestimonial(testimonialTrack, currentSlide, prevSlide);
});
