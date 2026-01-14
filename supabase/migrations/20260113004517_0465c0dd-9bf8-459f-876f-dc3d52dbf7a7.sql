-- Block anonymous access to sensitive tables
-- These policies ensure unauthenticated users cannot access any data

-- Block anonymous access to profiles table
CREATE POLICY "Block anonymous access to profiles" 
ON public.profiles 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to user_roles table
CREATE POLICY "Block anonymous access to user_roles" 
ON public.user_roles 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to customer_devices table
CREATE POLICY "Block anonymous access to customer_devices" 
ON public.customer_devices 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to bookings table
CREATE POLICY "Block anonymous access to bookings" 
ON public.bookings 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to orders table
CREATE POLICY "Block anonymous access to orders" 
ON public.orders 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to invoices table
CREATE POLICY "Block anonymous access to invoices" 
ON public.invoices 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to tickets table
CREATE POLICY "Block anonymous access to tickets" 
ON public.tickets 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to ticket_messages table
CREATE POLICY "Block anonymous access to ticket_messages" 
ON public.ticket_messages 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to customer_amc table
CREATE POLICY "Block anonymous access to customer_amc" 
ON public.customer_amc 
FOR SELECT 
TO anon
USING (false);

-- Block anonymous access to order_items table
CREATE POLICY "Block anonymous access to order_items" 
ON public.order_items 
FOR SELECT 
TO anon
USING (false);
