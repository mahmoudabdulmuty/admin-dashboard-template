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
const featuredBtn = document.querySelector('.featured-btn');
const featuredDropdown = document.querySelector('.featured-dropdown');
const featuredSortBtn = document.querySelector('.featured-sort');
const lowestSortBtn = document.querySelector('.lowest-sort');
const highestSortBtn = document.querySelector('.highest-sort');
const featuredTextValue = document.querySelector('.featured-text');

window.addEventListener('DOMContentLoaded', displayProducts);
window.addEventListener('DOMContentLoaded', filterPrice);
window.addEventListener('DOMContentLoaded', filterBrands);
window.addEventListener('DOMContentLoaded', filterCategories);
window.addEventListener('DOMContentLoaded', slidersRange);
// trigger displaySliderValues on DOM Load to display values
window.addEventListener('DOMContentLoaded', displaySliderValues);
searchInput.addEventListener('input', filterList);
scrollToTop.addEventListener('click', topFunction);

// featured Button dropdownlist
featuredBtn.addEventListener('click', () => {
  if (featuredDropdown.style.display === 'none') {
    featuredDropdown.style.display = '';
  } else {
    featuredDropdown.style.display = 'none';
  }
  filterPrice();
  filterBrands();
  filterCategories();
});

// Highest, Lowest, Featured sort
highestSortBtn.addEventListener('click', () => {
  products.sort((b, a) => {
    if (a.price < b.price) {
      return -1;
    } else if (a.price > b.price) {
      return 1;
    }
    return 0;
  });

  displayProducts();
  filterPrice();
  filterBrands();
  filterCategories();

  featuredTextValue.textContent = 'Highest';
});

lowestSortBtn.addEventListener('click', () => {
  products.sort((b, a) => {
    if (a.price > b.price) {
      return -1;
    } else if (a.price < b.price) {
      return 1;
    }
    return 0;
  });

  displayProducts();
  filterPrice();
  filterBrands();
  filterCategories();

  featuredTextValue.textContent = 'Lowest';
});

featuredSortBtn.addEventListener('click', () => {
  products.sort((b, a) => {
    if (a.id > b.id) {
      return -1;
    } else if (a.id < b.id) {
      return 1;
    }
    return 0;
  });

  displayProducts();
  filterPrice();
  filterBrands();
  filterCategories();

  featuredTextValue.textContent = 'Featured';
});

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

// menubar-active dropdown
menubarActive.addEventListener('click', () => {
  dropDownList.classList.contains('h-zero')
    ? dropDownList.classList.remove('h-zero')
    : dropDownList.classList.add('h-zero');

  // console.log(menubarActive.classList);
  menubarActive.classList.toggle('chevron-toggle');
});

// price-filter

function filterPrice() {
  const productPrices = products.map((product) => product.price);
  const gridCards = document.querySelectorAll('.card');

  multiRangeInputs.forEach((input) => {
    input.addEventListener('click', (e) => {
      const priceValue = e.target.value;

      const filterResults = document.querySelector('.filters__results');
      let filterResultsSum = 0;

      productPrices.forEach((price, index) => {
        gridCards[index].style.display = 'none';
        if (priceValue === 'all') {
          gridCards[index].style.display = '';
          filterResultsSum += 1;
        } else if (price >= 500 && priceValue === '1000') {
          gridCards[index].style.display = '';
          filterResultsSum += 1;
        } else if (price >= 100 && price <= 500 && priceValue === '500') {
          gridCards[index].style.display = '';
          filterResultsSum += 1;
        } else if (price >= 10 && price <= 100 && priceValue === '100') {
          gridCards[index].style.display = '';
          filterResultsSum += 1;
        } else if (price <= 10 && priceValue === '10') {
          gridCards[index].style.display = '';
          filterResultsSum += 1;
        }
      });

      filterResults.textContent = `${filterResultsSum} results found`;
      filterResultsSum = 0;
    });
  });
}

// brands-filter

function filterBrands() {
  const productBrands = products.map((product) => product.brand);
  const gridCards = document.querySelectorAll('.card');

  brandsInputs.forEach((input) => {
    input.addEventListener('click', (e) => {
      const filterResults = document.querySelector('.filters__results');
      let filterResultsSum = 0;

      const brandName = e.target.value.toLowerCase();

      productBrands.forEach((brand, index) => {
        brand = brand.toLowerCase();
        if (brand === brandName) {
          gridCards[index].style.display = '';
          filterResultsSum++;
        } else {
          gridCards[index].style.display = 'none';
        }
      });

      filterResults.textContent = `${filterResultsSum} results found`;
      filterResultsSum = 0;
    });
  });
}

// categories-filter

function filterCategories() {
  const productCategories = products.map((product) => product.category);
  const gridCards = document.querySelectorAll('.card');

  categoriesInputs.forEach((input) => {
    input.addEventListener('click', (e) => {
      const filterResults = document.querySelector('.filters__results');
      let filterResultsSum = 0;

      const categoryName = e.target.value.toLowerCase();

      productCategories.forEach((category, index) => {
        category = category.toLowerCase();
        if (category === categoryName) {
          gridCards[index].style.display = '';
          filterResultsSum++;
        } else {
          gridCards[index].style.display = 'none';
        }
      });

      filterResults.textContent = `${filterResultsSum} results found`;
      filterResultsSum = 0;
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

// Price Range Slider

function slidersRange() {
  const rangeSlider = document.querySelectorAll('.range-slider');
  rangeSlider.forEach((item) => {
    const inputs = item.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', displaySliderValues);
    });
  });
}

function displaySliderValues() {
  const gridCards = Array.from(document.querySelectorAll('.card'));

  // Get slider values
  const rangeSlider = document.querySelector('.range-slider');
  const slides = rangeSlider.querySelectorAll('input');
  const slide1 = +slides[0].value;
  const slide2 = +slides[1].value;

  const displayElement = rangeSlider.querySelector('.range-values');
  displayElement.innerHTML = '$' + slide1 + ' - $' + slide2;

  const filterResults = document.querySelector('.filters__results');
  let filterResultsSum = 0;

  products.forEach((item, index) => {
    gridCards[index].style.display = 'none';
    if (item.price > slide1 && item.price < slide2) {
      gridCards[index].style.display = '';
      filterResultsSum++;
    }
  });

  filterResults.textContent = `${filterResultsSum} results found`;
  filterResultsSum = 0;
}
