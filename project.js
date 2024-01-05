let cart = [];
let total = 0;
 
function addToCart(bookName, price) {
    cart.push({ name: bookName, price: price });
    total += price;
    updateCart();
}
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}
function updateCart() {
  let cartItemsElement = document.getElementById("cart-items");
  let totalElement = document.getElementById("total");
  cartItemsElement.innerHTML = '';
 
  cart.forEach((item, index) => {
      let itemElement = document.createElement("tr");
      itemElement.innerHTML = `
          <td>${item.name}</td>
          <td>${item.price.toFixed(2)} Rs</td>
          <td><button class="remove-button" onclick="removeFromCart(${index})">Remove</button></td>
      `;
      cartItemsElement.appendChild(itemElement);
  });
 
  totalElement.textContent = `Total: ${total.toFixed(2)} Rs`;
}
const books = [
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
];
function initializeBookstore() {
  let bookContainer = document.getElementById("book-container");
  books.forEach(book => {
      let bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p> ${book.price.toFixed(2)} Rs</p>
          <button onclick="addToCart('${book.title}', ${book.price})">Add to Cart</button>
      `;
      bookContainer.appendChild(bookElement);
  });
}
function printBill() {
  let billContent = "Book\t\t\tPrice\n";
  cart.forEach(item => {
      billContent += `${item.name}\t\t${item.price.toFixed(2)} Rs\n`;
  });
  billContent += "\n";
  billContent += `Total\t\t\t${total.toFixed(2)} Rs`;
  alert("Bill:\n\n" + billContent);
  //const printWindow = window.open("", "_blank");
  //printWindow.document.write("<pre>" + billContent + "</pre>");
}
window.onload = function() {
  initializeBookstore();
};
