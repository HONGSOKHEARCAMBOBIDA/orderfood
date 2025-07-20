<template>
  <div class="cart-container">
    <h3 class="cart-header">
      Cart ({{ totalQuantity }} {{ totalQuantity > 1 ? 'items' : 'item' }})
    </h3>
    <ul class="cart-list" v-if="cart.items.length">
      <li v-for="item in cart.items" :key="item.id" class="cart-item">
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">\${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="item-quantity">
          <button @click="decreaseQuantity(item)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item)">+</button>
        </div>
      </li>
    </ul>
    <p v-else class="empty-message">Your cart is empty.</p>

    <div class="cart-footer" v-if="cart.items.length">
      <strong>Total: \${{ totalPrice.toFixed(2) }}</strong>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'
import { computed } from 'vue'

const cart = useCartStore()

// Computed total quantity
const totalQuantity = computed(() =>
  cart.items.reduce((acc, item) => acc + item.quantity, 0)
)

// Computed total price
const totalPrice = computed(() =>
  cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
)

// Methods to increase or decrease quantity
function increaseQuantity(item) {
  cart.updateQuantity(item.id, item.quantity + 1)
}

function decreaseQuantity(item) {
  if (item.quantity > 1) {
    cart.updateQuantity(item.id, item.quantity - 1)
  } else {
    cart.removeItem(item.id)
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 400px;
  margin: 1rem auto;
  padding: 1rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cart-header {
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 0.3rem;
  color: #333;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #222;
}

.item-name {
  font-weight: 500;
}

.item-price {
  font-weight: 600;
  color: #4caf50;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-quantity button {
  background-color: #4caf50;
  border: none;
  color: white;
  font-weight: bold;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;
}

.item-quantity button:hover {
  background-color: #388e3c;
}

.empty-message {
  text-align: center;
  color: #999;
  font-style: italic;
}

.cart-footer {
  text-align: right;
  font-size: 1.2rem;
  color: #111;
}
</style>
