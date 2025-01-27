const express =require ('express');
const app= express();
app.use(express.json());

const PORT =process.env.PORT || 3000;

let books =[{
  id:1,title:"alchemist", author:"paulo"
},{id:2,title:"elon musk", author:"ashlee vance"},{id:3,title:"rich dad", author:"robert"}];
// getting books
app.get('/books',(req,res)=>{
res.json(books);

})
//post a new book
app.post('/books',(req,res)=>{
  const book =req.body;
  book.id =books.length+1;
  books.push(book);
  res.status(201).json(book);
});
//start the server
app.listen(3000,()=>{
  console.log("server running on local host 3000")
})






























