 // app.js - Main application entry point
console.log('Server starting...');

import {formatDate, validateTask, mergeTaskUpdate, createTask} from "./utils.js";

console.log(formatDate(new Date("2026-07-22")));
console.log(validateTask());
console.log(mergeTaskUpdate({title: "Old"}, {title: "New"}));

import {fetchSampleUsers} from "./api.js";

async function main() {
    try{
        const users = await fetchSampleUsers();
        console.log("Users:", users);
        
        const newTask = createTask({title: "Title", dueDate: "2026-07-29"});
        console.log("Task:", newTask);

    }catch (err){
        console.error("Error:", err.message);
    }
}

main();