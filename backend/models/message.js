import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   content:{
    type:String,
    required:true
   },
   content_type:{
    type:String,
    enum:["message","image"],
    default:"message"
   },
   read:{
    type:Boolean,
    default:false
   }
  },
  { timestamps: true }
);
export default mongoose.model("Message",messageSchema);
