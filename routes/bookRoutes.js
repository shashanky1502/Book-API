const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The Books managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - isbn
 *         - publishedDate
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier for the book (UUID format)
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         isbn:
 *           type: string
 *           description: The ISBN number of the book
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: The publication date of the book
 *       example:
 *         id: "550e8400-e29b-41d4-a716-446655440000"
 *         title: "The Great Gatsby"
 *         author: "F. Scott Fitzgerald"
 *         isbn: "9780743273565"
 *         publishedDate: "1925-04-10"
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for filtering books by title or author
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [title, publishedDate]
 *         description: Sort books by title or publishedDate
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *             examples:
 *               example1:
 *                 summary: A list of books
 *                 value:
 *                   - id: "550e8400-e29b-41d4-a716-446655440000"
 *                     title: "The Great Gatsby"
 *                     author: "F. Scott Fitzgerald"
 *                     isbn: "9780743273565"
 *                     publishedDate: "1925-04-10"
 *                   - id: "550e8400-e29b-41d4-a716-446655440001"
 *                     title: "To Kill a Mockingbird"
 *                     author: "Harper Lee"
 *                     isbn: "9780061120084"
 *                     publishedDate: "1960-07-11"
 *       500:
 *         description: Internal server error
 */
router.get('/', bookController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Retrieve a specific book by its ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The book ID (UUID format)
 *     responses:
 *       200:
 *         description: A book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             examples:
 *               example1:
 *                 summary: A book object
 *                 value:
 *                   id: "550e8400-e29b-41d4-a716-446655440000"
 *                   title: "The Great Gatsby"
 *                   author: "F. Scott Fitzgerald"
 *                   isbn: "9780743273565"
 *                   publishedDate: "1925-04-10"
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', bookController.getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book entry
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             examples:
 *               example1:
 *                 summary: Created book object
 *                 value:
 *                   id: "550e8400-e29b-41d4-a716-446655440000"
 *                   title: "The Great Gatsby"
 *                   author: "F. Scott Fitzgerald"
 *                   isbn: "9780743273565"
 *                   publishedDate: "1925-04-10"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', bookController.createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book's information by its ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The book ID (UUID format)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               isbn:
 *                 type: string
 *               publishedDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *             examples:
 *               example1:
 *                 summary: Updated book object
 *                 value:
 *                   id: "550e8400-e29b-41d4-a716-446655440000"
 *                   title: "The Great Gatsby - Revised"
 *                   author: "F. Scott Fitzgerald"
 *                   isbn: "9780743273565"
 *                   publishedDate: "1925-04-10"
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.put('/:id', bookController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a specific book by its ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The book ID (UUID format)
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Book deleted successfully"
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', bookController.deleteBook);

module.exports = router;
