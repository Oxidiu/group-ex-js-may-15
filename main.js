const refreshBtn = document.querySelector("#refreshBtn")
const saveToMemoryBtn = document.querySelector("#saveToMemory")
const loadFromMemoryBtn = document.querySelector("#loadFromMemory")
const container = document.querySelector(".container")

const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    const data = await response.json();
    console.log(data)
    return data;
}


const renderData = (data) => {
    const list = document.querySelector(".list");
    // list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div")
        div.classList.add("list-item");

        const h3 = document.createElement("h3");
        h3.classList.add("title");
        h3.textContent = item.title;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        div.append(h3, checkbox)
        const ul = document.createElement("ul")
        

        ul.appendChild(div);
        container.appendChild(ul)
    })
    
}
refreshBtn.addEventListener("click", async () => {
    const data = await fetchData()
    renderData(data)
})

const saveToMemory = (data) => {
    localStorage.setItem("fetchedData", JSON.stringify(data));
};

saveToMemoryBtn.addEventListener("click", async () => {
    const data = await fetchData();
    saveToMemory(data);
})

loadFromMemoryBtn.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("fetchedData"));
    renderData(data);
});

// In the main.js file:

// When we click on the "refresh" button, use "fetch" to get data from this API link:
// https://jsonplaceholder.typicode.com/todos

// Get the request response using the .json method on the response object.

// Write a function that receives the data we got earlier, where we do the following:
// For each list item, using document.createElement, create:
//  - a div, with class ".list-item" that contains a list item
//     - h3 with class "title" tag for the title
//     - input checkbox, with class "completed", and setting the value using what we have in the "completed" property.


// When we click on "Save to memory", we will save in localStorage all the data we got using that fetch request.
// When we click on "Load from Memory", we will load all the data from localStorage, and display it on the screen.
