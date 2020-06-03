var year, month, gridOptions;

$(document).ready(function () {
  year = new Date().getFullYear().toString();
  month = (new Date().getMonth() + 1).toString();
  month = month.length == 1 ? "0" + month : month;
  $("#year").val(year);
  $("#month").val(month);
  setGridOptions([]);
  createGrid([]);
  displayCampaigns();
});

var year = $().children("option:selected").val();
var month = $("#month").children("option:selected").val();

$("#year").change(function () {
  year = $(this).children("option:selected").val();
  displayCampaigns();
});

$("#month").change(function () {
  month = $(this).children("option:selected").val();
  displayCampaigns();
});

function displayCampaigns() {
  axios({
    url: `/campaigns/end?year=${year}&month=${month}`,
    method: "get",
    headers: { Authorization: localStorage.getItem("token") },
  }).then(function (data) {
      gridOptions.api.setRowData(data.data);
  });
}

function onFirstDataRendered(params) {
  params.api.sizeColumnsToFit();
  var filterComponent = params.api.getFilterInstance("isActive");
  filterComponent.setModel({
    type: "contains",
    filter: "true",
  });
  filterComponent.onFilterChanged();
}

function onRowDoubleClicked(e) {
  localStorage.setItem("campaign", e.data.campaign_id);
  goToPage("/CampaignPage/campaign_page.html");
}

function getColumnDefs() {
  return [
    { headerName: "קמפיין", field: "campaign_name" },
    { headerName: "תאור", field: "description" },
    { headerName: "לקוח", field: "client_info.name" },
    {
      headerName: "תאריך התחלה",
      field: "starting_date",
      cellRenderer: function (params) {
        return new Date(params.value).toLocaleString();
      },
    },
    {
      headerName: "תאריך סיום",
      field: "expiration_date",
      cellRenderer: function (params) {
        return new Date(params.value).toLocaleString();
      },
    },
    { headerName: "ימים", field: "days", filter: "agNumberColumnFilter" },
    {
      headerName: " צפיות שנשארו",
      field: "views_left",
      cellRenderer: function (params) {
        return params.value > 0 && params.value < 1000000000
          ? params.value
          : "∞";
      },
    },
    {
      headerName: " קליקים שנשארו",
      field: "clicks_left",
      cellRenderer: function (params) {
        return params.value > 0 && params.value < 1000000000
          ? params.value
          : "∞";
      },
    },
    {
      headerName: "סטטוס",
      field: "isActive",
      cellRenderer: function (params) {
        return getActivity(params.value);
      },
    },
  ];
}

function setGridOptions(rowData) {
  gridOptions = {
    columnDefs: getColumnDefs(),
    rowData: rowData,
    enableRtl: true,
    rowHeight: 50,
    rowStyle: { padding: "10px" },
    enableColResize: true,
    onFirstDataRendered: onFirstDataRendered,
    enableSorting: true,
    enableFilter: true,
    rowSelection: "single",
    onRowDoubleClicked: onRowDoubleClicked,
  };
}

function createGrid() {
  new agGrid.Grid(document.querySelector("#myGrid"), gridOptions);
}

function getActivity(isActive) {
  if (isActive) {
    return "<div style='color: lightgreen'><b> פעיל </b></div>";
  } else {
    return "<div style='color: red'><b> לא פעיל </b></div>";
  }
}
