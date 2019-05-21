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
        'id': '1'
    },
    {
        'name': 'Диана',
        'surname': 'Жусупова',
        'phone': '+7 (911) 111-11-11',
        'email': 'sample@gmail.com',
        'position': 'ЛОР',
        'room': '101',
        'id': '1'
    },
    {
        'name': 'Евгений',
        'surname': 'Суманов',
        'phone': '+7 (911) 111-11-11',
        'email': 'sample@gmail.com',
        'position': 'Врачи УЗИ',
        'room': '136',
        'id': '1'
    },
    {
        'name': 'Юрий',
        'surname': 'Жинко',
        'phone': '+7 (911) 111-11-11',
        'email': 'sample@gmail.com',
        'position': 'Гнойный хирург',
        'room': '225',
        'id': '1'
    }
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
        type: 'textInput',
        label: 'Должность'
    },
    {
        name: 'room',
        type: 'numberInput',
        label: 'Кабинет'
    }
];

export const USER_SCTRUCTURE = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    position: '',
    room: ''
};