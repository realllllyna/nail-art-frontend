<template>
  <div>
    <h2>Gallery</h2>
    <div class="gallery">
      <div v-for="nailArt in nailArtList" :key="nailArt.id" class="nail-art-item">
        <img :src="nailArt.imageUrl" :alt="nailArt.name" />
        <h3>{{ nailArt.name }}</h3>
        <p>Price: <strong>{{ nailArt.price }}€</strong></p>
        <p class="description">{{ nailArt.description }}</p>
        <router-link class="view-details" :to="'/nail-art/' + nailArt.id">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api, { ApiUrl } from "../services/api";

export default {
  data() {
    return {
      nailArtList: [],
    };
  },
  async created() {
    try {
      const response = await api.get("/entries");
      this.nailArtList = response.data.map((entry) => ({
        id: entry.id,
        name: entry.title,
        price: entry.price,
        imageUrl: entry.imageUrl.startsWith("http")
          ? entry.imageUrl
          : ApiUrl + entry.imageUrl,
        description: entry.description,
      }));
    } catch (error) {
      console.error("Error fetching entries:", error);
      alert("Failed to load gallery. Please try again later.");
    }
  },
};
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
}

.view-details {
  text-decoration: underline;
  color: #ff4382;
  cursor: pointer;
}
</style>