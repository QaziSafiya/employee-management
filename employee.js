(async function(){
let data =await fetch("employee.json")
// console.log(data);

let res = await data.json()
// console.log(res);


let employees = res;
let selectedEmployeeId= employees[0].id;

let selectedEmployee =employees[0]



const employeesList = document.querySelector('.employees__names--list')
const employeesInfo = document.querySelector('.employees__names--info')


// add employee logic

const createEmployee =document.querySelector('.add-employee');
const addemployeeModel =document.querySelector('.addemployee');
const addemployeeForm =document.querySelector('.addemployee__create')

createEmployee.addEventListener('click',()=>{
addemployeeModel.style.display ='flex'
})

addemployeeModel.addEventListener('click',(e)=>{
    if(e.target.className==='addemployee'){
        addemployeeModel.style.display='none'
    }
});

const dobInput =document.querySelector('.addemployee__create--dob')
dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`;

addemployeeForm.addEventListener('submit',(e)=>{
e.preventDefault()
const formData = new FormData(addemployeeForm)
const values =[...formData.entries()]

console.log("Form Values:", values);

let empData={}
values.forEach((val)=>{
   empData[val[0]]=val[1]
})





empData.id=employees[employees.length-1].id+1;
console.log("New Employee Data:", empData);
empData.age=new Date().getFullYear() - parseInt(empData.dob.slice(0,4),10)
empData.img=empData.img ||"https://img.icons8.com/?size=100&id=14736&format=png&color=000000.png"
employees.push(empData)
console.log("emplyee data first name" , empData.firstname);
console.log("Updated Employees List:", employees);
renderemployee()
addemployeeForm.reset()
addemployeeModel.style.display="none"
})

// Select logic

employeesList.addEventListener('click',(e)=>{
if(e.target.tagName==='SPAN' && selectedEmployeeId!==e.target.id)

  {
    selectedEmployeeId=e.target.id;
    renderemployee()
    rendersingleEmployee()
    
  }

  if(e.target.tagName==='I'){
    employees =employees.filter((emp)=>
        String(emp.id)!==e.target.parentNode.id
    
  )
  console.log("deleted items");
if(String(selectedEmployeeId)===e.target.parentNode.id){
selectedEmployeeId=employees[0]?.id || -1;
selectedEmployee=employees[0] || {}

rendersingleEmployee();
}

renderemployee();
  }


})





// Render employee logic

const renderemployee=()=>{
    employeesList.innerHTML="";
    employees.forEach(emp => {
        const employee =document.createElement('span')

       
        employee.classList.add('employees__names--item')

        if(parseInt(selectedEmployeeId ,10)===emp.id){
            employee.classList.add('selected')
       selectedEmployee=emp;

        }

employee.setAttribute('id' ,emp.id)


employee.innerHTML =`<i class="fa-solid fa-xmark"></i> ${emp.firstname} ${emp.lastname} `
console.log(employee.innerHTML);
employeesList.append(employee)
    });
}



// render single employee

const rendersingleEmployee=()=>{


    if(selectedEmployeeId===-1){
        employeesInfo.innerHTML=""
        return
    }
employeesInfo.innerHTML=` <div class="container"><img class="image" src="${selectedEmployee.img}"/> 
<span class="Name">${selectedEmployee.firstname} ${selectedEmployee.lastname}</span>  
 <span class="Name">${selectedEmployee.dob} ${selectedEmployee.age}</span> 
 <span class="Name">${selectedEmployee.email} ${selectedEmployee.salary}</span>
 <span class="Name">${selectedEmployee.contact} ${selectedEmployee.address}</span>
 <button class="edit-resume">Edit</button> </div>`
}



if(selectedEmployee)rendersingleEmployee()

    console.log(rendersingleEmployee());

renderemployee()




})()