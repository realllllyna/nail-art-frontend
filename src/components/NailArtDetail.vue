<template>
  <div class="nail-art-detail">
    <section>
      <h2 class="nail-art-title">{{ nailArt.name }}</h2>
      <img :src="nailArt.image" :alt="nailArt.name" class="nail-art-image" />

      <div class="nail-art-info">
        <p><strong>Price:</strong> {{ nailArt.price }}</p>
        <p><strong>Description:</strong> {{ nailArt.description }}</p>
        <p><strong>Artist:</strong> {{ nailArt.artist }}</p>
        <p><strong>Duration:</strong> {{ nailArt.duration }}</p>
        <p><strong>Color Options:</strong> {{ nailArt.colorOptions.join(', ') }}</p>
        <p><strong>Materials Used:</strong> {{ nailArt.materials }}</p>
        <p><strong>Aftercare Tips:</strong> {{ nailArt.aftercare }}</p>
        <p><strong>Allergy Warnings:</strong> {{ nailArt.allergyWarnings }}</p>
        <p><strong>Availability:</strong> {{ nailArt.availability }}</p>
      </div>

      <nav>
        <div class="action-buttons">
          <router-link :to="{ name: 'BookAppointment', params: { nailArtName: nailArt.name } }" class="btn">
            <button>Book Appointment</button>
          </router-link>
          <button @click="editNailArt">Edit</button>
          <button @click="deleteNailArt">Delete</button>
        </div>
      </nav>
    </section>

    <div v-if="isEditing" class="edit-nail-art-form">
      <h3>Edit Nail Art: {{ nailArt.name }}</h3>
      <input v-model="editedNailArt.name" placeholder="Nail Art Name" />
      <input v-model="editedNailArt.price" placeholder="Price" />
      <input v-model="editedNailArt.image" placeholder="Image URL" />
      <textarea v-model="editedNailArt.description" placeholder="Description"></textarea>
      <input v-model="editedNailArt.artist" placeholder="Artist" />
      <input v-model="editedNailArt.duration" placeholder="Duration" />
      <input v-model="editedNailArt.colorOptions" placeholder="Color Options (comma-separated)" />
      <input v-model="editedNailArt.materials" placeholder="Materials Used" />
      <input v-model="editedNailArt.aftercare" placeholder="Aftercare Tips" />
      <input v-model="editedNailArt.allergyWarnings" placeholder="Allergy Warnings" />
      <input v-model="editedNailArt.availability" placeholder="Availability" />
      <button @click="updateNailArt">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nailArt: {},
      isEditing: false,
      editedNailArt: {}
    };
  },
  created() {
    const nailArtId = this.$route.params.id;
    const nailArtList = [
      {
        id: 1,
        name: 'Mystic Aurora',
        price: '30€',
        image: require('@/assets/image1.jpg'),
        description: 'A beautiful pinky design perfect for spring.',
        artist: 'Anna Smith',
        duration: '45 mins',
        colorOptions: ['Soft Pink', 'Pastel Blue', 'Lavender'],
        materials: 'Gel polish, Vegan-friendly',
        aftercare: 'Avoid water for 24 hours.',
        allergyWarnings: 'Contains acrylic; consult if allergic.',
        availability: 'Monday - Saturday, 9 AM - 6 PM',
      },
      {
        id: 2,
        name: 'Velvet Petals',
        price: '25€',
        image: require('@/assets/image2.jpg'),
        description: 'A soft, luxurious finish with a petal-like smoothness.',
        artist: 'Emily Johnson',
        duration: '30 mins',
        colorOptions: ['Rose Red', 'Cream White', 'Dusty Rose'],
        materials: 'Acrylic, Hypoallergenic',
        aftercare: 'Moisturize cuticles daily.',
        allergyWarnings: 'None',
        availability: 'Tuesday - Sunday, 10 AM - 5 PM',
      },
      {
        id: 3,
        name: 'Moonlit Gloss',
        price: '22€',
        image: require('@/assets/image3.jpg'),
        description: 'A subtle sparkle that adds elegance to any style.',
        artist: 'Sophia Lee',
        duration: '30 mins',
        colorOptions: ['Silver Sparkle', 'Nude', 'Champagne'],
        materials: 'Gel polish, Non-toxic',
        aftercare: 'Avoid harsh chemicals for a week.',
        allergyWarnings: 'None',
        availability: 'Wednesday - Sunday, 9 AM - 7 PM',
      },
      {
        id: 4,
        name: 'Iridescent Allure',
        price: '30€',
        image: require('@/assets/image4.jpg'),
        description: 'Captivating colors that shift with every angle.',
        artist: 'Mia Zhang',
        duration: '40 mins',
        colorOptions: ['Silver Sparkle', 'Peacock Blue', 'Emerald Green'],
        materials: 'Gel polish, Vegan-friendly',
        aftercare: 'Avoid direct sunlight for 48 hours.',
        allergyWarnings: 'Contains glitter; consult if allergic.',
        availability: 'Monday - Friday, 9 AM - 8 PM',
      },
      {
        id: 5,
        name: 'Celestial Spark',
        price: '35€',
        image: require('@/assets/image5.jpg'),
        description: 'Cosmic glitter that lights up your nails like stars.',
        artist: 'Olivia Brown',
        duration: '50 mins',
        colorOptions: ['Galaxy Silver', 'Starry Night', 'Nebula Blue'],
        materials: 'Acrylic, Hypoallergenic',
        aftercare: 'Avoid soaking for 24 hours.',
        allergyWarnings: 'Contains glitter; consult if allergic.',
        availability: 'Monday - Saturday, 10 AM - 6 PM',
      },
      {
        id: 6,
        name: 'Opal Dream',
        price: '22€',
        image: require('@/assets/image6.jpg'),
        description: 'Soft, pearlescent hues with a dreamy, opalescent glow.',
        artist: 'Liam Davis',
        duration: '30 mins',
        colorOptions: ['Opal White', 'Pink Pearl', 'Icy Blue'],
        materials: 'Gel polish, Non-toxic',
        aftercare: 'Keep nails dry for 24 hours.',
        allergyWarnings: 'None',
        availability: 'Tuesday - Sunday, 10 AM - 5 PM',
      },
      {
        id: 7,
        name: 'Lush Lacquer',
        price: '28€',
        image: require('@/assets/image7.jpg'),
        description: 'Rich, deep colors with a flawless, glossy shine.',
        artist: 'Ethan Wilson',
        duration: '40 mins',
        colorOptions: ['Burgundy', 'Deep Blue', 'Forest Green'],
        materials: 'Gel polish, Vegan-friendly',
        aftercare: 'Avoid nail polish remover for a week.',
        allergyWarnings: 'None',
        availability: 'Monday - Friday, 9 AM - 8 PM',
      },
      {
        id: 8,
        name: 'Ethereal Polish',
        price: '25€',
        image: require('@/assets/image8.jpg'),
        description: 'Delicate, airy shades that feel almost otherworldly.',
        artist: 'Ava Martinez',
        duration: '35 mins',
        colorOptions: ['Mint Green', 'Baby Silver', 'Soft Lilac'],
        materials: 'Acrylic, Non-toxic',
        aftercare: 'Keep away from water for 12 hours.',
        allergyWarnings: 'Contains acrylic; consult if allergic.',
        availability: 'Wednesday - Sunday, 10 AM - 6 PM',
      },
      {
        id: 9,
        name: 'Serenity Tips',
        price: '32€',
        image: require('@/assets/image9.jpg'),
        description: 'Calm, soothing tones for an effortlessly chic look.',
        artist: 'Isabella Garcia',
        duration: '50 mins',
        colorOptions: ['Pale Pink', 'Seafoam Green', 'Crystal White'],
        materials: 'Gel polish, Vegan-friendly',
        aftercare: 'Apply cuticle oil daily.',
        allergyWarnings: 'None',
        availability: 'Monday - Saturday, 9 AM - 6 PM',
      },
      {
        id: 10,
        name: 'Blissful Hues',
        price: '30€',
        image: require('@/assets/image10.jpg'),
        description: 'Luxurious and opulent, adorned with crystals.',
        artist: 'James Taylor',
        duration: '45 mins',
        colorOptions: ['Baby Blue', 'Mint Green', 'Rose Gold'],
        materials: 'Acrylic, Hypoallergenic',
        aftercare: 'Avoid heavy lifting for 24 hours.',
        allergyWarnings: 'Contains acrylic; consult if allergic.',
        availability: 'Tuesday - Sunday, 10 AM - 5 PM',
      }
    ];
    
    this.nailArt = nailArtList.find(n => n.id == nailArtId);
    this.editedNailArt = { ...this.nailArt }; 
  },
  methods: {
    editNailArt() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedNailArt = { ...this.nailArt };
    },
    updateNailArt() {
      this.nailArt = { ...this.editedNailArt }; 
      this.isEditing = false;
      alert('Nail art updated successfully!');
    },
    deleteNailArt() {
      if (confirm(`Are you sure you want to delete "${this.nailArt.name}"?`)) {
        alert(`Nail art "${this.nailArt.name}" deleted successfully!`);
        this.$router.push({ name: 'NailArtList' });
      }
    }
  }
}
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

.edit-nail-art-form input, textarea {
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: calc(100% - 16px);
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>