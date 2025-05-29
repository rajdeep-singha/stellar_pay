"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/lib/supabase";

// Define the form schema with validation
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function Waitlist() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Initialize the form with validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);

  try {
    console.log("Attempting to submit email to waitlist:", data.email);

    const { error, data: insertedData, status } = await supabase
      .from("waitlist")
      .insert([{ email: data.email }]);

    console.log("Supabase response status:", status);
    console.log("Inserted data:", insertedData);

    if (error) {
      console.error("❌ Supabase error:", error);
      throw error;
    }

    console.log("✅ Successfully added email to waitlist");
    setSubmissionState("success");
    form.reset();
  } catch (error) {
    console.error("❌ Error in onSubmit:", error);
    setSubmissionState("error");
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmissionState("idle"), 5000);
  }
};


  return (
    <div className="mx-auto p-2 lg:p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 mb-2">
          Join Our Waitlist
        </h2>
        <p className="text-muted-foreground">
          Be the first to know when we launch. No spam, just updates.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="yourname@example.com"
                    type="email"
                    {...field}
                    disabled={isSubmitting || submissionState === "success"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AnimatePresence mode="wait">
            {submissionState === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm p-3 rounded-md bg-primary/10 text-primary"
              >
                <CheckCircle className="h-5 w-5" />
                <span>You have been added to the waitlist</span>
              </motion.div>
            ) : submissionState === "error" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-sm p-3 rounded-md bg-destructive/10 text-destructive"
              >
                <AlertCircle className="h-5 w-5" />
                <span>Something went wrong. Please try again.</span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting || submissionState === "success"}
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : submissionState === "success" ? (
              "Added to waitlist"
            ) : (
              "Join waitlist"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
