# Portfolio Generator Website

A best-in-class, full-stack portfolio builder that empowers developers and creatives to generate stunning, high-performance personal websites in minutes.

![Portfolio Generator Hero](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop)

## 🚀 Features

-   **Visual Editor**: Real-time WYSIWYG editor for standard sections (Hero, About, Projects, Contact).
-   **Multi-Engine Templates**: Distinct architectural engines for different personas:
    -   **Modern Dark**: Customizable, section-based layout for generalists.
    -   **Creative Pro**: Bold typography, parallax effects, and interactive galleries for designers (Powered by Framer Motion).
    -   **Content First**: Minimalist, serif-focused editorial layout for writers and strategists.
-   **Smart Code Export**: Downloads a production-ready ZIP file containing *only* the code and dependencies required for your selected template.
-   **Premium Aesthetics**: Curated color palettes, modern typography (Inter, Oswald, Merriweather), and glassmorphism UI.

## 🛠️ Tech Stack

### Client
-   **Framework**: React 19 (Vite)
-   **Styling**: TailwindCSS, Shadcn/ui
-   **Animations**: Framer Motion
-   **State Management**: Zustand
-   **Routing**: React Router v7

### Server
-   **Runtime**: Node.js (Express)
-   **Database**: MongoDB (Optional, falls back to local filesystem for demos)
-   **Utilities**: `archiver` for smart ZIP generation

## 📦 Project Structure

```bash
/client
  /src
    /components
      /templates        # Distinct template engines
        /ModernDark
        /CreativePro
        /ContentFirst
    /store              # Zustand state
    /pages              # Application routes
/server
  /src
    /controllers        # Generator logic
```

## 🏁 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Boredooms/Portfolio-generator-website.git
    ```

2.  **Install Dependencies**:
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```

3.  **Run Development Servers**:
    ```bash
    # Terminal 1 (Server)
    cd server
    npm start

    # Terminal 2 (Client)
    cd client
    npm run dev
    ```

4.  **Open Browser**:
    Navigate to `http://localhost:5173` to start building.

## 📄 License

MIT License. Built by **Devargho Chakraborty**.
