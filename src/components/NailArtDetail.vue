<template>
  <div class="nail-art-detail">
    <h1>{{ nailArt.name }}</h1>
    <img :src="nailArt.imageUrl" :alt="nailArt.name" />
    <p><strong>Description:</strong> {{ nailArt.description }}</p>
    <p><strong>Price:</strong> {{ nailArt.price }} €</p>
    <button @click="goBack">Back to Gallery</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nailArt: {},
      ApiUrl: 'https://nail-art-backend.onrender.com',
    };
  },
  methods: {
    fetchNailArtDetail() {
      const id = this.$route.params.id;
      axios
        .get(`${this.ApiUrl}/api/nailart/${id}`)
        .then((response) => {
          const entry = response.data;
          this.nailArt = {
            id: entry.id,
            name: entry.title,
            price: entry.price,
            imageUrl: entry.imageUrl.startsWith('http')
              ? entry.imageUrl
              : this.ApiUrl + entry.imageUrl,
            description: entry.description,
          };
        })
        .catch((error) => {
          console.error('Error fetching nail art details:', error);
        });
    },
    goBack() {
      this.$router.push({ name: 'Gallery' });
    },
  },
  mounted() {
    this.fetchNailArtDetail();
  },
};
</script>

<style scoped>
/* Basic styles for the detail view */
.nail-art-detail {
  padding: 20px;
  text-align: center;
}
.nail-art-detail img {
  max-width: 300px;
  height: auto;
  border-radius: 8px;
}
</style>