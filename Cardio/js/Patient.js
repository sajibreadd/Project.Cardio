
const patient_name= document.getElementById('patient_name');
const patient_username = document.getElementById('patient_username');
const patient_email = document.getElementById('patient_email');
const patient_num = document.getElementById('patient_num');
const patient_pass = document.getElementById('patient_pass');
const patient_confirm_pass = document.getElementById('patient_confirm_pass');
const patient_age = document.getElementById('patient_age')

class Patient extends Person{
  constructor(name,userName,email,num,pass,confirmPass,observer,age){
    super(name,userName,email,num,pass,confirmPass,observer);
    this.observer.addPerson(this);
    this.age = age;
  }
  completeSignUp() {
    if(!super.doValidate()){return false;}
    const gend = getGender("patient");
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(this.email,this.pass).catch(function	(error) {
        console.log("Hudai");
      console.log(error.message);
    });


    firebase.auth().onAuthStateChanged(function(user) {
      if (user){
        console.log("Signed Up ");
        const userId = user.uid;
        firebase.database().ref('Patient/' + userId).set({
			patientName: patient_name.value,
			patientUsername: patient_username.value,
			patientEmail:patient_email.value ,
			patientGender : gend,
			patientAge : patient_age.value,
			patientNumber : patient_num.value,
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

function user_doSomething()
{
    observer = new Observer();

	patient = new Patient(patient_name.value,patient_username.value,patient_email.value,
		patient_num.value,patient_pass.value,patient_confirm_pass.value,observer,patient_age.value);


	person = patient;

	observer.work();

}