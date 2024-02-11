"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    /* TODO: create store */

    console.log(values);
  };

  return (
    <Modal
      isOpen={isOpen}
      title="Create Store"
      description="Add a new store to manage products and categories"
      onClose={onClose}
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
                      <Input placeholder="E-commerce store" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="mt-4 flex justify-end gap-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
