CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"article_type" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"platform" text NOT NULL,
	"published_at" timestamp with time zone,
	"cover_image" text,
	"external_url" text,
	"markdown_content" text,
	"tags" jsonb NOT NULL,
	"seo_title" text,
	"seo_description" text,
	"publication_status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "articles_slug_unique" UNIQUE("slug"),
	CONSTRAINT "art_pub_status_check" CHECK (publication_status IN ('draft', 'published', 'archived')),
	CONSTRAINT "art_type_check" CHECK (article_type IN ('internal', 'external')),
	CONSTRAINT "art_internal_content_check" CHECK (publication_status != 'published' OR article_type != 'internal' OR markdown_content IS NOT NULL),
	CONSTRAINT "art_external_url_check" CHECK (publication_status != 'published' OR article_type != 'external' OR external_url IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE "contact_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text DEFAULT 'singleton' NOT NULL,
	"form_enabled" boolean DEFAULT false NOT NULL,
	"form_endpoint" text,
	"email_enabled" boolean DEFAULT false NOT NULL,
	"email_link" text,
	"booking_enabled" boolean DEFAULT false NOT NULL,
	"booking_link" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "contact_config_key_unique" UNIQUE("key"),
	CONSTRAINT "form_endpoint_check" CHECK (NOT form_enabled OR form_endpoint IS NOT NULL),
	CONSTRAINT "email_link_check" CHECK (NOT email_enabled OR email_link IS NOT NULL),
	CONSTRAINT "booking_link_check" CHECK (NOT booking_enabled OR booking_link IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"short_description" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	"tags" jsonb NOT NULL,
	"thumbnail" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"live_url" text,
	"repository_url" text,
	"confidentiality_status" text NOT NULL,
	"confidentiality_label" text NOT NULL,
	"confidentiality_note" text,
	"role" text NOT NULL,
	"duration" text NOT NULL,
	"project_type" text NOT NULL,
	"hero_summary" text NOT NULL,
	"overview_product" text NOT NULL,
	"overview_audience" text NOT NULL,
	"overview_purpose" text NOT NULL,
	"problem" jsonb NOT NULL,
	"solution" jsonb NOT NULL,
	"responsibilities" jsonb NOT NULL,
	"key_features" jsonb NOT NULL,
	"screenshots" jsonb NOT NULL,
	"architecture" jsonb NOT NULL,
	"challenges" jsonb NOT NULL,
	"development_process" jsonb NOT NULL,
	"results" jsonb NOT NULL,
	"lessons_learned" jsonb NOT NULL,
	"next_steps" jsonb NOT NULL,
	"project_status" text DEFAULT 'live' NOT NULL,
	"publication_status" text DEFAULT 'draft' NOT NULL,
	"display_order" integer NOT NULL,
	"start_date" date,
	"end_date" date,
	"duration_label_override" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug"),
	CONSTRAINT "proj_pub_status_check" CHECK (publication_status IN ('draft', 'published', 'archived')),
	CONSTRAINT "proj_lifecycle_status_check" CHECK (project_status IN ('development', 'launch_preparation', 'live', 'paused', 'archived')),
	CONSTRAINT "proj_date_or_override_check" CHECK (start_date IS NOT NULL OR duration_label_override IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"business_outcome" text NOT NULL,
	"deliverables" jsonb NOT NULL,
	"category" text NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"display_order" integer NOT NULL,
	"publication_status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug"),
	CONSTRAINT "services_pub_status_check" CHECK (publication_status IN ('draft', 'published', 'archived'))
);
--> statement-breakpoint
CREATE TABLE "site_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text DEFAULT 'singleton' NOT NULL,
	"name" text NOT NULL,
	"short_name" text NOT NULL,
	"site_name" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"discuss_project_label" text NOT NULL,
	"view_work_label" text NOT NULL,
	"role_summary" jsonb NOT NULL,
	"hero_indicators" jsonb NOT NULL,
	"process" jsonb NOT NULL,
	"navigation" jsonb NOT NULL,
	"skills" jsonb NOT NULL,
	"biography" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "site_profiles_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"platform_key" text NOT NULL,
	"label" text NOT NULL,
	"href" text NOT NULL,
	"note" text,
	"enabled" boolean DEFAULT false NOT NULL,
	"display_order" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "social_links_platform_key_unique" UNIQUE("platform_key")
);
--> statement-breakpoint
CREATE TABLE "work_experience_projects" (
	"experience_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	CONSTRAINT "work_experience_project_pk" UNIQUE("experience_id","project_id")
);
--> statement-breakpoint
CREATE TABLE "work_experiences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stable_key" text NOT NULL,
	"organization" text NOT NULL,
	"role" text NOT NULL,
	"employment_type" text,
	"start_date" text NOT NULL,
	"end_date" text,
	"current" boolean DEFAULT false NOT NULL,
	"location" text,
	"summary" text NOT NULL,
	"highlights" jsonb NOT NULL,
	"technologies" jsonb NOT NULL,
	"confidentiality_safe_name" text,
	"featured" boolean DEFAULT false NOT NULL,
	"display_order" integer NOT NULL,
	"publication_status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "work_experiences_stable_key_unique" UNIQUE("stable_key"),
	CONSTRAINT "exp_pub_status_check" CHECK (publication_status IN ('draft', 'published', 'archived'))
);
--> statement-breakpoint
ALTER TABLE "work_experience_projects" ADD CONSTRAINT "work_experience_projects_experience_id_work_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."work_experiences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "work_experience_projects" ADD CONSTRAINT "work_experience_projects_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;