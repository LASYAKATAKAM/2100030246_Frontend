function renderHome() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<h2>Welcome to Home Page</h2>';
}

// Sample data for employees
let employees = [
    { id: 1, firstName: "sam", lastName: "adam", department: "IT", age: 45 },
    { id: 2, firstName: "john", lastName: "jacob", department: "Sales", age: 35 }
];

// Custom pipe to convert the first letter of first name and last name to uppercase
function capitalizeFirstLetter(value) {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
}

// Function to determine the position of an employee based on age
function getPosition(age) {
    return age > 40 ? 'Sr. Employee' : 'Jr. Employee';
}

// Function to calculate salary based on age and position
function calculateSalary(age, position) {
    if (position === 'Sr. Employee') {
        return age * 10 + 50000;
    } else if (position === 'Jr. Employee') {
        return age * 5 + 50000;
    } else {
        return 'N/A';
    }
}

// Function to render the Employee component
function renderEmployee() {
    const contentDiv = document.getElementById('content');

    // Clear the content
    contentDiv.innerHTML = '';

    // Create the heading for the employee table
    const tableHeading = `
        <h2>List of Employees</h2>
        <table>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Department</th>
                <th>Age</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Actions</th>
            </tr>
    `;

    // Create rows for each employee
    const tableRows = employees.map((employee, index) => `
        <tr class="${index % 2 === 0 ? 'even-row' : 'odd-row'}">
            <td>${employee.id}</td>
            <td>${capitalizeFirstLetter(employee.firstName)}</td>
            <td>${capitalizeFirstLetter(employee.lastName)}</td>
            <td>${employee.department}</td>
            <td>${employee.age}</td>
            <td>${getPosition(employee.age)}</td>
            <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(calculateSalary(employee.age, getPosition(employee.age)))}</td>
            <td>
                <button class="custom-button" onclick="renderEditEmployeeForm(${employee.id})">Edit</button>
                <button class="custom-button" onclick="confirmDeleteEmployee(${employee.id})">Delete</button>
            </td>
        </tr>
    `).join('');

    // Create the table
    const table = `${tableHeading} ${tableRows}</table>`;

    // Add the table to the content div
    contentDiv.innerHTML = table;

    // Add the Add Employee button
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Employee';
    addButton.className = 'custom-button';
    addButton.onclick = () => {
        renderAddEmployeeForm();
    };

    contentDiv.appendChild(addButton);
}

// Function to render the Add Employee form
function renderAddEmployeeForm() {
    const contentDiv = document.getElementById('content');

    // Clear the content
    contentDiv.innerHTML = '';

    // Create the form
    const form = `
        <h2>Add Employee</h2>
        <form id="addEmployeeForm">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required><br><br>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required><br><br>
            <label for="department">Department:</label>
            <input type="text" id="department" name="department" required><br><br>
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" required><br><br>
            <button type="submit" class="custom-button">Submit</button>
        </form>
    `;

    // Add the form to the content div
    contentDiv.innerHTML = form;

    // Add form submit event listener
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    addEmployeeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(addEmployeeForm);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const department = formData.get('department');
        const age = parseInt(formData.get('age'));

        if (firstName && lastName && department && !isNaN(age)) {
            const newEmployee = {
                id: employees.length + 1,
                firstName,
                lastName,
                department,
                age
            };
            employees.push(newEmployee);
            renderEmployee();
        } else {
            alert('Please fill all fields correctly.');
        }
    });
}

// Function to render the Edit Employee form
function renderEditEmployeeForm(employeeId) {
    const contentDiv = document.getElementById('content');
    const employee = employees.find(emp => emp.id === employeeId);

    // Clear the content
    contentDiv.innerHTML = '';

    // Create the form
    const form = `
        <h2>Edit Employee</h2>
        <form id="editEmployeeForm">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value="${capitalizeFirstLetter(employee.firstName)}" required><br><br>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value="${capitalizeFirstLetter(employee.lastName)}" required><br><br>
            <label for="department">Department:</label>
            <input type="text" id="department" name="department" value="${employee.department}" required><br><br>
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" value="${employee.age}" required><br><br>
            <button type="submit" class="custom-button">Submit</button>
        </form>
    `;

    // Add the form to the content div
    contentDiv.innerHTML = form;

    // Add form submit event listener
    const editEmployeeForm = document.getElementById('editEmployeeForm');
    editEmployeeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(editEmployeeForm);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const department = formData.get('department');
        const age = parseInt(formData.get('age'));

        if (firstName && lastName && department && !isNaN(age)) {
            // Update the employee data
            employee.firstName = firstName;
            employee.lastName = lastName;
            employee.department = department;
            employee.age = age;
            renderEmployee();
        } else {
            alert('Please fill all fields correctly.');
        }
    });
}

// Function to confirm deletion of an employee
function confirmDeleteEmployee(employeeId) {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
        const isConfirmed = confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`);
        if (isConfirmed) {
            deleteEmployee(employeeId);
        }
    } else {
        alert('Employee not found.');
    }
}

// Function to handle deleting an employee
function deleteEmployee(employeeId) {
    const index = employees.findIndex(emp => emp.id === employeeId);
    if (index !== -1) {
        employees.splice(index, 1);
        renderEmployee();
    } else {
        alert('Employee not found.');
    }
}

// Event listener to handle navigation
document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('homeButton');
    const employeeButton = document.getElementById('employeeButton');

    homeButton.addEventListener('click', () => {
        renderHome();
    });

    employeeButton.addEventListener('click', () => {
        renderEmployee();
    });
});
