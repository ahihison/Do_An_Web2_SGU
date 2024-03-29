const tenDoAn = "doanweb2";

let dssp = document.getElementById("phanTrangSP");
let dsSoTrang = document.getElementById("dsSoTrang");

const _WEB_ROOT = document.getElementById("_WEB_ROOT").value;

const categories = document.getElementsByName("categories");
const categoryValues = [];
const brands = document.getElementsByName("brands");
const brandValues = [];

const categoryCheckbox = document.querySelectorAll('input[name="categories"]');

for (var i = 0; i < categoryCheckbox.length; i++) {
  categoryCheckbox[i].addEventListener("change", filter);
}
const brandCheckbox = document.querySelectorAll('input[name="brands"]');

for (var i = 0; i < brandCheckbox.length; i++) {
  brandCheckbox[i].addEventListener("change", filter);
}

function checkedCategories() {
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].checked) {
      categoryValues.push(categories[i].value);
    }
  }
}
function checkedBrands() {
  for (var i = 0; i < brands.length; i++) {
    if (brands[i].checked) {
      brandValues.push(brands[i].value);
    }
  }
}

function phanTrang(vtt) {
  const currentUrl = window.location.origin + "/doanweb2";
  const relativeUrl = "/client/TrangSanPhamController/ajaxPhanTrang";
  const fullUrl = currentUrl + relativeUrl;

  const _WEB_ROOT = document.getElementById("_WEB_ROOT").value;

  fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "vtt=" + vtt,
  })
    .then((response) => response.json())
    .then((data) => {
      var products = data;
      giaoDienSanPham(products);
    })
    .catch((error) => {
      // Handle error
    });
}

function timKiem(text) {
  const currentUrl = window.location.origin + "/doanweb2";
  const relativeUrl = "/client/TrangSanPhamController/ajaxPhanTrang";
  const fullUrl = currentUrl + relativeUrl;
  console.log(fullUrl);

  const _WEB_ROOT = document.getElementById("_WEB_ROOT").value;

  fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "vtt=" + vtt,
  })
    .then((response) => response.json())
    .then((data) => {
      var products = data;
      var html = "";

      products.forEach(function (product) {
        html += "Hello";
      });
      dssp.innerHTML = html;
    })
    .catch((error) => {
      // Handle error
    });
}

function filter() {
  const currentUrl = window.location.origin + "/" + tenDoAn;
  const relativeUrl = "/client/TrangSanPhamController/filter";
  const fullUrl = currentUrl + relativeUrl;
  console.log(fullUrl);
  categoryValues.splice(0, categoryValues.length);
  brandValues.splice(0, categoryValues.length);
  checkedBrands();
  checkedCategories();

  const data = {
    category: categoryValues,
    brand: brandValues,
  };

  console.log(data);

  fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      var products = data.ds;
      const soTrang = data.soTrang;
      console.log(data);
      giaoDienSanPham(products); //In ra giao dien San Pham

      var trang = data.soTrang;
      var htmlTrang = "";
      for (let i = 1; i <= trang; i++) {
        htmlTrang += `<a class="active" onclick="phanTrangFilter(${
          i - 1
        })">${i}</a>`;
      }

      dsSoTrang.innerHTML = htmlTrang;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function phanTrangFilter(trang) {
  const currentUrl = window.location.origin + "/" + tenDoAn;
  const relativeUrl = "/client/TrangSanPhamController/filter";
  const fullUrl = currentUrl + relativeUrl;
  console.log(fullUrl);
  categoryValues.splice(0, categoryValues.length);
  brandValues.splice(0, categoryValues.length);
  checkedBrands();
  checkedCategories();

  const data = {
    category: categoryValues,
    brand: brandValues,
    trang: trang,
  };
  fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      var products = data.ds;
      const soTrang = data.soTrang;
      console.log(data);
      giaoDienSanPham(products); //In ra giao dien San Pham

      var trang = data.soTrang;
      var htmlTrang = "";
      for (let i = 1; i <= trang; i++) {
        htmlTrang += `<a class="active" onclick="phanTrangFilter(${
          i - 1
        })">${i}</a>`;
      }

      dsSoTrang.innerHTML = htmlTrang;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function giaoDienSanPham(products) {
  var html = "";
  products.forEach(function (product) {
    html += `
    <div class="col-lg-4 col-md-6 col-sm-6">
      <div class="product__item">
        <a class="link-product" href="${_WEB_ROOT}/chi-tiet">
          <div class="product__item__pic set-bg" style="background-image: url('${_WEB_ROOT}/public/assets/client/img/product/${product.img}');"  >
            <ul class="product__hover">
              <li><a href="#"><img src="${_WEB_ROOT}/public/assets/client/img/icon/heart.png" alt=""></a></li>
              <li><a href="#"><img src="${_WEB_ROOT}/public/assets/client/img/icon/compare.png" alt=""> <span>Compare</span></a></li>
              <li><a href="#"><img src="${_WEB_ROOT}/public/assets/client/img/icon/search.png" alt=""></a></li>
            </ul>
          </div>
        </a>
        <div class="product__item__text">
          <h6>${product.name}</h6>
          <a href="#" class="add-cart">+ Add To Cart</a>
          <div class="rating">
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
            <i class="fa fa-star-o"></i>
          </div>
          <h5>$${product.price}</h5>
          <div class="product__color__select">
            <label for="pc-4">
              <input type="radio" id="pc-4">
            </label>
            <label class="active black" for="pc-5">
              <input type="radio" id="pc-5">
            </label>
            <label class="grey" for="pc-6">
              <input type="radio" id="pc-6">
            </label>
          </div>
        </div>
      </div>
    </div>`;
  });
  dssp.innerHTML = html;
}
