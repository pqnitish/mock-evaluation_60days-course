let categorySelect = document.getElementById("category-select");
let sortSelect = document.getElementById("sort-select");
let searchInput = document.getElementById("search-input");
let productList = document.getElementById("product-list");
console.log(categorySelect, sortSelect, searchInput, productList);
async function fetchCategoryData() {
  let res = await fetch("https://fakestoreapi.com/products/categories");
  let categoryData = await res.json();
  //console.log(categoryData);
  categoryData.forEach(function (ele, i) {
    let option = document.createElement("option");
    // console.log(ele);
    option.textContent = ele;
    option.value = ele;
    categorySelect.append(option);
  });
}
async function getProductData() {
  let url = "https://fakestoreapi.com/products";
  const category = categorySelect.value;
  const sort = sortSelect.value;
  const search = searchInput.value.toLowerCase();
  // console.log(category,sort,search);
  if (category) {
    url += `?category=${category}`;
  }
  if (search.trim() !== "") {
    url += `&title_like=${search}`;
  }
  if (sort) {
    url += `&_sort=price&_order=${sort}`;
  }

  productList.innerHTML = "";

  const response = await fetch(url);
  const products = await response.json();
  products.forEach((product) => {
    const productElem = document.createElement("div");
    productElem.classList.add("product");
    productElem.innerHTML = `';
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
    productList.append(productElem);
  });
}
categorySelect.addEventListener("change", getProductData);
sortSelect.addEventListener("change", getProductData);
searchInput.addEventListener("input", getProductData);

async function loadData() {
  await fetchCategoryData();
  await getProductData();
}
loadData();
