window.addEventListener("load", function () {
    document.getElementById("rowAdder").onclick = function () {
        /*do something*/
        console.log("clicking the add row button")


        let topDiv = document.createElement("div")
        topDiv.classList = "col-md-12 d-flex flex-row"
        let inputGroup = document.createElement("div")
        inputGroup.classList = "input-group mb-3"

        let itemNameInput = document.createElement("input")
        itemNameInput.type = "text"
        itemNameInput.classList = "form-control"
        itemNameInput.placeholder = "Item Name"
        itemNameInput.setAttribute('aria-label', 'Username')
        itemNameInput.require = true
        itemNameInput.setAttribute('name', 'customer[itemName]')

        let itemValueInput = document.createElement("input")
        itemValueInput.type = "text"
        itemValueInput.classList = "form-control"
        itemValueInput.placeholder = "Item Name"
        itemValueInput.setAttribute('aria-label', 'Item Value')
        itemValueInput.require = true
        itemValueInput.setAttribute('name', 'customer[itemValue]')

        let btn = document.createElement("button")
        btn.classList = "btn btn-danger btn-lg deleteRow"

        let trashcan = document.createElement("i")
        trashcan.classList = "bi bi-trash3"
        btn.appendChild(trashcan)
        btn.addEventListener('click', event => {
            event.preventDefault()
            console.log(event.target.getAttribute("data-el"));
            console.log('derp')
            event.currentTarget.parentNode.parentNode.remove();
        })

        inputGroup.appendChild(itemNameInput)
        inputGroup.appendChild(itemValueInput)
        inputGroup.appendChild(btn)
        topDiv.appendChild(inputGroup)


        this.parentNode.insertAdjacentElement("beforebegin", topDiv)

    };


});


const buttons = document.querySelectorAll('.deleteRow');

buttons.forEach(el => el.addEventListener('click', event => {
    event.preventDefault()
    console.log(event.target.getAttribute("data-el"));
    console.log('derp')
    event.currentTarget.parentNode.parentNode.remove();

}));



var myremoveFunction = function (event) {
    event.preventDefault()
    console.log(event.target.getAttribute("data-el"));
    console.log('derp')
    event.currentTarget.parentNode.remove();
}



