import * as alasql from 'alasql';

export function addUser(value) {
    
    alasql('INSERT INTO User VALUES ?',
        [{
            id: alasql.autoval('User', 'id', true),
            userName: value.userName,
            email: value.email,
            password: value.password
        }]
    );
}

export function addToDo(value) {
    alasql('INSERT INTO ToDo VALUES ?',
        [{
            id: alasql.autoval('ToDo', 'id', true),
            title: value.title,
            description: value.description,
            isDone:false,
            date: value.date
        }]
    );
}