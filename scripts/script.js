const hamburgerNav = document.querySelector('.hamburger-nav');
const navMenu = document.querySelector('.nav-menu');

document.addEventListener('DOMContentLoaded', function() {
  hamburgerNav.addEventListener('click', function() {
    hamburgerNav.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburgerNav.classList.remove('active');
  navMenu.classList.remove('active');
}));

document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/Erin_Mikaela_Esteban_CV.pdf';
    link.download = 'Erin_Mikaela_Esteban_CV.pdf';
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function sendMailto() {
    const mailtoLink = document.createElement('a');
    mailtoLink.href = 'mailto:erinmikaelaesteban@gmail.com';
    mailtoLink.click();
}

document.addEventListener('DOMContentLoaded', function() {
    const chartElement = document.getElementById('skillsChart');
    if (!chartElement) return;
    
    const ctx = chartElement.getContext('2d');
    
    // Define all skills with their categories
    const skills = [
        // Programming Languages
        { name: 'C', level: 1, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', category: 'Programming Languages' },
        { name: 'C++', level: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', category: 'Programming Languages' },
        { name: 'Java', level: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'Programming Languages' },
         { name: 'JavaScript', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Programming Languages' },
        // Databases
        { name: 'MySQL', level: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'Databases' },
        { name: 'SQLite3', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', category: 'Databases' },
        // Web & Tools
        { name: 'HTML5', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'Web & Tools' },
        { name: 'CSS3', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'Web & Tools' },
        { name: 'VS Code', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', category: 'Web & Tools' },
        { name: 'Figma', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', category: 'Web & Tools' },
        { name: 'Trello', level: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg', category: 'Web & Tools' },
        { name: 'GitHub Desktop', level: 4, icon: 'assets/githubdesktop.jpg', category: 'Web & Tools' },
        { name: 'GitHub', level: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'Web & Tools' }
    ];
    
    const images = [];
    let loadedImages = 0;
    
    // Load all images first
    skills.forEach((skill, index) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            loadedImages++;
            if (loadedImages === skills.length) {
                createChart();
            }
        };
        img.onerror = function() {
            loadedImages++;
            if (loadedImages === skills.length) {
                createChart();
            }
        };
        img.src = skill.icon;
        images[index] = img;
    });
    
    function createChart() {
        // Map skill levels to proficiency labels
        const levelLabels = ['', 'Beginner', 'Advanced Beginner', 'Intermediate', 'Advanced', 'Expert'];
        
        const skillsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: skills.map(s => s.name),
                datasets: [{
                    label: 'Skill Level',
                    data: skills.map(s => s.level),
                    backgroundColor: skills.map((s, i) => {
                        const colors = ['#b39b87', '#8b7966', '#6b5d52', '#4a4038', '#362e28', '#d4bfaa'];
                        return colors[i % colors.length];
                    }),
                    borderWidth: 0,
                    barThickness: 40
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return levelLabels[context.raw];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                return levelLabels[value] || '';
                            },
                            font: {
                                size: 11,
                                family: 'Poppins'
                            }
                        },
                        grid: {
                            color: '#e0e0e0'
                        }
                    }
                },
                layout: {
                    padding: {
                        bottom: 80,
                        top: 20
                    }
                }
            },
            plugins: [{
                afterDraw: function(chart) {
                    const ctx = chart.ctx;
                    const xAxis = chart.scales.x;
                    
                    // Group skills by category
                    let currentCategory = '';
                    let categoryStart = 0;
                    
                    skills.forEach((skill, index) => {
                        // Skip gap items
                        if (skill.isGap) return;
                        
                        const x = xAxis.getPixelForTick(index);
                        const y = chart.chartArea.bottom + 15;
                        
                        // Draw skill icon
                        if (images[index] && images[index].complete && images[index].width > 0) {
                            const size = 35;
                            ctx.drawImage(images[index], x - size/2, y, size, size);
                            
                            // Draw skill name below icon
                            ctx.fillStyle = '#333';
                            ctx.font = '10px Poppins';
                            ctx.textAlign = 'center';
                            ctx.fillText(skill.name, x, y + size + 12);
                        } else if (!skill.isGap) {
                            // Fallback text
                            ctx.fillStyle = '#333';
                            ctx.font = '11px Poppins';
                            ctx.textAlign = 'center';
                            ctx.fillText(skill.name, x, y + 15);
                        }
                        
                        // Draw category labels
                        if (currentCategory !== skill.category && !skill.isGap) {
                            if (currentCategory !== '' && !currentCategory.startsWith('gap')) {
                                // Draw previous category
                                const categoryX = (xAxis.getPixelForTick(categoryStart) + xAxis.getPixelForTick(index - 1)) / 2;
                                ctx.fillStyle = '#362312';
                                ctx.font = 'bold 12px Poppins';
                                ctx.textAlign = 'center';
                                ctx.fillText(currentCategory, categoryX, y + 65);
                            }
                            currentCategory = skill.category;
                            categoryStart = index;
                        }
                        
                        // Draw last category
                        if (index === skills.length - 1) {
                            const categoryX = (xAxis.getPixelForTick(categoryStart) + xAxis.getPixelForTick(index)) / 2;
                            ctx.fillStyle = '#362312';
                            ctx.font = 'bold 12px Poppins';
                            ctx.textAlign = 'center';
                            ctx.fillText(currentCategory, categoryX, y + 65);
                        }
                    });
                }
            }]
        });
    }
});