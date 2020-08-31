//Factory Pattern
//This is profileFactory
class ProfileFactory{
  constructor(profile){
    this.profile = profile;
  }
  factorizeProfile(){
    this.profile.update();
  }
}

class DoctorProfileFactory extends ProfileFactory{
  constructor(){
    super(new DoctorProfile());
  }
}

class PatientProfileFactory extends ProfileFactory{
  constructor(){
    super(new PatientProfile());
  }
}

class SellerProfileFactory extends ProfileFactory{
  constructor(){
    super(new SellerProfile());
  }
}

class Profile{
  constructor(){}
  update(){throw new Error('You have to implement the method doSomething!');}
}

class DoctorProfile extends Profile{
  constructor(){super();}
  update(){
    firebase.auth().onAuthStateChanged(function(user){
             if(user)
             {
                 var userId = user.uid;
                 console.log(userId);

                     firebase.database().ref('Doctor/' + userId).once("value").then(function (snapshot) {
                         var up = snapshot.val();
                         var doctor_Name = up.doctorName;
                         var doctor_Usename = up.doctorUsername;
                         var doctor_Hospital = up.doctorHospital;
                         var doctor_desig = up.doctorDesignation;
                         var doctor_num = up.doctorNumber;
                         var updatedDoctorName = document.getElementById('updateDoctor_name').value;
                         var updatedDoctorUsename = document.getElementById('updateDoctor_username').value;
                         var updatedDoctorHospital = document.getElementById('updateDoctor_hospital').value;
                         var updatedDoctordesig = document.getElementById('updateDoctor_designation').value;
                         var updatedDoctornum = document.getElementById('updateDoctor_num').value;
                         console.log("hello " + updatedDoctorName + " " + updatedDoctorUsename + " " + updatedDoctorHospital);
                         if(!updatedDoctorName) updatedDoctorName =doctor_Name;
                         if(!updatedDoctorUsename) updatedDoctorUsename = doctor_Usename;
				         if(!updatedDoctorHospital) updatedDoctorHospital = doctor_Hospital;
				         if(!updatedDoctordesig) updatedDoctordesig = doctor_desig;
				         if(!updatedDoctornum) updatedDoctornum=doctor_num
                         firebase.database().ref('Doctor/' + userId).update({
                             doctorName: updatedDoctorName,
                             doctorUsername: updatedDoctorUsename,
                             doctorHospital: updatedDoctorHospital,
                             doctorDesignation: updatedDoctordesig,
                             doctorNumber: updatedDoctornum
                         }).then(function () {
                             alert("Profile updated successfully");
                         }).catch(function (error) {
                             console.log("Update failed");
                         });
                         var user = firebase.auth().currentUser;
                     });
                 }

         });
  }

}
class PatientProfile extends Profile{
  constructor(){super();}
  update(){
    firebase.auth().onAuthStateChanged(function(user){
             if(user)
             {
                 var userId = user.uid;
                 console.log(userId);


                     firebase.database().ref('Patient/' + userId).once("value").then(function (snapshot) {
                         var up = snapshot.val();
                         var patient_Name = up.patientName;
                         var patient_Usename = up.patientUsername;
                         var patient_age = up.patientAge;
                         var patient_num = up.patientNumber;
                         console.log(patient_Name+" "+patient_Usename );
                         var updatedpatientName = document.getElementById('updatePatient_name').value;
                         var updatedpatientUsename = document.getElementById('updatePatient_username').value;
                         var updatedpatientAge = document.getElementById('updatePatient_age')
                         var updatedpatientnum = document.getElementById('updatePatient_num').value;
                         if(!updatedpatientName) updatedpatientName= patient_Name;
                         if(!updatedpatientUsename) updatedpatientUsename = patient_Usename;

				         if(!updatedpatientAge) updatedpatientAge=patient_age;
				         if(!updatedpatientnum) updatedpatientnum=patient_num
                         console.log("hello " + updatedpatientName + " " + updatedpatientUsename + " " + updatedpatientAge);

                         firebase.database().ref('Patient/' + userId).update({
                             patientName: updatedpatientName,
                             patientUsername: updatedpatientUsename,
                             patientAge : updatedpatientAge,
                             patientNumber: updatedpatientnum
                         }).then(function () {
                             alert("Profile updated successfully");
                         }).catch(function (error) {
                             console.log("Update failed");
                         });
                         var user = firebase.auth().currentUser;
                     });
                 }

                 });
  }
}
class SellerProfile extends Profile{
  constructor(){super();}
  update(){
    firebase.auth().onAuthStateChanged(function(user){
             if(user)
             {
                 var userId = user.uid;
                 console.log(userId);
                 firebase.database().ref('Seller/' + userId).once("value").then(function (snapshot) {
                         var up = snapshot.val();
                         var seller_Name = up.sellerName;
                         var seller_Usename = up.sellerUsername;
                         var seller_num = up.sellerNumber;
                         console.log(seller_Name+" "+seller_Usename );
                         var updatedsellerName = document.getElementById('updateSeller_name').value;
                         var updatedsellerUsename = document.getElementById('updateseller_username').value;

                         var updatedsellernum = document.getElementById('updateseller_num').value;
                         if(!updatedsellerName) updatedsellerName= seller_Name;
                         if(!updatedsellerUsename) updatedsellerUsename = seller_Usename;

				         if(!updatedsellernum) updatedsellernum=seller_num
                         console.log("hello " + updatedsellerName + " " + updatedsellerUsename + " ");

                         firebase.database().ref('Seller/' + userId).update({
                             sellerName: updatedsellerName,
                             sellerUsername: updatedsellerUsename,
                             sellerNumber: updatedsellernum
                         }).then(function () {
                             alert("Profile updated successfully");
                         }).catch(function (error) {
                             console.log("Update failed");
                         });
                         var user = firebase.auth().currentUser;
                     });
                 }

                 });
  }
}
function updatedoctorProfile(){
  doctorProfileFactory = new DoctorProfileFactory();
  doctorProfileFactory.factorizeProfile();
}
function updatepatientProfile(){
  patientProfileFactory = new PatientProfileFactory();
  patientProfileFactory.factorizeProfile();
}
function updatesellerProfile(){
  sellerProfileFactory = new sellerProfileFactory();
  sellerProfileFactory.factorizeProfile();
}
