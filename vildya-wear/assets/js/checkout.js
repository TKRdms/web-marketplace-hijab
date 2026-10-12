/* ==========================================
   VILDYA WEAR CHECKOUT
========================================== */

const SHIPPING_COST = 15000;
const FREE_SHIPPING_MIN = 4;

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const subtotalElement = document.querySelector(".subtotal");
const shippingElement = document.querySelector(".shipping");
const totalElement = document.querySelector(".total");

const checkoutForm = document.getElementById("checkoutForm");

const popupOverlay = document.getElementById("popupOverlay");
const loadingOverlay = document.getElementById("loadingOverlay");

const confirmPopup = document.getElementById("confirmPopup");
const cancelPopup = document.getElementById("cancelPopup");

const agreeCheckbox = document.getElementById("agree");

/* ==========================================
   HITUNG TOTAL
========================================== */

let subtotal = 0;
let totalQuantity = 0;

cart.forEach(item => {

    subtotal += item.price * item.quantity;
    totalQuantity += item.quantity;

});

const shipping =
    totalQuantity >= FREE_SHIPPING_MIN
        ? 0
        : SHIPPING_COST;

const total = subtotal + shipping;

/* ==========================================
   FORMAT RUPIAH
========================================== */

function formatRupiah(number){

    return "Rp" + number.toLocaleString("id-ID");

}

/* ==========================================
   TAMPILKAN RINGKASAN
========================================== */

if(subtotalElement){

    subtotalElement.textContent =
        formatRupiah(subtotal);

}

if(shippingElement){

    shippingElement.textContent =
        shipping === 0
            ? "Gratis 🎉"
            : formatRupiah(shipping);

}

if(totalElement){

    totalElement.textContent =
        formatRupiah(total);

}

/* ==========================================
   TOAST
========================================== */

function showToast(message,type="success"){

    const oldToast =
        document.querySelector(".toast");

    if(oldToast){

        oldToast.remove();

    }

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },2500);

}
/* ==========================================
   CHECKOUT
========================================== */

let whatsappURL = "";

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();

        const paymentMethod = document.querySelector(
            'input[name="payment"]:checked'
        ).value;

        /* ==========================
           VALIDASI
        ========================== */

        if (cart.length === 0) {

            showToast("🛒 Keranjang masih kosong.", "error");
            return;

        }

        if (name === "") {

            showToast("Masukkan nama terlebih dahulu.", "error");
            return;

        }

        if (phone === "") {

            showToast("Masukkan nomor HP.", "error");
            return;

        }

        if (address === "") {

            showToast("Masukkan alamat.", "error");
            return;

        }

        if (!agreeCheckbox.checked) {

            showToast(
                "Centang persetujuan terlebih dahulu.",
                "error"
            );

            return;

        }

        /* ==========================
           DAFTAR PRODUK
        ========================== */

        let productList = "";

        cart.forEach(item => {

            productList +=
`• ${item.name}
Jumlah : ${item.quantity}
Subtotal : ${formatRupiah(item.price * item.quantity)}

`;

        });

        /* ==========================
           CATATAN PEMBAYARAN
        ========================== */

        let paymentNote = "";

        if (paymentMethod === "Transfer Bank") {

            paymentNote =
                "Mohon kirimkan nomor rekening untuk pembayaran.";

        }

        else if (paymentMethod === "QRIS") {

            paymentNote =
                "Mohon kirimkan kode QRIS untuk pembayaran.";

        }

        else {

            paymentNote =
                "Saya memilih pembayaran COD.";

        }

        /* ==========================
           PESAN WHATSAPP
        ========================== */

        const message =
`Halo Vildya Wear 👋

Saya ingin melakukan pemesanan.

━━━━━━━━━━━━━━

Nama :
${name}

No HP :
${phone}

Alamat :
${address}

━━━━━━━━━━━━━━

Pesanan

${productList}
━━━━━━━━━━━━━━

Subtotal :
${formatRupiah(subtotal)}

Ongkir :
${shipping === 0 ? "Gratis 🎉" : formatRupiah(shipping)}

Total :
${formatRupiah(total)}

━━━━━━━━━━━━━━

Metode Pembayaran :
${paymentMethod}

${paymentNote}

Terima kasih 😊`;

        const whatsappNumber = "6281169100841";

        whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        /* ==========================
           TAMPILKAN POPUP
        ========================== */

        popupOverlay.style.display = "flex";

    });

}
/* ==========================================
   POPUP BUTTON
========================================== */

if (cancelPopup) {

    cancelPopup.addEventListener("click", () => {

        popupOverlay.style.display = "none";

    });

}

if (confirmPopup) {

    confirmPopup.addEventListener("click", () => {

        popupOverlay.style.display = "none";

        loadingOverlay.style.display = "flex";

        showToast("Pesanan berhasil disiapkan! 💖");

        setTimeout(() => {

            loadingOverlay.style.display = "none";

            window.open(
                whatsappURL,
                "_blank"
            );

            // Kosongkan keranjang
            localStorage.removeItem("cart");

            // Kembali ke halaman utama
            setTimeout(() => {

                window.location.href = "index.html";

            }, 500);

        }, 1200);

    });

}

/* ==========================================
   TUTUP POPUP SAAT KLIK LUAR
========================================== */

if (popupOverlay) {

    popupOverlay.addEventListener("click", function (e) {

        if (e.target === popupOverlay) {

            popupOverlay.style.display = "none";

        }

    });

}

/* ==========================================
   PROMO ONGKIR
========================================== */

const summaryCard = document.querySelector(".checkout-card:last-of-type");

if (summaryCard) {

    const note = document.createElement("p");

    note.className = "shipping-note";

    if (totalQuantity >= FREE_SHIPPING_MIN) {

        note.innerHTML =
            "Selamat! Pesanan Anda mendapatkan <b>GRATIS ONGKIR</b>.";

    } else {

        const remain = FREE_SHIPPING_MIN - totalQuantity;

        note.innerHTML =
            `🚚 Tambah <b>${remain} hijab</b> lagi untuk mendapatkan <b>GRATIS ONGKIR</b>.`;

    }

    summaryCard.appendChild(note);

}

console.log("✅ Checkout Loaded");