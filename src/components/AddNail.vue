<template>
  <div class="add-nail">
    <h2>Add New Nail Art</h2>
    <section>
      <form @submit.prevent="submitForm">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="nailArt.title" required />

        <label for="category">Category:</label>
        <select id="category" v-model="nailArt.categoryId" required>
          <option value="" disabled>Select a category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <label for="price">Price (€):</label>
        <input type="number" id="price" v-model="nailArt.price" required />

        <label for="artist">Artist:</label>
        <input type="text" id="artist" v-model="nailArt.artist" required />

        <label for="duration">Duration (in minutes):</label>
        <input type="number" id="duration" v-model="nailArt.duration" required />

        <label for="description">Description:</label>
        <textarea id="description" v-model="nailArt.description" required></textarea>

        <label for="imageUrl">Image Path:</label>
        <input type="text" id="imageUrl" v-model="nailArt.imageUrl" required placeholder="/uploads/image3.jpg" />

        <label for="colorOptions">Color Options:</label>
        <textarea id="colorOptions" v-model="nailArt.colorOptions"></textarea>

        <label for="materials">Materials Used:</label>
        <textarea id="materials" v-model="nailArt.materials"></textarea>

        <label for="aftercare">Aftercare Tips:</label>
        <textarea id="aftercare" v-model="nailArt.aftercare"></textarea>

        <label for="allergyWarnings">Allergy Warnings:</label>
        <textarea id="allergyWarnings" v-model="nailArt.allergyWarnings"></textarea>

        <label for="availability">Availability:</label>
        <input type="text" id="availability" v-model="nailArt.availability" />

        <button type="submit">Save</button>
      </form>
    </section>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      nailArt: {
        title: "",
        categoryId: null,
        price: null,
        artist: "",
        duration: null,
        description: "",
        imageUrl: "", // Ensure this matches the template
        colorOptions: "",
        materials: "",
        aftercare: "",
        allergyWarnings: "",
        availability: "",
      },
      categories: [],
    };
  },
  async mounted() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.get("/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories. Please refresh the page.");
      }
    },
    isFormValid() {
      return (
        this.nailArt.title &&
        this.nailArt.categoryId &&
        this.nailArt.price &&
        this.nailArt.imageUrl &&
        this.nailArt.artist &&
        this.nailArt.duration &&
        this.nailArt.description
      );
    },
    resetForm() {
      this.nailArt = {
        title: "",
        categoryId: null,
        price: null,
        artist: "",
        duration: null,
        description: "",
        imageUrl: "",
        colorOptions: "",
        materials: "",
        aftercare: "",
        allergyWarnings: "",
        availability: "",
      };
    },
    async submitForm() {
      if (!this.isFormValid()) {
        alert("Please fill out all required fields.");
        return;
      }

      const payload = {
        ...this.nailArt,
        categoryId: parseInt(this.nailArt.categoryId, 10),
        price: parseFloat(this.nailArt.price),
        duration: parseInt(this.nailArt.duration, 10),
        imageUrl: this.nailArt.imageUrl,
      };

      try {
        console.log("Submitting data:", payload);
        const response = await api.post("/entries/add", payload, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("New nail art added:", response.data);
        this.$emit("nailArtAdded");
        this.resetForm();
        alert("New nail art has been added successfully!");
      } catch (error) {
        console.error(
          "Error adding new nail art:",
          error.response?.data || error.message
        );
        alert(
          `Error adding new nail art: ${
            error.response?.data?.error || "Please try again."
          }`
        );
      }
    },
  },
};
</script>