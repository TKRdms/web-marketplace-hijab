/* ==========================================
   SEARCH PRODUCT
========================================== */

const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        productCards.forEach(card => {

            const productName = card
                .querySelector(".product-info h3")
                .textContent
                .toLowerCase();

            if (productName.includes(keyword)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

/* ==========================================
   FILTER PRODUCT
========================================== */

const filterButtons = document.querySelectorAll(".filter button");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const category = this.textContent.toLowerCase();

        productCards.forEach(card => {

            const title = card
                .querySelector(".product-info h3")
                .textContent
                .toLowerCase();

            if (
                category === "semua" ||
                title.includes(category)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});

/* ==========================================
   PRODUCT HOVER EFFECT
========================================== */

productCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transition = ".3s";

    });

});

/* ==========================================
   READY
========================================== */

console.log("Products Loaded");