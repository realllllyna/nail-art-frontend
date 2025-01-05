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

        <label for="image">Upload Image:</label>
        <input type="file" id="image" @change="handleFileUpload" required />

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
import api from "../services/api"; // API service for backend requests

export default {
  data() {
    return {
      nailArt: {
        title: '',
        categoryId: null,  // Store category as categoryId
        price: null,
        artist: '',
        duration: null,
        description: '',
        image: null,
        colorOptions: '',
        materials: '',
        aftercare: '',
        allergyWarnings: '',
        availability: ''
      },
      categories: [], // This will hold the categories fetched from the backend
    };
  },
  mounted() {
    // Fetch categories from the backend when the component is mounted
    this.fetchCategories();
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]; // Get the file
      if (file) {
        this.nailArt.image = file; // Store the file object
      }
    },
    async fetchCategories() {
      try {
        const response = await api.get('/categories'); // Make a GET request to fetch categories
        this.categories = response.data; // Store the categories in the local state
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async submitForm() {
      if (!this.isFormValid()) {
        alert('Please fill out all required fields.');
        return;
      }

      const formData = new FormData();
      formData.append('title', this.nailArt.title);
      formData.append('categoryId', this.nailArt.categoryId); // Use categoryId, not name
      formData.append('price', this.nailArt.price);
      formData.append('artist', this.nailArt.artist);
      formData.append('duration', this.nailArt.duration);
      formData.append('description', this.nailArt.description);
      formData.append('colorOptions', this.nailArt.colorOptions);
      formData.append('materials', this.nailArt.materials);
      formData.append('aftercare', this.nailArt.aftercare);
      formData.append('allergyWarnings', this.nailArt.allergyWarnings);
      formData.append('availability', this.nailArt.availability);
      
      if (this.nailArt.image) {
        formData.append('image', this.nailArt.image); // Append the actual file
      }

      try {
        const response = await api.post('/entries/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('New nail art added:', response.data);
        this.resetForm();
        alert('New nail art has been added successfully!');
      } catch (error) {
        console.error('Error adding new nail art:', error);
      }
    },
    isFormValid() {
      // Check if required fields are filled out
      return this.nailArt.title && this.nailArt.categoryId && this.nailArt.price && this.nailArt.artist && this.nailArt.duration && this.nailArt.description;
    },
    resetForm() {
      this.nailArt = {
        title: '',
        categoryId: null,
        price: null,
        artist: '',
        duration: null,
        description: '',
        image: null,
        colorOptions: '',
        materials: '',
        aftercare: '',
        allergyWarnings: '',
        availability: ''
      };
    },
  },
};
</script>
