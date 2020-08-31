const soldMedNameArray=[];
const soldMedAmountArray=[];
var pharmaName ="hudai";



class GraphData{
  constructor(vector){
    this.vector = vector;
  }
  work() {

          var chart = new CanvasJS.Chart("chartContainer", {
              animationEnabled: true,

              title: {
                  text: "Most Sold Medicines In that Pharmacy"
              },
              axisX: {
                  interval: 1
              },
              axisY2: {
                  interlacedColor: "rgba(1,77,101,.2)",
                  gridColor: "rgba(1,77,101,.1)",
                  title: "Number of Companies"
              },

              data: [{
                  type: "bar",
                  name: "companies",
                  axisYType: "secondary",
                  dataPoints: this.vector
              }]
          });
          chart.render();

          var chart2 = new CanvasJS.Chart("chartContainer2", {
              animationEnabled: true,

              title: {
                  text: "Most Sold Medicines In that Pharmacy"
              },
              axisX: {
                  interval: 1
              },
              axisY2: {
                  interlacedColor: "rgba(1,77,101,.2)",
                  gridColor: "rgba(1,77,101,.1)",
                  title: "Number of Companies"
              },

              data: [{
                  type: "pie",
                  name: "companies",
                  axisYType: "secondary",
                  dataPoints: this.vector
              }]
          });
          chart2.render();

          var chart3 = new CanvasJS.Chart("chartContainer3", {
              animationEnabled: true,

              title: {
                  text: "Most Sold Medicines In that Pharmacy"
              },
              axisX: {
                  interval: 1
              },
              axisY2: {
                  interlacedColor: "rgba(1,77,101,.2)",
                  gridColor: "rgba(1,77,101,.1)",
                  title: "Number of Companies"
              },

              data: [{
                  type: "line",
                  name: "companies",
                  axisYType: "secondary",
                  dataPoints: this.vector
              }]
          });
          chart3.render();
     /* }*/

  }
}
class Data{
  constructor(){}
  work(){
    throw new Error("you have to implement this");
  }
}
class DataAdapter extends Data{
  constructor(){
    super();
  }
  work(buffer1, buffer2){
    var vector = [];
    for(var i = 0; i < buffer1.length; i++){
      vector.push({y : buffer1[i], label : buffer2[i]});
    }
    this.graphData = new GraphData(vector);
    this.graphData.work();
  }
}
class BufferData extends Data{
  constructor(buffer1, buffer2){
    super();
    this.buffer1 = buffer1;
    this.buffer2 = buffer2;
    this.bufferDataAdapter = new DataAdapter();
  }
  work(){
    this.bufferDataAdapter.work(this.buffer1, this.buffer2);
  }
}
window.onload = function () {
    var arr1 =[];
    var arr2 =[];
    var finalArr1=[];
    var finalArr2=[];
    function compareMed(a,b)
	{
	    if(a.amount>b.amount)
	        return -1;
	    else if(a.amount<b.amount)
	        return 1;
	    else
		{
		    if(a.name>b.name)
		        return -1;
		    else if(a.name<b.name)
		        return 1;
		    else
		        return 0;
		}
	}
	function compareMedName(a,b)
	{

		if(a.name<b.name)
			return -1;
		else if(a.name>b.name)
			return 1;
		else
			return 0;

	}

	function graphDraw(a,b) {
        bufferData = new BufferData(a, b);
		bufferData.work();

    }

    var fullTableData = null;
    var j =0,k=0;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Signed Up ");
            const userId = user.uid;
            firebase.database().ref('/Seller/'+userId).once('value').then(function (snapshot) {
                userProperty = snapshot.val();
                 var pharmaName = userProperty.sellerPharmacy;
                console.log(pharmaName);
                firebase.database().ref('/Pharmacy/'+ pharmaName + '/Storage/').once('value').then(function (snapshot) {
                 snapshot.forEach(function (mediDeatails) {
            var mediName = mediDeatails.key;
            console.log(mediName);
            var det = mediDeatails.val();
            for (var key in det) {
                if (det.hasOwnProperty(key)) {
                    console.log(key);
                    var data = det[key];
                    var totSold = data.totalSold;
                    var pri = data.price;
                    var quant = data.quantity;
                    soldMedNameArray[j++] = mediName;
                    soldMedAmountArray[k++] = totSold;
                    console.log(pri + " " + quant + " " + totSold);
                    }
            }
                 });

      	var medArr=[];
      	var medArrName=[];
      	var medArrAmount=[];
      	var medArr1=[];

            for(var i=0;i<soldMedNameArray.length;i++)
            {
                medArr.push({
					name: soldMedNameArray[i],
					amount: soldMedAmountArray[i]
				});
            }
            medArr.sort(compareMedName);
            var totalMedTaka=0;
            var count =0;
            for(var i =0;i<medArr.length;i++)
			{
				arr1[i]= medArr[i].name;
				arr2[i]=medArr[i].amount;

			}
			var total=arr2[0];
            if(arr1[0]==arr1[1])
			{
			    count++;
			    total = arr2[0];
			    medArrName[count-1]=arr1[0];
				medArrAmount[count-1]=total;

			}
			console.log("First Med "+count);
			for(var i=1;i<medArr.length;i++) {
                j=i+1;
                if (arr1[i] === arr1[i-1]) {
					total += arr2[i];
				}
                else {

                    total = arr2[i];
                    count++;
                }
				medArrName[count-1]=arr1[i];
				medArrAmount[count-1]=total;
            }
		    console.log(count);
			console.log(medArrName,medArrAmount);
			 for(var i=0;i<medArrName.length;i++)
            {
                medArr1.push({
					name: medArrName[i],
					amount: medArrAmount[i]
				});
            }
            console.log(medArr1);
		    medArr1.sort(compareMed);
		    console.log(medArr1);

			for(var i =0;i<medArr1.length;i++)
			{
				finalArr1[i]= medArr1[i].name;
				finalArr2[i]=medArr1[i].amount;
			}
			console.log(finalArr1);
			console.log(finalArr2);
			graphDraw(finalArr2,finalArr1);
	});


                })
        }
    });

}
