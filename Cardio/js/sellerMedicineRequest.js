
        var reqIDIndex = 0;
        var seller_Pharmacy;
        var fullTableData = null;
        var optionsInfo = null;
        var reqIDArray = [];
        var count = 0;
        var index = 0;

        var cardViewString = null;
        var tableElementArray = [];
        var tableElementID = 0;
        var availableMedNameArray = [];
        var availableMedAmountArray = [];
        var availableMedAmount = 0;
        var availableMedCount = 0;
        var available = "Available";
        var osudhExists = 0;
        var requestStatus;

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var sellerId = user.uid;
                firebase.database().ref('/Seller/' + sellerId).once('value').then(function (snapshot) {
                    userProperty = snapshot.val();
                    seller_Pharmacy = userProperty.sellerPharmacy;
                    const sellerPharmacyName = seller_Pharmacy;
                    firebase.database().ref('/Pharmacy/' + sellerPharmacyName + '/Storage').once('value').then(function (snapshot) {
                        //console.log("sellerPharmacyName 2: "+sellerPharmacyName);
                        var preUserproperty = snapshot.val();//prints Objects with med name, expire date etc
                        snapshot.forEach(function (medicine) {// console.log(medicine.val());//prints Objects with expire date , amount etc
                            var medName = medicine.key; //console.log(medName);//prints medicine name once only
                            availableMedCount = 0;
                            availableMedNameArray[index] = medName;
                            //console.log(medName);
                            medicine.forEach(function (medicineName) {
                                var exp_date = medicineName.key;//console.log("exp_date : "+exp_date);// All expire dates only//
                                var det = medicineName.val();
                                var qty = det.quantity;
                                availableMedCount = availableMedCount + qty;//console.log(qty);
                                availableMedAmountArray.push(availableMedAmount);
                            });//medicine.forEach ending
                            availableMedNameArray[index] = medName;
                            availableMedAmountArray[index] = availableMedCount;
                            console.log("Med " + availableMedNameArray[index] + " : " + availableMedAmountArray[index]);
                            index++;
                        });//snapshot.forEach ending

                        firebase.database().ref('/Pharmacy/' + sellerPharmacyName + '/Request/').once('value').then(function (snapshot) {

                            var requests = snapshot.val();//console.log(requests);//request objects
                            for (var key in requests) //key is the prescription ID
                            {
                                var showTable = '<option>' + key + '</option>';
                                requestStatus = requests[key].status;
                                reqIDArray.push(key);
                                console.log(requestStatus+" Age paisis");
                                if(requestStatus==="requested") {
                                    console.log(key);
                                    firebaseKaj(key,seller_Pharmacy);

                                }

                                if (optionsInfo === null) optionsInfo = showTable;
                                else optionsInfo = optionsInfo + showTable;
                                count++;
                            }
                            //options.innerHTML = optionsInfo;
                        });//requests
                    }); //end of '/Pharmacy/'/'value'
                });//seller phamacy
            } //end of if(user)
        }); //firebase auth end

        function firebaseKaj(key,sellerPharmacyName) {
            firebase.database().ref('/Prescription/' + key).once('value').then(function (snapshot) {
                console.log(key);
                var prescription = snapshot.val();
                console.log(prescription);
                osudhExists = -1;
                for (var presMed in prescription) { //console.log(presMed + "prints napa?");// prints napa/napadol/flazil
                    available = "Available";
                    if (prescription.hasOwnProperty(presMed)) {
                        var data = prescription[presMed];//prints prescription object //console.log(data);
                        var schd = data.schedule;
                        var tot = data.total;//days
                        var amount = totalMedicine(schd, tot);//total number of medicines you have to take //console.log(schd + " " + tot);

                        for (var i in availableMedNameArray) {

                            if (availableMedNameArray[i] == presMed) {
                                osudhExists = 1;
                                if (availableMedAmountArray[i] > amount) {
                                    console.log(availableMedAmountArray[i],availableMedNameArray[i]);
                                    console.log("Available " + availableMedNameArray[i]);
                                    }
                                    else {
                                    console.log(availableMedAmountArray[i],availableMedNameArray[i]);
                                    console.log("Not Available!!  " + availableMedNameArray[i]);
                                    osudhExists = -1;
                                    available = "Not Available";
                                    }
                            }
                           /* else{
                                console.log("Not Available!!  " + availableMedNameArray[i]);
                                osudhExists = -1;
                                available = "Not Available";
                            }*/
                        }
                        console.log(osudhExists);
                        if (osudhExists != 1) available = "Not Available";
                        console.log(available);
                        var tableRowData = '<tr>' +
                            '<td>' + presMed + '</td>' +
                            '<td>' + amount + '</td>' +
                            '<td>' + tot + '</td>' +
                            '</tr>';
                        if (fullTableData == null) fullTableData = tableRowData;
                        else fullTableData = fullTableData + tableRowData;
                        }
                }
                var mystring = "";
                var res = sellerPharmacyName.split(" ");
                for (var i in res) {
                    if (mystring == "") mystring = res[i];
                    else mystring = mystring + "_" + res[i];
                    }
                    console.log(mystring);
                seller_Pharmacy = mystring;
                var req = key;
                console.log(req);
                console.log(seller_Pharmacy);
                drawableTable(fullTableData, req, available,seller_Pharmacy);
                fullTableData = null;
                });
        }

        function totalMedicine(schedule, days) {
            var str = schedule;
            var res = str.split("-");
            var amount = 0;
            for (var i = 0; i < 3; i++) {
                amount += parseInt(res[i]);
            }
            return amount * days;
        }

        function drawableTable(data, requestID, availability,seller_Pharmacy) {//onestring seller_ph/seller_pharmacy
            var sellbuttonID = "sellbuttonID" + requestID;
            var discardbuttonID = "discardbuttonId" + requestID;
            var divisionID = "divisionID" + requestID;
            console.log(" Matro paisi eita" +requestID+" "+seller_Pharmacy);
            if (availability == "Available") {
                console.log(requestID);
                var makingTable =
                    '<div class="col-md-4"' + 'id=' + divisionID + '>' +
                    '<div class="team text-center" >' +
                    '<h3>' + "PrescriptionID: " + requestID + '</h3>' +
                    '<h3>' + "Availability: " + availability + '</h3>' +
                    '<h3>' + " " + "Requested" + '</h3>' +
                    '<table class="table table-bordered">' +
                    '<tr style="font-size: large">' +
                    '<th>' + "Medicine Name" + '</th>' +
                    '<th>' + "Amount" + '</th>' +
                    '<th>' + "Total Price" + '</th>' + '</tr>' +
                    '<tbody>' + data + '</tbody>' + '</table>' +
                    '<button data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" ' + 'id="' + sellbuttonID + '" onclick=' + 'sellrequest("' + requestID + '","' + seller_Pharmacy + '")' + '>' + "Sell" + '</button>' +
                    '<button data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" ' + 'id="' + discardbuttonID + '" onclick=' + 'discardrequest("' + requestID + '","' + seller_Pharmacy + '")' + '>' + "Discard" + '</button>' + //onclick=discardrequest()
                    '</div>' + '</div>';
            }
             if (availability == "Not Available") {
                console.log(requestID);
                var makingTable =
                    '<div class="col-md-4"' + 'id=' + divisionID + '>' +
                    '<div class="team text-center" >' +
                    '<h3>' + "PrescriptionID: " + requestID + '</h3>' +
                    '<h3>' + "Availability: " + availability + '</h3>' +
                    '<h3>' + " " + "Requested" + '</h3>' +
                    '<table class="table table-bordered">' +
                    '<tr style="font-size: large">' +
                    '<th>' + "Medicine Name" + '</th>' +
                    '<th>' + "Amount" + '</th>' +
                    '<th>' + "Total Price" + '</th>' + '</tr>' +
                    '<tbody>' + data + '</tbody>' + '</table>' +
                    '<button data-toggle="modal" data-target="#modal1" class="btn btn-blue-fill" ' + 'id="' + discardbuttonID + '" onclick=' + 'discardrequest("' + requestID + '","' + seller_Pharmacy + '")' + '>' + "Discard" + '</button>' + //onclick=discardrequest()
                    '</div>' + '</div>';
            }

            tableElementArray.push(makingTable);
            tableElementID++;
            if (cardViewString == null) cardViewString = makingTable;
            else cardViewString += makingTable;
            cardviewtable.innerHTML = cardViewString;
        }

        function discardrequest(requestID, seller_Pharmacy) {//onestring seller_ph/seller_pharmacy
            var str = "divisionID" + requestID + "";
            var st = "";
            var res = seller_Pharmacy.split("_");
            for (var i in res) {
                if (st == "") st = res[i];
                else st = st + " " + res[i];
            }
            //console.log("st : "+st); OK
            var seller_Pharmacy = st;
            //console.log(seller_Pharmacy);ok
            document.getElementById(str).style.display = "none";
            firebase.database().ref('/Pharmacy/' + seller_Pharmacy + '/Request/' + requestID + '/status').set("discarded");
        }

        function sellrequest(requestID, seller_Pharmacy) {//onestring seller_ph/seller_pharmacy
            console.log("dhukse");
            console.log(requestID);

            console.log(seller_Pharmacy);
            var str = "divisionID" + requestID + "";
            var seller_ph = seller_Pharmacy;
            var st = "";
            var res = seller_Pharmacy.split("_");
            for (var i in res) {
                if (st == "") st = res[i];
                else st = st + " " + res[i];
            }
            var seller_Pharmacy = st;

            //console.log(str);
            document.getElementById(str).style.display = "none";
            var request = firebase.database().ref('/Prescription/' + requestID).once('value').then(function (snapshot) {
                var prescription = snapshot.val();
                for (var presMed in prescription) {
                    if (prescription.hasOwnProperty(presMed)) {
                        var data = prescription[presMed];
                        var schd = data.schedule;
                        var tot = data.total;//days
                        var amount = totalMedicine(schd, tot);
                        updateStorage(presMed, amount, seller_Pharmacy);
                    }
                }
            });
            firebase.database().ref('/Pharmacy/' + seller_Pharmacy + '/Request/' + requestID + '/status').set("Sold");//problem: where to set this?
        }

        function updateStorage(presMed, amount, seller_Pharmacy)////onestring seller_ph/seller_pharmacy
        {
            console.log(seller_Pharmacy)
            var availableNow = 0;
            var date;
            var neededAmount = amount;
            var seller_ph = seller_Pharmacy;
            var st = "";
            var res = seller_Pharmacy.split("_");
            for (var i in res) {
                if (st == "") st = res[i];
                else st = st + " " + res[i];
            }
            var seller_Pharmacy = st;
           console.log(presMed);
            firebase.database().ref('Pharmacy/' + seller_Pharmacy + '/Storage/' + presMed).once("value").then(function (snapshot) {
                var medicineSnapshot = snapshot.val();
                console.log(medicineSnapshot);//object with Qty,prize
                snapshot.forEach(function (medicineSnapshot) {
                    //console.log("keyy: "+ medicineSnapshot.key);//prints date ^_^
                    date = medicineSnapshot.key;
                    console.log(medicineSnapshot.val());//prints object with quantity, prize
                    var med = medicineSnapshot.val();
                    console.log(med.quantity);
                    availableNow = med.quantity;//storage amount of Napa/presmed
                    if (neededAmount >= availableNow) {
                        neededAmount -= availableNow;
                        delete_med(presMed, date, seller_ph, neededAmount);
                        updateStorage(presMed, neededAmount, seller_ph);
                    }
                    else if (neededAmount > 0) {
                        availableNow = availableNow - neededAmount;
                        updateStorageList(presMed, date, seller_ph, neededAmount);//availablenow in storage
                    }
                });
            });
        }


        function delete_med(presMed, date, seller_Pharmacy, neededAmount) {//onestring seller_ph/seller_pharmacy
            var st = "";
            var res = seller_Pharmacy.split("_");
            for (var i in res) {
                if (st == "") st = res[i];
                else st = st + " " + res[i];
            }
            var seller_Pharmacy = st;


            firebase.database().ref('/Pharmacy/' + seller_Pharmacy + '/Storage/' + presMed + '/' + date).update({
                quantity: 0,
                totalSold: neededAmount
            }).then(function () {
                console.log("Stoage Updated successfully!!");
            }).catch(function (error) {
                console.log("Update failed.. :( ")
            });
        }

// function delete_med(presMed,date,seller_Pharmacy) {
//     var dbRef = firebase.database().ref('/Pharmacy/'+seller_Pharmacy+'/Storage/'+presMed);
//  	dbRef.child(date).remove();
// }


        function updateStorageList(presMed, date, seller_Pharmacy, neededAmount) {//onestring seller_ph/seller_pharmacy
            var soldAmount = 0;
            var availableQty = 0;
            var seller_ph = seller_Pharmacy;
            var st = "";
            var res = seller_Pharmacy.split("_");
            for (var i in res) {
                if (st == "") st = res[i];
                else st = st + " " + res[i];
            }
            var seller_Pharmacy = st;
            var dbRef = firebase.database().ref('/Pharmacy/' + seller_Pharmacy + '/Storage/' + presMed + '/' + date).once("value").then(function (snapshot) {

                var medSnapshot = snapshot.val();
                console.log(medSnapshot);
                soldAmount = medSnapshot.totalSold;
                availableQty = medSnapshot.quantity;
                console.log("Sold before: " + soldAmount);
                console.log("Available: " + availableQty);
                soldAmount = soldAmount + neededAmount;
                availableQty = availableQty - neededAmount;
                console.log("Sold After: " + soldAmount);

                firebase.database().ref('/Pharmacy/' + seller_Pharmacy + '/Storage/' + presMed + '/' + date).update({
                    quantity: availableQty,
                    totalSold: soldAmount
                }).then(function () {
                    alert("Stoage Updated successfully!!" + "\nsold amount " + soldAmount);

                }).catch(function (error) {
                    console.log("Update failed.. :( ")
                });

            });

        }


