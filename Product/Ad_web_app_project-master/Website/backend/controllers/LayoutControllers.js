
const Layout = require("../models/LayoutModel");
const asyncHandler = require("express-async-handler");

//@desc     Get single layout by layout's id
//@route    /layout/single/:layoutId
//@access   Public

exports.getSingleLayout = asyncHandler(async (req, res, next) => {

    let singleLayout = await Layout.findById(req.params.layoutId);

    if (!singleLayout) {
        res.status(404)
        throw new Error("Cannot find this layout. This does not exist");
    }

    res.status(200).json(singleLayout);

});

//@desc    Get all layouts
//@route   /layout/all
//@access  Public

exports.getAllLayouts = asyncHandler(async (req, res, next) => {
    
    let layouts = await Layout.find();

    res.status(200).json(layouts);
});



//@desc     Add layout by one specific user
//@route    /layout
//@access   Private

exports.addLayout = asyncHandler(async (req, res, next) => {

    let userId = req.user.id;

    let {name, listOfCharts, layoutType, idForLink} = req.body;

    if (!userId) {
        res.status(401)
        throw new Error("Not a valid authentication!");
    }

    if (name.length === 0) {
        res.status(400)
        throw new Error("Name of layout is missing. Please fill the name for layout!");
    };

    if (listOfCharts.length === 0) {
        res.status(400)
        throw new Error("There are no selected charts. Please select")
    };

    let createdLayout = await Layout.create({
        userId: userId,
        name: name,
        listOfCharts: listOfCharts, 
        layoutType: layoutType,
        idForLink: idForLink
    });

    res.status(200).json(createdLayout);

});

//@desc  Delete a layout by one specific user
//@route   /layout/delete/:layoutId
//@access private

exports.deleteLayout = asyncHandler(async (req, res, next) => {

    let userId = req.user.id;

    if (!userId) {
        res.status(401)
        throw new Error("Not a valid authentication!");
    };

    let layout = await Layout.findById(req.params.layoutId);

    if (!layout) {
        res.status(404)
        throw new Error("Layout cannot be found!");
    };

    if (layout.userId.toString() !== userId) {
        res.status(401)
        throw new Error("This user is not authenticated to delete this layout!");
    };

    let deletedLayout = await Layout.findByIdAndDelete(req.params.layoutId);

    res.status(200).json(deletedLayout);

});

//@desc     Get all layouts by one specific user
//@route    /layout/allByOne/
//@access   Private

exports.getAllLayoutByUser = asyncHandler(async (req, res, next) => {

    let userId = req.user.id;

    if (!userId) {
        res.status(401)
        throw new Error("User not found!");
    };

    let allLayoutsOfUser = await Layout.find({userId: userId});

    res.status(200).json(allLayoutsOfUser);
});