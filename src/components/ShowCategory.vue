<template>
  <div class="show-category">
    <h2>Categories</h2>
    <button @click="showAddCategoryForm" class="add-category-button">Add Category</button>
    <div class="category-grid">
      <div class="category-card" v-for="category in categories" :key="category.name">
        <img :src="category.image" alt="Category Image" class="category-image" />
        <h3>{{ category.name }}</h3>
        <p>Total Amount: <strong>{{ category.total }}</strong></p>
        <div class="button-group">
          <button @click="editCategory(category.name)" class="action-button">Edit</button>
          <button @click="deleteCategory(category.name)" class="action-button">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="isAdding" class="add-category-form">
      <h3>Add New Category</h3>
      <input v-model="newCategoryName" placeholder="Category Name" />
      <input v-model="newCategoryTotal" type="number" placeholder="Total Number" />
      <input v-model="newCategoryImage" placeholder="Image URL" />
      <button @click="addCategory">Save</button>
      <button @click="cancelAddCategory">Cancel</button>
    </div>

    <div v-if="isEditing" class="edit-category-form">
      <h3>Edit Category: {{ editCategoryName }}</h3>
      <input v-model="editCategoryName" placeholder="Category Name" />
      <input v-model="editCategoryTotal" type="number" placeholder="Total Number" />
      <input v-model="editCategoryImage" placeholder="Image URL" />
      <button @click="updateCategory">Save</button>
      <button @click="cancelEditCategory">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { name: 'Natural', total: 3, image: require('@/assets/natural.jpg') },
        { name: 'Acrylic', total: 2, image: require('@/assets/acrylic.jpg') },
        { name: 'Gel', total: 4, image: require('@/assets/gel.jpg') },
      ],
      isAdding: false,
      isEditing: false,
      newCategoryName: '',
      newCategoryTotal: 0,
      newCategoryImage: '',
      editCategoryName: '',
      editCategoryTotal: 0,
      editCategoryImage: '',
      currentEditingCategoryIndex: null,
    };
  },
  methods: {
    showAddCategoryForm() {
      this.isAdding = true;
      this.resetAddForm();
    },
    addCategory() {
      if (this.newCategoryName && this.newCategoryImage) {
        this.categories.push({
          name: this.newCategoryName,
          total: this.newCategoryTotal,
          image: this.newCategoryImage,
        });
        this.resetAddForm();
        this.isAdding = false;
      } else {
        alert('Please fill in all fields.');
      }
    },
    cancelAddCategory() {
      this.resetAddForm();
      this.isAdding = false;
    },
    editCategory(category) {
      this.isEditing = true;
      this.currentEditingCategoryIndex = this.categories.findIndex(c => c.name === category.name);
      this.editCategoryName = category.name;
      this.editCategoryTotal = category.total;
      this.editCategoryImage = category.image;
    },
    updateCategory() {
      if (this.editCategoryName && this.editCategoryImage) {
        if (this.currentEditingCategoryIndex !== null) {
          this.categories[this.currentEditingCategoryIndex] = {
            name: this.editCategoryName,
            total: this.editCategoryTotal,
            image: this.editCategoryImage,
          };
        }
        this.resetEditForm();
        this.isEditing = false;
      } else {
        alert('Please fill in all fields.');
      }
    },
    cancelEditCategory() {
      this.resetEditForm();
      this.isEditing = false;
    },
    deleteCategory(name) {
      this.categories = this.categories.filter(category => category.name !== name);
    },
    resetAddForm() {
      this.newCategoryName = '';
      this.newCategoryTotal = 0;
      this.newCategoryImage = '';
    },
    resetEditForm() {
      this.editCategoryName = '';
      this.editCategoryTotal = 0;
      this.editCategoryImage = '';
      this.currentEditingCategoryIndex = null;
    },
  },
};
</script>

<style scoped>
.show-category {
  padding: 20px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.category-card {
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

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  background-color: #ffedf3;
}

.category-image {
  max-width: 100%;
  border-radius: 20px;
  transition: transform 0.3s ease;
}

.add-category-form,
.edit-category-form {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.add-category-form input,
.edit-category-form input {
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>