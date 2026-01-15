# OYO-Clone: High-Fidelity Marketplace Engine
A production-hardened, multi-tenant hotel booking platform engineered for financial precision, geographic discovery, and high-performance scale.

View [Architectural Walkthrough](file:///c:/Users/samwe/.gemini/antigravity/brain/8cc44527-cf40-48b2-b103-4180e99dc2d5/walkthrough.md)

## 🚀 Project Overview
The OYO-Clone is more than just a booking site; it is a full-stack marketplace engine designed to handle real-world business logic. It features a triple-sided architecture ensuring distinct experiences for Guests, Hotel Owners, and Platform Administrators, all powered by a robust PostgreSQL backend with strict type safety.

## 🌟 Key Features
- **🗺️ Interactive Discovery**: Mapbox GL integration allows users to search hotels by location with seamless split-screen interaction.
- **💰 Financial Precision**: Built on `Decimal(10,2)` logic in PostgreSQL to prevent floating-point errors in billing and revenue calculations.
- **⚡ Hybrid Caching**: Utilizes Next.js `unstable_cache` with tag-based invalidation (`revalidateTag`) for millisecond-fast search results that stay fresh.
- **🔐 Multi-Tenant Security**: Role-Based Access Control (RBAC) via Auth.js middleware ensures strict separation between Admin, Owner, and Guest routes.
- **🎨 Modern UI/UX**: A polished interface built with Tailwind CSS, Framer Motion for animations, and Sonner for toasts, adhering to Shadcn design principles.

## 🏗️ Architecture & Tech Stack
### The Core Engine
- **Framework**: Next.js 15 (App Router & Turbopack)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Class Variance Authority (CVA)
- **State Management**: Zustand (Client) + Server Actions (Server)

### Data & Infrastructure
- **Database**: PostgreSQL (Supabase/Neon compatible)
- **ORM**: Prisma (with comprehensive schema validation)
- **Validation**: Zod + React Hook Form
- **Maps**: Mapbox GL JS

## 🛠️ Getting Started
Follow these steps to deploy your own instance of the engine.

### Prerequisites
- Node.js 18+
- PostgreSQL Database (Local or Cloud)
- Mapbox Public Key

### 1. Clone & Install
```bash
git clone https://github.com/your-username/oyo-clone.git
cd oyo-clone
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
# Database (Postgres Connection String)
DATABASE_URL="postgresql://user:password@localhost:5432/oyo_clone?schema=public"

# Auth (Generate with `openssl rand -base64 32`)
AUTH_SECRET="your_secure_random_string"

# Maps (Get from mapbox.com)
NEXT_PUBLIC_MAPBOX_TOKEN="pk.eyJ..."
```

### 3. Database Initialization
Push the schema to your database and seed initial data:
```bash
npx prisma db push
npx prisma db seed
```

### 4. Launch Development Server
```bash
npm run dev
```
Visit http://localhost:3000 to see the engine in action.

## 📂 Project Structure
```text
├── app/
│   ├── (auth)/          # Authentication routes
│   ├── (public)/        # Search & Detail pages (Guest View)
│   ├── dashboard/       # Protected routes for Owners & Admins
│   └── api/             # Edge-compatible API routes
├── components/
│   ├── ui/              # Reusable Shadcn primitives
│   └── maps/            # Mapbox integration components
├── lib/
│   ├── actions/         # Server Actions (Mutations)
│   ├── data/            # Cached Data Fetching
│   └── hooks/           # Zustand Store & Hooks
└── prisma/
    └── schema.prisma    # Database source of truth
```

## 🛡️ Security & Roles
- **Guest**: Public access to Search, Maps, and Hotel Details.
- **Owner**: Can create Hotels (Pending Verification) and view booking dashboards.
- **Admin**: Full access to verify hotels, manage users, and oversee platform metrics.

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes.
4. Open a Pull Request.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
