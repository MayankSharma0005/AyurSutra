// Show/Hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'patients': 'Patient Management',
        'appointments': 'Appointments',
        'therapies': 'Therapies',
        'reports': 'Reports',
        'settings': 'Settings'
    };
    
    document.getElementById('pageTitle').textContent = titles[sectionId] || 'Dashboard';
    
    // Generate calendar if appointments section is shown
    if (sectionId === 'appointments') {
        generateCalendar();
    }
}

// Modal functions
function showAddPatientModal() {
    document.getElementById('addPatientModal').classList.remove('hidden');
}

function showScheduleTherapyModal() {
    document.getElementById('scheduleTherapyModal').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Generate calendar
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    
    // Get current month and year
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1).getDay();
    
    // Get number of days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += '<div class="calendar-day p-2 text-center text-gray-400"></div>';
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === date.getDate();
        const hasAppointment = [5, 12, 18, 25].includes(day); // Sample appointment days
        
        let classes = 'calendar-day p-2 text-center rounded-lg cursor-pointer';
        if (isToday) {
            classes += ' selected';
        }
        if (hasAppointment) {
            classes += ' has-appointment';
        }
        
        calendar.innerHTML += `<div class="${classes}">${day}</div>`;
    }
}

// Toggle sidebar (for mobile)
function toggleSidebar() {
    const sidebar = document.querySelector('.fixed.left-0');
    sidebar.classList.toggle('-translate-x-full');
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
});

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = ['addPatientModal', 'scheduleTherapyModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
}