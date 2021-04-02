import * as alasql from 'alasql';


export function updateTodoContent(value) {
    return new Promise((resolve, reject) => {
        try {
            alasql(`UPDATE ToDo SET 
                    userId=${value.userId},
                    title="${value.title}",
                    description="${value.description}",
                    date="${value.date}"
                    WHERE id = ${value.id}`);
                resolve();
        } catch (error) {
                reject(error);
        }
    })
}

export function updateTodoChecked(value) {
    return new Promise((resolve, reject) => {
        try {
            alasql(`UPDATE ToDo SET 
                isDone=${value.isDone}
                WHERE id = ${value.id}`);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}