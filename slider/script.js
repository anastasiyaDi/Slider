document.addEventListener('DOMContentLoaded', function() {
    const projects = [
        {
            city: "Rostov-on-Don\nLCD admiral",
            area: "81 m2",
            time: "3.5 months",
            cost: "Upon request",
            image: "assets/project1.jpg"
        },
        {
            city: "Sochi\nThieves",
            area: "105 m2",
            time: "4 months",
            cost: "Upon request",
            image: "assets/project2.jpg"
        },
        {
            city: "Rostov-on-Don\nPatriotic",
            area: "93 m2",
            time: "3 months",
            cost: "Upon request",
            image: "assets/project3.jpg"
        }
    ];

    // DOM elements
    const cityElement = document.getElementById('city');
    const areaElement = document.getElementById('area');
    const timeElement = document.getElementById('time');
    const costElement = document.getElementById('cost');
    const images = document.querySelectorAll('.project-image');
    const dots = document.querySelectorAll('.dot');
    const links = document.querySelectorAll('.project-link');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentIndex = 0;
    let isAnimating = false;

    // Update project information
    function updateProject(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentIndex = index;
        const project = projects[currentIndex];
        
        // Fade out current image
        images.forEach(img => img.classList.remove('active'));
        
        // Update text info after a small delay
        setTimeout(() => {
            cityElement.textContent = project.city;
            areaElement.textContent = project.area;
            timeElement.textContent = project.time;
            costElement.textContent = project.cost;

            // Update active states
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');

            links.forEach(link => link.classList.remove('active'));
            links[currentIndex].classList.add('active');

            // Fade in new image
            images[currentIndex].classList.add('active');
            isAnimating = false;
        }, 300);
    }

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            if (index !== currentIndex) {
                updateProject(index);
            }
        });
    });

    // Link navigation
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = parseInt(link.dataset.index);
            if (index !== currentIndex) {
                updateProject(index);
            }
        });
    });

    // Arrow navigation (circular)
    prevArrow.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateProject(newIndex);
    });

    nextArrow.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % projects.length;
        updateProject(newIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevArrow.click();
        } else if (e.key === 'ArrowRight') {
            nextArrow.click();
        }
    });

    // Initialize first project
    updateProject(0);
});