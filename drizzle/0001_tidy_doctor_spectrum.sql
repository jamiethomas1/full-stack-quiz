CREATE TABLE "score" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"quiz_type" text NOT NULL,
	"num_questions" integer NOT NULL,
	"num_correct" integer NOT NULL,
	"time_started" timestamp NOT NULL,
	"time_finished" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "score" ADD CONSTRAINT "score_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;