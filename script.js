function updateLengthValue() {
    const length = document.getElementById('length').value;
    document.getElementById('lengthValue').textContent = length;
}

function generatePasswords() {
    const length = parseInt(document.getElementById('length').value, 10);
    const count = parseInt(document.getElementById('count').value, 10);
    let useUppercase = document.getElementById('uppercase').checked;
    let useLowercase = document.getElementById('lowercase').checked;
    let useNumbers = document.getElementById('numbers').checked;
    let useSymbols = document.getElementById('symbols').checked;

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ''; // Clear any previous error message

    if (count > 10) {
        errorMessage.textContent = 'Ошибка: Нельзя генерировать более 10 паролей.';
        return;
    }

    const passwordsContainer = document.getElementById('passwords');
    passwordsContainer.innerHTML = ''; // Clear the placeholder text

    // Если ни одна опция не выбрана, отображаем сообщение
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {
        const messageElement = document.createElement('div');
        messageElement.textContent = "! Выберите хотя бы один пункт !";
        messageElement.style.color = 'white';
        messageElement.style.backgroundColor = "#222222";
        passwordsContainer.appendChild(messageElement);
        adjustGridColumns(1);
        return;
    }

    for (let i = 0; i < count; i++) {
        const password = generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols);
        const passwordElement = document.createElement('div');
        passwordElement.textContent = password;
        passwordElement.onclick = function() { copyToClipboard(passwordElement); };
        passwordsContainer.appendChild(passwordElement);
    }

    adjustGridColumns(count);
}

function generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let charPool = '';
    if (useUppercase) charPool += uppercaseChars;
    if (useLowercase) charPool += lowercaseChars;
    if (useNumbers) charPool += numberChars;
    if (useSymbols) charPool += symbolChars;

    if (charPool === '') return ''; // Это условие больше не должно выполняться

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    return password;
}

function copyToClipboard(element) {
    const tempInput = document.createElement('input');
    tempInput.value = element.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    element.classList.add('copied');
    setTimeout(() => {
        element.classList.remove('copied');
    }, 2000);
}

function adjustGridColumns(count) {
    const passwordsContainer = document.getElementById('passwords');
    if (count <= 5) {
        passwordsContainer.style.gridTemplateColumns = '1fr';
    } else if (window.innerWidth > 576) {
        passwordsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
        passwordsContainer.style.gridTemplateColumns = '1fr'; // Single column layout on mobile
    }
}

window.addEventListener('resize', () => {
    const count = document.getElementById('passwords').children.length;
    adjustGridColumns(count);
});
