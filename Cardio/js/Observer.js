// Strategy Pattern
class ValidationTool{
  constructor(){}
  validate(){
    throw new Error('You have to implement the method doSomething!');
  }
}
class EmailVaidationTool extends ValidationTool{
  constructor(){super();}
  validate(email){
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!filter.test(email)){
          console.log(email);
        alert("please enter a valid email address");
        //console.log("please enter a valid email address");
        return false;
      }
      else{
          return true;
      }
  }
}
class PasswordValidationTool extends ValidationTool{
  constructor(){super();}
  validate(pass,confirmPass){
    if(pass.length>=6){
      if(pass == confirmPass){return true;}
      else{
        alert("Password does not match");
        return false;
      }
    }
    else{
      alert("Password should be at least of 6 characters");
      return false;
    }
  }
}
class PhoneNumberValidationTool extends ValidationTool{
  constructor(){super();}
  validate(num){
    var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!phoneno.test(num)){
      alert("Please enter a valid Phone Number.")
        return false;
    }
    else{return true;}
  }
}
class UserNameValidationTool extends ValidationTool{
  constructor(){super();}
  validate(userName){
    if(userName.length>=6) return true;
    else{
      alert("UserName should be at least of 6 characters");
      return false;
    }
  }
}
function getGender(type){
  var type1 = type + "_" + "Male";
  var type2 = type + "_" + "Female";
	if(document.getElementById(type1).checked)
	{
		var gender =  document.getElementById(type1).value;
		console.log(gender);
		return gender;
	}
	else if(document.getElementById(type2).checked)
	{

		var gender =  document.getElementById(type2).value;
		console.log(gender);
		return gender;

	}
}
//Observer Pattern
class Observer{
  constructor(person){
    this.person = person;
  }
  addPerson(para){
    this.person = para;
  }
  work(){
    //return person.doValidate();
    person.completeSignUp();
  }
}
class Person {
  constructor(name,userName,email,num,pass,confirmPass,observer){
    this.name = name;
    this.userName = userName;
    this.email = email;
    this.num = num;
    this.pass = pass;
    this.confirmPass = confirmPass;
    this.validationTool= [{object:new EmailVaidationTool(), parameter:this.email},{object:new PasswordValidationTool(),parameter1:this.pass,parameter2:this.confirmPass},{object:new UserNameValidationTool(),parameter:this.userName},{object:new PhoneNumberValidationTool(),parameter:this.num}];
    this.observer = observer;
  }
  doValidate(){
    for(var i = 0; i < 4; i++){
      if(i == 1){
        if(!this.validationTool[i].object.validate(this.validationTool[i].parameter1,this.validationTool[i].parameter2)){return false;}
      }
      else{
       if(!this.validationTool[i].object.validate(this.validationTool[i].parameter)){return false;}
      }
    }
    return true;
  }
  completeSignUp(){
    throw new Error('You have to implement the method doSomething!');
  }
}



