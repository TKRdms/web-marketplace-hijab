// ==========================================
// VILDYA WEAR CART
// ==========================================

const cartItems = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");

const SHIPPING_COST = 15000;

// ==========================================
// AMBIL DATA CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================================
// FORMAT RUPIAH
// ==========================================

function formatRupiah(number){

    return "Rp" + number.toLocaleString("id-ID");

}

// ==========================================
// SIMPAN CART
// ==========================================

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

}

// ==========================================
// HITUNG TOTAL
// ==========================================

function updateSummary(){

    let subtotal = 0;

    cart.forEach(item => {

        subtotal += item.price * item.quantity;

    });

    subtotalElement.textContent = formatRupiah(subtotal);

    totalElement.textContent =
        formatRupiah(subtotal + SHIPPING_COST);

}
// ==========================================
// TAMPILKAN KERANJANG
// ==========================================

function renderCart(){

    cartItems.innerHTML = "";

    if(cart.length === 0){

        cartItems.innerHTML = `

        <tr>

            <td colspan="5">

                <div class="empty-cart">

                    Keranjang masih kosong.

                </div>

            </td>

        </tr>

        `;

        updateSummary();

        return;

    }

    cart.forEach((item,index)=>{

        cartItems.innerHTML += `

        <tr>

            <td>

                <div class="product-info">

                    <img src="${item.image}" alt="${item.name}">

                    <div>

                        <h4>${item.name}</h4>

                        <small>Premium Hijab</small>

                    </div>

                </div>

            </td>

            <td>${formatRupiah(item.price)}</td>

            <td>

                <div class="quantity-box">

                    <button onclick="decreaseQty(${index})">-</button>

                    <input
                        type="number"
                        min="1"
                        value="${item.quantity}"
                        onchange="changeQty(${index}, this.value)">

                    <button onclick="increaseQty(${index})">+</button>

                </div>

            </td>

            <td>

                ${formatRupiah(item.price * item.quantity)}

            </td>

            <td>

                <button
                    class="delete-btn"
                    onclick="removeItem(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updateSummary();

}
// ==========================================
// TAMBAH JUMLAH
// ==========================================

function increaseQty(index){

    cart[index].quantity++;

    saveCart();

    renderCart();

}

// ==========================================
// KURANGI JUMLAH
// ==========================================

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

        saveCart();

        renderCart();

    }

}

// ==========================================
// INPUT JUMLAH
// ==========================================

function changeQty(index,value){

    value = parseInt(value);

    if(isNaN(value) || value < 1){

        value = 1;

    }

    cart[index].quantity = value;

    saveCart();

    renderCart();

}

// ==========================================
// HAPUS PRODUK
// ==========================================

function removeItem(index){

    if(confirm("Hapus produk dari keranjang?")){

        cart.splice(index,1);

        saveCart();

        renderCart();

    }

}

// ==========================================
// LOAD PERTAMA
// ==========================================

renderCart();

console.log("Cart Loaded Successfully");