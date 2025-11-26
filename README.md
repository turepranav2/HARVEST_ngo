# HĀRVÉST - Holistic Advancement for Rural Vitality, Empowerment, and Sustainable Transformation

A comprehensive web platform with public + admin React frontends powered by a modern Node.js (Express + Prisma) backend for managing the organization's dynamic content, events, blogs, galleries, donations, and more.

## Project Structure

```
MAJOR_PROJECT/
├── backend/                 # Node.js/Express API with Prisma ORM
│   ├── src/                # Controllers, services, routes
│   ├── prisma/             # Prisma schema + migrations
│   └── package.json
├── admin-frontend/          # React admin panel
│   ├── src/
│   │   ├── components/     # Admin components
│   │   └── utils/         # API utilities
│   └── package.json
├── src/                     # Main React frontend
│   ├── components/         # Frontend components
│   └── views/              # Page views
└── public/                  # Static files
```

## Features

### Frontend
- **Home Page**: Hero section, features, testimonials
- **About Page**: Mission, vision, values
- **Services Page**: Service offerings
- **Events Page**: Upcoming events listing
- **Blog Page**: Blog posts with categories
- **Gallery Page**: Image gallery with categories
- **FAQ Page**: Frequently asked questions
- **Contact Page**: Contact form and information
- **Donate Page**: Donation form
- **Volunteer Page**: Volunteer application form

### Admin Panel
- **Dashboard**: Overview statistics
- **Payment Insights**: Real-time donation metrics and email receipts
- **Quick Actions**: One-click navigation to every management surface
- **Page Content Manager**: Manage all text and images across pages
- **Events Manager**: Create, update, delete events
- **Blogs Manager**: Create blog posts with images
- **FAQ Manager**: Manage frequently asked questions
- **Gallery Manager**: Manage gallery items
- **Contact Manager**: View and manage contact messages

### Backend API
- **Authentication**: JWT-based authentication
- **Page Content**: CRUD operations for dynamic content
- **Events**: Full CRUD with image uploads
- **Blogs**: Full CRUD with multiple image support
- **FAQs**: Full CRUD operations
- **Gallery**: Full CRUD with image uploads
- **Contact**: Message management and contact info
- **Image Upload**: Cloudinary integration for all images
- **Donations**: Cashfree integration with webhook + automated email receipts
- **Reporting**: Aggregated donation insights for the admin dashboard

## Technology Stack

### Frontend
- React 17.0.2
- React Router DOM 5.2.0
- React Helmet (SEO)

### Admin Frontend
- React 17.0.2
- React Router DOM 5.2.0
- Axios for API calls
- React Quill (rich text editor)
- React Dropzone (file uploads)

### Backend
- Node.js 18+
- Express 5 with modular controllers/services
- Prisma ORM (PostgreSQL via Neon/Neondb)
- Cloudinary (image storage/CDN)
- Cashfree Payments (donation checkout + webhooks)
- JWT authentication + middleware (bcrypt, jsonwebtoken)
- Helmet, compression, CORS, and rate limiting for security

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 18+
- PostgreSQL database (Neodb/Neon recommended)
- Cloudinary account

### Backend Setup (Node/Express)

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Fill in:
   - `DATABASE_URL` (Neon/Neondb PostgreSQL connection string)
   - `JWT_SECRET`
   - `CLOUDINARY_*` keys
   - `CASHFREE_*` keys + return/notify URLs
   - `EMAIL_ENABLED` (default `true`)
   - `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_SECURE`
   - `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`

3. **Generate Prisma client & migrate**
   ```bash
   npx prisma migrate dev
   npm run prisma:seed   # creates default admin user (ADMIN_EMAIL/ADMIN_PASSWORD env overrides optional)
   ```

4. **Run the API**
   ```bash
   npm run dev          # nodemon dev server
   # or
   npm start            # production build
   ```
   The API listens on `http://localhost:5000/api` by default.

### Frontend Setup

1. **Navigate to project root:**
   ```bash
   cd ..
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   Frontend will be available at `http://localhost:3000`

### Admin Frontend Setup

1. **Navigate to admin-frontend directory:**
   ```bash
   cd admin-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variable (optional):**
   Create `.env` file:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start development server:**
   ```bash
   npm start
   ```
   Admin panel will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token

### Page Content
- `GET /api/page-content` - List all page content (filter by page/section)
- `GET /api/page-content/{id}` - Get specific content
- `POST /api/page-content` - Create content (auth required)
- `PUT /api/page-content/{id}` - Update content (auth required)
- `DELETE /api/page-content/{id}` - Delete content (auth required)
- `POST /api/page-content/{id}/upload-image` - Upload image (auth required)

### Events
- `GET /api/events` - List events
- `GET /api/events/{id}` - Get event
- `POST /api/events` - Create event (auth required)
- `PUT /api/events/{id}` - Update event (auth required)
- `DELETE /api/events/{id}` - Delete event (auth required)
- `POST /api/events/{id}/upload-image` - Upload event image (auth required)

### Blogs
- `GET /api/blogs` - List blogs
- `GET /api/blogs/{id}` - Get blog
- `POST /api/blogs` - Create blog (auth required)
- `PUT /api/blogs/{id}` - Update blog (auth required)
- `DELETE /api/blogs/{id}` - Delete blog (auth required)
- `POST /api/blogs/{id}/upload-image` - Upload blog main image (auth required)
- `POST /api/blogs/{id}/images` - Add blog image (auth required)
- `DELETE /api/blogs/images/{id}` - Delete blog image (auth required)

### FAQs
- `GET /api/faqs` - List FAQs
- `GET /api/faqs/{id}` - Get FAQ
- `POST /api/faqs` - Create FAQ (auth required)
- `PUT /api/faqs/{id}` - Update FAQ (auth required)
- `DELETE /api/faqs/{id}` - Delete FAQ (auth required)

### Gallery
- `GET /api/gallery` - List gallery items
- `GET /api/gallery/{id}` - Get gallery item
- `POST /api/gallery` - Create gallery item (auth required)
- `PUT /api/gallery/{id}` - Update gallery item (auth required)
- `DELETE /api/gallery/{id}` - Delete gallery item (auth required)
- `POST /api/gallery/{id}/upload-image` - Upload gallery image (auth required)

### Contact
- `GET /api/contact-info` - Get contact information
- `POST /api/contact-info` - Create/update contact info (auth required)
- `PUT /api/contact-info/{id}` - Update contact info (auth required)
- `POST /api/contact-messages` - Submit contact message (public)
- `GET /api/contact-messages` - List messages (auth required)
- `GET /api/contact-messages/{id}` - Get message (auth required)
- `PUT /api/contact-messages/{id}/mark-read` - Mark as read (auth required)

### Donations
- `POST /api/donations/create-order` - Create Cashfree donation order
- `GET /api/donations/orders/{orderId}` - Retrieve donation order status
- `POST /api/donations/webhook` - Receive Cashfree webhook events
- `GET /api/donations/insights` - Auth-only donation analytics + breakdown

### Utilities
- `POST /api/upload-image` - Generic image upload (auth required)

## Database Models

### PageContent
Stores dynamic content for different pages and sections:
- `page`: Page identifier (home, about, services, etc.)
- `section`: Section identifier (hero, features, etc.)
- `field_name`: Field identifier (heading1, content1, etc.)
- `text_content`: Text content
- `image_url`: Cloudinary image URL
- `image_alt`: Image alt text
- `order`: Display order
- `is_active`: Active status

### Event
- `title`: Event title
- `description`: Event description
- `date`: Event date
- `location`: Event location
- `image`: Cloudinary image
- `is_featured`: Featured flag
- `is_active`: Active status

### BlogPost
- `title`: Blog title
- `excerpt`: Short excerpt
- `content`: Full content
- `image`: Main image
- `category`: Blog category
- `author`: Author (User)
- `published`: Published status
- `published_at`: Publication date

### BlogImage
- `blog_post`: Related blog post
- `image`: Cloudinary image URL
- `alt_text`: Alt text
- `order`: Display order

### FAQ
- `question`: FAQ question
- `answer`: FAQ answer
- `order`: Display order
- `is_active`: Active status

### GalleryItem
- `title`: Item title
- `description`: Description
- `image`: Cloudinary image URL (optional until upload)
- `category`: Category
- `is_featured`: Featured flag
- `is_active`: Active status

### ContactInfo
- `email`: Contact email
- `phone`: Contact phone
- `address`: Physical address
- `facebook_url`: Facebook URL
- `instagram_url`: Instagram URL
- `twitter_url`: Twitter URL
- `is_active`: Active status

### ContactMessage
- `name`: Sender name
- `email`: Sender email
- `subject`: Message subject
- `message`: Message content
- `is_read`: Read status

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Login via `POST /api/auth/login` with username and password
2. Receive JWT token in response
3. Include token in subsequent requests:
   ```
   Authorization: Bearer <token>
   ```

Tokens expire after 7 days.

## Image Management

All images are stored on Cloudinary. When uploading images:

1. Images are automatically uploaded to Cloudinary
2. Secure URLs are returned and stored in the database
3. Images can be accessed via the returned URLs

## Development

### Running Tests
```bash
# Backend
cd backend
python manage.py test

# Frontend
npm test
```

### Building for Production

**Frontend:**
```bash
npm run build
```

**Admin Frontend:**
```bash
cd admin-frontend
npm run build
```

**Backend:**
```bash
cd backend
python manage.py collectstatic
```

## Deployment

### Environment Variables
Ensure all environment variables are set in production:
- Database credentials
- Cloudinary credentials
- Django SECRET_KEY
- DEBUG=False

### Database
The project is configured to work with Neodb (Neon PostgreSQL). Update your `.env` file with Neodb credentials.

### Static Files
For production, configure static file serving (e.g., WhiteNoise, AWS S3, or Cloudinary).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software for HĀRVÉST organization.

## Support

For issues and questions, please contact the development team.

