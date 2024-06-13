document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ageForm');
  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const dayError = document.getElementById('day_error');
  const monthError = document.getElementById('month_error');
  const yearError = document.getElementById('year_error');
  const validErrors = document.querySelectorAll('.valid_error');
  const outputDay = document.getElementById('DD');
  const outputMonth = document.getElementById('MM');
  const outputYear = document.getElementById('YY');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;
    
    // Clear all error messages and reset styles
    validErrors.forEach(error => error.style.display = 'none');
    dayError.style.display = 'none';
    monthError.style.display = 'none';
    yearError.style.display = 'none';
    resetInputStyles();

    // Validate day input
    const day = parseInt(dayInput.value);
    if (isNaN(day) || dayInput.value.trim() === '') {
      showError(dayInput, 'valid_error');
      isValid = false;
    } else if (day < 1 || day > 31) {
      showError(dayInput, 'day_error');
      isValid = false;
    }

    // Validate month input
    const month = parseInt(monthInput.value);
    if (isNaN(month) || monthInput.value.trim() === '') {
      showError(monthInput, 'valid_error');
      isValid = false;
    } else if (month < 1 || month > 12) {
      showError(monthInput, 'month_error');
      isValid = false;
    }

    // Validate year input
    const year = parseInt(yearInput.value);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || yearInput.value.trim() === '') {
      showError(yearInput, 'valid_error');
      isValid = false;
    } else if (year > currentYear) {
      showError(yearInput, 'year_error');
      isValid = false;
    }

    // Calculate and display age if all inputs are valid
    if (isValid) {
      calculateAndDisplayAge(day, month, year);
    }
  });

  function showError(input, errorType) {
    input.nextElementSibling.style.display = 'block';
    input.style.borderColor = 'var(--Light-red)';
    input.previousElementSibling.style.color = 'var(--Light-red)';
    if (errorType !== 'valid_error') {
      document.getElementById(errorType).style.display = 'block';
    }
  }

  function resetInputStyles() {
    const inputs = [dayInput, monthInput, yearInput];
    inputs.forEach(input => {
      input.style.borderColor = '';
      input.previousElementSibling.style.color = '';
    });
  }

  function calculateAndDisplayAge(day, month, year) {
    const today = new Date();
    let birthDate = new Date(year, month - 1, day);
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    outputDay.textContent = ageDays.toString().padStart(2, '0');
    outputMonth.textContent = ageMonths.toString().padStart(2, '0');
    outputYear.textContent = ageYears;
  }
});
