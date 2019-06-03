export const USERS = [
    {
        'name': 'Вадим',
        'surname': 'Ишхнели',
        'phone': '+7 (911) 111-11-11',
        'email': 'sample@gmail.com',
        'position': 'Хирург',
        'room': '111',
        'id': '1'
    },
    {
        'name': 'Николай',
        'surname': 'Баранов',
        'phone': '+7 (911) 111-11-11',
        'email': 'sample@gmail.com',
        'position': 'ЛОР',
        'room': '121',
        'id': '2'
    },
    {
        'name': 'Диана',
        'surname': 'Жусупова',
        'phone': '+7 (911) 111-11-11',
        'email': 'sample@gmail.com',
        'position': 'ЛОР',
        'room': '101',
        'id': '3'
    },
    {
        'name': 'Евгений',
        'surname': 'Суманов',
        'phone': '+7 (911) 111-11-11',
        'email': 'sample@gmail.com',
        'position': 'Врачи УЗИ',
        'room': '136',
        'id': '4'
    },
    {
        'name': 'Юрий',
        'surname': 'Жинко',
        'phone': '+7 (911) 111-11-11',
        'email': 'sample@gmail.com',
        'position': 'Гнойный хирург',
        'room': '225',
        'id': '5'
    }
];

export const POSITIONS = [
    'Терапевт',
    'Педиатр',
    'Дерматовенеролог',
    'Хирург',
    'Ортопед-травматолог',
    'Офтальмолог',
    'Оториноларинголог',
    'Гастроэнтеролог',
    'Эндокринолог',
    'Невролог',
    'Гинеколог',
    'Аллерголог-иммунолог',
    'Инфекционист',
    'Уролог',
    'Психотерапевт',
    'Психолог',
    'ЛОР',
    'Врач функциональной диагностики',
    'Кардиолог',
    'Маммолог/ Онколог',
    'Физиотерапевт',
    'Медицинский сотрудник',
];

export const USER_FIELDS = [
    {
        name: 'name',
        type: 'textInput',
        label: 'Имя'
    },
    {
        name: 'surname',
        type: 'textInput',
        label: 'Фамилия'
    },
    {
        name: 'email',
        type: 'textInput',
        label: 'Почта'
    },
    {
        name: 'phone',
        type: 'phone',
        label: 'Телефон'
    },
    {
        name: 'position',
        type: 'select',
        label: 'Должность',
        options: POSITIONS
    },
    {
        name: 'room',
        type: 'numberInput',
        label: 'Кабинет'
    },
    {
        name: 'info',
        type: 'textArea',
        label: 'Доп. информация'
    },
    {
        name: 'admin',
        type: 'checkbox',
        label: 'Администратор'
    },
    {
        name: 'login',
        type: 'textInput',
        label: 'Логин'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Пароль'
    },
    {
        name: 'password_confirmation',
        type: 'password',
        label: 'Подтверждение пароля'
    }
];

export const USER_SCTRUCTURE = {
    admin: false,
    login: '',
    info: '',
    password: '',
    password_confirmation: '',
    superadmin: false,
    name: '',
    surname: '',
    phone: '',
    email: '',
    position: '',
    room: '',
};