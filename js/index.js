document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.calculator');
    const display = calculator.querySelector('.calculator-display');
    const keys = calculator.querySelector('.calculator-keys');

    let firstValue = '';
    let operator = '';
    let secondValue = '';
    let displayValue = '0'; // Хранит текущее значение дисплея

    display.value = displayValue;

    keys.addEventListener('click', (event) => {
        if (!event.target.matches('button')) return; // Игнорировать клики вне кнопок

        const key = event.target;
        const keyValue = key.textContent;
        const action = key.dataset.action;

        if (!action) { // Если нажата кнопка числа
            if (operator) {
                secondValue += keyValue; // Собираем второе число
            } else {
                firstValue += keyValue; // Собираем первое число
            }
            displayValue = firstValue + (operator ? ` ${getSymbol(operator)} ${secondValue}` : ''); // Обновляем отображаемую строку
            display.value = displayValue; // Отображаем обновленное значение
            return;
        }

        if (action === 'clear') { // Очистка
            firstValue = '';
            operator = '';
            secondValue = '';
            displayValue = '0';
            display.value = displayValue;
            return;
        }

        if (action === 'delete') { // Удаление последнего символа
            if (operator && secondValue !== '') {
                secondValue = secondValue.slice(0, -1); // Удаляем последний символ второго числа
            } else if (firstValue !== '') {
                firstValue = firstValue.slice(0, -1); // Удаляем последний символ первого числа
            }
            displayValue = firstValue + (operator ? ` ${getSymbol(operator)} ${secondValue}` : ''); // Обновляем отображаемую строку
            display.value = displayValue; // Отображаем обновленное значение
            return;
        }

        if (['add', 'subtract', 'multiply', 'divide', 'root'].includes(action)) {
            if (firstValue && secondValue) {
                const result = calculate(firstValue, operator, secondValue);
                displayValue = result.toString(); // Преобразуем результат в строку
                firstValue = displayValue; // Сохраняем результат как первое значение
                secondValue = '';
            }
            operator = action; // Устанавливаем оператор
            displayValue = firstValue + (operator ? ` ${getSymbol(operator)} ` : ''); // Обновляем отображаемую строку
            display.value = displayValue; // Отображаем обновленное значение
            return;
        }

        if (action === 'equals') {
            if (firstValue && operator && secondValue) {
                const result = calculate(firstValue, operator, secondValue);
                displayValue = result.toString(); // Преобразуем результат в строку
                display.value = displayValue; // Отображаем результат
                firstValue = result.toString(); // Для возможности продолжения вычислений
                operator = '';
                secondValue = '';
            }
        }
    });

    // Обработчик нажатия клавиш
    document.addEventListener('keydown', (event) => {
        const keyValue = event.key;

        if (keyValue >= '0' && keyValue <= '9') { // Если нажата кнопка числа
            if (operator) {
                secondValue += keyValue; // Собираем второе число
            } else {
                firstValue += keyValue; // Собираем первое число
            }
            displayValue = firstValue + (operator ? ` ${getSymbol(operator)} ${secondValue}` : ''); // Обновляем отображаемую строку
            display.value = displayValue; // Отображаем обновленное значение
            return;
        } else if (keyValue === 'Enter') { // Обработка нажатия Enter
            event.preventDefault(); // Предотвращаем действие по умолчанию
            keys.querySelector('.operator[data-action="equals"]').click(); // Запуск вычисления
            return;
        } else if (keyValue === 'Backspace') { // Удаление последнего символа
            if (operator && secondValue !== '') {
                secondValue = secondValue.slice(0, -1); // Удаляем последний символ второго числа
            } else if (firstValue !== '') {
                firstValue = firstValue.slice(0, -1); // Удаляем последний символ первого числа
            }
            displayValue = firstValue + (operator ? ` ${getSymbol(operator)} ${secondValue}` : ''); // Обновляем отображаемую строку
            display.value = displayValue; // Отображаем обновленное значение
            return;
        } else if (['+', '-', '*', '/', '**'].includes(keyValue)) { // Обработка операторов
            const newOperator = getOperator(keyValue);
            if (firstValue && secondValue) {
                const result = calculate(firstValue, operator, secondValue);
                displayValue = result.toString(); // Преобразуем результат в строку
                firstValue = displayValue; // Сохраняем результат
                secondValue = '';
            }
            operator = newOperator;
            displayValue = firstValue + (operator ? ` ${getSymbol(operator)} ` : ''); // Обновляем отображаемую строку
            display.value = displayValue; // Отображаем обновленное значение
            return;
        }
    });

    function getSymbol(operator) {
        switch (operator) {
            case 'add':
                return '+';
            case 'subtract':
                return '-';
            case 'multiply':
                return '*';
            case 'divide':
                return '/';
            case 'root':
                return '**';
            default:
                return '';
        }
    }

    function getOperator(symbol) {
        switch (symbol) {
            case '+':
                return 'add';
            case '-':
                return 'subtract';
            case '*':
                return 'multiply';
            case '/':
                return 'divide';
            case '**':
                return 'root';
            default:
                return '';
        }
    }

    function calculate(num1, operator, num2) {
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        switch (operator) {
            case 'add':
                return n1 + n2;
            case 'subtract':
                return n1 - n2;
            case 'multiply':
                return n1 * n2;
            case 'divide':
                return n1 / n2;
            case 'root':
                return n1 ** n2;
            default:
                return 0;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('themeToggle'); // Кнопка для открытия модального окна
    const span = document.getElementById('modalClose');

    // Открыть модальное окно при нажатии кнопки
    btn.onclick = function() {
        modal.style.display = 'block';
    }

    // Закрыть модальное окно при нажатии на "x"
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // Закрыть модальное окно при клике вне его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
