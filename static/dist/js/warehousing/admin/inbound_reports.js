$(function() 
{
    loadTable();

     // function to save/update record
     $("#form_id").on("submit", function (e)
     {
         e.preventDefault();
         trimInputFields();
         var inbound_report_id = $("#uuid").val();
         var request_id = $("#request_id").val()
         var employee_id = $("#employee_id").val();
         var status = $("#status").val();
         var total_quantity = $("#total_quantity").val();

         if (inbound_report_id == "")
         {
             $.ajax(
             {
                 url: apiURL + "inbound_reports/",
                 type: "POST",
                 data: JSON.stringify(
                 {		
                     "request_id": request_id,
                     "employee_id": employee_id,
                     "status": status,
                     "total_quantity": total_quantity,
                 }),
                 dataType: "JSON",
                 contentType: 'application/json',
                 processData: false,
                 cache: false,
                 success: function (data) 
                 {
                     console.log(data)
                     $('#form_id').trigger("reset")
                     $('#button_add').prop('disabled', true)
                     notification("success", "Success!", data.message);
                     loadTable();
                     $("#adding_modal").modal('hide')
                 },
                 error: function ({ responseJSON }) 
                 {
                     
                 },
             });
             $('#button_add').prop('disabled', false)
         }
     });
});

//    $.ajaxSetup(
//     {
// 		headers: 
//         {
// 			Accept: "application/json",
// 			Authorization: "Bearer " + token,
// 			ContentType: "application/x-www-form-urlencoded",
// 		},
// 	});
loadTable = () => 
{
    $("#data-table").dataTable().fnClearTable();
    $("#data-table").dataTable().fnDraw();
    $("#data-table").dataTable().fnDestroy();
    $("#data-table").dataTable({
        serverSide: true,
        scrollX: true,
        responsive: false,
        buttons:[
            {extend: 'excel', text: 'Save to Excel File'}
        ],
        order: [[0, "desc"]],
        aLengthMenu: [5, 10, 20, 30, 50, 100],
        aaColumns: [
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-center"},
        ],
        columns: [
            {
                data: "inbound_report_id",
                name: "inbound_report_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "request_id",
                name: "request_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_id",
                name: "employee_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "status",
                name: "status",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "total_quantity",
                name: "total_quantity",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "created_at",
                name: "created_at",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: null,
                // width: "30%",
                class: "text-center", 
                render: function (aData, type, row) 
                {
                    let buttons = "";
                    // info
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["inbound_report_id"] +
                        '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["inbound_report_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["inbound_report_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/inbound_reports/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["inbound_report_id"] +
                '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["inbound_report_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["inbound_report_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            var inbound_report_id = ""

            if(aData["inbound_report_id"] == null)
            {
                inbound_report_id = "null"
            }
            else
            {
                inbound_report_id = aData["inbound_report_id"]
            }

            $("td:eq(0)", nRow).html(inbound_report_id);
            $("td:eq(1)", nRow).html(aData["request_id"]);
            $("td:eq(2)", nRow).html(aData["employee_id"]);
            $("td:eq(3)", nRow).html(aData["status"]);
            $("td:eq(4)", nRow).html(aData["total_quantity"]);
            $("td:eq(5)", nRow).html(aData["created_at"]);
            $("td:eq(6)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

loadRequest = () => {
    $.ajax({
        url: apiURL + "request",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Request, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.request_id +
                    "'>" +
                    dataOptions.request_id +
                    "</option>";

                $("#request_id").append(options);
                $("#e_request_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadRequest();

loadEmployee = () => {
    $.ajax({
        url: apiURL + "employees",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Employees, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.employee_id +
                    "'>" +
                    dataOptions.employee_first_name +
                    "</option>";

                $("#employee_id").append(options);
                $("#e_employee_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadEmployee();