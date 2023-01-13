var selectedRow = null;
//local storage
function storage() { 
    let firstName = document.getElementById("#firstName").value;
    let lastName = document.getElementById("#lastName").value;
    let rollNo = document.getElementById("rollNo").value;


    let inputValue = ({
        "first name": firstName,
        "last name": lastName,
        "rollNo": rollNo
    })
    //conditions ? expression1 : expression2 Local storage setting
    let data = JSON.parse(localStorage.getItem('Users')) ? JSON.parse(localStorage.getItem('Users')) :
        []
    data.push(inputValue)
    console.log(JSON.stringify(data));
    localStorage.setItem('Users', JSON.stringify(data)); 
    // clean up inputs
    document.getElementById("#firstName").value = '';
    document.getElementById("#lastName").value = '';
    document.getElementById("#rollNo").value = '';
}



//show alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}


//Clear All Fields



function clearAllFields() {
    document.querySelector('#firstName') .value = "";
    document.querySelector('#lastName') .value = "";
    document.querySelector('#rollNo') .value = "";
}
//Add Data

document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    //Validate  
    if (firstName == "" || lastName == "" || rollNo == "") {
        showAlert("Please fill in all fields", "danger");
        
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rollNo}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success");
        }
        else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("Student Info edited", "info")
        }
        clearAllFields();
    }
});
//Edit Data 

document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    }

    });

// Delete data


document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});
