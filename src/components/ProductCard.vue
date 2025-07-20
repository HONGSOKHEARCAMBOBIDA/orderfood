<template>
  <div class="food-card" @click="showDetails">
    <div class="food-image">
      <img :src="product.image" :alt="product.name" />
      <div class="food-tag" v-if="product.tag">{{ product.tag }}</div>
    </div>
    <div class="food-info">
      <h3 class="food-name">{{ product.name }}</h3>
      <p class="food-description">{{ product.description }}</p>
      <div class="food-footer">
        <div class="price-rating">
          <span class="price">\${{ product.price.toFixed(2) }}</span>
          <span class="rating" v-if="product.rating">
            <i class="star">★</i> {{ product.rating }}
          </span>
        </div>
        <button 
          class="add-btn" 
          @click.stop="addToCart(product)"
          :disabled="product.outOfStock"
        >
          {{ product.outOfStock ? 'Sold Out' : 'Add +' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cart = useCartStore()

const addToCart = (product) => {
  if (!product.outOfStock) {
    cart.addToCart(product)
  }
}

const showDetails = () => {
  // Emit event or navigate to product details
  console.log('Show details for:', props.product.name)
}
</script>

<style scoped>
.food-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  margin-bottom: 16px;
}

.food-card:hover {
  transform: translateY(-4px);
}

.food-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 60%; /* Aspect ratio */
  overflow: hidden;
}

.food-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.food-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ff7e33;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.food-info {
  padding: 12px;
}

.food-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
}

.food-description {
  font-size: 13px;
  color: #666;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.food-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-rating {
  display: flex;
  flex-direction: column;
}

.price {
  font-weight: bold;
  color: #ff7e33;
  font-size: 16px;
}

.rating {
  font-size: 12px;
  color: #666;
  display: flex;
  align-items: center;
}

.star {
  color: #ffc107;
  margin-right: 2px;
}

.add-btn {
  background: #ff7e33;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.add-btn:hover {
  background: #e66a2a;
}

.add-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>