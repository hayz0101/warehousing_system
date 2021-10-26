$(function() 
{
    loadTable();
    
    addData = () =>
    {
        $("#return_statusLabel").hide();
        $("#return_status").hide();
        // function to save/update record
        $("#form_id").on("submit", function (e)
        {
            e.preventDefault();
            trimInputFields();
            var return_id = $("#uuid").val();
            var returner = $("#returner").val()
            var return_date = "2021-08-28T04:29:33.292Z"
            var return_type = $("#return_type").val();
            var return_status = $("#return_status").val();

            if (return_id == "")
            {
                $.ajax(
                {
                    url: apiURL + "returns/",
                    type: "POST",
                    data: JSON.stringify(
                    {		
                        "returner": returner,
                        "return_date": return_date,
                        "return_type": return_type,
                        "return_status": return_status
                        
                    }),
                    dataType: "JSON",
                    contentType: 'application/json',
                    processData: false,
                    cache: false,
                    success: function (data) 
                    {
                        $('#form_id').trigger("reset")
                        $('#button_add').prop('disabled', false)
                        notification("success", "Success!", data.message);
                        loadTable();
                        $("#adding_modal").modal('hide')
                    },
                    error: function ({ responseJSON }) 
                    {
                        
                    },
                });
            }
        });
    }
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
        // scrollX: true,
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
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "return_id",
                name: "return_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "return_date",
                name: "return_date",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
             {
                data: "returner",
                name: "returner",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "return_type",
                name: "return_type",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "return_status",
                name: "return_status",
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
                    buttons +=
                    '<div class="text-center dropdown">' +
                        '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                            '<i class="fas fa-ellipsis-v"></i>'  +
                        '</div>' +
                        '<div class="dropdown-menu dropdown-menu-right">'  +
                        //Info
                            '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                            aData["return_id"] + 
                            '\', 0)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-eye mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'View Return' +
                                '</div>'  +
                            '</div>'  +
                        // Edit
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["return_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Return' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["return_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Return' +
                                '</div>'  +
                            '</div>'  +
                        '</div>'  +
                    '</div>';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/returns/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            buttons +=
            '<div class="text-center dropdown">' +
                '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                    '<i class="fas fa-ellipsis-v"></i>'  +
                '</div>' +
                '<div class="dropdown-menu dropdown-menu-right">'  +
                //Info
                    '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                    aData["return_id"] + 
                    '\', 0)">'  +
                        '<div style="width: 2rem">' +
                            '<i class="fas fa-eye mr-1"></i>'  +
                        '</div>' +
                        '<div>' +
                            'View Return' +
                        '</div>'  +
                    '</div>'  +
                // Edit
                    '<div class="dropdown-divider"></div>' +
                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                    aData["return_id"] +
                    '\',1)">'  +
                        '<div style="width: 2rem">' +
                            '<i class="fas fa-edit mr-1"></i>'  +
                        '</div>' +
                        '<div>' +
                            'Edit Return' +
                        '</div>'  +
                    '</div>' +
                // Delete
                    '<div class="dropdown-divider"></div>' +
                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                    aData["return_id"] + 
                    '\')">'  +
                        '<div style="width: 2rem">' +
                            '<i class="fas fa-trash-alt mr-1"></i>'  +
                        '</div>' +
                        '<div>' +
                            'Delete Return' +
                        '</div>'  +
                    '</div>'  +
                '</div>'  +
            '</div>';

            var return_id = ""

            var stats =  aData["return_status"]

            if (stats == "Delivered")
            {
                stats = '<div class="badge badge-success p-2 w-100"> <i class="fas fa-check mr-1"></i><span>' + aData["return_status"] + '</span></div>'
            }
            else if (stats == "Pending")
            {
                stats = '<div class="badge badge-warning p-2 w-100"> <i class="fas fa-exclamation mr-1"></i> <span>' + aData["return_status"] + '</span></div>'
            }

            if(aData["return_id"] == null)
            {
                return_id = "null"
            }
            else
            {
                return_id = aData["return_id"]
            }

            $("td:eq(0)", nRow).html(return_id);

            var date_return = aData["return_date"]
            var moment_date_return = moment(aData["return_date"]).format("MMMM D, YYYY <br> hh:mm:ss");
            var moment_date_return_from_now = moment(aData["return_date"]).fromNow();
            

            if (date_return == "" || date_return == null)
            {
                date_return = "No date hehe"
            }
            else
            {
                date_return = moment_date_return
            }


            $("td:eq(1)", nRow).html(date_return);
            $("td:eq(2)", nRow).html(aData["returner"]);
            $("td:eq(3)", nRow).html(aData["return_type"]);
            $("td:eq(4)", nRow).html(stats);
            $("td:eq(5)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};