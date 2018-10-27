
// specify the columns
var columnDefs = [

    {headerName: "קמפיין", field: "campaign_name"},
    {headerName: "באנר", field: "url", cellRenderer: function(params){ return '<img style="height: 20px;" src="' + params.value + '">'}},
    {headerName: "גודל", field: "size"},
    {headerName: "אתרים", field: "sites"},
    {headerName: "פלטפורמה", field: "platform"},
    {headerName: "תאריכים", field: "dates" ,filter: "agDateColumnFilter"},
    {headerName: "ימים", field: "days", filter: "agNumberColumnFilter"},
    {headerName: "קליקים", field: "clicks", filter: "agNumberColumnFilter"},
    {headerName: "צפיות", field: "views", filter: "agNumberColumnFilter"}
  ];
  
  // specify the data
  var rowData = [
    {views: 100, clicks: 24, days: 675, dates: "10-10-2018", platform: "נייח, נייד", sites: 'bla.com, blu.net', size: "400X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "סינון אתרים"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 123, clicks: 1, days: 656, dates: "10-10-2017", platform: "נייד", sites: 'blu.net', size: "500X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "1חבד"},
    {views: 456, clicks: 4, days: 65, dates: "10-10-2016", platform: "נייח ", sites: 'bla.com', size: "800X500", url: "http://files.softicons.com/download/game-icons/super-mario-icons-by-sandro-pereira/ico/Mushroom%20-%201UP.ico", campaign_name: "2חבד"}
  ];
  
  // let the grid know which columns and what data to use
  var gridOptions = {
    columnDefs: columnDefs,
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
 
  function onFirstDataRendered(params) {
    //document.addEventListener('contextmenu', event => event.preventDefault());
    params.api.sizeColumnsToFit();
}

function onRowDoubleClicked(e){
    console.log("Double Clicked!");
    console.log("data:", e.data);
    localStorage.setItem("campaign",  e.data.campaign_name);
    goToPage('/CampaignPage/campaign_page.html');


}

function onRightClick(e){
    console.log('Right Clicked!');
    console.log("sort by:", e.value);
    console.log("column:", e.colDef.field);
    // filter
}

// create the grid passing in the div to use together with the columns & data we want to use
new agGrid.Grid(document.querySelector('#myGrid'), gridOptions);