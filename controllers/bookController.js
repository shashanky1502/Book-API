const BookModel = require('../models/Book');

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const newBook = new BookModel(req.body);
        await newBook.save();
        res.status(201).json({ success: true, data: newBook });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all books with pagination, search, and sorting
exports.getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'title', order = 'asc', search = '' } = req.query;

        // Build the search query
        const query = {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ]
        };

        // Build the sorting object
        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        const books = await BookModel.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(sortOptions)
            .exec();

        const count = await BookModel.countDocuments(query);

        res.status(200).json({
            success: true,
            data: books,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page, 10)
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const book = await BookModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await BookModel.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }
        res.status(200).json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
