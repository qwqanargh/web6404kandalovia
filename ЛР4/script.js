// Обработка формы
// document.getElementById('contact-form').addEventListener('submit', function (e) {
//     e.preventDefault(); // Останавливаем отправку формы

//     const name = document.getElementById('name').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const message = document.getElementById('message').value.trim();

//     // Простая проверка на заполнение всех полей
//     if (!name || !email || !message) {
//         alert('Пожалуйста, заполните все поля!');
//         return;
//     }

//     // Создаём данные для отправки
//     const formData = {
//         name: name,
//         email: email,
//         message: message
//     };

//     // Отправляем данные на сервер
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Ошибка при отправке данных.');
//             }
//             return response.json();
//         })
//         .then(data => {
//             alert('Ваше сообщение отправлено!');
//             console.log('Ответ сервера:', data);

//             // Очищаем форму после успешной отправки
//             document.getElementById('contact-form').reset();
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//             alert('Не удалось отправить сообщение. Попробуйте позже.');
//         });
// });
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/teams'; // Убедитесь, что порт совпадает
    const tableBody = document.querySelector('.teams-table tbody');

    async function fetchTeams() {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            // Парсим JSON и получаем данные из ключа "data"
            const { data: teams } = await response.json();

            // Заполняем таблицу
            teams.forEach((team, index) => {
                const wins = Math.floor(Math.random() * 60) + 20; // Генерация случайных побед
                const losses = 82 - wins; // Генерация поражений

                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${team.name}</td>
                        <td>${team.city}</td>
                        <td>${wins}</td>
                        <td>${losses}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);

            // Показываем сообщение об ошибке в таблице
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: red;">
                        Не удалось загрузить данные. Попробуйте позже.
                    </td>
                </tr>
            `;
        }
    }

    // Запускаем функцию загрузки данных
    fetchTeams();
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');
    const apiUrl = 'http://localhost:3000/messages'; // Убедитесь, что сервер настроен на этот маршрут

    // Обработка отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Останавливаем стандартное поведение формы

        // Считываем данные формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Проверяем, что все поля заполнены
        if (!formData.name || !formData.email || !formData.message) {
            responseMessage.textContent = 'Пожалуйста, заполните все поля!';
            responseMessage.style.color = 'red';
            responseMessage.style.display = 'block';
            return;
        }

        try {
            // Отправляем POST-запрос на сервер
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const result = await response.json();
            console.log('Ответ сервера:', result);

            // Показываем успешное сообщение
            responseMessage.textContent = 'Сообщение успешно отправлено!';
            responseMessage.style.color = 'green';
            responseMessage.style.display = 'block';

            // Скрываем сообщение через 3 секунды
            setTimeout(() => {
                responseMessage.style.display = 'none';
            }, 3000);

            // Очищаем форму
            form.reset();
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            responseMessage.textContent = 'Не удалось отправить сообщение. Попробуйте позже.';
            responseMessage.style.color = 'red';
            responseMessage.style.display = 'block';
        }
    });
});
