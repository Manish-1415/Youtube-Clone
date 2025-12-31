import mongoose from "mongoose";
import bcrypt from "bcrypt"

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index : true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String, // optional
    },
    avatar: {
      type: String, // optional
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);


authSchema.pre("save" , async function(next) {
  if(this.isModified("password")) {
    this.password = await bcrypt.hash(this.password , 10);
  }

  if(this.isModified("refreshToken")) {
    this.refreshToken = await bcrypt.hash(this.refreshToken , 10);
  }

  next();
  
})

authSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password , this.password)
}

authSchema.methods.compareRefreshToken = async function(token) {
  return await bcrypt.compare(token , this.refreshToken);
}

// authSchema.pre("save")

export const Auth = mongoose.model("Auth", authSchema);



  //I am talking about the condition of this.isModified
    // this condition will make true to false & false to true , so when password is changing first time it will be true but ! makes false so password will hashed , if you only changing name then it will ask is my password is changed / it will say false but by ! it will be true then return next() will happen.