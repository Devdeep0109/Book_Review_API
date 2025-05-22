const Books = require("../model/books");
const Reviews = require("../model/reviews");


const allBooks = async (req, res) => {
    try {
      const { author, genre, page = 1, limit = 10 } = req.query;
  
      const filter = {};
      if (author) filter.author = author;
      if (genre) filter.genre = genre;
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      const totalBooks = await Books.countDocuments(filter);
  
      const books = await Books.find(filter, "title author genre")
        .skip(skip)
        .limit(parseInt(limit))
        .populate("createdBy");
  
      if (books.length === 0) {
        return res.status(404).json({ success: false, error: "No book records found" });
      }
  
      return res.status(200).json({
        success: true,
        data: books,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalBooks,
          totalPages: Math.ceil(totalBooks / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching books records:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
};

const bookFullDetails = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Pagination params (optional)
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const skip = (page - 1) * limit;
  
      // Find book by ID
      const book = await Books.findById(id).populate("createdBy", "username email");
      if (!book) {
        return res.status(404).json({ success: false, error: "Book not found" });
      }
  
      // Total reviews count
      const totalReviews = await Reviews.countDocuments({ bookId: id });
  
      // Paginated reviews with user details
      const reviews = await Reviews.find({ bookId: id })
        .populate("createdBy", "username email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
  
      // Average rating calculation
      let averageRating = 0;
      if (totalReviews > 0) {
        const agg = await Reviews.aggregate([
          { $match: { bookId: book._id } },
          { $group: { _id: "$bookId", avgRating: { $avg: "$averageRating" } } }
        ]);
        averageRating = agg.length > 0 ? agg[0].avgRating : 0;
      }
  
      return res.status(200).json({
        success: true,
        data: {
          book,
          averageRating,
          reviews,
          pagination: {
            page,
            limit,
            totalReviews,
            totalPages: Math.ceil(totalReviews / limit),
          },
        },
      });
    } catch (error) {
      console.error("Error fetching book details:", error);
      return res.status(500).json({ success: false, error: "Server error" });
    }
};

const addBook = async(req,res)=>{
    try {
        const { title, author, genre, description } = req.body;
        const userId = req.user?._id; 
    
        // Validation
        if (!title || !author || !userId) {
          return res.status(400).json({
            success: false,
            message: "Title, author, and createdBy (user) are required.",
          });
        }
    
        const newBook = new Books({
          title,
          author,
          genre,
          description,
          createdBy: userId,
        });
    
        await newBook.save();
    
        res.status(201).json({
          success: true,
          message: "Book added successfully.",
          data: newBook,
        });
    }
    catch (err) {
        console.error("Error in addBook:", err);
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: err.message,
        });
    }
}

const searchBooks = async (req, res) => {
    try {
      const { q } = req.query;  // search query from URL: /search?q=someText
  
      if (!q) {
        return res.status(400).json({ success: false, message: "Query parameter 'q' is required." });
      }
  
      // Case-insensitive partial match on title or author using regex
      const regex = new RegExp(q, "i");
  
      const books = await Books.find({
        $or: [
          { title: regex },
          { author: regex }
        ]
      });
  
      res.status(200).json({ success: true, data: books });
    } catch (error) {
      console.error("Error searching books:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };


module.exports = {addBook, allBooks, bookFullDetails,searchBooks};