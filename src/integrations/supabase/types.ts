export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      amc_plans: {
        Row: {
          created_at: string
          description: string | null
          duration_months: number
          id: string
          is_active: boolean | null
          name: string
          price: number
          priority_support: boolean | null
          updated_at: string
          visits_included: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          priority_support?: boolean | null
          updated_at?: string
          visits_included?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_months?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          priority_support?: boolean | null
          updated_at?: string
          visits_included?: number
        }
        Relationships: []
      }
      banners: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          link_url: string | null
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          address: string | null
          assigned_staff_id: string | null
          booking_type: string
          created_at: string
          device_id: string | null
          id: string
          issue_description: string | null
          notes: string | null
          scheduled_date: string
          scheduled_time: string | null
          service_id: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          assigned_staff_id?: string | null
          booking_type?: string
          created_at?: string
          device_id?: string | null
          id?: string
          issue_description?: string | null
          notes?: string | null
          scheduled_date: string
          scheduled_time?: string | null
          service_id?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          assigned_staff_id?: string | null
          booking_type?: string
          created_at?: string
          device_id?: string | null
          id?: string
          issue_description?: string | null
          notes?: string | null
          scheduled_date?: string
          scheduled_time?: string | null
          service_id?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "customer_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_amc: {
        Row: {
          created_at: string
          device_id: string | null
          end_date: string
          id: string
          plan_id: string | null
          start_date: string
          status: string | null
          updated_at: string
          user_id: string
          visits_remaining: number
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          end_date: string
          id?: string
          plan_id?: string | null
          start_date: string
          status?: string | null
          updated_at?: string
          user_id: string
          visits_remaining?: number
        }
        Update: {
          created_at?: string
          device_id?: string | null
          end_date?: string
          id?: string
          plan_id?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          visits_remaining?: number
        }
        Relationships: [
          {
            foreignKeyName: "customer_amc_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "customer_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_amc_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "amc_plans"
        ]
      }
      customer_devices: {
          created_at: string
          updated_at: string
          user_id: string
        Insert: {
          device_type: string
          purchase_date?: string | null
          user_id: string
        Update: {
          brand?: string | null
          created_at?: string
          model?: string | null
          purchase_date?: string | null
          serial_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          due_date: string | null
          id: string
          invoice_number: string
          order_id: string | null
          paid_date: string | null
          pdf_url: string | null
          tax_amount: number | null
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          order_id?: string | null
          paid_date?: string | null
          pdf_url?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          order_id?: string | null
          paid_date?: string | null
          pdf_url?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          product_id: string | null
          quantity: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          product_id?: string | null
          quantity?: number
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: string
          payment_method: string | null
          payment_status: string | null
          shipping_address: string | null
          status: string | null
          total_amount: number
          updated_at: string
          status: string | null
          user_id: string
          created_at: string
        }
          booking_id: string | null
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          id?: string
          payment_method?: string | null
          device_type?: string
        }
          payment_status?: string | null
          shipping_address?: string | null
          status?: string | null
          updated_at?: string
          serial_number?: string | null
          total_amount?: number
          model?: string | null
          notes?: string | null
          updated_at?: string
          user_id: string
          id?: string
          created_at?: string
        }
          brand?: string | null
        }
        Update: {
          serial_number: string | null
          purchase_date: string | null
          created_at?: string
          notes: string | null
          model: string | null
          id: string
          id?: string
          device_type: string
          brand: string | null
          payment_method?: string | null
        Row: {
          payment_status?: string | null
          shipping_address?: string | null

          status?: string | null
          total_amount?: number
          updated_at?: string
          user_id?: string
        }

        Relationships: []
      }

      products: {
        Row: {
          category: string

          created_at: string
          description: string | null

          id: string
          image_url: string | null

          is_active: boolean | null
          name: string

          price: number
          stock_quantity: number | null
          updated_at: string
        }

        Insert: {
          category: string

          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null

          is_active?: boolean | null
          name: string
          price: number
          stock_quantity?: number | null
          updated_at?: string
        }

        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          stock_quantity?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string

          email: string | null
          full_name: string | null

          id: string
          phone: string | null
          updated_at: string

          user_id: string

        }

        Insert: {

          avatar_url?: string | null
          created_at?: string

          email?: string | null

          full_name?: string | null

          id?: string
          phone?: string | null

          updated_at?: string
          user_id: string

        }

        Update: {

          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []

      }
      services: {
        Row: {

          category: string
          created_at: string

          description: string | null
          duration_minutes: number | null

          icon: string | null
          id: string
          is_active: boolean | null

          name: string
          price: number

          updated_at: string
        }

        Insert: {
          category: string

          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          icon?: string | null

          id?: string
          is_active?: boolean | null
          name: string

          price?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null

          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: []
      }
      ticket_messages: {
        Row: {
          attachment_url: string | null

          created_at: string

          id: string

          message: string

          sender_id: string
          ticket_id: string

        }

        Insert: {
          attachment_url?: string | null
          created_at?: string

          id?: string

          message: string
          sender_id: string

          ticket_id: string

        }

        Update: {
          attachment_url?: string | null

          created_at?: string
          id?: string
          message?: string
          sender_id?: string

          ticket_id?: string

        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]

            isOneToOne: false
            referencedRelation: "tickets"

            referencedColumns: ["id"]
          },

        ]
      }
      tickets: {
        Row: {
          assigned_staff_id: string | null
          created_at: string
          description: string | null
          id: string
          priority: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_staff_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_staff_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string

          role?: Database["public"]["Enums"]["app_role"]

          user_id: string
        }

        Update: {

          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]

          user_id?: string

        }

        Relationships: []
      }

    }

    Views: {

      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {

          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }

        Returns: boolean
      }

    }
    Enums: {

      app_role: "admin" | "staff" | "customer"
    }

    CompositeTypes: {
      [_ in never]: never
    }

  }
}


type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]


export type Tables<

  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },

  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals

  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {

  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }

    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U

    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]

    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U

      }

      ? U

      : never

    : never


export type Enums<

  DefaultSchemaEnumNameOrOptions extends

    | keyof DefaultSchema["Enums"]

    | { schema: keyof DatabaseWithoutInternals },

  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals

  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]

  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]

    : never


export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]

    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals

  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]

    : never = never,
> = PublicCompositeTypeNameOrOptions extends {

  schema: keyof DatabaseWithoutInternals
}

  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]

    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "customer"],
    },
  },

} as const
