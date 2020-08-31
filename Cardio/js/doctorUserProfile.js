	window.onload = function () {
		var a = document.getElementById("sup");
		var out = document.getElementById("sout");
		var headarName = document.getElementById("profileName");
		var headerProf = document.getElementById("profession");
		var headerHos = document.getElementById("hospital");
		var uname = document.getElementById("Uname");
		var name = document.getElementById("Fname");
		var em = document.getElementById("email");
		var phNo = document.getElementById("Pnum");
		var desi = document.getElementById("desig");
		 firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
			var userId = user.uid;
			firebase.database().ref('/Doctor/' + userId).once('value').then(function(snapshot) {
				userProperty=snapshot.val();

				a.innerHTML = userProperty.doctorUsername;
				//a.href = "profile.html";

				//so.innerHTML = "Sign Out";
				//so.setAttribute("data-hover","Sign Out");
				/*if(userProperty.type === "admin")
				{
					ad.innerHTML = "ADMIN";
					ad.setAttribute("data-hover","ADMIN");
				}*/
				console.log(userProperty.doctorName);
				headarName.innerHTML = userProperty.doctorName;
				headerProf.innerHTML = userProperty.doctorDesignation;
				headerHos.innerHTML = userProperty.doctorHospital;
				uname.innerHTML = userProperty.doctorUsername;
				name.innerHTML = userProperty.doctorName;
				em.innerHTML = userProperty.doctorEmail;
				phNo.innerHTML = userProperty.doctorNumber;
				desi.innerHTML = userProperty.doctorDesignation;


			});


		  }
	});

	}
