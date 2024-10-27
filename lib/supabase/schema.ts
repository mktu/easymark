export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookmark_accesses: {
        Row: {
          access_count: number | null
          bookmark_id: number
          last_accessed_at: string | null
        }
        Insert: {
          access_count?: number | null
          bookmark_id: number
          last_accessed_at?: string | null
        }
        Update: {
          access_count?: number | null
          bookmark_id?: number
          last_accessed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_accesses_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: true
            referencedRelation: "bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_accesses_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: true
            referencedRelation: "bookmarks_with_ogp"
            referencedColumns: ["bookmark_id"]
          },
          {
            foreignKeyName: "bookmark_accesses_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: true
            referencedRelation: "bookmarks_with_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmark_tags: {
        Row: {
          bookmark_id: number
          tag_id: number
        }
        Insert: {
          bookmark_id: number
          tag_id: number
        }
        Update: {
          bookmark_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_tags_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_tags_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks_with_ogp"
            referencedColumns: ["bookmark_id"]
          },
          {
            foreignKeyName: "bookmark_tags_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks_with_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks: {
        Row: {
          category_id: number | null
          created_at: string | null
          id: number
          is_valid: boolean | null
          note: string | null
          updated_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          is_valid?: boolean | null
          note?: string | null
          updated_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string | null
          id?: number
          is_valid?: boolean | null
          note?: string | null
          updated_at?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_with_bookmark_count"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string | null
          id: number
          name: string
          parent_id: number | null
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: number
          name: string
          parent_id?: number | null
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: number
          name?: string
          parent_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories_with_bookmark_count"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ogp_data: {
        Row: {
          description: string | null
          image_url: string | null
          last_fetched: string | null
          title: string | null
          url: string
        }
        Insert: {
          description?: string | null
          image_url?: string | null
          last_fetched?: string | null
          title?: string | null
          url: string
        }
        Update: {
          description?: string | null
          image_url?: string | null
          last_fetched?: string | null
          title?: string | null
          url?: string
        }
        Relationships: []
      }
      reminders: {
        Row: {
          bookmark_id: number | null
          created_at: string | null
          id: number
          notified: boolean | null
          reminder_date: string
        }
        Insert: {
          bookmark_id?: number | null
          created_at?: string | null
          id?: number
          notified?: boolean | null
          reminder_date: string
        }
        Update: {
          bookmark_id?: number | null
          created_at?: string | null
          id?: number
          notified?: boolean | null
          reminder_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reminders_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks_with_ogp"
            referencedColumns: ["bookmark_id"]
          },
          {
            foreignKeyName: "reminders_bookmark_id_fkey"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks_with_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      search_queries: {
        Row: {
          created_at: string | null
          id: number
          query: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          query: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          query?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_queries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_mappings: {
        Row: {
          bookmark_id: number
          created_at: string | null
          id: number
          tag_id: number
        }
        Insert: {
          bookmark_id: number
          created_at?: string | null
          id?: number
          tag_id: number
        }
        Update: {
          bookmark_id?: number
          created_at?: string | null
          id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_bookmark"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_bookmark"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks_with_ogp"
            referencedColumns: ["bookmark_id"]
          },
          {
            foreignKeyName: "fk_bookmark"
            columns: ["bookmark_id"]
            isOneToOne: false
            referencedRelation: "bookmarks_with_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_tag"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag_usage"
            referencedColumns: ["tag_id"]
          },
          {
            foreignKeyName: "fk_tag"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          id: string
          profile_image_url: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          profile_image_url?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_image_url?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      bookmarks_with_ogp: {
        Row: {
          access_count: number | null
          bookmark_id: number | null
          category_id: number | null
          created_at: string | null
          is_valid: boolean | null
          last_accessed_at: string | null
          note: string | null
          ogp_description: string | null
          ogp_image: string | null
          ogp_title: string | null
          updated_at: string | null
          url: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_with_bookmark_count"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks_with_tags: {
        Row: {
          id: number | null
          tags: Json | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories_with_bookmark_count: {
        Row: {
          bookmark_count: number | null
          color: string | null
          created_at: string | null
          id: number | null
          name: string | null
          parent_id: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories_with_bookmark_count"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_usage: {
        Row: {
          bookmark_count: number | null
          tag_id: number | null
          tag_name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_frequently_used_categories: {
        Args: {
          user_id: string
        }
        Returns: {
          category_id: string
          category_name: string
          bookmark_count: number
        }[]
      }
      get_last_updated_time: {
        Args: {
          input_user_id: string
        }
        Returns: string
      }
      update_bookmark_access: {
        Args: {
          input_bookmark_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
