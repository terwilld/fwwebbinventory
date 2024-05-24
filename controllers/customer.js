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


function capitalizeFirstLetter(string) {
    string = string.toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
}