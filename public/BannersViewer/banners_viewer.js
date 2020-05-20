var gridOptions = {
    columnDefs: getColumnDefs(),
    rowHeight: 100,
    rowStyle: {'padding': '10px'},
    enableRtl: true,
    enableColResize: true,
    onFirstDataRendered: onFirstDataRendered,
    enableSorting: true,
    enableFilter: true,
    rowSelection: 'single',
    onSelectionChanged: onRowClicked
  };

axios({
    url: '/banners',
    method: 'get',
    headers: {"Authorization": localStorage.getItem('token')}
}).then(function(data){
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

function onRowClicked(){
    localStorage.setItem("campaign",  gridOptions.api.getSelectedRows()[0].campaign_id);
    goToPage('/CampaignPage/campaign_page.html');
}

function getColumnDefs(){

    return [
        {headerName: "קמפיין", field: "campaign_name", cellClass: 'cell-wrap-text'},
        {headerName: "באנר", field: "url", cellRenderer: function(params){ return '<img style="height:80px;" src="' + params.value + '">'}},
        {headerName: "גודל", field: "size"},
        {headerName: "מיקומים", field: "positions",  cellRenderer: function(params){ return printPositions(params.value)}},
        {headerName: "תאריך התחלה", field: "starting_date",filter: "agDateColumnFilter", cellRenderer: function(params){ return new Date(params.value).toLocaleString()}},
        {headerName: "תאריך סיום", field: "expiration_date" ,filter: "agDateColumnFilter", cellRenderer: function(params){ return new Date(params.value).toLocaleString()}},
        {headerName: "ימים שנשארו", field: "expiration_date", filter: "agNumberColumnFilter", cellRenderer: function(params){ return getDays(params.value)}},
        {headerName: "קליקים", field: "clicks", filter: "agNumberColumnFilter"},
        {headerName: "צפיות", field: "views", filter: "agNumberColumnFilter"},
        {headerName: "סטטוס", field: "isActive", cellRenderer: function(params){ return getActivity(params.value)} }
      ];
}

function createGrid(data){
    gridOptions.rowData = data
    new agGrid.Grid(document.querySelector('#myGrid'), gridOptions);
}

function getDays(expiration){
    var today = new Date();
    var exp = new Date(expiration);
    var left = Math.floor((exp.getTime() - today.getTime()) / 86400000);
    return (left <= 0 || isNaN(left)) ? 0 : left;
}

function printPositions(positions){
    var final = "";
    positions.forEach(pos => {
        final += foramtPosition(pos) + "\n";
    });
    return final.substring(0, final.length - 1); 
}

function foramtPosition(pos){
    var data = pos.split('-');
    var formated = "<div style='text-align:left'><b>" + data[0] + "</b>-" + data[1];
    if (data[2] == undefined){
        formated +="-<b>desktop</b>";
    }else {
        formated +="-<b>mobile</b>";
    }
        formated +="</br></div>";
    return formated;
}

function getActivity(isActive){
    if (isActive){
        return "<div style='color: lightgreen'><b> פעיל </b></div>";
    } else {
        return "<div style='color: red'><b> לא פעיל </b></div>";
    }
}