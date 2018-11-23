
axios({
    url: '/banners',
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
        {headerName: "באנר", field: "url", cellRenderer: function(params){ return '<img style="height: 20px;" src="' + params.value + '">'}},
        {headerName: "גודל", field: "size"},
        {headerName: "אתרים", field: "sites"},
        {headerName: "פלטפורמה", field: "platform"},
        {headerName: "תאריך התחלה", field: "starting_date" ,filter: "agDateColumnFilter", cellRenderer: function(params){ return params.value.split('T')[0]}},
        {headerName: "תאריך סיום", field: "expiration_date" ,filter: "agDateColumnFilter", cellRenderer: function(params){ return params.value.split('T')[0]}},
        {headerName: "ימים", field: "days", filter: "agNumberColumnFilter", },
        {headerName: "קליקים", field: "clicks", filter: "agNumberColumnFilter"},
        {headerName: "צפיות", field: "views", filter: "agNumberColumnFilter"}
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