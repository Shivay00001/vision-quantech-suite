-- Seed Users (Note: These must exist in auth.users first for FK to work, 
-- but for local dev we might just insert into public.users if we disable FK or mock it.
-- ideally, you create users via Supabase Auth API, then insert here.)

-- Mock Data for CRM
INSERT INTO public.crm_leads (name, email, company, status, value) VALUES
('Acme Corp', 'contact@acme.com', 'Acme Inc', 'new', 5000),
('Globex', 'info@globex.com', 'Globex Corporation', 'qualified', 12000),
('Soylent Corp', 'sales@soylent.com', 'Soylent Corp', 'proposal', 8500);

-- Mock Data for HR
INSERT INTO public.hr_employees (first_name, last_name, email, position, department, salary, join_date) VALUES
('John', 'Doe', 'john@visionquantech.com', 'Software Engineer', 'Engineering', 90000, '2023-01-15'),
('Jane', 'Smith', 'jane@visionquantech.com', 'Product Manager', 'Product', 105000, '2023-02-01');

-- Mock Data for Finance
INSERT INTO public.finance_invoices (invoice_number, client_name, amount, status, due_date) VALUES
('INV-001', 'Acme Inc', 5000, 'paid', '2023-10-01'),
('INV-002', 'Globex Corp', 12000, 'pending', '2023-11-15');

-- Mock Data for Compliance
INSERT INTO public.compliance_tasks (title, due_date, status, priority) VALUES
('GST Filing', '2023-11-20', 'pending', 'high'),
('TDS Payment', '2023-11-07', 'completed', 'high');

-- Mock Data for Inventory
INSERT INTO public.inventory_products (name, sku, price, stock_quantity) VALUES
('Laptop Pro X', 'LPX-001', 1200, 45),
('Wireless Mouse', 'WM-002', 25, 150),
('Monitor 4K', 'M4K-003', 400, 30);
