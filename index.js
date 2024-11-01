const express=require('express');
const fs=require('fs')
const bodyParser=require('body-parser')
const app=express();
app.use(bodyParser.json());

const path="D:/harkirat web developer course/file_system/files"
const pathoftxt="D:/harkirat web developer course/file_system/files/a.txt"

let arr=fs.readdirSync(path)


app.get('/files',(req,res)=>{
    arr=fs.readdirSync(path)
    let curr=[];
    for(let i=0;i<arr.length;i++){
        curr.push(`${i+1}: ${arr[i]}`);
        console.log(`${i+1}: ${arr[i]}`);
}
    res .send(curr)
    
})
// easy method simply send pagenumber in body

// app.get('/files/pageNumber',(req,res)=>{
//     // let pageNumber=req.params.pageNumber;
//     let pageNumber=req.body.pageNumber;
//     // res.send(arr[pageNumber])
//     let newpath=path+"/"+arr[pageNumber];
//     fs.readFile(newpath,"utf-8",(err,data)=>{
//         res.send(data);
//     })
// })

// sending pagenumber as param
app.get('/files/:pageNumber',(req,res)=>{
    let pageNumber=req.params.pageNumber;
    let newpath=path+"/"+arr[pageNumber];
    fs.readFile(newpath,"utf-8",(err,data)=>{
        res.send(data);
    })
})
app.post('/files',(req,res)=>{
    let filename=req.body.filename;
    let content=req.body.content;
    arr=fs.readdirSync(path);
    let check=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]==filename){
            check=1
            res.status(400).send("Already exist file name")
        }
    }
    if(check==0){
        
        fs.appendFile(path+'/'+filename,content,(err)=>{
            if(err)throw err;
            res.send("Saved!");
        })
    }
})
app.put('/files',(req,res)=>{
    let filename=req.body.filename;
    let content=req.body.content;
    arr=fs.readdirSync(path);
    let check=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]==filename){
            check=1
            break;
        }
    }
    if(check==1){
        fs.writeFile(path+'/'+filename,content,(err)=>{
            if(err)throw err;
            res.send("Updated!!")
        })
    }
    else{
        res.status(404).send("file not found");
    }
})
app.delete('/files',(req,res)=>{
    let filename=req.body.filename;
    let content=req.body.content;
    arr=fs.readdirSync(path);
    let check=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]==filename){
            check=1
            break;
        }
    }
    if(check==1){
        fs.unlink(path+'/'+filename,(err)=>{
            if(err)throw err;
            res.send("File Deleted!")
        })
    }
    else{
        res.status(404).send("file not found");
    }
    
})

app.listen(3000,()=>{
    console.log("app is listening at port 3000");
})