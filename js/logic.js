function generateTable(){


var input = document.getElementById("csv-in");
var table = document.getElementById("csv-table");

input.addEventListener("change",(event) => {
      var fileIn = event.target.files[0];

    Papa.parse(fileIn, {
      header: true,
      complete: (results) => {

        table.innerHTML = '';


        const headers = results.meta.fields;
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        headers.forEach((header) => {
          const th = document.createElement('th');
          th.textContent = header;
          tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);


        const tbody = document.createElement('tbody');
        results.data.forEach((row) => {
          const tr = document.createElement('tr');
          headers.forEach((header) => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
      }
    });
});



}

generateTable();





function editTableCSV(){
  var table = document.getElementById("csv-table");

  var observer = new MutationObserver(function(mutations){
    mutations.forEach(function(mutation){
      if(mutation.type === "childList"){

      //console.log("rows",table.rows.length);

    }

    });
  });

  observer.observe(table,{
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
  });

}

function downloadCSV(){
  var table = document.getElementById("csv-table");
  $(table).table2csv();
}






function addRow(){
  var table = document.getElementById("csv-table").getElementsByTagName("tbody")[0];
  const cellCount = table.rows[0].cells.length;

  var newRow = document.createElement("tr");
  for(var x=0;x<cellCount;x++){
    var newCell = document.createElement("td");
    newCell.innerHTML = "Input";
    newRow.appendChild(newCell);
  }

  table.appendChild(newRow);

}


/*
function searchCellContent(){
  var input, filter, table, tr, td, i, txtValue, trSave;

  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("csv-table");

  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        trSave = tr[i];

      } else {
        tr[i].style.display = "none";
      }

    }
  }
  document.getElementById("deleteRow").onclick = function() {

      var table_tr = document.getElementById("csv-table").getElementsByTagName("tbody")[0];
      table_tr.removeChild(trSave);



  };

}*/


function givenContent(){
  var input,tr,td,text,savedData,trSave;

  var data = []

  input = document.getElementById("myInput");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("csv-table")

  tr = table.getElementsByTagName("tr")


  for(i=0;i<tr.length;i++){

      td = tr[i].getElementsByTagName("td")
      for(x=0;x<td.length;x++){

        text = tr[i].getElementsByTagName("td")[x];


        if(text){
        savedData = text.innerHTML.toUpperCase();

        if (savedData.indexOf(filter) > -1) {
          tr[i].style.display = "";
          trSave = tr[i];
          break;

        } else {
          tr[i].style.display = "none";
        }

        }
      }
    }
    document.getElementById("deleteRow").onclick = function() {

      var table_tr = document.getElementById("csv-table").getElementsByTagName("tbody")[0];
      table_tr.removeChild(trSave);



  };



}



editTableCSV();


