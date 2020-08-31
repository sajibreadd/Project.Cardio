function viewPic() {
	firebase.auth().onAuthStateChanged(function(user) {
	    var storage = firebase.storage();
	    var storageRef = storage.ref();
	    var tangRef = storageRef.child(user.uid);
	    var defaultRef = storageRef.child('brown.jpg');

        tangRef.getDownloadURL().then(function(url) {
	      document.querySelector('img.Img').src = url;
	      //console.log(url);

	    }).catch(function(error) {
	    	//console.error(error);
	    	defaultRef.getDownloadURL().then(function(url) {
	    		document.querySelector('img.Img').src = url;
	    		//console.log(url);
			});
	    });
	});
}

function getFileData(myFile){
	var file = myFile.files[0];  
	var filename = file.name;

	var user = firebase.auth().currentUser;
	var userID = user.uid;

	var storageRef = firebase.storage().ref(userID + '/');

	var task = storageRef.put(file);

	setTimeout(viewPic, 1000)
}