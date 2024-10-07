// what i need to do
    /*  1- get total
        2- create product
        3- save data in local storage
        4- clear inputs
        5- Read data
        6- Delete
        7- Function to count
        8- Update
        9- Search
        10- clean data */

// variables declaration 
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
// variables to change mood from create to update
let mood = "create";
let tmp;
// Logic
// 1- get total
function getTotal(){
    if( price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green"
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02"
    }
}
// 2,3- Create Product & save data in local storge
let dataPro;
if (localStorage.product != null){
    dataPro = [JSON.parse(localStorage.product)]
} else{
    dataPro = [];
}
submit.onclick = function () {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // Clean data or validation to user
    if (title.value != '' && price.value != '' && category.value != '' && count.value < 1000){
        // check if create mood
        if ( mood === "create") {
            //7- Function to count
            if( newPro.count > 1 ){
                for( let i = 0 ; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[ tmp ] = newPro ;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = 'block'
        }
        clearData();
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}
// 4- clear inputs
function clearData(){
    title.value = '',
    price.value = '',
    taxes.value = '',
    ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '',
    category.value = ''
}
// 5- Read data
function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData (${i})"  id="update">update</button></td>
            <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    // chech if there is data to appear the delete all button
    let btnDelete = document.getElementById("deleteAll");
    if ( dataPro.length > 0 ){
        btnDelete.innerHTML = `<button onclick= "deleteAll ()">Delete All ( ${dataPro.length} )</button>`
    } else {
        btnDelete.innerHTML = '';
    }
}
showData();

// 6-  Delete Function
function deleteData (i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}
// delete All Function
function deleteAll () {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// 8- Update function
function updateData (i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML ="Update";
    mood = "update";
    tmp = i ;
    scrollTo({
        top : 0,
        behavior: 'smooth',
    })
}
// 9- Search function
//1. get search mood function
let searchMood = "Title";
function getSearchMood (id){
    let search = document.getElementById("search");
    if ( id === "searchTitle" ) {
        searchMood = "Title";
    }else{
        searchMood = "Category";   
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = '';
    showData();
}
//2. search function
function searchData (value) {
    let table ='';
    if ( searchMood === "title"){
        for ( let i = 0; i < dataPro.length; i++ ){
            if( dataPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData (${i})"  id="update">update</button></td>
                        <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                    </tr>
                        `;
            }
        }
    }else{
        for ( let i = 0; i < dataPro.length; i++ ){
            if( dataPro[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData (${i})"  id="update">update</button></td>
                        <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                    </tr>
                        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

