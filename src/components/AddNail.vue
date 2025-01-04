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
        image: null, // Hier wird das Bild gespeichert
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];  // Datei auswählen
      const filePath = `/uploads/${file.name}`;  // Pfad im Uploads-Verzeichnis
      this.nailArt.image = filePath;  // Nur den Pfad im Backend speichern
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('name', this.nailArt.name);
      formData.append('category', this.nailArt.category);
      formData.append('description', this.nailArt.description);
      formData.append('imageUrl', this.nailArt.image);  // Nur den Pfad übergeben

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
    resetForm() {
      this.nailArt.name = '';
      this.nailArt.category = '';
      this.nailArt.description = '';
      this.nailArt.image = null;
    },
  },
};
</script>
