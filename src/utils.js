// ES6 - template literals
export const formatDate = (date) => `Due Date: ${date.toLocaleDateString()}`;

// ES6 - object destructuring
export const validateTask = (task = {}) => {
    const {title, dueDate} = task;
    return Boolean(title && dueDate);
};

// Rest - collect function arguments
export const mergeTaskUpdate = (original, ...updates) => ({...original, ...Object.assign({}, ...updates)}); 


export const createTask = (taskData) => {
    const isValid = validateTask(taskData);

    if (!isValid){
        throw new TaskValidationError("Invalid task data.");
    }else{
        return{id: Date.now(), completed: false, ...taskData}
    }
}

export class TaskValidationError extends Error{
    constructor(message) {
    super(message);
    this.name = "TaskValidationError";
    this.statusCode = 404;
    }
}

/*
Requirements (2 of 2):
Create TaskValidationError extends Error in src/utils.js, with this.name = "TaskValidationError".

Add createTask(taskData) to src/utils.js: calls validateTask(taskData) (from GT3).
If invalid, throw new TaskValidationError("Invalid task data"). If valid, return { id: Date.now(), completed: false, ...taskData }.

In src/app.js, call fetchSampleUsers() and createTask() with sample data, wrapped in try/catch, and log the results.

Run node src/app.js and confirm no errors.

Commit on main: "GT4: Add async functions to app.js" and push.
*/
