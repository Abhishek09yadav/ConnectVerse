import User from "../models/User"

export const updateStreak = async(req,res) =>{
  try{
    const user = await User.findById(req.user.id)
    if(!user) return res.status(404).json({ message: "User not found" });
    const today = new Date();
    today.setHours(0,0,0,0);
    if(!user.lastActionDate){
      
    }
  }
  catch(error){
     res.status(500).json({ message: error.message });
  }
}