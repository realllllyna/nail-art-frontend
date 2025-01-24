<template>
  <div class="nail-art-detail">
    <section v-if="nailArt">
      <h2 class="nail-art-title">{{ nailArt.title }}</h2>
      <img :src="nailArt.imageUrl" :alt="nailArt.title" class="nail-art-image" />
      <div class="nail-art-info">
        <p><strong>Category:</strong> {{ nailArt.category ? nailArt.category.name : "No category" }}</p>
        <p><strong>Price:</strong> {{ nailArt.price }}€</p>
        <p><strong>Description:</strong> {{ nailArt.description }}</p>
      </div>
      <nav>
        <div class="action-buttons">
          <router-link :to="{ name: 'BookAppointment', params: { nailArtName: nailArt.title } }" class="btn">
            <button>Book Appointment</button>
          </router-link>
          <button @click="editNailArt">Edit</button>
          <button @click="deleteNailArt">Delete</button>
        </div>
      </nav>
    </section>
    <div v-if="isEditing" class="edit-nail-art-form">
      <h3>Edit Nail Art: {{ nailArt.title }}</h3>
      <form @submit.prevent="updateNailArt">
        <label for="title">Nail Art Title:</label>
        <input v-model="editedNailArt.title" id="title" placeholder="Enter title" />
        <label for="price">Price (€):</label>
        <input v-model="editedNailArt.price" id="price" type="number" placeholder="Enter price" />
        <label for="description">Description:</label>
        <textarea v-model="editedNailArt.description" id="description"></textarea>
        <button type="submit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import api, { ApiUrl } from "../services/api";

export default {
  data() {
    return {
      nailArt: null,
      isEditing: false,
      editedNailArt: {},
    };
  },
  async created() {
    try {
      const nailArtId = this.$route.params.id;
      const response = await api.get(`/entries/${nailArtId}`);
      this.nailArt = {
        ...response.data,
        imageUrl: response.data.imageUrl.startsWith("http")
          ? response.data.imageUrl
          : ApiUrl + response.data.imageUrl,
      };
      this.editedNailArt = { ...this.nailArt };
    } catch (error) {
      console.error("Error fetching nail art details:", error);
      alert("Failed to load details.");
    }
  },
  methods: {
    editNailArt() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedNailArt = { ...this.nailArt };
    },
    async updateNailArt() {
      try {
        await api.put(`/entries/${this.nailArt.id}`, this.editedNailArt);
        this.nailArt = { ...this.editedNailArt };
        this.isEditing = false;
        alert("Updated successfully!");
      } catch (error) {
        console.error("Error updating nail art:", error);
        alert("Failed to update. Try again.");
      }
    },
    async deleteNailArt() {
      if (confirm(`Are you sure you want to delete "${this.nailArt.title}"?`)) {
        try {
          await api.delete(`/entries/${this.nailArt.id}`);
          alert("Deleted successfully!");
          this.$router.push({ name: "Gallery" });
        } catch (error) {
          console.error("Error deleting nail art:", error);
        }
      }
    },
  },
};
</script>

<style scoped>
.nail-art-detail {
  padding: 20px;
}

.nail-art-info p {
  margin: 10px 0;
}

.edit-nail-art-form {
  margin-top: 20px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
}

.edit-nail-art-form label {
  font-weight: bold;
  margin-top: 10px;
}
</style>