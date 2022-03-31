feather.replace();

const gridContainer = document.querySelector('.grid');
const searchInput = document.querySelector('#search');
const multiRangeInputs = document.querySelectorAll('input[name="multi-range"]');
const brandsInputs = document.querySelectorAll('input[name="brands"]');
const categoriesInputs = document.querySelectorAll('input[name="categories"]');
const menubarActive = document.querySelector('.menubar__item--active');
const dropDownList = document.querySelector('.menubar__drop-list');
const scrollToTop = document.getElementById('toTopBtn');
const mobileNav = document.querySelector('.menu-navbar');
const menuBar = document.querySelector('.menubar');
const closeIcon = document.querySelector('.close-icon');
const listViewBtns = document.querySelectorAll('.option-view');
const listViewBtnsLabel = document.querySelectorAll('.list-view-label');
const overlay = document.querySelector('.overlay');


window.addEventListener('DOMContentLoaded', displayProducts);
window.addEventListener('DOMContentLoaded', filterPrice);
window.addEventListener('DOMContentLoaded', filterBrands);
window.addEventListener('DOMContentLoaded', filterCategories);
searchInput.addEventListener('input', filterList);
scrollToTop.addEventListener('click', topFunction);

// list-grid-view toggle
listViewBtns.forEach((btn, i) => {
  btn.addEventListener('click', (e) => {
    gridContainer.classList.remove('grid-view');
    gridContainer.classList.remove('list-view');

    listViewBtnsLabel.forEach((label) => {
      label.classList.remove('active');
    });

    if (e.target.value === 'on' && btn.classList.contains('grid-view')) {
      listViewBtnsLabel[i].classList.add('active');
      gridContainer.classList.add('grid-view');
    } else if (e.target.value === 'on' && btn.classList.contains('list-view')) {
      listViewBtnsLabel[i].classList.add('active');
      gridContainer.classList.add('list-view');
    }
  });
});

menubarActive.addEventListener('click', () => {
  dropDownList.classList.contains('h-zero')
    ? dropDownList.classList.remove('h-zero')
    : dropDownList.classList.add('h-zero');
});

// price-filter

function filterPrice() {
  const productPrices = products.map((product) => product.price);
  const gridCards = document.querySelectorAll('.card');

  multiRangeInputs.forEach((input) => {
    input.addEventListener('click', (e) => {
      const priceValue = e.target.value;
      productPrices.forEach((price, index) => {
        if (priceValue === 'all') {
          gridCards[index].style.display = '';
        } else if (price > +priceValue) {
          gridCards[index].style.display = 'none';
        } else if (price <= +priceValue) {
          gridCards[index].style.display = '';
        }
      });
    });
  });
}

// brands-filter

function filterBrands() {
  const productBrands = products.map((product) => product.brand);
  const gridCards = document.querySelectorAll('.card');

  brandsInputs.forEach((input) => {
    input.addEventListener('click', (e) => {
      const brandName = e.target.value.toLowerCase();
      productBrands.forEach((brand, index) => {
        brand = brand.toLowerCase();
        if (brand === brandName) {
          gridCards[index].style.display = '';
        } else {
          gridCards[index].style.display = 'none';
        }
      });
    });
  });
}

// categories-filter

function filterCategories() {
  const productCategories = products.map((product) => product.category);
  const gridCards = document.querySelectorAll('.card');

  categoriesInputs.forEach((input) => {
    input.addEventListener('click', (e) => {
      const categoryName = e.target.value.toLowerCase();
      productCategories.forEach((category, index) => {
        category = category.toLowerCase();
        if (category === categoryName) {
          gridCards[index].style.display = '';
        } else {
          gridCards[index].style.display = 'none';
        }
      });
    });
  });
}

function displayProducts() {
  gridContainer.innerHTML = products
    .map((product) => {
      return `<div id=${product.id} class='card'>
      <div class="img-box flex-align-center justify-center">
        <img src=${product.img} alt=${product.name} />
      </div>
      <div class='card-body'>
        <div class='item-wrapper flex-align-center justify-between'>
          <div class='item-rating'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='${
                product.rating > 0 ? 'warning' : 'muted'
              } feather feather-star'
            >
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
            </svg>
              <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='${
                product.rating > 1 ? 'warning' : 'muted'
              }  feather feather-star'
            >
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
            </svg>
              <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='${
                product.rating > 2 ? 'warning' : 'muted'
              }  feather feather-star'
            >
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
            </svg>
                        <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='${
                product.rating > 3 ? 'warning' : 'muted'
              }  feather feather-star'
            >
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='${
                product.rating > 4 ? 'warning' : 'muted'
              } g feather feather-star'
            >
              <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
            </svg>
          </div>
          <h6 class='item-price'>$${product.price}</h6>
        </div>
        <h6 class='item-name'>
             <a class="item-name-link" href="#">${product.name}</a>
             <p class="item-name-brand">by
                <a href="#">${product.brand}</a>
             </p>
        </h6>
        <p class='item-description'>${product.description}</p>
      </div>
      <div class='item-options flex-align-center'>
        <div class="list-price-wrapper">
          <div class="item-cost">
            <h4 class="item-list-price">$${product.price}</h4>
          </div>
        </div>
        <a class='btn-wishlist flex-align-center gap-1' href='#'>
          <svg data-v-15eba8c6="" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-heart"><path data-v-15eba8c6="" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <span>Wishlist</span>
        </a>
        <a class='btn-cart flex-align-center gap-1' href='#'>
          <svg data-v-15eba8c6="" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-shopping-cart"><circle data-v-15eba8c6="" cx="9" cy="21" r="1"></circle><circle data-v-15eba8c6="" cx="20" cy="21" r="1"></circle><path data-v-15eba8c6="" d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span>View in Cart</span>
        </a>
      </div>
    </div>`;
    })
    .join('');
}

// search-filter

function filterList() {
  const gridCards = Array.from(document.querySelectorAll('.card'));
  const filter = searchInput.value.trim().toLowerCase();

  const productNames = products.map((product) =>
    product.name.toLocaleLowerCase()
  );

  const filterResults = document.querySelector('.filters__results');
  let filterResultsSum = 0;

  console.log(gridCards);

  productNames.forEach((productName, index) => {
    if (productName.includes(filter)) {
      gridCards[index].style.display = '';
      filterResultsSum += 1;
    } else {
      gridCards[index].style.display = 'none';
    }
    filterResults.textContent = `${filterResultsSum} results found`;
  });
}

// Scroll-btn functions

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopBtn.style.opacity = '1';
  } else {
    toTopBtn.style.opacity = '0';
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
  scrollFunction();
};

// mobile-navigation

mobileNav.addEventListener('click', () => {
  menuBar.style.left = '0px';
  overlay.style.visibility = 'visible';
});

closeIcon.addEventListener('click', () => {
  menuBar.style.left = '-260px';
  overlay.style.visibility = 'hidden';
});
