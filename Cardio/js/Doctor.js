
const doctor_name= document.getElementById('doctor_name');
const doctor_username = document.getElementById('doctor_username');
const doctor_email = document.getElementById('doctor_email');
const doctor_hospital = document.getElementById('doctor_hospital');
const doctor_designation = document.getElementById('doctor_designation');
const doctor_num = document.getElementById('doctor_num');
const doctor_pass = document.getElementById('doctor_pass');
const doctor_confirm_pass = document.getElementById('doctor_confirm_pass');


class Doctor extends Person{
  constructor(name,userName,email,num,pass,confirmPass,observer,designation,hospital){
    super(name,userName,email,num,pass,confirmPass,observer);
    this.observer.addPerson(this);
    this.designation = designation;
    this.hospital = hospital;
  }
  completeSignUp() {
    if(!super.doValidate()){return false;}
    //console.log(this.userName + "Hudai");
    const gend = getGender("doctor");
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(this.email,this.pass).catch(function	(error) {
        console.log("Hudai");
      console.log(error.message);
    });


    firebase.auth().onAuthStateChanged(function(user) {
      if (user){
        console.log("Signed Up ");
        const userId = user.uid;
        console.log(this.userName);
        firebase.database().ref('Doctor/' + userId).set({
          doctorName: doctor_name.value,
          doctorUsername : doctor_username.value,
          doctorEmail: doctor_email.value,
          doctorGender : gend,
          doctorHospital : doctor_hospital.value,
          doctorDesignation : doctor_designation.value,
          doctorNumber : doctor_num.value,
          userID: userId
        }).then(function() {
          console.log('Data write succeeded');
          alert("Sign up complete");
        })
        .catch(function(error) {
          console.log('Data write failed');
        });
      }
      else {
        console.log("No user is signed up.");
      }
    });
  }
}

function doctorUserDoSomething()
{
   observer = new Observer();
    console.log(doctor_name.value,doctor_username.value,doctor_email.value,doctor_num.value,
    doctor_pass.value,doctor_confirm_pass.value, observer,doctor_designation.value,doctor_hospital.value);
    doctor = new Doctor(doctor_name.value,doctor_username.value,doctor_email.value,doctor_num.value,
    doctor_pass.value,doctor_confirm_pass.value, observer,doctor_designation.value,doctor_hospital.value);


	person = doctor;
	observer.work();


}