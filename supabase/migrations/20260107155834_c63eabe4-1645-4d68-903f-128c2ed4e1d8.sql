-- Create roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'customer');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  duration_minutes INTEGER DEFAULT 60,
  is_active BOOLEAN DEFAULT true,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AMC plans table
CREATE TABLE public.amc_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_months INTEGER NOT NULL DEFAULT 12,
  visits_included INTEGER NOT NULL DEFAULT 4,
  priority_support BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer devices table
CREATE TABLE public.customer_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  device_type TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  serial_number TEXT,
  purchase_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer AMC subscriptions
CREATE TABLE public.customer_amc (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.amc_plans(id) ON DELETE SET NULL,
  device_id UUID REFERENCES public.customer_devices(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  visits_remaining INTEGER NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  device_id UUID REFERENCES public.customer_devices(id) ON DELETE SET NULL,
  assigned_staff_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  booking_type TEXT NOT NULL DEFAULT 'onsite',
  issue_description TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  address TEXT,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending',
  shipping_address TEXT,
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  invoice_number TEXT NOT NULL UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'unpaid',
  due_date DATE,
  paid_date DATE,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_staff_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ticket messages table
CREATE TABLE public.ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL NOT NULL,
  message TEXT NOT NULL,
  attachment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create website banners table
CREATE TABLE public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT,
  link_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amc_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_amc ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Create has_role function for RLS policies
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.email);
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers to tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_amc_plans_updated_at BEFORE UPDATE ON public.amc_plans FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customer_devices_updated_at BEFORE UPDATE ON public.customer_devices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_customer_amc_updated_at BEFORE UPDATE ON public.customer_amc FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON public.banners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'staff'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for services (public read, admin write)
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for products (public read, admin write)
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for AMC plans (public read, admin write)
CREATE POLICY "Anyone can view active AMC plans" ON public.amc_plans FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage AMC plans" ON public.amc_plans FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for customer devices
CREATE POLICY "Users can manage own devices" ON public.customer_devices FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all devices" ON public.customer_devices FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff can view all devices" ON public.customer_devices FOR SELECT USING (public.has_role(auth.uid(), 'staff'));

-- RLS Policies for customer AMC
CREATE POLICY "Users can view own AMC" ON public.customer_amc FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all AMC" ON public.customer_amc FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff can view all AMC" ON public.customer_amc FOR SELECT USING (public.has_role(auth.uid(), 'staff'));

-- RLS Policies for bookings
CREATE POLICY "Users can manage own bookings" ON public.bookings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all bookings" ON public.bookings FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff can view assigned bookings" ON public.bookings FOR SELECT USING (auth.uid() = assigned_staff_id OR public.has_role(auth.uid(), 'staff'));
CREATE POLICY "Staff can update assigned bookings" ON public.bookings FOR UPDATE USING (auth.uid() = assigned_staff_id);

-- RLS Policies for orders
CREATE POLICY "Users can manage own orders" ON public.orders FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff can view all orders" ON public.orders FOR SELECT USING (public.has_role(auth.uid(), 'staff'));

-- RLS Policies for order items
CREATE POLICY "Users can view own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can insert own order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Admins can manage all order items" ON public.order_items FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for invoices
CREATE POLICY "Users can view own invoices" ON public.invoices FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all invoices" ON public.invoices FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff can view all invoices" ON public.invoices FOR SELECT USING (public.has_role(auth.uid(), 'staff'));

-- RLS Policies for tickets
CREATE POLICY "Users can manage own tickets" ON public.tickets FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all tickets" ON public.tickets FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff can view and update assigned tickets" ON public.tickets FOR SELECT USING (auth.uid() = assigned_staff_id OR public.has_role(auth.uid(), 'staff'));
CREATE POLICY "Staff can update assigned tickets" ON public.tickets FOR UPDATE USING (auth.uid() = assigned_staff_id);

-- RLS Policies for ticket messages
CREATE POLICY "Users can view messages on own tickets" ON public.ticket_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tickets WHERE tickets.id = ticket_messages.ticket_id AND tickets.user_id = auth.uid())
);
CREATE POLICY "Users can send messages on own tickets" ON public.ticket_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tickets WHERE tickets.id = ticket_messages.ticket_id AND tickets.user_id = auth.uid())
);
CREATE POLICY "Admins can manage all ticket messages" ON public.ticket_messages FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff can view assigned ticket messages" ON public.ticket_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tickets WHERE tickets.id = ticket_messages.ticket_id AND (tickets.assigned_staff_id = auth.uid() OR public.has_role(auth.uid(), 'staff')))
);
CREATE POLICY "Staff can send messages on assigned tickets" ON public.ticket_messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tickets WHERE tickets.id = ticket_messages.ticket_id AND tickets.assigned_staff_id = auth.uid())
);

-- RLS Policies for banners (public read, admin write)
CREATE POLICY "Anyone can view active banners" ON public.banners FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage banners" ON public.banners FOR ALL USING (public.has_role(auth.uid(), 'admin'));
