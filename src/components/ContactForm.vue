<template>
  <div class="contact-container">
    <h2 class="contact-title">Contact Us</h2>
    <section>
      <form @submit.prevent="handleSubmit" role="form" aria-label="Contact form">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" required aria-label="Your name" />

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required aria-label="Your email address" />

        <label for="message">Message:</label>
        <textarea id="message" v-model="formData.message" required aria-label="Your message"></textarea>

        <button type="submit">Submit</button>
      </form>
      <div class="map-container">
        <h3 class="map-title">Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24358.858049119792!2d13.388859449999999!3d52.5170361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e3b934f8fb%3A0xe01fe96470197d18!2sBerlin%2C%20Germany!5e0!3m2!1sen!2sde!4v1607154058905!5m2!1sen!2sde"
          width="100%" height="450" frameborder="0" style="border: 0;" allowfullscreen aria-hidden="false"
          tabindex="0"></iframe>
      </div>
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
        message: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      alert("Thank you for your message! We'll get back to you soon.");

      // Reset formData
      this.formData = {
        name: '',
        email: '',
        message: ''
      };
    }
  }
};
</script>
