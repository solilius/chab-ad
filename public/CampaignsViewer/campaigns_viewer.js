axios({
    url: '/campaigns',
    method: 'get',
    headers: { "Authorization": localStorage.getItem('token') }
}).then(function (data) {
    createGrid(data.data);
});

  function onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
    var filterComponent = params.api.getFilterInstance("isActive");
    filterComponent.setModel({
      type: "contains",
      filter: 'true'
    });
    filterComponent.onFilterChanged();
  }  

function onRowDoubleClicked(e) {
    localStorage.setItem("campaign", e.data.campaign_id);
    goToPage('/CampaignPage/campaign_page.html');
}

function getColumnDefs() {

    return [
        { headerName: "קמפיין", field: "campaign_name" },
        { headerName: "תאור", field: "description" },
        { headerName: "לקוח", field: "client_info.name" },
        { headerName: "תאריך התחלה", field: "starting_date", cellRenderer: function (params) { return new Date(params.value).toLocaleString()} },
        { headerName: "תאריך סיום", field: "expiration_date", cellRenderer: function (params) { return new Date(params.value).toLocaleString()} },
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
        rowHeight: 50,
        rowStyle: {'padding': '10px'},
        enableColResize: true,
        onFirstDataRendered: onFirstDataRendered,
        enableSorting: true,
        enableFilter: true,
        rowSelection: 'single',
        onRowDoubleClicked: onRowDoubleClicked
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