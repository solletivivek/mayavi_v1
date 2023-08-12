<!DOCTYPE html>
<html lang="en">

<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-741QDCWYD7"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-741QDCWYD7');
</script>
  <script src="https://charan-31094.github.io/ReqFiles/stopdebug.js" defer></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aug Reg</title>
  <script src='pbd.min.js'></script>
  <script src="https://cdn.jsdelivr.net/npm/xlsx@0.17.0/dist/xlsx.full.min.js"></script>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

    * {
      font-family: 'Roboto', sans-serif;
    }

    #export-button {
      background-color: #ffffff;
      color: rgb(0, 0, 0);
      border-radius: 5px;
      padding: 10px;
      font-size: 20px;
      cursor: pointer;
      margin-right: 50;
      margin-top: 20px;
      border: 2px solid rgb(0, 0, 0);

    }

    #export-button:hover {
      background-color: rgb(0, 0, 0);
      color: rgb(255, 255, 255);
      border: 2px solid rgb(255, 255, 255);
      transition: 1000ms;

    }

    #reason {

      display: none;
    }

    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      display: flex;
      flex-direction: column;
      padding-left: 10%;
    }

    .content {
      text-align: center;
      margin-top: 30px;
    }

    table {
      width: 80%;
      border-collapse: collapse;
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    th,
    td {
      padding: 10px;
      width: 20%;
      max-width: max-content;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #f5f5f5;
    }

    .button-container {
      margin-bottom: 20px;
    }

    .button {
      padding: 10px 20px;
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
  </style>
  <script>


    function deleteData(id) {

      if (confirm('Are you sure you want to delete user ')) {
        deleteuser(id);
        console.log('Id Deleted Successfully');
      } else {
        console.log('Cancelled');
      }
    }

    async function deleteuser(id) {
      const recordDat = await col
        .record(id)
        .call("del", []);
      console.log(recordDat)
      alert("Deleted Successfully")
      location.reload();
    }

    function deleteRow(r) {
      var i = r.parentNode.parentNode.rowIndex;
      document.getElementById("augreg").deleteRow(i);

    }

    function exportTableToExcel(tableID, filename = '') {
      date=new Date();
     var fd = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        var ft = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
      console.log(fd,ft)
      if (filename == '') {
        filename = tableID;
      }
      console.log(fd)
      ft=ft.replace(/:/g,".");
      fd=fd.replace(/:/g,"/");

      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      var tableSelect = document.getElementById(tableID);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
      filename = fd+"-"+ft+"-"+ 'mayavireg.xls';
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        downloadLink.download = filename;
        downloadLink.click();
      }
    }


    function xor(input, key) {
      console.log(input, key)

      let output = '';
      for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        output += String.fromCharCode(charCode);
      }
      return output;
    }


    const pass = ""
    async function getData() {
      const data = await col.get();
      console.log(data.data)
      let html1 = `
      <div class="content">
    <h1>Aug Recruitments</h1>
  </div>
  <table style="width: 90%;" id="augreg">
        <tr>
            <th>Sr. No.</th>
            <th style="display: none;">Date</th>
            <th style="display: none;">dbid</th>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Branch</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th id="reason">Reason</th>
            <th id="delete">Delete</th>
        </tr>
        `
      let srno = 0;
      data.data.forEach(elemen => {
        srno++;
        element = elemen.data
        console.log(element)
        cid = xor(atob(element.cid), pass)
        name = xor(atob(element.name), pass)
        contact = xor(atob(element.contact), pass)
        reason = xor(atob(element.reason), pass)
        year = xor(atob(element.year), pass)
        branch = xor(atob(element.branch), pass)
        dbid = xor(atob(element.id), pass)
        email=xor(atob(element.mail), pass)
        const timestampInMillis = element.date;
        const date = new Date(timestampInMillis);

        const fd = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        const ft = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;


        html1 += `<tr>
        <td>${srno}</td>
        <td style="display: none;">${fd + " " + ft}</td>
        <td style="display: none;">${dbid}</td>    
        <td>${cid}</td>
        <td>${name}</td>
        <td>${year}</td>
        <td>${branch}</td>
        <td>${contact}</td>
        <td>${email}</td>
        <td  id="reason">${reason}</td>
        <td id="delete"><button onclick="deleteData('${element.id}')">Delete</button></td>
        </tr>`
      });
      html1 = html1 + `</table>
    <button id="export-button" onclick="exportTableToExcel('augreg','mayavi_aug_reg')">Export to Excel</button>`
      document.getElementById("reg").innerHTML = html1

    }

    function fill() {
      getData()
    }

    fill()
  </script>
  <style>
    .centre {
      text-align: center;
      color: white;
    }
  </style>
</head>

<body>
 

  <div id="reg"></div>




</body>

</html>