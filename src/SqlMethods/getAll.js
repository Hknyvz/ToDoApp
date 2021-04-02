import * as alasql from 'alasql';

export function getAllUsers() 
{
    return alasql('SELECT * FROM User');
}
export function getAllTodos() 
{
    return alasql('SELECT * FROM ToDo');
}