const Reviews = require("../model/reviews");
const Books = require("../model/books");

const submitReview = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user?._id;
    const { content, averageRating } = req.body;

    // Validate required fields
    if (!content) {
      return res.status(400).json({ success: false, message: "Content and averageRating are required." });
    }

    // Check if book exists
    const book = await Books.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found." });
    }

    // Check if user has already reviewed this book
    const existingReview = await Reviews.findOne({ bookId, createdBy: userId });
    if (existingReview) {
      return res.status(400).json({ success: false, message: "You have already reviewed this book." });
    }

    // Create the review
    const newReview = new Reviews({
      content,
      averageRating,
      bookId,
      createdBy: userId,
    });

    await newReview.save();

    return res.status(201).json({ success: true, message: "Review submitted successfully", data: newReview });
  } catch (error) {
    console.error("Error submitting review:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user?._id; // authenticated user's ID
                
        const { content, averageRating } = req.body;
        console.log(req.body);
    
        if (!content) {
            return res.status(400).json({
            success: false,
            message: "Content is required.",
            });
        }
  
        // Find the review
        const review = await Reviews.findById(reviewId);
    
        if (!review) {
            return res.status(404).json({
            success: false,
            message: "Review not found.",
            });
        }
    
        // Check if the logged-in user is the creator
        if (review.createdBy.toString() !== userId) {
            console.log(review.createdBy.toString());
            console.log("current user id" ,userId);
            
            
            return res.status(403).json({
            success: false,
            message: "You are not authorized to update this review.",
            });
        }
    
        // Update fields
        review.content = content;
        review.averageRating = averageRating;
    
        await review.save();
    
        return res.status(200).json({
            success: true,
            message: "Review updated successfully.",
            data: review,
        });
    } catch (error) {
      console.error("Error updating review:", error);
      return res.status(500).json({
        success: false,
        message: "Server error.",
      });
    }
};

const deleteReview = async (req, res) => {
    try {
      const reviewId = req.params.id;
      const userId = req.user?._id;
  
      const review = await Reviews.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ success: false, message: "Review not found" });
      }
  
      // Check if the review is given by logged-in user
      if (review.createdBy.toString() !== userId) {
        return res.status(403).json({ success: false, message: "Not authorized to delete this review" });
      }
  
      await Reviews.findByIdAndDelete(reviewId);
  
      res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

module.exports = { submitReview, updateReview ,deleteReview};
