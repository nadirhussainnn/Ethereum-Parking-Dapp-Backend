const Owner=require('../models/ownerModel')

const login=async(req, res)=>{

    console.log(`Owner Login API hit`)
    try{
        const {email, password}=req.body

        const user=await Owner.findOne({email, password})

        if(user){
            res.status(200).send({success:true, msg:"Loggedin successfully", data:user})
        }
        else{
            res.status(200).send({success:false, msg:"Could not find user"})
        }
    }catch(error){
        res.status(400).send(error)
    }
}

const register=async (req, res)=>{

    console.log(`Login API hit`)
    try{
        

        const user=await Owner.create({...req.body})
        if(user){
            res.status(200).send({success:true, msg:"Created successfully", data:user})
        }
        else{
            res.status(200).send({success:false, msg:"Could not Create"})
        }
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports={
    login,
    register
}