const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const DatauriParser = require('datauri/parser');
const Cloudinary = require('../services/Cloudinary.config')
const path = require('path')

const parser = new DatauriParser()


exports.Register = async(req,res)=>{
      const {username,email,password,handle} = req.body
      let image
      let result

      if(req.file){
   
          const image_parser = parser.format(path.extname(req.file.originalname).toString(),req.file.buffer);
         image = image_parser.content

         try {
             result =await Cloudinary.uploader.upload(image,{
                folder:`Youtube/Profile/${username}`
             })
         } catch (error) {
             res.status(500).json(error)
         }
      }

      try {
        const newUser = new User({
            username,
            email,
            password,
            handle,
            photo:{
                public_id:result.public_id,
                url:result.url,
                folder:result.folder
            }
        })

        bcrypt.genSalt(20,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if (err) throw err;

                newUser.password = hash

                try {
                    newUser.save()
                    res.status(200).json({message:"Account created successfully"})
                } catch (error) {
                    res.status(500).json({message:"An error occurred"})
                }

            })
        })
      } catch (error) {
           res.status(500).json({error})
      }
}

exports.Login= async(req,res)=>{
      const {username,password} = req.body

      try {
        const user = await User.findOne({username})
        
        if(!user || !(await bcrypt.compare(password,user.password))){
           return res.status(401).json({message:"Invalid Credentials"})
        }

        const accessToken = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'3d'})

        res.cookie('token',accessToken,{
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 3000, // 3 days
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })

        res.status(200).json({message:"Login success"})

      } catch (error) {
        res.status(500).json({error})
        console.log(error)
      }
}

exports.Profile =async(req,res)=>{
     const {id} = req.body
    try {
        const user = await User.findById(id)
        
        if(!user){
            return res.status(401).json({message:"User does not exist!"})
        }

        const {password,...userInfo} = user._doc

        res.status(200).json(userInfo)
        
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.UpdateProfile=async(req,res)=>{
     const id = req.params.id
     const {username,email,handle,currentImage} = req.body
      
     let newImage;

     if(req.file){
        if(currentImage.public_id){
            await Cloudinary.uploader.destroy(currentImage.public_id)
           }

        const image_parser = parser.format(path.extname(req.file.originalname).toString(),req.file.buffer);
        const image = image_parser.content

       try {
           newImage =await Cloudinary.uploader.upload(image,{
              folder:`Youtube/Profile/${username}`
           })
       } catch (error) {
           res.status(500).json(error)
       }
    }


     try {

        const UpdatedProfile = {
            username,
            email,
            handle
        }

        if(newImage){
            UpdatedProfile.photo ={
             public_id:newImage.public_id,
             url:newImage.url,
             folder:newImage.folder
            }
        }
        
        const updatedUser = await User.findOneAndUpdate({_id:id},UpdatedProfile,{new:true})


        res.status(200).json({message:"Profile updated successfully", updatedUser})
    } catch (error) {
       res.status(500).json(error)   
    }
}

// deleting profile image
exports.RemoveImage =async(req,res)=>{
     const {public_id} = req.body
     const id = req.params.id
    try {

        if(public_id){
            await Cloudinary.uploader.destroy(public_id)
        }

        const updatedUser = await User.findOneAndUpdate({_id:id},{$set:{photo:{}}},{new:true})

        res.status(200).json({message:"photo removed",updatedUser})
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.DeleteAccount =async(req,res)=>{
    // !! add function to delete related documents 
    try {
        
    } catch (error) {
        
    }
    
}