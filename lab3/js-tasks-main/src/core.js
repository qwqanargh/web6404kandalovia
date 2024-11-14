/**
 * Проверяет, является ли число целым, используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return (n | 0) === n;
}

/**
 * Возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    return Array.from({ length: 10 }, (_, i) => (i + 1) * 2);
}

/**
 * Считает сумму чисел до заданного числа, используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Считает сумму чисел до заданного числа, используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    return n === 1 ? 1 : n + recSumTo(n - 1);
}

/**
 * Считает факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

/**
 * Определяет, является ли число степенью двойки
 * @param {*} n
 */
function isBinary(n) {
    return (n & (n - 1)) === 0 && n > 0;
}

/**
 * Находит n-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1, c;
    for (let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}

/**
 * Возвращает функцию, выполняющую переданную операцию.
 * Если operatorFn не задана, возвращает начальное значение
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 */
function getOperationFn(initialValue, operatorFn) {
    let storedValue = initialValue;
    return function(newValue) {
        if (typeof operatorFn === 'function') {
            storedValue = operatorFn(storedValue, newValue);
        }
        return storedValue;
    };
}

/**
 * Создает генератор арифметической последовательности
 * @param {number} start - начальное значение последовательности
 * @param {number} step - шаг последовательности
 */
function sequence(start = 0, step = 1) {
    let current = start;
    return function() {
        const result = current;
        current += step;
        return result;
    };
}

/**
 * Сравнивает два значения, возвращает true, если значения одинаковые или объекты равны
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны по содержанию, иначе false
 */
/**
 * Глубоко сравнивает два значения на равенство.
 * @param {*} a - Первое значение для сравнения.
 * @param {*} b - Второе значение для сравнения.
 * @param {WeakMap} [visited=new WeakMap()] - Используется для отслеживания циклических ссылок.
 * @returns {boolean} - Возвращает true, если значения равны, иначе false.
 */
function deepEqual(a, b, visited = new WeakMap()) {
    // Проверка ссылочной эквивалентности и NaN
    if (a === b) {
        // Обработка случая +0 и -0
        return a !== 0 || 1 / a === 1 / b;
    }

    if (a !== a && b !== b) { // Проверка NaN
        return true;
    }

    // Проверка на тип и null
    if (
        a == null || typeof a !== 'object' ||
        b == null || typeof b !== 'object'
    ) {
        return false;
    }

    // Проверка циклических ссылок
    if (visited.has(a)) {
        return visited.get(a) === b;
    }
    visited.set(a, b);

    // Сравнение конструкторов
    if (a.constructor !== b.constructor) {
        return false;
    }

    // Обработка массивов
    if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i], visited)) {
                return false;
            }
        }
        return true;
    }

    // Обработка объектов Date
    if (a instanceof Date) {
        return a.getTime() === b.getTime();
    }

    // Обработка объектов RegExp
    if (a instanceof RegExp) {
        return a.toString() === b.toString();
    }

    // Получение всех собственных ключей, включая символы
    const keysA = Reflect.ownKeys(a);
    const keysB = Reflect.ownKeys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let key of keysA) {
        if (!keysB.includes(key)) {
            return false;
        }
        if (!deepEqual(a[key], b[key], visited)) {
            return false;
        }
    }

    return true;
}


module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
