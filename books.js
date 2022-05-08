let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(" .books");
  booksWrapper.classList += " books__loading"
  
  if (!books) {
    books = await getBooks();
  }

  booksWrapper.classList.remove("books__loading")

  if (filter === "LOW_TO_HIGH") {
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
  }
  else if (filter === "HIGH_TO_LOW") {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice))
  }
  else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating)
  }  

  const booksHtml = books
  .map((book) => {
    return `<div class="book">
    <figure class="book__img--wrapper">
        <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
        ${book.title}
    </div>
    <div class="book__ratings">
        ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
        ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
</div>`;
  })
  .join("");


  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`
  }
  else {
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
  }

}

function ratingsHTML(rating) {
  let ratingHTML = "";

  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += `<i class="fas fa-star"></i>\n`
  }

  if (!Number.isInteger(rating)) {
    ratingHTML += `<i class="fas fa-star-half-alt"></i>\n`
  }
  return ratingHTML
}

function filterBooks(event) {
    renderBooks(event.target.value)
  
}

setTimeout(() => {
  renderBooks();
});

// FAKE DATA

function getBooks() {
  return new Promise((resolve ) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Naruto: Volume 293",
          url: "assets/naruto1.webp",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Dragon Ball Super: Volume 1",
          url: "assets/dragonball.png",
          originalPrice: 39,
          salePrice: 15,
          rating: 5,
        },
        {
          id: 3,
          title: "Haikyuu: Volume 1",
          url: "assets/haikyuu improved.png",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "Hunter X Hunter: Volume 1",
          url: "assets/hunterxhunter.png",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Demon Slayer: Volume 1",
          url: "assets/demonslayer(768 × 1206 px).png",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Fullmetal Alchemist: Volume 1-3",
          url: "assets/full metal(768 × 1206 px).png",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Dragon Ball Super: Volume 15",
          url: "assets/dragonball2.png",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "Bleach: Volume 1",
          url: "assets/bleach.png",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "Shokugeki No Soma: Volume 1",
          url: "assets/foodwars 1.png",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Attack On Titans: Voume 20",
          url: "assets/AOT.png",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "My Hero Academia: Volume 22",
          url: "assets/myheroacademia.webp",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 12,
          title: "Fairy Tail: Volume 1",
          url: "assets/fairytail.png",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ])
    }, 1000);
  })
}
