<template>
  <div class="appointment-form">
    <h2>Book an Appointment</h2>
    <section>
      <h3 class="selected-nail-art">
        Selected Nail Art:
        <strong>{{ selectedNailArt || 'No Nail Art Selected' }}</strong>
      </h3>
      <form @submit.prevent="handleSubmit">
          <label for="name">Name:</label>
          <input type="text" v-model="formData.name" id="name" required />

          <label for="email">Email:</label>
          <input type="email" v-model="formData.email" id="email" required />

          <label for="phone">Phone:</label>
          <input type="tel" v-model="formData.phone" id="phone" required />

          <label for="date">Date:</label>
          <input type="date" v-model="formData.date" id="date" required />

          <label for="time">Time:</label>
          <input type="time" v-model="formData.time" id="time" required />

          <label for="message">Message:</label>
          <textarea id="message" v-model="formData.message" required aria-label="Your message"></textarea>

        <button type="submit">Submit</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: '',
      },
      selectedNailArt: '',
    };
  },
  created() {
    this.setSelectedNailArt();
  },
  watch: {
    '$route.params': 'setSelectedNailArt'
  },
  methods: {
    setSelectedNailArt() {
      this.selectedNailArt = this.$route.params.nailArtName || '';
    },
    handleSubmit() {
      alert(`Thank you, ${this.formData.name}! Your appointment for ${this.selectedNailArt} has been booked for ${this.formData.date} at ${this.formData.time}. We will contact you at ${this.formData.phone}.`);

      this.formData = {
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      };
    }
  }
}
</script>