
axios({
    url: '/banners',
    method: 'get',
    headers: {"auth": "1234"}
}).then(function(data){
    createGrid(data.data);
});

  function onFirstDataRendered(params) {
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
        {headerName: "קמפיין", field: "campaign_name", cellClass: 'cell-wrap-text'},
        {headerName: "באנר", field: "url", cellRenderer: function(params){ return '<img style="height:80px;" src="' + params.value + '">'}},
        {headerName: "גודל", field: "size"},
        {headerName: "מיקומים", field: "positions",  cellRenderer: function(params){ return printPositions(params.value)}},
        {headerName: "תאריך התחלה", field: "starting_date" ,filter: "agDateColumnFilter", cellRenderer: function(params){ return params.value.split('T')[0]}},
        {headerName: "תאריך סיום", field: "expiration_date" ,filter: "agDateColumnFilter", cellRenderer: function(params){ return params.value.split('T')[0]}},
        {headerName: "ימים שנשארו", field: "expiration_date", filter: "agNumberColumnFilter", cellRenderer: function(params){ return getDays(params.value)}},
        {headerName: "קליקים", field: "clicks", filter: "agNumberColumnFilter"},
        {headerName: "צפיות", field: "views", filter: "agNumberColumnFilter"},
        { headerName: "סטטוס", field: "isActive", cellRenderer: function(params){ return getActivity(params.value)} }
      ];
}

function getGridOptions(rowData){
    return {
        columnDefs: getColumnDefs(),
        rowData: rowData,
        rowHeight: 100,
        rowStyle: {'padding': '10px'},
        enableRtl: true,
        enableColResize: true,
        onFirstDataRendered: onFirstDataRendered,
        enableSorting: true,
        enableFilter: true,
        rowSelection: 'single',
        onRowDoubleClicked: onRowDoubleClicked,
        onCellContextMenu: onRightClick,
      };
}

function createGrid(data){
    new agGrid.Grid(document.querySelector('#myGrid'), getGridOptions(data));
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