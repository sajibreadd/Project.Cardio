$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();

	var count = 0; //row counter
	var cnt = -1; //if cnt++ === count, then go to new page

	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		/*$(this).attr("disabled", "disabled");*/
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="med_name'+count+'" id="med_name'+count+'"></td>' +
            '<td><input type="text" class="form-control" name="sched'+count+'" id="exp'+count+'"></td>' +
            '<td><input type="text" class="form-control" name="tot_days'+count+'" id="quan'+count+'"></td>' +
            '<td><input type="text" class="form-control" name="tot_days'+count+'" id="pric'+count+'"></td>' +
			/*'<td>' + actions + '</td>' +*/
		'</tr>';
    	// $("table").append(row);
		$('#med_table tbody').append(row);
		count++;
    });

	$(".complete").click(function storage_table(){
		count = count - 1;
		console.log(count);
		var med = [];
		var expiry = [];
		var quant = [];
		var pri = [];
		
		for(var i=0; i<=count; i++){
			med[i] = document.getElementById("med_name"+i).value;
			expiry[i] = document.getElementById("exp"+i).value;
			quant[i] = document.getElementById("quan"+i).value;
			pri[i] = document.getElementById("pric"+i).value;
		}

		var myPharma;

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				var userId = user.uid;
				firebase.database().ref('/Seller/' + userId).once('value').then(function(snapshot) {
					userProperty = snapshot.val();
	                myPharma = userProperty.sellerPharmacy;
	                /*console.log(myPharma);*/

		            var SearchRef = firebase.database().ref('/Pharmacy/'+myPharma+'/Storage');
		            SearchRef.once('value').then(function(test) {
		            	/*console.log(testSnapshot.key);*/
			            for(var i=0; i<=count; i++){
						    var medi = med[i];
						    var expiry_date = expiry[i];
						    var quantit = quant[i];
						    var pric = pri[i];
						    var totalSold=0;

						    updateStorage(myPharma, medi, expiry_date, quantit, pric,totalSold);
						}
					});
				});
			}
		});
	});

	function updateStorage (myPharma, medi, expiry_date, quantit, pric,totalSold) {
		var dbRef = firebase.database().ref('/Pharmacy/'+myPharma+'/Storage/'+medi);
		dbRef.once('value').then(function(snapshot){
			if(snapshot.hasChild(expiry_date)){
				cnt++;
				var quantity;
				dbRef.child('/'+expiry_date).once('value').then(function(snapshot2){
					var a = snapshot2.val();
					quantity = a.quantity;

					dbRef.child('/'+expiry_date).update({
				    	quantity : parseInt(quantit)+parseInt(quantity),
						totalSold : parseInt(totalSold)
				    });
				});
				if(cnt === count) myWin();
			}
			else {
				cnt++;
				dbRef.child('/'+expiry_date).update({
			    	quantity : quantit,
			    	price : pric,
					totalSold : parseInt(totalSold)
			    });
				if(cnt === count) myWin();
			}
		});
	}

	function myWin () {
		if(confirm("View Storage?")) window.location.assign("seller.html");
		else window.location.assign("seller.html");
	}
});