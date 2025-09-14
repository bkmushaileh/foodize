import { Document, Schema,model } from "mongoose"
interface recipes {
    ingredients:string[],
    description :string,
    steps:string,
    image:string,
    name:string
    time:number,
    difficulty:string,
    cal:string

}
const recipesschema =new Schema({
    ingredients :{type:[String], require:true, defult:[]} ,
    description : {type:String,require:true},
    steps:{type:String , require:true},
    image:{type:String, require:true},
    name:{type:String,require:true},
    time:{type:Number,require:true},
    difficulty:{type:String,require:true},
    cal:{type:Number,require:false,default:"Unkown"}
    


})