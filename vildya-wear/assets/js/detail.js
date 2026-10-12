// ==========================
// DATA PRODUK
// ==========================

const products = {

    black: {
        name: "Voal Paris Premium Black",
        price: "Rp42.000",
        image: "assets/images/products/black.jpeg",
        material: "Voal Paris Premium",
        size: "110 × 110 cm",
        character: "Ringan, adem, mudah dibentuk",
        description: "Hijab voal premium warna Black yang elegan, ringan, adem, dan nyaman dipakai setiap hari."
    },

    white: {
        name: "Voal Paris Premium White",
        price: "Rp42.000",
        image: "assets/images/products/white.jpeg",
        material: "Voal Paris Premium",
        size: "110 × 110 cm",
        character: "Ringan, adem, mudah dibentuk",
        description: "Hijab voal premium warna White yang bersih dan elegan."
    },

    khaki: {
        name: "Voal Paris Premium Khaki",
        price: "Rp42.000",
        image: "assets/images/products/khaki.jpeg",
        material: "Voal Paris Premium",
        size: "110 × 110 cm",
        character: "Ringan, adem, mudah dibentuk",
        description: "Hijab voal premium warna Khaki yang hangat dan cocok untuk berbagai outfit."
    },

    vanilla: {
        name: "Voal Paris Premium Vanilla",
        price: "Rp42.000",
        image: "assets/images/products/vanilla.jpeg",
        material: "Voal Paris Premium",
        size: "110 × 110 cm",
        character: "Ringan, adem, mudah dibentuk",
        description: "Hijab voal premium warna Vanilla yang lembut dan anggun."
    },

    dustypink: {
        name: "Voal Paris Premium Dusty Pink",
        price: "Rp42.000",
        image: "assets/images/products/dusty-pink.jpeg",
        material: "Voal Paris Premium",
        size: "110 × 110 cm",
        character: "Ringan, adem, mudah dibentuk",
        description: "Hijab voal premium warna Dusty Pink yang feminin dan elegan."
    },

    cream: {
        name: "Voal Ultrafine Cream",
        price: "Rp38.000",
        image: "assets/images/products/cream.jpeg",
        material: "Voal Ultrafine",
        size: "110 × 110 cm",
        character: "Lembut, ringan, nyaman",
        description: "Hijab voal ultrafine warna Cream dengan tekstur halus dan nyaman."
    },

    coklatsusu: {
        name: "Voal Ultrafine Coklat Susu",
        price: "Rp38.000",
        image: "assets/images/products/coklat-susu.jpeg",
        material: "Voal Ultrafine",
        size: "110 × 110 cm",
        character: "Lembut, ringan, nyaman",
        description: "Hijab voal ultrafine warna Coklat Susu yang manis dan elegan."
    }

};

// ==========================
// AMBIL PARAMETER URL
// ==========================

const params = new URLSearchParams(window.location.search);

const id = params.get("id") || "black";

const product = products[id];

if(product){

    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").innerHTML = product.name;
    document.getElementById("product-price").innerHTML = product.price;
    document.getElementById("product-description").innerHTML = product.description;

    document.getElementById("spec-material").innerHTML = product.material;
    document.getElementById("spec-size").innerHTML = product.size;
    document.getElementById("spec-character").innerHTML = product.character;

}
// ==========================
// ADD TO CART
// ==========================

const addToCartBtn = document.getElementById("add-to-cart");

if (addToCartBtn && product) {

    addToCartBtn.addEventListener("click", () => {

        const quantityInput = document.getElementById("quantity");

        const quantity = quantityInput
            ? parseInt(quantityInput.value)
            : 1;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(item => item.id === id);

        if (existingProduct) {

            existingProduct.quantity += quantity;

        } else {

            cart.push({

                id: id,
                name: product.name,
                price: parseInt(product.price.replace(/[^\d]/g, "")),
                image: product.image,
                quantity: quantity

            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Produk berhasil ditambahkan ke keranjang!");

    });

}