// specify the columns
var columnDefs = [

    {headerName: "קמפיין", field: "campaign", editable:true},
    {headerName: "באנר", field: "banner", editable:true},
    {headerName: "גודל", field: "size", editable:true},
    {headerName: "אתרים", field: "sites", editable:true},
    {headerName: "פלטפורמה", field: "platform", editable:true},
    {headerName: "תאריכים", field: "dates", editable:true, filter: "agDateColumnFilter"},
    {headerName: "ימים", field: "days", editable:true, filter: "agNumberColumnFilter"},
    {headerName: "קליקים", field: "clicks", editable:true, filter: "agNumberColumnFilter"},
    {headerName: "צפיות", field: "views", editable:true, filter: "agNumberColumnFilter"}
  ];
  
  // specify the data
  var rowData = [
    {views: 100, clicks: 24, days: 675, dates: "10-10-2018", platform: "נייח, נייד", sites: 'bla.com, blu.net', size: "400X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "1חבד"},
    {views: 4536, clicks: 824, days: 65, dates: "10-10-2016", platform: "נייח ", sites: 'bla.com', size: "800X500", banner: "pictureeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", campaign: "2חבד"}
  ];
  
  // let the grid know which columns and what data to use
  var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    editable: true,
    enableRtl: true,
    enableColResize: true,
    enableSorting: true,
    enableFilter: true,
    rowSelection: 'single',
    onSelectionChanged: onSelectionClicled,
    onCellValueChanged: onCellValueChanged,
    pagination: true,
    paginationAutoPageSize: true,
    paginationNumberFormatter: function(params) {
        return params.value.toLocaleString();
    },
    cellEditorSelector:function (params){
        console.log("123", params);
        if (params.data.type === 'views' || params.data.type === 'clicks' || params.data.type === 'days' ) return {
            component: 'numericCellEditor'
        };

        if (params.data.type === 'platform') return {
            component: 'agRichSelectCellEditor',
            params: {values: ['נייד', 'נייח']}
        };

        if (params.data.type === 'mood') return {
            component: 'moodEditor'
        };

        return null;
    }

  };

  function onSelectionClicled() {
    //console.log(gridOptions.api.getSelectedRows()[0].campaign);

}

function onCellValueChanged(e){
    console.log('col changed:', e.colDef.field);
    console.log('new value:', e.newValue);
    console.log('row:', e.data);
}
// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(document.querySelector('#myGrid'), gridOptions);


