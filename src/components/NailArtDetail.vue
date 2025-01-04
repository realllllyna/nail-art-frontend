<template>
  <div class="nail-art-detail">
    <section v-if="nailArt">
      <h2 class="nail-art-title">{{ nailArt.title }}</h2>
      <img :src="nailArt.imageUrl" :alt="nailArt.title" class="nail-art-image" />
      
      <div class="nail-art-info">
        <p><strong>Category:</strong> {{ nailArt.category || 'No category' }}</p> <!-- Display the category directly -->
        <p><strong>Price:</strong> {{ nailArt.price }}€</p>
        <p><strong>Description:</strong> {{ nailArt.description }}</p>
        <p><strong>Artist:</strong> {{ nailArt.artist }}</p>
        <p><strong>Duration:</strong> {{ nailArt.duration }}</p>
        <p><strong>Color Options:</strong> {{ nailArt.colorOptions }}</p>
        <p><strong>Materials Used:</strong> {{ nailArt.materials }}</p>
        <p><strong>Aftercare Tips:</strong> {{ nailArt.aftercare }}</p>
        <p><strong>Allergy Warnings:</strong> {{ nailArt.allergyWarnings }}</p>
        <p><strong>Availability:</strong> {{ nailArt.availability }}</p>
      </div>

      <nav>
        <div class="action-buttons">
          <button @click="editNailArt">Edit</button>
          <button @click="deleteNailArt">Delete</button>
        </div>
      </nav>
    </section>

    <!-- Edit form to modify nail art details -->
    <div v-if="isEditing" class="edit-nail-art-form">
      <h3>Edit Nail Art: {{ nailArt.title }}</h3>

      <!-- Form fields with labels -->
      <label for="title">Nail Art Title:</label>
      <input v-model="editedNailArt.title" id="title" placeholder="Enter the title of the nail art" />

      <label for="price">Price (€):</label>
      <input v-model="editedNailArt.price" id="price" type="number" placeholder="Enter price" />

      <label for="imageUrl">Image URL:</label>
      <input v-model="editedNailArt.imageUrl" id="imageUrl" placeholder="Enter image URL" />

      <label for="description">Description:</label>
      <textarea v-model="editedNailArt.description" id="description" placeholder="Describe the nail art"></textarea>

      <label for="artist">Artist:</label>
      <input v-model="editedNailArt.artist" id="artist" placeholder="Enter the artist's name" />

      <label for="duration">Duration:</label>
      <input v-model="editedNailArt.duration" id="duration" placeholder="Enter duration in minutes" />

      <label for="colorOptions">Color Options:</label>
      <input v-model="editedNailArt.colorOptions" id="colorOptions" placeholder="Enter color options" />

      <label for="materials">Materials Used:</label>
      <input v-model="editedNailArt.materials" id="materials" placeholder="Enter materials used" />

      <label for="aftercare">Aftercare Tips:</label>
      <input v-model="editedNailArt.aftercare" id="aftercare" placeholder="Enter aftercare tips" />

      <label for="allergyWarnings">Allergy Warnings:</label>
      <input v-model="editedNailArt.allergyWarnings" id="allergyWarnings" placeholder="Enter allergy warnings" />

      <label for="availability">Availability:</label>
      <input v-model="editedNailArt.availability" id="availability" placeholder="Enter availability info" />

      <!-- Category Dropdown -->
      <label for="category">Category:</label>
      <select v-model="editedNailArt.category" id="category">
        <option value="Gel">Gel</option>
        <option value="Acrylic">Acrylic</option>
        <option value="Natural">Natural</option>
      </select>

      <button @click="updateNailArt">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
import api from "../services/api"; // API service for backend requests

export default {
  data() {
    return {
      nailArt: null, // Holds the nail art details
      isEditing: false, // Toggles edit mode
      editedNailArt: {}, // Stores the edited data
    };
  },
  async created() {
    try {
      const nailArtId = this.$route.params.id; // Get ID from route params
      const response = await api.get(`/entries/${nailArtId}`); // Fetch nail art details from the backend
      this.nailArt = response.data; // Populate nailArt
      this.editedNailArt = { ...this.nailArt }; // Prepare data for editing
    } catch (error) {
      console.error("Error fetching nail art details:", error);
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
        const response = await api.put(`/entries/${this.nailArt.id}`, this.editedNailArt);
        this.nailArt = response.data;
        this.isEditing = false;
        alert("Nail art updated successfully!");
      } catch (error) {
        console.error("Error updating nail art:", error);
      }
    },
    async deleteNailArt() {
      if (confirm(`Are you sure you want to delete "${this.nailArt.title}"?`)) {
        try {
          await api.delete(`/entries/${this.nailArt.id}`);
          alert(`Nail art "${this.nailArt.title}" deleted successfully!`);
          this.$router.push({ name: "Gallery" }); // Redirect after deletion
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
.edit-nail-art-form {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.edit-nail-art-form label {
  font-weight: bold;
  font-size: 0.85rem;  /* Smaller font size for labels */
  margin-bottom: 5px;
  display: block;
}

.edit-nail-art-form input, textarea, select {
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
