import * as alasql from 'alasql';

export function getAllUsers() {
    return alasql('SELECT * FROM User');
}
export function getAllTodos(userId) {
    return userId && alasql(`SELECT * FROM ToDo WHERE userId=${userId}`);
}

export function getAllTodos2(userId) {
    return new Promise((resolve, reject) => {
        let datas = userId && alasql(`SELECT * FROM ToDo WHERE userId=${userId}`);
        resolve(datas);
    })
}

export function getTodosByDate(date) {
    return alasql(`SELECT * FROM ToDo WHERE date="${date}"`);
}