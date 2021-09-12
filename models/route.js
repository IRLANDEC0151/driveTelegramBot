import mongoose from "mongoose";
const { Schema, model } = mongoose;

const routeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateRecord: {
        type: Date
    },
    timeRecord: {
        type: Number
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }

});  
// routeSchema.methods.allRoutes = function() {
//     return mongoose.model('routeSchema').find();
//   };
export default model("Route", routeSchema); 
