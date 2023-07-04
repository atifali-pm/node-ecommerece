import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        lowercase: true
    }
}, 
{
    timestamp: true
});

export default mongoose.model("categories", categorySchema);
