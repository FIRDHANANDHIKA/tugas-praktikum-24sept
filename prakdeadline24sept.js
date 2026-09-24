// Data Sepatu Adidas Original Suede
const products = [
  { id: 1, name: "Adidas Spezial Indigo", category: "spezial", price: 1600000, image: "https://cdn-images.farfetch-contents.com/23/85/18/66/23851866_53838165_1000.jpg" },
  { id: 2, name: "Adidas Spezial green", category: "spezial", price: 1650000, image: "https://down-id.img.susercontent.com/file/id-11134207-81ztc-me6rlj7rqvb4a9" },
  { id: 3, name: "Adidas Spezial Ice Blue", category: "spezial", price: 1750000, image: "https://down-id.img.susercontent.com/file/sg-11134201-7repe-m300tpfe5b590e" },
  { id: 4, name: "Adidas city series warzawa", category: "cityseries", price: 1800000, image: "https://static.ftshp.digital/img/p/7/6/0/3/8/4/760384.jpg" },
  { id: 5, name: "Adidas city series amsterdam biru", category: "cityseries", price: 1900000, image: "https://down-id.img.susercontent.com/file/id-11134207-7rasm-m15eqolain2a3d" },
  { id: 6, name: "Adidas city series london brown", category: "cityseries", price: 1800000, image: "https://cms-cdn.thesolesupplier.co.uk/2023/06/adidas-originals-london-brown-yellow-ig5406-front_w672_h672_pad_.jpg.webp" },
  { id: 7, name: "Adidas city series amsterdam merah", category: "cityseries", price: 1900000, image: "https://assets.solesense.com/en/images/products/500/adidas-amsterdam-anthology-pack-maroon-if9707_1.jpg" },
  { id: 8, name: "Adidas spezial cw oslo", category: "spezial", price: 1950000, image: "https://down-id.img.susercontent.com/file/id-11134207-7r98t-m0bb17aubarbcd" },
  { id: 9, name: "Adidas city series london taiwan", category: "cityseries", price: 1800000, image: "https://down-id.img.susercontent.com/file/id-11134207-81ztp-me3y9u2ss2kg18" },
  { id: 10, name: "Adidas city series bermuda ungu", category: "cityseries", price: 1900000, image: "https://tse1.mm.bing.net/th/id/OIP.-vYQzt4_ABGmZJBOli7HkgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 11, name: "Adidas spezial black-white", category: "spezial", price: 1950000, image: "https://i8.amplience.net/i/jpl/jd_099068_a?v=1" },
  { id: 12, name: "Adidas Spezial st-patrick", category: "spezial", price: 1950000, image: "https://down-id.img.susercontent.com/file/id-11134207-7qul3-lgih48cc36p4f3" },
  { id: 13, name: "Adidas Spezial red", category: "spezial", price: 1950000, image: "https://cdn-images.farfetch-contents.com/21/26/31/87/21263187_51160547_1000.jpg" },
  { id: 14, name: "Adidas gazelle indigo", category: "gazelle", price: 1950000, image: "https://2app.kicksonfire.com/kofapp/upload/events_images/ipad_adidas-gazelle-night-indigo-wonder-taupe-6.png" },
  { id: 15, name: "Adidas campus blue", category: "campus", price: 1950000, image: "https://tse4.mm.bing.net/th/id/OIP.lSBKlBtOJDMdyyp-RXXiyAHaFR?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" }
];

let cart = [];

// DOM Elements Selection
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartCount = document.getElementById('cartCount');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// 1. Fungsi Render Produk ke HTML (DOM Injection)
function renderProducts(items) {
  productGrid.innerHTML = "";

  if (items.length === 0) {
    productGrid.innerHTML = "<p>Sepatu tidak ditemukan.</p>";
    return;
  }

  items.forEach(product => {
    const card = document.createElement('div');
    card.className = "product-card";
    card.innerHTML = `
      <div>
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-img">
        </div>
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
      </div>
      <button class="btn btn-primary btn-block" onclick="addToCart(${product.id})">
        + Tambah Keranjang
      </button>
    `;
    productGrid.appendChild(card);
  });
}

// 2. Fungsi Filter Kategori
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.getAttribute('data-category');
    if (category === 'all') {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered);
    }
  });
});

// 3. Fungsi Pencarian (Search Input)
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// 4. Fitur Keranjang Belanja (DOM Array Operations)
window.addToCart = function(productId) {
  const item = products.find(p => p.id === productId);
  cart.push(item);
  updateCartUI();
};

function updateCartUI() {
  cartCount.textContent = cart.length;
  cartItemsList.innerHTML = "";
  
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}</span> <span>Rp ${item.price.toLocaleString('id-ID')}</span>`;
    cartItemsList.appendChild(li);
  });

  cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// 5. Toggle Hamburger Menu (Mobile Navigation)
hamburgerBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 6. Modal Interaksi Keranjang
cartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeModal.addEventListener('click', () => cartModal.classList.remove('active'));

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Keranjang kamu masih kosong!");
    return;
  }
  alert("Pesanan kamu diproses! Mengalihkan ke admin WhatsApp...");
  cart = [];
  updateCartUI();
  cartModal.classList.remove('active');
});

// Inisialisasi awal saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});

const themeToggleBtn = document.getElementById('themeToggle');

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      themeToggleBtn.innerHTML = '☀️ Mode Terang';
    } else {
      themeToggleBtn.innerHTML = '🌙 Mode Gelap';
    }
  });
}