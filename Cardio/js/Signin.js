var a = document.getElementById('price');

function getType(){
	if(document.getElementById('logDoctor').checked)
	{
		var g =  document.getElementById('logDoctor').value;
		console.log(g);
		return g;
	}
	else if(document.getElementById('logPatient').checked)
	{

		var g =  document.getElementById('logPatient').value;
		console.log(g);
		return g;

	}
	else if(document.getElementById('logSeller').checked)
	{

		var g =  document.getElementById('logSeller').value;
		console.log(g);
		return g;

	}
}

function signed_in(type)
{
	firebase.auth().onAuthStateChanged(function(user) {

	if(user!==null)
	{

		var userId = user.uid;
        if(type=="Doctor") {
        	console.log(type);
            firebase.database().ref('/Doctor/' + userId).once('value').then(function (snapshot) {
                userProperty = snapshot.val();
                console.log(type);
                console.log(userProperty.doctorUsername);
                window.location.href="doctor.html";
				//document.getElementById("sup").innerHTML= userProperty.doctorUsername;

                return true;
            });
        }
        else if(type=="Patient") {
            firebase.database().ref('/Patient/' + userId).once('value').then(function (snapshot) {
                userProperty = snapshot.val();
                console.log(type);
               // console.log(userProperty.patientUsername);
                window.location.href="patient.html";
                document.getElementById("sup").innerHTML = userProperty.patientUsername;
                return true;
            });
        }
        else if(type=="Seller") {
            firebase.database().ref('/Seller/' + userId).once('value').then(function (snapshot) {
                userProperty = snapshot.val();
                console.log(type);
              //  console.log(userProperty.sellerUsername);
				window.location.href="seller.html";
                document.getElementById("sup").innerHTML= userProperty.sellerUsername;
                return true;
            });
        }

                return true;
  	}
	else {
    		console.log("No user is signed in.");
                return false;
    	}
	});
}

function login_func()
{

	const psw = document.getElementById('pass3');
	const email = document.getElementById('em2');


	const email_val = email.value;
	const pass_val = psw.value;
	const auth = firebase.auth();

	console.log("something nnn\n");

	const promise = auth.signInWithEmailAndPassword(email_val,pass_val);
	var type = getType();

	signed_in(type);

	console.log("After sign in\n");

}
