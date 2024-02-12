"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { AlertModal } from "@/components/modal/alert-modal";
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
import { Separator } from "@/components/ui/separator";

interface SettingsFormProps {
  store: Store;
}

const formSchema = z.object({ name: z.string().min(3) });
type FormSchemaType = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ store }) => {
  const router = useRouter();

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: store.name },
    reValidateMode: "onSubmit",
  });

  const { isPending: isUpdateStoreLoading, mutate: updateStore } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      await axios.patch(`/api/stores/${store.id}`, { name });
    },

    onSuccess: () => {
      router.refresh();
      toast.success("Store updated successfully");
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const { isPending: isDeleteStoreLoading, mutate: deleteStore } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/stores/${store.id}`);
    },

    onSuccess: () => {
      toast.success("Store deleted successfully");
      router.push("/");
      router.refresh();
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    updateStore({ name: values.name });
  };

  return (
    <div>
      <AlertModal
        isLoading={isDeleteStoreLoading}
        ModalProps={{
          isOpen: isAlertModalOpen,
          onClose: () => setIsAlertModalOpen(false),
        }}
        onConfirm={deleteStore}
      />

      <div className="flex items-center justify-between py-2">
        <Heading title="Settings" description="Manage store setting" />

        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => setIsAlertModalOpen(true)}
        >
          <Trash className="h-4 w-4 " />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-8">
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
                        placeholder="Store name"
                        disabled={isUpdateStoreLoading}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <Button
            className="mt-4"
            type="submit"
            disabled={isUpdateStoreLoading}
          >
            Save changes
          </Button>
        </form>
      </Form>
    </div>
  );
};
