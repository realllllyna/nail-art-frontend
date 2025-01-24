<template>
  <div class="show-category">
    <h2>Categories</h2>
    <button @click="showAddCategoryForm" class="add-category-button">+ Add Category</button>
    <div class="category-grid">
      <div class="category-card" v-for="category in categories" :key="category.id">
        <h3>{{ category.name }}</h3>
        <p class="description">{{ category.description }}</p>
        <p>Number of Nails: <strong>{{ category.entries?.length || 0 }}</strong></p>
        <div class="button-group">
          <button @click="editCategory(category)" class="action-button">Edit</button>
          <button @click="deleteCategory(category.id, category.name)" class="action-button">Delete</button>
        </div>
      </div>
    </div>

    <div v-if="isAdding" class="add-category-form">
      <h3>Add New Category</h3>
      <input v-model="newCategoryName" placeholder="Category Name" />
      <textarea v-model="newCategoryDescription" placeholder="Category Description"></textarea>
      <button @click="addCategory">Save</button>
      <button @click="cancelAddCategory">Cancel</button>
    </div>

    <div v-if="isEditing" class="edit-category-form">
      <h3>Edit Category</h3>
      <input v-model="editCategoryName" placeholder="Category Name" />
      <input v-model="editCategoryDescription" placeholder="Category Description" />
      <button @click="updateCategory">Save</button>
      <button @click="cancelEditCategory">Cancel</button>
    </div>
  </div>
</template>

<script>
import api, { ApiUrl } from "../services/api"; // Use pre-configured axios instance

export default {
  data() {
    return {
      categories: [],
      isAdding: false,
      isEditing: false,
      newCategoryName: '',
      newCategoryDescription: '',
      editCategoryName: '',
      editCategoryDescription: '',
      currentEditingCategoryId: null,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.get('/categories'); // No need to include the full URL
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to fetch categories. Please try again later.');
      }
    },
    showAddCategoryForm() {
      this.isAdding = true;
      this.newCategoryName = '';
      this.newCategoryDescription = '';
    },
    async addCategory() {
      if (!this.newCategoryName.trim() || !this.newCategoryDescription.trim()) {
        alert('Both name and description are required.');
        return;
      }
      try {
        const response = await api.post('/categories', {
          name: this.newCategoryName,
          description: this.newCategoryDescription,
        });
        this.categories.push(response.data);
        this.newCategoryName = '';
        this.newCategoryDescription = '';
        this.isAdding = false;
      } catch (error) {
        console.error('Error adding category:', error);
        alert('Failed to add category. Please try again.');
      }
    },
    cancelAddCategory() {
      this.newCategoryName = '';
      this.newCategoryDescription = '';
      this.isAdding = false;
    },
    editCategory(category) {
      this.isEditing = true;
      this.currentEditingCategoryId = category.id;
      this.editCategoryName = category.name;
      this.editCategoryDescription = category.description;
    },
    async updateCategory() {
      if (!this.editCategoryName.trim() || !this.editCategoryDescription.trim()) {
        alert('Both name and description are required.');
        return;
      }

      try {
        const response = await api.put(`/categories/${this.currentEditingCategoryId}`, {
          name: this.editCategoryName,
          description: this.editCategoryDescription,
        });

        const index = this.categories.findIndex(c => c.id === this.currentEditingCategoryId);
        if (index !== -1) {
          this.categories[index] = response.data;
        }

        const categoryData = await api.get('/categories');
        this.categories = categoryData.data;

        this.isEditing = false;
        this.editCategoryName = '';
        this.editCategoryDescription = '';
        this.currentEditingCategoryId = null;

        alert('Category updated successfully!');
      } catch (error) {
        console.error('Error updating category:', error);
        alert('Failed to update category. Please try again.');
      }
    },
    cancelEditCategory() {
      this.isEditing = false;
      this.editCategoryName = '';
      this.editCategoryDescription = '';
      this.currentEditingCategoryId = null;
    },
    async deleteCategory(categoryId, categoryName) {
      if (confirm(`Are you sure you want to delete "${categoryName}"?`)) {
        try {
          await api.delete(`/categories/${categoryId}`);
          this.categories = this.categories.filter(c => c.id !== categoryId);
          alert(`Nail art category "${categoryName}" deleted successfully!`);
        } catch (error) {
          console.error('Error deleting category:', error);
          alert(`Failed to delete category "${categoryName}". Please try again.`);
        }
      }
    },
  },
  mounted() {
    this.fetchCategories();
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

.description {
  margin-top: 10px;
  font-size: 14px;
  color: #777;
  line-height: 1.5;
  font-weight: normal;
}

.description::before {
  content: '🌸';
  margin-right: 5px;
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
.edit-category-form input,
.add-category-form textarea,
.edit-category-form textarea {
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>