const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  image: String,
});

const Book = mongoose.model('Book', bookSchema);

const cartSchema = new mongoose.Schema({
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const Cart = mongoose.model('Cart', cartSchema);

// Inserting books outside of the route
const initializeBooks = async () => {
  try {
    await Book.insertMany([
      { title: "Nature Kingdom", author: "Clove Griffith", price: 150, image: "https://th.bing.com/th/id/OIP.nYk3GFtgG4o_QpTNpYsfSQHaL2?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" },
  { title: "Inspiration Speaks", author: "J.R.R.Tolkien", price: 299, image: "http://wintergoosepublishing.com/wp-content/uploads/2011/05/ArtPlatform-BookCover-Final-Flat.jpg"},
  { title: "The Dreaming Arts", author: "Top Maloney", price: 199, image: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/02/attachment_80004080-e1488217702832.jpg?auto=format&q=60&fit=max&w=930"},
  { title: "The Journey Of Dreams", author: "John Creasey", price: 250, image: "https://getcovers.com/wp-content/uploads/2020/12/image35.jpg"},
  { title: "Typography", author: "Michelle De Generes", price: 400, image: "https://assets.visme.co/templates/banners/thumbnails/i_Creative-Book-Cover_full.jpg"},
  { title: "Perfection", author: "Rav Dov Katz", price: 350, image: "https://blogs.yu.edu/revel/wp-content/uploads/sites/17/2014/08/book_cover.jpg"},
  { title: "Through The Quarry Window", author: "Matt Weiss", price: 500, image: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/07/attachment_83659230-e1500059110766.jpg?auto=format&q=60&fit=max&w=930"},
  { title: "A Thousand Pieces Of You", author: "Claudia Gray", price: 450, image: "http://ecx.images-amazon.com/images/I/91zZB9SzsIL.jpg"},
  { title: "The Last Four Things", author: "Paul Hoffman", price: 180, image: "https://www.creativindiecovers.com/wp-content/uploads/2012/02/9780718155209.jpg"},
  { title: "Awake", author: "Jaison Black", price: 299, image: "http://4.bp.blogspot.com/-ayh32CF1HrY/UCt4sQzqBqI/AAAAAAAAAB0/iseG9EYmXp8/s1600/cover2.jpg"},
  { title: "Control your mind ", author: "Eric Robertson", price: 400, image: " https://covers.openlibrary.org/b/id/12009823-L.jpg"},
  { title: "A Court Of Mist And Fury", author: "Sarah J. Maas", price: 350, image: "https://covers.openlibrary.org/b/id/14315088-L.jpg"},
  { title: "The shoot To Die For", author: "M.H.Sargret", price: 500, image: "https://tse2.mm.bing.net/th?id=OIP.TPWFnbVgvRvDlfVxVU5kqQHaLG&pid=Api&P=0&h=180"},
  { title: "In Your Own Backyard", author: "John Creasey", price: 300, image: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/07/attachment_73599840-e1500060411553.png?auto=format&q=60&fit=max&w=930"},
  { title: "Ray Of Hope", author: "Ermisenda Alvarez", price: 400, image: "http://25.media.tumblr.com/877d1c8d1275e2fd8776242717214fdc/tumblr_mhsnaqi6Go1r7vfwgo1_1280.jpg"},
  { title: "Bill And Sparkle", author: "Jhon Stevens", price: 450, image: "https://getcovers.com/wp-content/uploads/2020/12/image9.png"},
  { title: "Look At Me", author: "Surah Duguid", price: 500, image: "https://i.pinimg.com/originals/ff/4c/2a/ff4c2a00404eb2b2daf5b98cc44882b2.jpg"},
  { title: "Enceladus", author: "Brandon", price: 450, image: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2017/01/enceladus.jpg?auto=format&q=60&fit=max&w=930"},
  { title: "Child Of The Kindred", author: "M.T.Margee", price: 180, image: "https://tse2.mm.bing.net/th?id=OIP.cvexECPTvVLzlZWuLoaRegHaL2&pid=Api&P=0&h=180"},
  { title: "Another Side Of The Moon", author: "Shannon W.Lucid", price: 299, image: "https://assets.visme.co/templates/banners/thumbnails/i_Fiction-Book-Cover_full.jpg"},
    ]);
    console.log('Books inserted into the database');
  } catch (error) {
    console.error('Error inserting books into the database:', error);
  }
};

initializeBooks();

app.use(bodyParser.json());

app.post('/api/cart/add', async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart();
      await cart.save();
    }

    cart.books.push(book);
    await cart.save();

    res.status(201).json({ message: 'Book added to the cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cart/remove', async (req, res) => {
  try {
    const { bookId } = req.body;

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const index = cart.books.findIndex(book => book._id.toString() === bookId);
    if (index !== -1) {
      cart.books.splice(index, 1);
      await cart.save();
      res.json({ message: 'Book removed from the cart', cart });
    } else {
      res.status(404).json({ error: 'Book not found in the cart' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const total = cart.books.reduce((sum, book) => sum + book.price, 0);
    res.json({ cart: cart.books, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/initialize', async (req, res) => {
  try {
    const books = await Book.find();
    res.json({ message: 'Books retrieved from the database', books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
