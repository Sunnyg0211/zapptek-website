-- Fix warn-level security issues

-- 1. Restrict staff to only view bookings they are assigned to (remove OR logic that allows all staff)
DROP POLICY IF EXISTS "Staff can view assigned bookings" ON public.bookings;
CREATE POLICY "Staff can view assigned bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = assigned_staff_id);

-- 2. Restrict customer_amc INSERT to admins only (prevent fraudulent subscriptions)
CREATE POLICY "Only admins can insert AMC subscriptions" 
ON public.customer_amc 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3. Prevent users from deleting their own orders (audit trail)
DROP POLICY IF EXISTS "Users can manage own orders" ON public.orders;
CREATE POLICY "Users can view own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" 
ON public.orders 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 4. Prevent users from modifying/deleting order_items after creation
CREATE POLICY "Users cannot update order items" 
ON public.order_items 
FOR UPDATE 
USING (false);

CREATE POLICY "Users cannot delete order items" 
ON public.order_items 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. Restrict invoice modifications to admins only
CREATE POLICY "Users cannot update invoices" 
ON public.invoices 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users cannot delete invoices" 
ON public.invoices 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert invoices" 
ON public.invoices 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 6. Prevent users from deleting tickets (allow status updates instead)
DROP POLICY IF EXISTS "Users can manage own tickets" ON public.tickets;
CREATE POLICY "Users can view own tickets" 
ON public.tickets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tickets" 
ON public.tickets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tickets" 
ON public.tickets 
FOR UPDATE 
USING (auth.uid() = user_id);

-- 7. Prevent message deletion by non-admins
CREATE POLICY "Only admins can delete ticket messages" 
ON public.ticket_messages 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));
