# AutoTechno Project

AutoTechno is a comprehensive web application built using [Next.js](https://nextjs.org), designed to provide automotive software solutions, ECU files management, and various vehicle diagnostic tools for automotive professionals. This platform offers a centralized solution for accessing, managing, and deploying automotive technological resources.

## Features & Functionalities

### ECU File Management
- **Browse ECU Files**: Extensive collection of ECU files for various vehicle brands
- **Advanced Filtering**: Filter by brand, category, year, system, and more
- **Search Functionality**: Find specific ECU files quickly with powerful search capabilities
- **File Details**: Comprehensive information including compatibility, specifications, and pricing

### Automotive Software Tools
- **OBD Diagnostic Tools**: Professional OBD2 diagnostic software with ECU reading/writing capabilities
- **ECU Flashing Solutions**: Complete suite for ECU flashing and tuning for professional automotive tuners
- **Dashboard Tools**: Specialized software for digital dashboard repair and customization
- **Airbag Reset Solutions**: Professional tools for resetting airbag modules and clearing crash data

### Vehicle System Services
- **Airbag Module Reset**: Clear crash data, reset fault codes, and restore safety system functionality
- **Dashboard Repair**: Instrument cluster programming and digital display repair utilities
- **Emissions Solutions**: ECU remapping for emissions compliance and optimization
- **Performance Tuning**: Stage 1-3 performance tunes, burble maps, and custom solutions

### User Experience
- **Modern UI**: Built with Next.js, providing a fast and responsive user experience
- **Brand-Specific Navigation**: Easy navigation through car brand selection interface
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Authentication System**: Secure user authentication and account management

## Technology Stack

- **Frontend**: Next.js (React framework), TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Images**: Next.js Image Optimization
- **Routing**: Next.js App Router
- **State Management**: React Context API
- **Authentication**: Custom authentication system
- **API**: Next.js API routes

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Achref23illi/autotechno.git
    cd autotechno
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add necessary environment variables (refer to `.env.example` if available)

4. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- `app/` - Main application directory (Next.js App Router)
  - `page.tsx` - Main entry point / homepage
  - `layout.tsx` - Root layout component
  - `api/` - API routes for backend functionality
  - `components/` - Reusable UI components
    - `ecu/` - ECU-specific components
    - `layout/` - Layout components (Navbar, Footer)
    - `ui/` - Shared UI components (Button, SearchBar, etc.)
  - `context/` - React context providers
  - `airbag/`, `dashboard/`, `ecu/`, `software/` - Feature-specific pages
  - `data/` - Static data files (brands, mock ECU files, etc.)
  - `hooks/` - Custom React hooks
  - `services/` - Service modules for API interactions
  - `utils/` - Utility functions and constants
- `public/` - Static assets (images, fonts, etc.)

## API Integration

The application provides API endpoints for:

- Authentication (`/api/auth/`)
- ECU file management (`/api/ecu/`)
- Airbag solutions (`/api/airbag/`)
- Dashboard services (`/api/dashboard/`)

## Development Guidelines

- Follow TypeScript best practices for type-safe code
- Use Tailwind CSS for styling components
- Create reusable components when possible
- Ensure responsive design for mobile compatibility
- Implement proper error handling and loading states

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive guide to Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive tutorial for beginners
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS

## Deployment

Deploy your application using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. For detailed instructions, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/Achref23illi/autotechno).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
