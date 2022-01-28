// $("#add-item").click(()=>{
//     var text= $("#listText").val();
//     if(text.length===0)
//     alert("Please enter some data!");
//     else{
//         $("#list-items").append("<p>"+text+"<span><img src=\"https://img.icons8.com/ios/50/000000/delete-forever--v1.png\"  class=\"delete\"/></span></p>");
//     }
// });

// $("#remove-item").click(()=>{
//         $("#list-items").empty();
// });

// $("#list-items").on("click",".delete",function(){
//     $(this).parentsUntil("#list-items").remove();
// });

// $("#list-items").on("click","p",function(){
//     $(this).toggleClass("marked");
// })

var list = document.getElementById("list-items");
var addBtn = document.getElementById("add-item");
var removeBtn = document.getElementById("remove-item");
var dynamicBtn = document.getElementById("dynamic-item");
var deleteBtn = document.getElementsByClassName("delete");
var counter = document.getElementById("count");

// add button to add list item
addBtn.addEventListener('click', function () {
    var text = document.getElementById("listText").value;
    addListItem(text);
    counter.innerText = $("li").length;
});

//dynammic button to fetch list from api
dynamicBtn.addEventListener("click", function () {
    getTODOlist();
})

//function that add list item 
function addListItem(text) {
    if (text.length === 0) {
        alert("Please enter some text");
    }
    else {
        var newListELement = document.createElement('li');
        newListELement.className = "listElements"
        var spanTag = document.createElement('span');
        var deleteImg = document.createElement('img');
        deleteImg.src = "https://img.icons8.com/ios/50/000000/delete-forever--v1.png";
        deleteImg.className = "delete";
        spanTag.appendChild(deleteImg);
        newListELement.appendChild(document.createTextNode(text));
        newListELement.appendChild(spanTag);
        list.appendChild(newListELement);
    }
}

//the clear all list button
removeBtn.addEventListener("click", function () {
    while (list.firstChild)
        list.removeChild(list.lastChild);
    counter.innerText = $("li").length;
});

//to particularly delete a list item
document.addEventListener("click", function (e) {
    if (e.target.className == 'delete') {
        var li = e.target;
        var p1 = li.parentNode;
        var p2 = p1.parentNode;
        p2.parentNode.removeChild(p2);
    }
    counter.innerText = $("li").length;
});

//function to dynamically fetch list items
// function getTODOlist() {
//     var http = new XMLHttpRequest();
//     http.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             // console.log(this.responseText);
//             var response = JSON.parse(this.responseText);
//             // console.log(response);
//             for (x in response) {
//                 addListItem(response[x].title);
//             }
//         }
//     }
//     http.open('GET', 'https://jsonplaceholder.typicode.com/todos', false);
//     http.send();
// }
function getTODOlist() {
    // fetch('https://jsonplaceholder.typicode.com/todos')
    //     .then(response => response.json())
    //     .then(data => {
    //         for (x in data) {
    //             addListItem(data[x].title);
    //         }
    //     })
    //     .catch(err => {
    //         console.log(err.message)
    //     })

    try {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => {
                for (x in data) {
                    addListItem(data[x].title);
                }
            })
    }
    catch (err) {
        console.log(err.message)
    }

}

//function that search for particular list value
function listSearch(event) {
    var searchText = event.target.value;
    var texts = document.getElementsByTagName("li");
    for (x in texts) {
        var list_text = texts[x].innerText;
        if (list_text.includes(searchText) == true) {
            texts[x].style.display = "block";
        }
        else
            texts[x].style.display = "none";
    }
}

//dblclick event attached to list items to mark them
document.addEventListener("dblclick", function (e) {
    if (e.target && (e.target.className == 'listElements' || e.target.className == "listElements marked"))
        e.target.classList.toggle("marked");
});

//enter key is enabled to enter text in the list
document.addEventListener("keypress", function (e) {
    let text = document.getElementById("listText").value;
    if (e.keyCode == 13) {
        if (text.length > 0)
            addListItem(text);
        else
            alert("Please enter some text");
    }
    counter.innerText = $("li").length;
});