const title = document.getElementById("title");
const price = document.getElementById("price");
const count = document.getElementById("count");
const total = document.getElementById("total");
const create_btn = document.getElementById("create_btn");
const search = document.getElementById("search");
const search_btn = document.getElementById("search_btn");
// console.log(title,price,count,total,create_btn,search,search_btn)

let mood = "create", temp;

function totalPrice() {
    let result = price.value * count.value;
    total.innerHTML = result;
}
let dataProduct;
if (localStorage.productAr != null) {
    dataProduct = JSON.parse(localStorage.productAr);
} else {
    dataProduct = []
}



create_btn.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        count: count.value,
        total: total.innerHTML
    }
    if (mood === "create") {
        dataProduct.push(newProduct);
    } else {
        dataProduct[temp] = newProduct;
        mood = "create"
    }
    savaData()
    clearData()
    showData()
}
function savaData() {
    localStorage.setItem("productAr", JSON.stringify(dataProduct));
}
function clearData() {
    title.value = "";
    price.value = "";
    count.value = "";
    total.innerHTML = "";

}
function showData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].count}</td>
            <td>${dataProduct[i].total}</td>
            <td><button onclick = "updateData(${i})">تعديل</button></td>
            <td><button onclick = "deleteData(${i})">حذف</button></td>
            <td></td>
        </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = table;
    create_btn.innerHTML = "أضافة"
}
showData()
function deleteData(i) {
    // this line to delete from the array
    dataProduct.splice(i, 1);
    // this line to sent the new array to the localStorage
    localStorage.productAr = JSON.stringify(dataProduct);
    showData()
}
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    count.value = dataProduct[i].count;
    total.innerHTML = dataProduct[i].total;
    create_btn.innerHTML = "تعديل"
    temp = i;
    mood = "update"
}
function searchData() {
    console.log(search.value)
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if (dataProduct[i].title.includes(search.value)) {
            table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].count}</td>
                        <td>${dataProduct[i].total}</td>
                        <td><button onclick = "updateData(${i})">تعديل</button></td>
                        <td><button onclick = "deleteData(${i})">حذف</button></td>
                        <td></td>
                    </tr>
                    `;
        }
    }
    document.getElementById("tbody").innerHTML = table;
    // search.value = '';
}
