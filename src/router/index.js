import { createRouter, createWebHistory } from 'vue-router';
import Gallery from '../components/Gallery.vue';
import NailArtDetail from '../components/NailArtDetail.vue';
import ContactForm from '../components/ContactForm.vue';
import Impressum from '../components/Impressum.vue';
import BookAppointment from '../components/BookAppointment.vue';
import AddNail from '../components/AddNail.vue';
import ShowCategory from '../components/ShowCategory.vue';

const routes = [
  { path: '/', name: 'Gallery', component: Gallery },
  { path: '/nail-art/:id', name: 'NailArtDetail', component: NailArtDetail },
  { path: '/contact', name: 'ContactForm', component: ContactForm },
  { path: '/impressum', name: 'Impressum', component: Impressum },
  { path: '/book-appointment/:nailArtName', name: 'BookAppointment', component: BookAppointment },
  { path: '/add-nail', name: 'AddNail', component: AddNail },
  { path: '/show-category', name: 'ShowCategory', component: ShowCategory },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;