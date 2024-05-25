const Inventory = require('../models/inventory.js')


module.exports.index = async (req, res) => {
    console.log('hitting the customer index controller')
    res.render('customers/index.ejs')
}

module.exports.renderNewForm = (req, res) => {
    console.log('hitting the customer new controller')
    res.render('customers/new.ejs')
}




module.exports.createInventory = async (req, res, next) => {
    console.log('hitting the customer Create Controller')
    console.log(req.body)

    const newInventory = new Inventory(req.body.customer);
    let inventory = []

    for (let i = 0; i < req.body.customer.itemName.length; i++) {
        console.log(i)
        console.log(req.body.customer.itemName[i])
        console.log(req.body.customer.itemValue[i])
        let inventoryName = capitalizeFirstLetter(req.body.customer.itemName[i])
        let inventoryValue = capitalizeFirstLetter(req.body.customer.itemValue[i])
        inventory.push({ inventoryName: inventoryName, inventoryValue: inventoryValue })
    }
    console.log(inventory)
    newInventory.inventory = inventory
    newInventory.firstName = capitalizeFirstLetter(newInventory.firstName)
    newInventory.lastName = capitalizeFirstLetter(newInventory.lastName)
    newInventory.city = capitalizeFirstLetter(newInventory.city)
    console.log('this is my new inventory')
    await newInventory.save();
    res.redirect(`/customer/${newInventory._id}`)
    // res.send("Derp")
    // res.render('customers/new.ejs')
}



module.exports.deleteInventory = async (req, res, next) => {
    const result = await Inventory.findByIdAndDelete(req.params.id)
    req.flash('success', 'You have deleted this Inventory!')
    res.redirect('/customer/new')
}



module.exports.showInventory = async (req, res, next) => {
    console.log('I am in the show controller')
    const inventory = await Inventory.findById(req.params.id)
    // .populate({
    //     path: 'reviews',
    //     populate: { path: 'author' }
    // })
    // .populate('author')
    if (!inventory) {
        req.flash('error', 'Cannot Find that Inventory Item!')
        return res.redirect('/customer')
    }
    // console.log(process.env.MAPBOX_TOKEN)
    console.log("View this id")
    console.log(inventory)
    res.render('customers/show.ejs', { inventory })
}


module.exports.renderEditForm = async (req, res, next) => {
    console.log('I am in the render edit controller')
    const inventory = await Inventory.findById(req.params.id)
    console.log(inventory)
    res.render('customers/edit.ejs', { inventory })
}

module.exports.updateInventory = async (req, res, next) => {
    const { id } = req.params
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, { ...req.body.campground })
    let newInventory = []
    for (let i = 0; i < req.body.customer.itemName.length; i++) {
        let inventoryName = capitalizeFirstLetter(req.body.customer.itemName[i])
        let inventoryValue = capitalizeFirstLetter(req.body.customer.itemValue[i])
        newInventory.push({ inventoryName: inventoryName, inventoryValue: inventoryValue })
    }
    inventory.inventory = newInventory
    inventory.firstName = capitalizeFirstLetter(inventory.firstName)
    inventory.lastName = capitalizeFirstLetter(inventory.lastName)
    inventory.city = capitalizeFirstLetter(inventory.city)

    await inventory.save()
    req.flash('success', 'Successfully modified the Inventory!')
    console.log(inventory._id)
    return res.redirect(`/customer/${inventory._id}`)
}




function capitalizeFirstLetter(string) {
    string = string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
}
