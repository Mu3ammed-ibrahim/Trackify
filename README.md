# Trackify - Personal Finance Tracker

A modern, responsive personal finance management application built with Next.js, React, and Supabase. Trackify helps you monitor your income, expenses, and overall financial health with beautiful visualizations and an intuitive interface.

## ✨ Features

### 🔐 Authentication & Security

- **Secure User Authentication** with Supabase Auth
- **Email Verification** for new accounts
- **Session Management** with automatic logout
- **Protected Routes** ensuring data privacy

### 💰 Financial Management

- **Income & Expense Tracking** with detailed categorization
- **Real-time Balance Calculation** showing net financial position
- **Transaction History** with timestamps and descriptions
- **Delete Transactions** with confirmation dialogs

### 📊 Analytics & Visualization

- **Interactive Pie Charts** showing income vs expense distribution
- **Real-time Dashboard** with key financial metrics
- **Responsive Charts** that work on all devices
- **Beautiful Data Visualization** using Recharts

### 🎨 User Experience

- **Dark/Light Theme Toggle** with persistent preferences
- **Responsive Design** optimized for mobile and desktop
- **Smooth Animations** using Framer Motion
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **Mobile-First Navigation** with collapsible sidebar

### 🛠️ Technical Features

- **Modern React Hooks** for state management
- **Redux Toolkit** for global state management
- **TypeScript-Ready** codebase structure
- **ESLint Configuration** for code quality
- **Tailwind CSS** for styling
- **Lucide React Icons** for consistent iconography

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd trackify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   In your Supabase dashboard, create a `transactions` table:

   ```sql
   CREATE TABLE transactions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     amount DECIMAL(10,2) NOT NULL,
     description TEXT,
     category TEXT CHECK (category IN ('income', 'expense')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Authentication

1. **Sign Up**: Create a new account with email and password
2. **Email Verification**: Check your email and click the verification link
3. **Sign In**: Log in with your credentials
4. **Logout**: Use the logout button in the sidebar

### Managing Transactions

1. **Add Transaction**: Use the form on the Transactions page
2. **Categorize**: Choose between Income or Expense
3. **Add Details**: Include amount and description
4. **View History**: See all transactions with timestamps
5. **Delete**: Remove transactions with confirmation

### Dashboard

- **Overview Cards**: See balance, total income, and total expenses
- **Pie Chart**: Visual representation of income vs expenses
- **Recent Transactions**: Latest 5 transactions with details

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Redux Toolkit, React Redux
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
trackify/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── components/
│   │   ├── card.jsx
│   │   ├── navbar.jsx
│   │   └── ThemeProvider.jsx
│   ├── dashboard/
│   ├── transactions/
│   ├── about/
│   ├── lib/
│   │   └── supabaseClients.js
│   ├── redux/
│   │   ├── slices/
│   │   └── store.js
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Enable Email Auth in Authentication settings
3. Create the transactions table (see Installation)
4. Set up Row Level Security (RLS) policies:

```sql
-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy for users to see only their transactions
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Policy for users to insert their own transactions
CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own transactions
CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);
```

## 🎨 Customization

### Themes

The app supports light and dark themes. Theme preferences are stored in Redux and persist across sessions.

### Styling

All styling is done with Tailwind CSS. The design system uses:

- **Primary Colors**: Indigo (#6366f1)
- **Success Colors**: Green (#22c55e)
- **Error Colors**: Red (#ef4444)
- **Background**: Gray scale with dark mode support

### Adding Features

The modular structure makes it easy to add new features:

- **New Pages**: Add to `app/` directory
- **Components**: Add to `app/components/`
- **Redux State**: Add to `app/redux/slices/`
- **API Calls**: Add to `app/lib/`

## 🐛 Bug Fixes & Improvements

### Recent Fixes

- ✅ **Authentication Issues**: Fixed user session management and route protection
- ✅ **Mobile Responsiveness**: Added collapsible sidebar for mobile devices
- ✅ **Loading States**: Added proper loading indicators throughout the app
- ✅ **Error Handling**: Improved error messages and user feedback
- ✅ **Form Validation**: Added client-side validation for all forms
- ✅ **UI/UX Enhancements**: Modern design with better spacing and animations
- ✅ **Toast Notifications**: Added success/error notifications
- ✅ **Theme Support**: Improved dark mode implementation

### Performance Improvements

- **Lazy Loading**: Components load efficiently
- **Optimized Queries**: Database queries are optimized for performance
- **Caching**: Redux state management for better performance
- **Responsive Images**: Optimized for different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the backend infrastructure
- **Vercel** for the deployment platform
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for the smooth animations
- **Recharts** for the beautiful charts

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/trackify/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Trackify** - Take control of your finances with style! 💰✨
