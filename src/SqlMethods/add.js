import * as alasql from 'alasql';

export function addUser(value) {
    return new Promise((resolve,reject) => {
        try {
            alasql('INSERT INTO User VALUES ?',
                [{
                    id: alasql.autoval('User', 'id', true),
                    userName: value.userName,
                    email: value.email,
                    password: value.password
                }]
            );
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

export function addToDo(value) {
    return new Promise((resolve, reject) => {
        console.log(value);
        try {
            alasql('INSERT INTO ToDo VALUES ?',
                [{
                    id: alasql.autoval('ToDo', 'id', true),
                    userId: parseInt(value.userId),
                    title: value.title,
                    description: value.description,
                    isDone: value.isDone,
                    date: value.date
                }]
            );
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}