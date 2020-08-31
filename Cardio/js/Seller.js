
const seller_name= document.getElementById('seller_name');
const seller_username = document.getElementById('seller_username');
const seller_email = document.getElementById('seller_email');
const seller_num = document.getElementById('seller_num');
const seller_pass = document.getElementById('seller_pass');
const seller_pharm = document.getElementById('seller_pharmacy');
const seller_confirm_pass = document.getElementById('seller_confirm_pass');

class Seller extends Person{
  constructor(name,userName,email,num,pass,confirmPass,observer,pharmacy){
    super(name,userName,email,num,pass,confirmPass,observer);
    this.observer.addPerson(this);
    this.pharmacy=pharmacy;
  }
  completeSignUp() {
    if(!super.doValidate()){return false;}
    const gend = getGender("seller");
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(this.email,this.pass).catch(function	(error) {
        console.log("Hudai");
      console.log(error.message);
    });


    firebase.auth().onAuthStateChanged(function(user) {
      if (user){
        console.log("Signed Up ");
        const userId = user.uid;
        console.log(userId);
        console.log(seller_pharm.value);
        firebase.database().ref('Seller/' + userId).set({
            sellerName: seller_name.value,
			sellerUsername: seller_username.value,
			sellerEmail:seller_email.value ,
			sellerGender : gend,
            sellerPharmacy : seller_pharm.value,
			sellerNumber : seller_num.value,
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

function sellerUserDoSomething()
{
    observer = new Observer();

	seller = new Seller(seller_name.value,seller_username.value,seller_email.value,
		seller_num.value,seller_pass.value,seller_confirm_pass.value,observer,seller_pharm.value);


	person = seller;

	observer.work();

}