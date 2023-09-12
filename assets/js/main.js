const container = document.getElementById("card-container");
const productWrapper = document.getElementById("product-wrapper");
const pagination = document.getElementById("pagination");
let currentPage = 1;
const cardsPerPage = 12;
let totalCards = 0;

// burgermenu.addEventListener("click", (e) => {
//   if (nav.classList.contains("active-nav")) {
//     nav.classList.remove("active-nav");
//     nav.classList.add("navigation");
//   }
// });

//end
function fetchData(skip, limit) {
  let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => {
      totalCards = data.total;
      const cards = data.products.map((item) => createCard(item));
      renderCards(cards);
      attachCardClickEvent(data.products);
      updatePaginationUI();
    })
    .catch((error) => {
      console.log(error);
      document.body.textContent = `An error ${error}`;
    });
}
window.onload = function pageloaded() {
  loaderActive();
};
function loaderActive() {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
}

function createCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.classList.add("main-img");
  img.src = item.thumbnail;
  card.appendChild(img);

  const topDesc = document.createElement("div");
  topDesc.classList.add("top-desc");

  const title = document.createElement("h2");
  title.classList.add("item-title");
  title.textContent = item.title;
  topDesc.appendChild(title);

  const price = document.createElement("h2");
  price.textContent = `${item.price} ₾`;
  topDesc.appendChild(price);

  card.appendChild(topDesc);

  const line = document.createElement("div");
  line.classList.add("line");
  card.appendChild(line);

  const bottomDesc = document.createElement("div");
  bottomDesc.classList.add("bottom-desc");

  const discount = document.createElement("h3");
  discount.classList.add("discount");
  discount.textContent = `-${item.discountPercentage}%`;
  bottomDesc.appendChild(discount);

  const rating = document.createElement("h3");
  rating.textContent = `Rating: ${item.rating}`;
  bottomDesc.appendChild(rating);

  card.appendChild(bottomDesc);
  const moreInf = document.createElement("h3");
  moreInf.classList.add("more-info");
  card.appendChild(moreInf);
  moreInf.textContent = "See More...";
  const likeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  likeSvg.setAttribute("class", "like");
  likeSvg.setAttribute("viewBox", "0 0 22 20");
  likeSvg.setAttribute(`data-id`, `${item.id}`);
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M19.8401 2.60999C19.3294 2.099 18.7229 1.69364 18.0555 1.41708C17.388 1.14052 16.6726 0.998169 15.9501 0.998169C15.2276 0.998169 14.5122 1.14052 13.8448 1.41708C13.1773 1.69364 12.5709 2.099 12.0601 2.60999L11.0001 3.66999L9.94012 2.60999C8.90843 1.5783 7.50915 0.998704 6.05012 0.998704C4.59109 0.998704 3.19181 1.5783 2.16012 2.60999C1.12843 3.64169 0.548828 5.04096 0.548828 6.49999C0.548828 7.95903 1.12843 9.3583 2.16012 10.39L3.22012 11.45L11.0001 19.23L18.7801 11.45L19.8401 10.39C20.3511 9.87924 20.7565 9.27281 21.033 8.60535C21.3096 7.93789 21.4519 7.22248 21.4519 6.49999C21.4519 5.77751 21.3096 5.0621 21.033 4.39464C20.7565 3.72718 20.3511 3.12075 19.8401 2.60999V2.60999Z"
  );
  likeSvg.appendChild(path);
  card.appendChild(likeSvg);
  const likeStatus = localStorage.getItem(`likeStatus_${item.id}`);
  if (likeStatus === "liked") {
    path.style.fill = "red";
  }
  likeSvg.addEventListener("click", () => {
    if (path.style.fill === "red") {
      path.style.fill = "";
      localStorage.setItem(`likeStatus_${item.id}`, "unliked");
    } else {
      path.style.fill = "red";
      localStorage.setItem(`likeStatus_${item.id}`, "liked");
    }
  });

  return card;
}

function renderCards(cards) {
  container.innerHTML = "";
  cards.forEach((card) => {
    container.appendChild(card);
  });
}

function updatePaginationUI() {
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  window.scrollTo({ top: 0, behavior: "smooth" });

  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageDiv = document.createElement("div");
    pageDiv.classList.add("page");

    const pageLink = document.createElement("a");
    pageLink.textContent = i;
    pageDiv.classList.add("page-number");

    if (i === currentPage) {
      pageDiv.classList.add("active");
      pageDiv.style.background = "#0052cc";
      pageLink.style.color = "#FFF";
    }

    pageDiv.addEventListener("click", () => {
      currentPage = i;
      updatePagination();
    });

    pagination.appendChild(pageDiv);
    pageDiv.appendChild(pageLink);
  }
}

function updatePagination() {
  const skip = (currentPage - 1) * cardsPerPage;
  const limit = cardsPerPage;
  fetchData(skip, limit);
}

function attachCardClickEvent(products) {
  const detail = document.querySelectorAll(".more-info");
  for (let i = 0; i < detail.length; i++) {
    detail[i].addEventListener("click", () => {
      const productParams = encodeURIComponent(JSON.stringify(products[i]));
      window.location.href = `assets/page/product.html?product=${productParams}`;
    });
  }
}

// Initial page load
updatePagination();
