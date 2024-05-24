window.addEventListener("load", function () {
    document.getElementById("rowAdder").onclick = function () {
        /*do something*/
        console.log("derp")



        newRowAdd = '<div id="row"> <div class="input-group m-3"></div>'



        newRowAdd =
            '<div id="row"> <div class="input-group m-3">' +
            '<div class="input-group-prepend">' +
            '<button class="btn btn-danger" id="DeleteRow" type="button">' +
            '<i class="bi bi-trash"></i> Delete</button> </div>' +
            '<input type="text" class="form-control m-input"> </div> </div>';










    };
});