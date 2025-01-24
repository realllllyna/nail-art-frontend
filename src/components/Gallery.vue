<template>
  <div class="gallery">
    <h1>Nail Art Gallery</h1>
    <div class="nail-art-list">
      <div
        v-for="nail in nailArtList"
        :key="nail.id"
        class="nail-art-card"
      >
        <img :src="nail.imageUrl" :alt="nail.name" />
        <h2>{{ nail.name }}</h2>
        <p>{{ nail.description }}</p>
        <p><strong>Price:</strong> {{ nail.price }} €</p>
        <button @click="viewDetails(nail.id)">View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nailArtList: [],
      ApiUrl: 'https://nail-art-backend.onrender.com',
    };
  },
  methods: {
    fetchNailArtList() {
      axios
        .get(`${this.ApiUrl}/api/nailart`)
        .then((response) => {
          this.nailArtList = response.data.map((entry) => ({
            id: entry.id,
            name: entry.title,
            price: entry.price,
            imageUrl: entry.imageUrl.startsWith('http')
              ? entry.imageUrl
              : this.ApiUrl + entry.imageUrl,
            description: entry.description,
          }));
        })
        .catch((error) => {
          console.error('Error fetching nail art list:', error);
        });
    },
    viewDetails(id) {
      this.$router.push({ name: 'NailArtDetail', params: { id } });
    },
  },
  mounted() {
    this.fetchNailArtList();
  },
};
</script>

<style scoped>
/* Basic styles for the gallery */
.gallery {
  padding: 20px;
}
.nail-art-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.nail-art-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  width: 200px;
}
.nail-art-card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>