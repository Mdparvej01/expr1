import Collection from "../models/collectionSchema.js"
import asyncHandler from "../service/asynchHandler.js"
import CustomError from "../utils/Customerror.js"

export const createCollection = asyncHandler (async (req,res) => {
    const {name} =req.body

    if(!name) {
        throw new CustomError("collection name is required" ,400)
    }

    const collection = await Collection.create({
        name
    })

    res.status(200).json ({
        success:true,
        message:"collection was creates successfully",
        collection
    })

})

//duplicate for update collection 

export const updateCollection = asyncHandler (async (req,res) => {
    const {name } =req.body
    //grabing from body or from url=>by id of want u want to update
    const {id: collectionId } = req.params


    

    if(!name) {
        throw new CustomError("collection name is required" ,400)
    }

    let updateCollection = await  Collection.findByIdAndUpdate(collectionId, {
        name
    } ,{
        new:true,
        runValidators:true
    })

    if(!updateCollection) {
        throw new CustomError("collection not found" ,400)
    }

    //  

    res.status(200).json ({
        success:true,
        message:"collection was updated successfully",
        collection
    })


})

// delete collection........... 

export const deleteCollection = asyncHandler (async (req,res) => {
    // const {name } =req.body NOT REQUIRED
    //grabing from body or from url=>by id of want u want to update
    const {id: collectionId } = req.params

   const collectionToDelete = await Collection.findById(collectionId)
    

    

   

    if(!collectionToDelete) {
        throw new CustomError("collection to be deleted not found" ,400)
    }

    await collectionToDelete.remove()


    res.status(200).json ({
        success:true,
        message:"collection was deleted successfully",
        collection
    })


})


//........................

export const getAllCollection = asyncHandler (async (req,res) => {
    // const {name } =req.body NOT REQUIRED
    //grabing from body or from url=>by id of want u want to update
    // const {id: collectionId } = req.params not needed

   const collections = await Collection.find()
     
    if(!collections) {
        throw new CustomError("No collections found" ,400)
    }

   
    res.status(200).json ({
        success:true,
        collections
    })


})