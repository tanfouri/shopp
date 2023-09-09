// script.js
document.addEventListener("DOMContentLoaded", function () {
    const decreaseButtons = document.querySelectorAll(".decrease");
    const increaseButtons = document.querySelectorAll(".increase");
    const deleteButtons = document.querySelectorAll(".delete");
    const likeButtons = document.querySelectorAll(".like");
    const totalPriceSpan = document.getElementById("total-price");

    let total = 10.00; // Initial total price
    let likedItems = new Set();

    decreaseButtons.forEach((button) => {
        button.addEventListener("click", decreaseQuantity);
    });

    increaseButtons.forEach((button) => {
        button.addEventListener("click", increaseQuantity);
    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteItem);
    });

    likeButtons.forEach((button) => {
        button.addEventListener("click", toggleLike);
    });

    function decreaseQuantity(event) {
        const quantityElement = event.target.nextElementSibling;
        const priceElement = event.target.parentElement.parentElement.querySelector("p");
        const price = parseFloat(priceElement.textContent.split("$")[1]);
        const quantity = parseInt(quantityElement.textContent);

        if (quantity > 1) {
            quantityElement.textContent = quantity - 1;
            total -= price;
            updateTotalPrice();
        }
    }

    function increaseQuantity(event) {
        const quantityElement = event.target.previousElementSibling;
        const priceElement = event.target.parentElement.parentElement.querySelector("p");
        const price = parseFloat(priceElement.textContent.split("$")[1]);
        const quantity = parseInt(quantityElement.textContent);

        quantityElement.textContent = quantity + 1;
        total += price;
        updateTotalPrice();
    }

    function deleteItem(event) {
        const item = event.target.parentElement;
        const priceElement = item.querySelector("p");
        const price = parseFloat(priceElement.textContent.split("$")[1]);
        const quantityElement = item.querySelector(".quantity-value");
        const quantity = parseInt(quantityElement.textContent);

        total -= price * quantity;
        updateTotalPrice();
        item.remove();
    }

    function toggleLike(event) {
        const likeButton = event.target;
        likeButton.classList.toggle("liked");

        if (likeButton.classList.contains("liked")) {
            likedItems.add(likeButton.parentElement.querySelector("h2").textContent);
        } else {
            likedItems.delete(likeButton.parentElement.querySelector("h2").textContent);
        }
    }

    function updateTotalPrice() {
        totalPriceSpan.textContent = total.toFixed(2);
    }
});
