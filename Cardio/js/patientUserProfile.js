window.onload = function () {

	var a = document.getElementById("sup");
	var out = document.getElementById("sout");
	var headarName = document.getElementById("pProfileName");
	var age = document.getElementById("pAge");
	var uname = document.getElementById("pUname");
	var name = document.getElementById("pFname");
	var em = document.getElementById("pEmail");
	var phNo = document.getElementById("pPnum");

	 firebase.auth().onAuthStateChanged(function(user) {
	 	console.log(user);
		  if (user) {

			var userId = user.uid;
			console.log(userId);
			firebase.database().ref('/Patient/' + userId).once('value').then(function (snapshot) {
				userProperty = snapshot.val();

				a.innerHTML = userProperty.patientUsername;
				
                    console.log(userProperty.patientName);
                    headarName.innerHTML = userProperty.patientName;
                    uname.innerHTML = userProperty.patientUsername;
                    name.innerHTML = userProperty.patientName;
                    phNo.innerHTML = userProperty.patientNumber;
                    em.innerHTML = userProperty.patientEmail;
                    age.innerHTML = userProperty.patientAge;

			});


            }
        });

    }
