<template>
  <div class="add-nail">
    <h2>Add New Nail Art</h2>
    <section>
      <form @submit.prevent="submitForm">

        <label for="name">Name:</label>
        <input type="text" id="name" v-model="nailArt.name" required />

        <label for="category">Category:</label>
        <select id="category" v-model="nailArt.category" required>
          <option value="" disabled>Select a category</option>
          <option value="Acrylic">Acrylic</option>
          <option value="Gel">Gel</option>
          <option value="Natural">Natural</option>
        </select>

        <label for="description">Description:</label>
        <textarea id="description" v-model="nailArt.description" required></textarea>

        <label for="image">Upload Image:</label>
        <input type="file" id="image" @change="handleFileUpload" />

        <button type="submit">Save</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nailArt: {
        name: '',
        category: '',
        description: '',
        image: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.nailArt.image = event.target.files[0];
    },
    handleSubmit() {
      alert("A new nail art has been successfully added!");
    },
    submitForm() {
      console.log('Nail art added:', this.nailArt);
      this.resetForm();
      this.handleSubmit();
    },
    resetForm() {
      this.nailArt.name = '';
      this.nailArt.category = '';
      this.nailArt.description = '';
      this.nailArt.image = null;
    },
  },
};
</script>