
axios({
    url: '/campaigns',
    method: 'get',
    headers: {"auth": "1234"}
}).then(function(data){
    createGrid(data.data);
});

 

  function onFirstDataRendered(params) {
    //document.addEventListener('contextmenu', event => event.preventDefault());
    params.api.sizeColumnsToFit();
}

function onRowDoubleClicked(e){
    //console.log("Double Clicked!");
    // console.log("data:", e.data);
    localStorage.setItem("campaign",  e.data.campaign_id);
    goToPage('/CampaignPage/campaign_page.html');


}

function onRightClick(e){
    // console.log('Right Clicked!');
    // console.log("sort by:", e.value);
    // console.log("column:", e.colDef.field);
    // filter
}

function getColumnDefs(){

    return [
        {headerName: "קמפיין", field: "campaign_name"},
        {headerName: "תאור", field: "description"},
        {headerName: "מזהה לקוח", field: "client_info.name"},
        {headerName: "תאריך התחלה", field: "transaction_details.starting_date"},
        {headerName: "תאריך סיום", field: "transaction_details.expiration_date", cellRenderer: function(params){ return params.value.split('T')[0]}},
        {headerName: " צפיות שנשארו", field: "views_left"},
        {headerName: " קליקים שנשארו", field: "clicks_left"},
        {headerName: "?פעיל", field: "isActive"}
      ];
}

function getGridOptions(rowData){
    return {
        columnDefs: getColumnDefs(),
        rowData: rowData,
        enableRtl: true,
        enableColResize: true,
        onFirstDataRendered: onFirstDataRendered,
        enableSorting: true,
        enableFilter: true,
        rowSelection: 'single',
        onRowDoubleClicked: onRowDoubleClicked,
        onCellContextMenu: onRightClick,
        pagination: true,
        paginationAutoPageSize: true,
        paginationNumberFormatter: function(params) {
            return params.value.toLocaleString();
        }
      };
}

function createGrid(data){
    new agGrid.Grid(document.querySelector('#myGrid'), getGridOptions(data));
}