# Joel Torres - Digital Portfolio

A modern, minimal personal website built with Node.js, Express, and EJS. Features a sleek black and white design with cyan blue accents, showcasing Joel's journey as a student innovator and AI enthusiast.

## Features

- **Modern Tech Stack**: Node.js, Express, and EJS templating
- **Responsive Design**: Clean, modern aesthetic with black/white/cyan color scheme
- **Multiple Pages**: Home, About Me, Mission, Projects, and Contact
- **Smooth Animations**: Fade-in effects and interactive elements
- **Easy to Update**: Modular EJS templates with shared header and footer

## Pages

- **Home**: Welcome page with introduction
- **About Me**: Personal background, education, and skills
- **Mission**: Core values and vision for the future
- **Projects**: Showcase of current and past projects
- **Contact**: Professional contact information and networking

## Prerequisites

- Node.js (version 12.0 or higher)
- npm (comes with Node.js)

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JoelTor1305/jat-digital-portfolio.git
   cd jat-digital-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## Development

- The server runs on port 3000 by default
- Static files (CSS, images) are served from the `public/` directory
- EJS templates are located in the `views/` directory
- Shared components (header, footer) are in `views/partials/`

## Project Structure

```
jat-digital-portfolio/
├── app.js              # Express server configuration
├── package.json        # Project dependencies and scripts
├── public/             # Static assets
│   └── css/
│       └── styles.css  # Main stylesheet with modern design
├── views/              # EJS templates
│   ├── partials/       # Shared components
│   │   ├── header.ejs  # Header with navigation
│   │   └── footer.ejs  # Footer with scripts
│   ├── home.ejs        # Home page template
│   ├── about.ejs       # About Me page template
│   ├── mission.ejs     # Mission page template
│   ├── projects.ejs    # Projects page template
│   └── contact.ejs     # Contact page template
└── README.md
```

## Customization

To update content:
1. Edit the EJS templates in the `views/` directory
2. Modify styles in `public/css/styles.css`
3. Update routing in `app.js` if needed

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating, CSS3, Vanilla JavaScript
- **Design**: Modern minimalist design with cyan accents
- **Animations**: CSS transitions and JavaScript intersection observer

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Joel Torres