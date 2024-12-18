// Array to store state of each calendar day
const days = Array.from({ length: 24 }, (_, index) => ({
  day: index + 1,  // Day number (1 through 24)
  clicked: false,  // Whether the day has been clicked
}));

// Generate the calendar boxes
const calendarContainer = document.getElementById('calendar');

for (let i = 0; i < days.length; i++) {
  let box = document.createElement('li');
  box.classList.add('calendar-box');
  
  let number = document.createElement('p');
  number.innerHTML = days[i].day;
  
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-gift');
  
  let description = document.createElement('p');
  description.innerHTML = days[i].clicked ? "Opened!" : "Open me!"; // Change description based on state
  
  box.appendChild(number);
  box.appendChild(icon);
  box.appendChild(description);

  // Toggle day state on click
  box.addEventListener('click', () => {
    days[i].clicked = !days[i].clicked;  // Toggle the clicked state
    description.innerHTML = days[i].clicked ? "Opened!" : "Open me!"; // Update description
    box.style.backgroundColor = days[i].clicked ? "#FFD54F" : "#FF0000"; // Change color when clicked
  });

  calendarContainer.appendChild(box);
}
