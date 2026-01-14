-- Fix: Remove blanket staff access to tickets - staff should only see assigned tickets
-- This addresses the PUBLIC_DATA_EXPOSURE issue

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Staff can view and update assigned tickets" ON public.tickets;

-- Create a new restrictive policy - staff can only view tickets assigned to them
CREATE POLICY "Staff can view assigned tickets" ON public.tickets 
FOR SELECT USING (
  auth.uid() = assigned_staff_id 
  OR auth.uid() = user_id 
  OR public.has_role(auth.uid(), 'admin')
);

-- Add constraint to limit ticket message length (prevents storage abuse)
ALTER TABLE public.ticket_messages ADD CONSTRAINT message_length_check 
CHECK (length(message) <= 5000 AND length(message) > 0);
