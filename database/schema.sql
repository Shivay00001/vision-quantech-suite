-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS & ROLES
CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'manager', 'staff', 'viewer');

CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role user_role DEFAULT 'viewer',
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for Users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Superadmins can view all profiles" 
ON public.users FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'superadmin'
  )
);

-- CRM MODULE
CREATE TABLE public.crm_leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT DEFAULT 'new', -- new, contacted, qualified, proposal, won, lost
  value NUMERIC DEFAULT 0,
  notes TEXT,
  assigned_to UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- HR MODULE
CREATE TABLE public.hr_employees (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  position TEXT,
  department TEXT,
  salary NUMERIC,
  join_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FINANCE MODULE
CREATE TABLE public.finance_invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invoice_number TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, overdue
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMPLIANCE MODULE
CREATE TABLE public.compliance_tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed
  priority TEXT DEFAULT 'medium', -- low, medium, high
  assigned_to UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INVENTORY MODULE
CREATE TABLE public.inventory_products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  category TEXT,
  price NUMERIC NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_crm_leads_updated_at BEFORE UPDATE ON public.crm_leads FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
