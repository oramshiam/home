async function getTableData(targetUrl, tableSelector, heading) {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const response = await fetch(proxyUrl + targetUrl);
    console.log(proxyUrl+targetUrl);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const tableDiv = doc.querySelector(tableSelector);

    const tbody = tableDiv.querySelector('tbody')
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const firstThreeRows = rows.slice(0, 3);
    console.log(firstThreeRows)

    const container = document.getElementById('indices');

    const futureTable = document.createElement("table");
    futureTable.setAttribute('border', '1');

    firstThreeRows.forEach(rowData => {
        const tr = document.createElement('tr');
        const td_name = document.createElement('td');
        td_name.innerHTML = rowData.querySelector('.table-browser_col-name__qzN_9 a').innerHTML;
        tr.appendChild(td_name);
        const td_last = document.createElement('td');
        td_last.innerHTML = rowData.querySelector('.table-browser_col-last__pZaq6').innerHTML;
        tr.appendChild(td_last);
        const td_change = document.createElement('td');
        td_change.innerHTML = rowData.querySelector('.table-browser_col-chg-pct__68CzJ').innerHTML;
        if (parseFloat(td_change.textContent) >= 0){
            td_change.setAttribute("class", "plus")
        } else {
            td_change.setAttribute("class", "minus")
        }
        tr.appendChild(td_change);
        const td_time = document.createElement('td');
        td_time.innerHTML = rowData.querySelector('.table-browser_col-time__QyfGC').innerHTML;
        tr.appendChild(td_time);

        console.log(td_name)

        futureTable.appendChild(tr);
    });
    anchor = document.createElement("a"); 
    anchor.href = targetUrl; 
    anchor.textContent = heading
    container.appendChild(anchor);
    container.appendChild(futureTable);
  }

async function start() {
    await getTableData('https://www.investing.com/indices/major-indices', 'div[class="table-browser_table-browser-wrapper__fhiVh"]', "US Market");
    await getTableData('https://www.investing.com/indices/indices-futures', 'div[data-test="us-futures-delayed-table"]', "Futures");
}

start()

/*
  table-browser_col-name__qzN_9
  table-browser_col-last__pZaq6
  table-browser_col-chg-pct__68CzJ
  table-browser_col-time__QyfGC


  console.log(rowData)
  Array.from(rowData.querySelectorAll('td')).forEach(colData=>
      console.log(colData))

        rowData.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });


  const rows = table.querySelectorAll('tr');
  const data = [];
  for (const row of rows) {
    const cells = row.querySelectorAll('td');
    const rowData = [];
    for (const cell of cells) {
      rowData.push(cell.textContent.trim());
    }
    data.push(rowData);
  }
  console.log(data);

  */