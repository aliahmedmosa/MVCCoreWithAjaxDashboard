$(document).ready(function () {
    showItems();
});



function showItems() {
    $.ajax({
        url: './Government/GovernmentList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, statu, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.gov_Name + '</td>';
                object += '<td><a href="javascript:;" class="btn btn-danger btn-sm" class="js-delete" onclick="deleteItem(' + item.id + ')">Delete</a> || <a href="javascript:;" class="btn btn-primary btn-sm" onclick="getGovernmentToEditItem(' + item.id + ')">Edit</a></td>';
                //            <a href="javascript:;" class="btn btn-danger js-delete" data-id="@item.Id">Delete</a>
                object += '</tr>';

            });
            $('#table_data').html(object);
        }, error: function () {
            alert("Data Cannot get");
        }
    });
}





function deleteItem(id) {
    bootbox.confirm({
        message: 'are you sure you want to delete this item ?',
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> Cancel',
                className: 'btn-info'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Delete',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: './Government/Delete?id=' + id,
                    success: function () {
                        showItems();
                        toastr.error("Government deleted !");
                    },
                    error: function () {
                       
                    }
                });
            }
        }
    });
}

$('#btnAddGovernment').click(function () {
    ClearTextBox();
    $('#GovernmentModal').modal('show');
    $('#SaveGovernment').css('display', 'block');
    $('#EditGovernment').css('display', 'none');
});

//function AddGovernment() {
//    var objData = {
//        Gov_Name : $('#Gov_Name').val()
//    }
//    $.ajax({
//        url: '/Government/Add',
//        type: 'Post',
//        data: objData,
//        contentType: 'application/xxx-www-urlencoded;charset=utf-8;',
//        dataType: 'json',
//        success: function () {
//            console.log(objData);
//        }, error: function () {

//        }
//    });
//}

function AddGovernment() {
    var FormData = $('#FormData').serialize();
    $.ajax({
        url: '/Government/Add',
        type: 'Post',
        data: FormData,
        success: function () {
            showItems();
            HideModal();
            toastr.success("Government Added !");
        }, error: function () {

        }
    });
}

function HideModal() {
    $('#GovernmentModal').modal('hide');
}

function getGovernmentToEditItem(id) {
    $.ajax({
        url: './Government/Edit?id=' + id,
        type: 'Get',
        dataType: 'json',
        success: function (response) {
            $('#GovernmentModal').modal('show');
            $('#Id').val(response.id);
            $('#Gov_Name').val(response.gov_Name);
            $('#SaveGovernment').css('display', 'none');
            $('#EditGovernment').css('display', 'block');
        }, error: function () {
            
        }
    });
}

function EditGovernment(){
    var FormData = $('#FormData').serialize();
    $.ajax({
        url: '/Government/Edit',
        type: 'Post',
        data: FormData,
        success: function () {
            showItems();
            HideModal();
            ClearTextBox();
            toastr.success("Government Edited !");
        }, error: function () {
        }
    });
}

function ClearTextBox() {
    $('#Id').val('');
    $('#Gov_Name').val('');
}