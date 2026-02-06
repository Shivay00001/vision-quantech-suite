-- Enable RLS on all tables if not already
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_products ENABLE ROW LEVEL SECURITY;

-- CRM Policies
CREATE POLICY "Enable read access for authenticated users" ON public.crm_leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert access for authenticated users" ON public.crm_leads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update access for authenticated users" ON public.crm_leads FOR UPDATE USING (auth.role() = 'authenticated');

-- HR Policies
CREATE POLICY "Enable read access for authenticated users" ON public.hr_employees FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert access for authenticated users" ON public.hr_employees FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Finance Policies
CREATE POLICY "Enable read access for authenticated users" ON public.finance_invoices FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert access for authenticated users" ON public.finance_invoices FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Compliance Policies
CREATE POLICY "Enable read access for authenticated users" ON public.compliance_tasks FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert access for authenticated users" ON public.compliance_tasks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update access for authenticated users" ON public.compliance_tasks FOR UPDATE USING (auth.role() = 'authenticated');

-- Inventory Policies
CREATE POLICY "Enable read access for authenticated users" ON public.inventory_products FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable insert access for authenticated users" ON public.inventory_products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Enable update access for authenticated users" ON public.inventory_products FOR UPDATE USING (auth.role() = 'authenticated');
