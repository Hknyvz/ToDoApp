import * as alasql from 'alasql';

export function getAllUsers() 
{
    return alasql('SELECT * FROM User');
}
export function getAllTodos(userId) 
{
    return userId&&alasql(`SELECT * FROM ToDo WHERE userId=${userId}`);
}