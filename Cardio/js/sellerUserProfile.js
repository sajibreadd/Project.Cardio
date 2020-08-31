window.onload = function () {
	var a = document.getElementById("sup");
	var out = document.getElementById("sout");
	var headarName = document.getElementById("sProfileName");
	var headerpahrmacy = document.getElementById("sPharmacy");
	var uname = document.getElementById("sUname");
	var name = document.getElementById("sFname");
	var em = document.getElementById("sEmail");
	var phNo = document.getElementById("sPnum");
	var pharm = document.getElementById("sPharm");
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			var userId = user.uid;
			firebase.database().ref('/Seller/' + userId).once('value').then(function(snapshot) {
				userProperty=snapshot.val();
                console.log(userProperty.sellerName);
				a.innerHTML = userProperty.sellerUsername;

				console.log(userProperty.sellerName);
				headarName.innerHTML = userProperty.sellerName;
				headerpahrmacy.innerHTML = userProperty.sellerPharmacy;
				uname.innerHTML = userProperty.sellerUsername;
				name.innerHTML = userProperty.sellerName;
				pharm.innerHTML = userProperty.sellerPharmacy;
				em.innerHTML = userProperty.sellerEmail;
				phNo.innerHTML = userProperty.sellerNumber;

				});
			}
		 });

	}