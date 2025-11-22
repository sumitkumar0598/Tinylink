import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { nanoid } from 'nanoid'
import dotenv  from 'dotenv'
import { Url } from './model.js'
import shortid from 'shortid'
dotenv.config()

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("database is connected")
}).catch((err)=>{
    console.log("error while connecting db",err)
})


//put or post api
app.post("/api/links", async (req,res)=>{
    try {
        const {originalUrl} = req.body;
         if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }
          let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.status(409).json({ message: "URL already exists", url });
    }
        const shortUrl = shortid.generate();
         url = new Url({originalUrl, shortUrl});
        await url.save();
        res.status(200).json({message:"url generated", url: url});
    } catch (error) {
        console.log("error",error);
        res.status(500).json({error:"server error"});
    }
});

//selet api by id

app.get("/api/links/:shortUrl", async (req,res)=>{
    try {
        const {shortUrl} = req.params;
        const url = await Url.findOne({shortUrl});
        if(url){
            url.clicks++;
            await url.save();
           return res.redirect(url.originalUrl)
            
        }else{
          return  res.status(400).json({message:"error url not found"})
        }
        
    } catch (error) {
        
    }
})
//show all url apis on ui
app.get("/api/links", async (req,res)=>{
    const url = await Url.find();
    res.json({message:"all ur url are here", url})
})

//delete url api
app.delete("/api/links/:shortUrl", async (req, res) => {
    try {
        const {shortUrl}= req.params;
        const url = await Url.findOneAndDelete({shortUrl}); // Pass ID directly
        if (!url)
            return res.status(404).json({ message: "URL not found" }); // Use 404 for not found
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});




const port = 2000;
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})