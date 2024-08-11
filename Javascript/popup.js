import "../css/employee.css";

//import { readFileSync, writeFileSync } from "node:fs";

// ----------   open&&close POP-UP WINDOW  ----------

const addEmployeeBtn = document.querySelector(".add-button");
const saveEmployeeBtn = document.querySelector(".popup-add-employee");
const popUpoverlay = document.querySelector(".overlay");

const openPopUp = function () {
  popUpoverlay.classList.remove("hidden");
};

addEmployeeBtn.addEventListener("click", openPopUp);

const closePopUp = function () {
  popUpoverlay.classList.add("hidden");
};

saveEmployeeBtn.addEventListener("click", closePopUp);

// ----------   form SUBMISSION  ----------

//select form element
const form = document.querySelector("form");
const employeesContainer = document.querySelector(".formular");

function storeEmployee() {
  const newEmployeeObj = Object.fromEntries(new FormData(form));
  const prevEmployees = JSON.parse(localStorage.getItem("Employee")) || [];
  localStorage.setItem(
    "Employee",
    JSON.stringify([...prevEmployees, newEmployeeObj])
  );
  return newEmployeeObj;
}

//UI and .addEventlistener submit
form.addEventListener("submit", (event) => {
  event.preventDefault(storeEmployee);
  const newEmployees = storeEmployee();

  //add UI
  let employeeDiv = document.createElement("div");
  employeeDiv.classList.add("Input");
  employeeDiv.innerHTML = `
  <img src="../assets/profile-pic-juan.png" class="employee-img">
      <p class="Input-p">${newEmployees.name} | ${newEmployees.department} | ${newEmployees.hoursperweek} | ${newEmployees.salary} </p>
      <button class="add-circle"><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_20_937)">
                    <path
                      d="M14 8C14 5.79 12.21 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12C12.21 12 14 10.21 14 8ZM12 8C12 9.1 11.1 10 10 10C8.9 10 8 9.1 8 8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8Z"
                      fill="black"
                    />
                    <path
                      d="M2 18V20H18V18C18 15.34 12.67 14 10 14C7.33 14 2 15.34 2 18ZM4 18C4.2 17.29 7.3 16 10 16C12.69 16 15.77 17.28 16 18H4Z"
                      fill="black"
                    />
                    <path d="M23 10H17V12H23V10Z" fill="black" />
                  </g>
                  <defs>
                    <clipPath id="clip0_20_937">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
        </button>
      `;
  employeesContainer.append(employeeDiv);

  let deleteButton = employeeDiv.children[2];
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();

    let employees = JSON.parse(localStorage["Employee"]);
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].itemId === i) {
        employees.splice(i, 1);
        break;
      }
    }
  });
});

//remove button
let deleteButton = employeeDiv.children[2];
deleteButton.addEventListener("click", () => {
  employeeDiv.remove();
  // show altert
  alert("the emoloyee will be deleted");
});
