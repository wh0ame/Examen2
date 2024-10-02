// script.js

const form = document.getElementById('bookingForm');
const submitBtn = document.getElementById('submitBtn');
const termsCheckbox = document.getElementById('terms');

// Проверка состояния флажка при его изменении
termsCheckbox.addEventListener('change', function() {
    if (termsCheckbox.checked) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    // Проверка имени
    const name = document.getElementById('name').value;
    const namePattern = /^[А-Яа-яЁё\s]+$/;
    if (!namePattern.test(name)) {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    // Проверка телефона
    const phone = document.getElementById('phone').value;
    const phonePattern = /^\d{11}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('phoneError').style.display = 'none';
    }

    // Проверка даты
    const dateInput = document.getElementById('date');
    const selectedDate = new Date(dateInput.value);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    if (selectedDate <= currentDate) {
        document.getElementById('dateError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('dateError').style.display = 'none';
    }

    // Проверка флажка
    if (!termsCheckbox.checked) {
        isValid = false;
    }

    if (isValid) {
        const time = document.getElementById('time').value;
        const duration = document.getElementById('duration').value;

        document.getElementById('successMessage').textContent = 
            `Успешно! Имя: ${name}, Телефон: ${phone}, Дата: ${dateInput.value}, Время: ${time}, Длительность: ${duration} час(ов).`;
        document.getElementById('successMessage').style.display = 'block';

        // Сброс формы после успешной отправки
        form.reset();
        submitBtn.disabled = true;  // Отключаем кнопку после отправки
    }
});

// Отключаем кнопку отправки, если флажок не установлен при загрузке страницы
if (!termsCheckbox.checked) {
    submitBtn.disabled = true;
}