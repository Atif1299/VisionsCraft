const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'VisionsCraft - AI Solutions Provider',
    currentPage: 'home',
    description: 'Leading AI solutions provider transforming businesses through innovative artificial intelligence technologies.'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us - VisionsCraft',
    currentPage: 'about',
    description: 'Learn about VisionsCraft, a leading AI solutions agency founded by passionate experts dedicated to transforming businesses through innovative AI technologies.'
  });
});

app.get('/services', (req, res) => {
  res.render('services', { 
    title: 'Our Services - VisionsCraft',
    currentPage: 'services',
    description: 'Explore our comprehensive AI services including machine learning, predictive analytics, conversational AI, and computer vision solutions.'
  });
});

app.get('/showcase', (req, res) => {
  res.render('showcase', { 
    title: 'Showcase - VisionsCraft',
    currentPage: 'showcase',
    description: 'Discover our portfolio of successful AI projects and case studies that demonstrate our expertise in delivering transformative solutions.'
  });
});

app.get('/blog', (req, res) => {
  res.render('blog', { 
    title: 'Blog - VisionsCraft',
    currentPage: 'blog',
    description: 'Read our latest insights, trends, and knowledge from AI experts at VisionsCraft. Stay updated with the latest AI developments.'
  });
});

app.get('/blog-post', (req, res) => {
  res.render('blog-post', { 
    title: 'Blog Post - VisionsCraft',
    currentPage: 'blog',
    description: 'Read our latest blog post about AI developments, trends, and insights from VisionsCraft experts.',
    additionalCSS: ['/css/blog-post.css']
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us - VisionsCraft',
    currentPage: 'contact',
    description: 'Get in touch with VisionsCraft, your partner for innovative AI solutions. Contact our team of experts to discuss your project needs.'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
