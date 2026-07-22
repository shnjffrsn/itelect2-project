export async function fetchSampleUsers(){
    try{
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok){ throw new Error(`HTTP ${res.status}`);
    }
        const users = await res.json();
        return users.map((user) => ({ id: user.id, name: user.name, email: user.email }));

    }catch (err){
        console.error("Error:", err.message);
        return []
    
    }finally{
        console.log("Done loading.");
    }
}

export function fetchSampleUsersPromise() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
        if (!res.ok){ throw new Error(`HTTP ${res.status}`);
    }
    return res.json();
})

    .then((users) => {return users.map((user) => ({id: user.id, name: user.name, email: user.email
    }));
})

    .catch((err) => {
        console.error("Error:", err.message);
        return [];
    });
}



/*
Requirements (1 of 2):
Create src/api.js with two named-export async functions matching these exact specs:

fetchSampleUsers() -- uses fetch to call https://jsonplaceholder.typicode.com/users, wrapped in try/catch/finally. 
On success, returns an array of only { id, name, email } for each user. On any error, logs the error and returns [].

fetchSampleUsersPromise() -- same result as fetchSampleUsers(), but written using .then() / .catch() chaining instead of async/await (no try/catch, no await).
Both functions must return a Promise that resolves to the same shape: an array of { id, name, email } objects.

*/