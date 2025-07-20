<template>
  <div>
    <h2>Table {{ tableId }}</h2>
    <ProductCard v-for="item in menu" :key="item.id" :product="item" />
    <Cart />

    <button class="submit-btn" @click="submitOrder">
      Submit Order
    </button>
  </div>
</template>
<style scoped>
.submit-btn {
  display: block;       /* Make button behave like block element */
  width: 100%;          /* Take full width of parent container */
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  border: none;
  color: white;
  padding: 12px 0;      /* padding left/right removed to fit full width nicely */
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(46, 125, 50, 0.4);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
  text-align: center;   /* Center the text inside the button */
}

.submit-btn:hover {
  background: linear-gradient(135deg, #66bb6a, #388e3c);
  box-shadow: 0 8px 16px rgba(56, 142, 60, 0.6);
}

.submit-btn:active {
  background: linear-gradient(135deg, #388e3c, #2e7d32);
  box-shadow: 0 4px 8px rgba(46, 125, 50, 0.3);
  transform: translateY(1px);
}
</style>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import Cart from '../components/Cart.vue'
import { useCartStore } from '../store/cart'
import { useRoute } from 'vue-router'

const cart = useCartStore()
const route = useRoute()
const tableId = route.params.tableId

const menu = [
  { id: 1, name: 'បាយឆា', price: 20000,image: 'https://i.pinimg.com/1200x/81/33/aa/8133aa474d008e3ba0d96d1c4ee67f8d.jpg' },
  { id: 2, name: 'សាចគោអាំង', price: 5000 ,image:'https://i.pinimg.com/1200x/18/4c/8a/184c8a6fdf21e1f09dfbee431d7bc802.jpg'},
  { id: 3, name: 'ប្រហិតអាំង', price: 2000 ,image: 'https://i.pinimg.com/1200x/e7/b7/00/e7b700b6903d74c4384377183886a9b0.jpg'},
]

const webhookURL = 'https://script.google.com/macros/s/AKfycbxYj7yF5sjAFWYo677DVRvsHodJ7XZc_AD5VUE4qSV8VdPKXflVIgan0tdZKE54_SrU/exec'

async function submitOrder() {
  if (cart.items.length === 0) {
    alert('Cart is empty!');
    return;
  }

  const botToken = '8115160829:AAHGGyEdHc7LVaS9gZ3P3hhIkYLbDy8qZE4';
  const chatId = '6472821884'; // Your Telegram chat or group ID

  // Format the order message
  let message = `🛎️ New order from Table #${tableId}:\n`;
  cart.items.forEach(item => {
    message += `- ${item.name} x ${item.quantity}\n`;
  });

  // Telegram sendMessage API URL
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const res = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown' // optional, for better formatting
      }),
    });

    const data = await res.json();
    if (data.ok) {
      alert('Order sent to Telegram!');
      cart.clearCart();
    } else {
      alert('Failed to send order to Telegram');
      console.error(data);
    }
  } catch (error) {
    alert('Error sending order to Telegram');
    console.error(error);
  }
}




</script>