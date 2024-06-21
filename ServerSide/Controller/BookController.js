const Book  = require('../Model/ModelBook');

const AddBook = async(req,res)=>{
    const {title,author,genre,publishedYear} = req.body;
    const newBook =  new Book({title,author,genre,publishedYear});
    await newBook.save();
    res.json({
        message:"created Succesful",
        success:true,
        newBook
    })

}
const GetAllBooks = async(req,res)=>{
    try{
        const allBook  = await Book.find();
    res.json(allBook);
    }catch(error){
        console.error(error);
    }
}
const GetBookDetail = async(req,res)=>{
    const bookDetail = await Book.findById(req.params.id);
    if(!bookDetail){
        res.status(400).json({message:"Book not found"});
    }
    res.json(bookDetail);

}
const DeleteBook = async(req,res)=>{
    const newBook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({message:"deleted successfully",newBook});
}
const SearchBook = async(req,res)=>{
    const newBook = await Book.find({
        "$or":[
            {title:{$regex:req.params.key,$options:'i'}},
            {author:{$regex:req.params.key,$options:'i'}},
            {genre:{$regex:req.params.key,$options:'i'}},
        ]
    });
    res.send(newBook);
}

module.exports = {AddBook,GetAllBooks,GetBookDetail,DeleteBook,SearchBook}