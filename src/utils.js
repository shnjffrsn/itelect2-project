// ES6 - template literals
export const formatDate = (date) => `Due Date: ${date.toLocaleDateString()}`;

// ES6 - object destructuring
export const validateTask = (task = {}) => {
    const {title, dueDate} = task;
    return Boolean(title && dueDate);
};

// Rest - collect function arguments
export const mergeTaskUpdate = (original, ...updates) => ({...original, ...Object.assign({}, ...updates)}); 




/*
INSTRUCTION:
Create src/utils.js with three named-export arrow functions matching these exact specs:

formatDate(date) -- template literal + date.toLocaleDateString(). formatDate(new Date("2026-07-22")) → "Due: 7/22/2026"
validateTask(task) -- destructure { title, dueDate } with a default {}. Returns true only if both exist. validateTask() → false
mergeTaskUpdate(original, ...updates) -- rest operator; later updates override original. mergeTaskUpdate({title:"Old"}, {title:"New"}) → {title:"New", ...}

In src/app.js, import all three functions from ./utils.js and call each one with a sample input, logging the result with console.log.
Compare your printed output to the examples above -- if they match, your functions are correct.
Run node src/app.js and confirm there are no errors.
Commit on main: "GT3: Add ES6+ utility functions" and push.
*/
