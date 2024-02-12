"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateStoreModalStore from "@/hooks/useCreateStoreModalStore";

export const CreateStoreModal = () => {
  const { isOpen, onClose } = useCreateStoreModalStore();

  const formSchema = useMemo(() => {
    return z.object({ name: z.string().min(3) });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
    reValidateMode: "onSubmit",
  });

  const { isPending: isCreatePostLoading, mutate } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const { data } = await axios.post("/api/stores", { name });

      toast.success("Store created successfully");
      window.location.assign(`/${data.id}`);
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ name: values.name });
  };

  const handleClose = () => {
    if (isCreatePostLoading) return;
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Create Store"
      description="Add a new store to manage products and categories"
      onClose={handleClose}
    >
      <div>
        <Form {...form}>
          <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder="E-commerce store"
                        disabled={isCreatePostLoading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="mt-4 flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isCreatePostLoading}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isCreatePostLoading}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
