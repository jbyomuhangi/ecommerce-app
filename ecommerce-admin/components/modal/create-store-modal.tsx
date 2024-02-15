"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
import { withClientSideMount } from "@/hoc/with-client-side-mount";
import { useCreateStoreModalStore } from "@/hooks/use-create-store-modal-store";
import { useRouter } from "next/navigation";

const formSchema = z.object({ name: z.string().min(3) });
type FormSchemaType = z.infer<typeof formSchema>;

const CreateStoreModalBase = () => {
  const router = useRouter();

  const { isOpen, onClose } = useCreateStoreModalStore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
    reValidateMode: "onSubmit",
  });

  const { isPending: isCreateStoreLoading, mutate: createStore } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const { data } = await axios.post("/api/stores", { name });
      return data;
    },

    onSuccess: (data: Store) => {
      onClose();
      toast.success("Store created successfully");
      router.push(`/${data.id}`);
      router.refresh();
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleClose = () => {
    if (isCreateStoreLoading) return;
    onClose();
  };

  const onSubmit = (values: FormSchemaType) => {
    createStore({ name: values.name });
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
                        disabled={isCreateStoreLoading}
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
                disabled={isCreateStoreLoading}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isCreateStoreLoading}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export const CreateStoreModal = withClientSideMount(CreateStoreModalBase);
