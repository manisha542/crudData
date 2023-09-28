import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApiService } from '../Shared/api.service';
import { EmployeeModel } from './employee-detail.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeModelObj: EmployeeModel = new EmployeeModel();
  formValue!: FormGroup;
  EmployeeData: any;
  showAdd: boolean | undefined;
  showUpdate: boolean | undefined;
 

  constructor(private formbuilder: FormBuilder,private api:ApiService) {
  }
  
  ngOnInit(): void {
    this.formValue = this.formbuilder.group(
      {
       
        FirstName: [''],
        LastName: [''],
        EmailId: [''],
        MobileNum: [''],
        Salary: ['']
      }
    )
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postEmployeeDetails() {
   
    this.employeeModelObj.FirstName = this.formValue.value.FirstName;
    this.employeeModelObj.LastName = this.formValue.value.LastName;
    this.employeeModelObj.EmailId = this.formValue.value.EmailId;
    this.employeeModelObj.MobileNum = this.formValue.value.MobileNum;
    this.employeeModelObj.Salary = this.formValue.value.Salary;
    this.api.postEmployee(this.employeeModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Employee Added successfully");
       let ref=document.getElementById('cancle');
       ref?.click();
      this.formValue.reset();
     this.getAllEmployee();
    },()=>{
      alert("something went wrong");
    })
  }
getAllEmployee(){
  this.api. getEmployee()
  .subscribe((res:any)=>{
    this.EmployeeData=res;
  })
}
deleteEmployee(row:any){
  this.api.deleteEmployee(row.id)
  .subscribe((res:any)=>{
    alert("employee deleted");
    this.getAllEmployee();
  })
}
onEdit(row:any){
this.showAdd=false;
this.showUpdate=true;
this.employeeModelObj.Id=row.Id;
this.formValue.controls['FirstName'].setValue(row.FirstName);
this.formValue.controls['LastName'].setValue(row.LastName);
this.formValue.controls['EmailId'].setValue(row.EmailId);
this.formValue.controls['MobileNum'].setValue(row.MobileNum);
this.formValue.controls['Salary'].setValue(row.Salary);
}
Details(){
  this.employeeModelObj.FirstName = this.formValue.value.FirstName;
  this.employeeModelObj.LastName = this.formValue.value.LastName;
  this.employeeModelObj.EmailId = this.formValue.value.EmailId;
  this.employeeModelObj.MobileNum = this.formValue.value.MobileNum;
  this.employeeModelObj.Salary = this.formValue.value.Salary;
  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.Id) 
  .subscribe(res=>{
    alert("update sucessfully");
    let ref=document.getElementById('cancle');
    ref?.click();
   this.formValue.reset();
  this.getAllEmployee();
  })
}
}
