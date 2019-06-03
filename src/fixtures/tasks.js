export const TASKS = [
    {
        user_id: '1',
        user_name: 'Вадим',
        user_surname: 'Ишхнели',
        related_to: 'Принтер',
        text: 'закончился цветной картридж',
        date: '22.02.2019',
        priority: 'middle',
        status: 'Необходимо сделать'
    },
    {
        user_id: '2',
        user_name: 'Николай',
        user_surname: 'Баранов',
        related_to: 'Операционная система',
        text: 'Необходимо переустановаить ОС',
        date: '13.05.2019',
        priority: 'high',
        status: 'В работе'
    }
];

export const TASKS_NEED_TO_DO = [
    {
        id: 1,
        user_id: '1',
        user_name: 'Николай',
        user_surname: 'Баранов',
        related_to: 'ОС',
        text: 'Необходимо переустановаить ОС',
        date: '13.05.2019',
        priority: 'high',
        status: 'Need to do'
    },
    {
        id: 2,
        user_id: '1',
        user_name: 'Николай',
        user_surname: 'Баранов',
        related_to: 'Монитор',
        text: 'Пришел новый монитор',
        date: '13.05.2019',
        priority: 'middle',
        status: 'Need to do'
    }
];

export const TASKS_IN_PROGRESS = [
    {
        id: 3,
        user_id: '1',
        user_name: 'Вадим',
        user_surname: 'Ишхнели',
        related_to: 'принтер',
        text: 'закончился цветной картридж',
        date: '22.02.2019',
        priority: 'middle',
        status: 'In progress'
    },
    {
        id: 4,
        user_id: '1',
        user_name: 'Диана',
        user_surname: 'Жусупова',
        related_to: 'ОС',
        text: 'Не загружается Windows',
        date: '13.05.2019',
        priority: 'low',
        status: 'Need to do'
    }
];

export const RELATED_TO = [
    '-',
    'Программное обеспечение',
    'Операционная система',
    'Интернет',
    'Принтер',
    'Авторизация',
];

export const ISSUE_TOPICS = [
    {
        value: 1,
        label: 'Поддержка пользователей'
    },
    {
        value: 2,
        label: 'Проблемы с оборудованием'
    },
    {
        value: 3,
        label: 'Проблемы с интернетом'
    },
    {
        value: 4,
        label: 'Проблема с ИС "Барс"'
    },
    {
        value: 5,
        label: 'Проблема с "1С"'
    }
];

export const ISSUE_TOPICS_NAME = {
    '1': 'Поддержка пользователей',
    '2': 'Проблемы с оборудованием',
    '3': 'Проблемы с интернетом',
    '4': 'Проблема с ИС "Барс"',
    '5': 'Проблема с "1С"',
};

export const ISSUE_STATUS = {
    'needToDo': 'Необходимо сделать',
    'inProgress': 'В работе',
    'done': 'Готово'
};