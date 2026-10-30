
const products = [
    {
        id: 1,
        name: "Camiseta Oversized",
        price: 89.90,
        category: "camisetas",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
        id: 2,
        name: "Camiseta Premium",
        price: 119.90,
        category: "camisetas",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600"
    },
    {
        id: 3,
        name: "Calça Masculina",
        price: 189.90,
        category: "calcas",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"
    },
    {
        id: 4,
        name: "Calça Casual",
        price: 159.90,
        category: "calcas",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600"
    },
    {
        id: 5,
        name: "Tênis Street",
        price: 249.90,
        category: "tenis",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 6,
        name: "Tênis Casual",
        price: 299.90,
        category: "tenis",
        image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=600"
    },
    {
        id: 7,
        name: "Relógio Masculino",
        price: 199.90,
        category: "acessorios",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600"
    },
    {
        id: 8,
        name: "Óculos de Sol",
        price: 99.90,
        category: "acessorios",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    }
];

let cart = [];

const formatPrice = value =>
    value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

function displayProducts(category = "todos") {
    const list = document.getElementById("product-list");

    const filtered = category === "todos"
        ? products
        : products.filter(p => p.category === category);

    list.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}"
                 loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)}</p>
                <button class="add-button"
                    onclick="addToCart(${product.id})">
                    ADICIONAR AO CARRINHO
                </button>
            </div>
        </div>
    `).join("");
}

function filterProducts(category) {
    displayProducts(category);

    document.querySelectorAll(".category-buttons button")
        .forEach(button => {
            button.classList.toggle(
                "active",
                button.textContent.toLowerCase() === category ||
                (category === "todos" &&
                 button.textContent.toLowerCase() === "todos")
            );
        });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(id) {
    const item = cart.find(p => p.id === id);

    if (item) {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(p => p.id !== id);
        }
    }

    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, item) =>
        sum + item.quantity, 0);

    const total = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0);

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent =
        formatPrice(total);

    document.getElementById("cart-items").innerHTML =
        cart.length === 0
        ? "<p>Seu carrinho está vazio.</p>"
        : cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.quantity} x ${formatPrice(item.price)}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">
                    Remover
                </button>
            </div>
        `).join("");
}

function toggleCart() {
    document.getElementById("cart-sidebar")
        .classList.toggle("open");

    document.getElementById("cart-overlay")
        .classList.toggle("open");
}

function checkout() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = cart.reduce((sum, item) =>
        sum + item.price * item.quantity, 0);

    const message = cart.map(item =>
        `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}`
    ).join("\n");

    alert(
        "RESUMO DO PEDIDO\n\n" +
        message +
        "\n\nTOTAL: " + formatPrice(total) +
        "\n\nEste é um protótipo. Configure um meio de pagamento para receber pedidos."
    );
}

document.getElementById("newsletter-form")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        document.getElementById("newsletter-message")
            .textContent = "Cadastro recebido! Obrigado.";

        this.reset();
    });

displayProducts();
updateCart();
