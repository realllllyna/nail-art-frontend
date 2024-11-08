<template>
  <div>
    <h2>Gallery</h2>
    <div class="gallery">
      <div v-for="nailArt in nailArtList" :key="nailArt.id" class="nail-art-item">
        <img :src="nailArt.image" :alt="nailArt.name" />
        <h3>{{ nailArt.name }}</h3>
        <p>
          Price: <strong>{{ nailArt.price }}</strong>
        </p>
        <p class="description"> {{ nailArt.description }}</p>
        <router-link class="view-details" :to="'/nail-art/' + nailArt.id">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nailArtList: [
        { id: 1, name: 'Mystic Aurora', price: '30€', image: require('@/assets/image1.jpg'), description: 'A beautiful pinky design perfect for spring.' },
        { id: 2, name: 'Velvet Petals', price: '25€', image: require('@/assets/image2.jpg'), description: 'A soft, luxurious finish with a petal-like smoothness.' },
        { id: 3, name: 'Moonlit Gloss', price: '22€', image: require('@/assets/image3.jpg'), description: 'A subtle sparkle that adds elegance to any style.' },
        { id: 4, name: 'Iridescent Allure', price: '30€', image: require('@/assets/image4.jpg'), description: 'Captivating colors that shift with every angle.' },
        { id: 5, name: 'Celestial Spark', price: '35€', image: require('@/assets/image5.jpg'), description: 'Cosmic glitter that lights up your nails like stars.' },
        { id: 6, name: 'Opal Dream', price: '22€', image: require('@/assets/image6.jpg'), description: 'Soft, pearlescent hues with a dreamy, opalescent glow.' },
        { id: 7, name: 'Lush Lacquer', price: '28€', image: require('@/assets/image7.jpg'), description: 'Rich, deep colors with a flawless, glossy shine.' },
        { id: 8, name: 'Ethereal Polish', price: '25€', image: require('@/assets/image8.jpg'), description: 'Delicate, airy shades that feel almost otherworldly.' },
        { id: 9, name: 'Serenity Tips', price: '32€', image: require('@/assets/image9.jpg'), description: 'Calm, soothing tones for an effortlessly chic look.' },
        { id: 10, name: 'Blissful Hues', price: '30€', image: require('@/assets/image10.jpg'), description: 'Luxurious and opulent, adorned with crystals.' }
      ]
    };
  }
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
}

.nail-art-item {
  border: 2px solid #ffb3c6;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nail-art-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  background-color: #ffedf3;
}

.nail-art-item img {
  max-width: 100%;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.nail-art-item img:hover {
  transform: scale(1.1);
}

.nail-art-item .description {
  margin-top: 10px;
  font-size: 14px;
  color: #777;
  line-height: 1.5;
  font-weight: normal;
}

.nail-art-item .description::before {
  content: '🌸';
  margin-right: 5px;
}

.view-details {
  text-decoration: underline;
  color: #ff4382;
  cursor: pointer;
}
</style>