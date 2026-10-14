import { toImage } from './image.js'
import logo from '../assets/img/logo.png?w=400&format=webp&quality=90'
import member1 from '../assets/img/team/member-1.webp?w=640&format=webp&quality=78'
import city from '../assets/img/parallax/city.jpg?w=1280&format=webp&quality=68'
import banner1 from '../assets/img/banner.webp?w=768;1200;1600&format=webp&quality=72&as=srcset'
import banner2 from '../assets/img/banner1.webp?w=768;1200;1600&format=webp&quality=72&as=srcset'
import banner3 from '../assets/img/banner2.webp?w=768;1200;1600&format=webp&quality=72&as=srcset'
import banner4 from '../assets/img/banner3.webp?w=768;1200;1600&format=webp&quality=72&as=srcset'
import client1 from '../assets/img/review/client1.png'
import client2 from '../assets/img/review/client2.png'
import client3 from '../assets/img/review/client3.png'
import client4 from '../assets/img/review/client4.png'
import client5 from '../assets/img/review/client5.png'

export const CONTACT = {
  phoneDisplay: '(786) 908-4014',
  phoneHref: 'tel:+17869084014',
  whatsapp: 'https://wa.me/17869084014/',
  email: 'alohacreationsmiami@outlook.com',
  emailHref: 'mailto:alohacreationsmiami@outlook.com',
  instagram: 'https://www.instagram.com/alohacreaciones/',
  instagramHandle: '@alohacreaciones',
  address: 'Miami, Florida, United States',
  hours: 'Mon – Sun · 9:00am – 11:00pm',
}

export const NAV_LINKS = [
  { label: 'Home', to: '/', hash: '' },
  { label: 'Services', to: '/', hash: '#services' },
  { label: 'Bouquets', to: '/bouquet', hash: '' },
  { label: 'Decorations', to: '/decoration', hash: '' },
  { label: 'Team', to: '/', hash: '#team' },
  { label: 'Contact', to: '/', hash: '#contact' },
]

export const HERO_SLIDES = [
  {
    image: toImage(banner1),
    eyebrow: 'Miami balloon studio',
    title: 'Balloons that make the room.',
    text: 'Bouquets, arches and full installations designed around your celebration.',
  },
  {
    image: toImage(banner2),
    eyebrow: 'Delivered to your door',
    title: 'Love, delivered to your door.',
    text: 'Events, balloon bouquets and decorations delivered across Miami.',
  },
  {
    image: toImage(banner3),
    eyebrow: 'Built to your palette',
    title: 'Your colours, blown up large.',
    text: 'We match your theme, venue and mood down to the last balloon.',
  },
  {
    image: toImage(banner4),
    eyebrow: 'Made to be photographed',
    title: 'Setups made for the photos.',
    text: 'From an intimate gift to a full-room installation.',
  },
]

export const SERVICES = [
  {
    icon: 'phone',
    title: 'Consulting',
    text: 'Tell us the moment you are planning. We listen, suggest a direction and shape a setup around your space, budget and guest list.',
  },
  {
    icon: 'pencil',
    title: 'Design',
    text: 'Colours, shapes and proportions chosen to match your theme — from soft pastel garlands to bold statement arches.',
  },
  {
    icon: 'truck',
    title: 'Delivery & install',
    text: 'We deliver, build and style on site, then leave the space ready to celebrate. Delivery available across Miami.',
  },
]

export const TEAM = {
  image: member1,
  name: 'Aloha Creaciones',
  role: 'Event planner & balloon artist',
  text: 'Passionate, skilled and dedicated, our planner and balloon artist builds enchanting moments just for you. Let us make your event unforgettable.',
}

export const STATS = [
  { value: 850, suffix: '+', label: 'Satisfied clients' },
  { value: 5, suffix: '+', label: 'Years of experience' },
]

export const TESTIMONIALS = [
  {
    image: client1,
    name: 'Maria Juarez',
    text: 'Excellent service. Very attentive to details, did exactly what we asked for. Very good communication and punctual with the schedule. 100% recommendable!',
  },
  {
    image: client2,
    name: 'Maylen Marrero',
    text: 'I loved this gift that my boyfriend made me with Aloha Creaciones. Very professional with the delivery schedule and we were satisfied with the result. I took the balloons to the keys and they stayed intact even a week later — very good quality. Thank you Aloha for your excellent service.',
  },
  {
    image: client3,
    name: 'Dahiana Lopez',
    text: 'I reached out on Instagram and she was quick to respond and answer all my questions. The balloon arrangement exceeded my expectations. It was so beautiful I could not take my eyes off it. I will definitely keep her in mind for my next event.',
  },
  {
    image: client4,
    name: 'Janet Chaput',
    text: 'Aloha did an amazing job. We sent her a photo of the look we wanted and she recreated it with our colours. She made my daughter\u2019s baby shower very special.',
  },
  {
    image: client5,
    name: 'Pamela Rivera',
    text: 'She communicated very well, was very punctual and easy to work with. Aloha\u2019s creations were perfect. 10/10.',
  },
]

export const IMAGES = { logo, city }
