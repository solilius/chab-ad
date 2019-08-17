
axios({
    url: '/campaigns',
    method: 'get',
    headers: { "auth": "1234" }
}).then(function (data) {
    createGrid(data.data);
});



function onFirstDataRendered(params) {
    //document.addEventListener('contextmenu', event => event.preventDefault());
    params.api.sizeColumnsToFit();
}

function onRowDoubleClicked(e) {
    //console.log("Double Clicked!");
    // console.log("data:", e.data);
    localStorage.setItem("campaign", e.data.campaign_id);
    goToPage('/CampaignPage/campaign_page.html');


}

function onRightClick(e) {
    // console.log('Right Clicked!');
    // console.log("sort by:", e.value);
    // console.log("column:", e.colDef.field);
    // filter
}

function getColumnDefs() {

    return [
        { headerName: "קמפיין", field: "campaign_name" },
        { headerName: "תאור", field: "description" },
        { headerName: "לקוח", field: "client_info.name" },
        { headerName: "תאריך התחלה", field: "starting_date", cellRenderer: function (params) { return params.value.split('T')[0] } },
        { headerName: "תאריך סיום", field: "expiration_date", cellRenderer: function (params) { return params.value.split('T')[0] } },
        { headerName: "ימים", field: "days", filter: "agNumberColumnFilter"},
        { headerName: " צפיות שנשארו", field: "views_left", cellRenderer: function (params) { return (params.value > 0 && params.value < 1000000000) ? params.value : "∞" } },
        { headerName: " קליקים שנשארו", field: "clicks_left", cellRenderer: function (params) { return (params.value > 0 && params.value < 1000000000) ? params.value : "∞" } },
        { headerName: "סטטוס", field: "isActive"  ,cellRenderer: function(params){ return getActivity(params.value)}}
    ];
}

function getGridOptions(rowData) {
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
        onCellContextMenu: onRightClick
    };
}

function createGrid(data) {
    new agGrid.Grid(document.querySelector('#myGrid'), getGridOptions(data));
}

function getActivity(isActive){
    if (isActive){
        return "<div style='color: lightgreen'><b> פעיל </b></div>";
    } else {
        return "<div style='color: red'><b> לא פעיל </b></div>";
    }
}