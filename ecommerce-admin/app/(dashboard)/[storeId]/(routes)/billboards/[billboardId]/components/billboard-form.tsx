"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { ApiAlert } from "@/components/api-alert";
import { Heading } from "@/components/heading";
import { ImageUpload } from "@/components/image-upload";
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
import { useOrigin } from "@/hooks/use-origin";

const formSchema = z.object({
  label: z.string().min(3),
  imageUrl: z.string().min(3),
});
type FormSchemaType = z.infer<typeof formSchema>;

interface BillboardFromProps {
  billBoard: Billboard | null;
}

export const BillboardFrom: React.FC<BillboardFromProps> = ({ billBoard }) => {
  // const router = useRouter();
  // const origin = useOrigin();

  // const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: billBoard?.label || "",
      imageUrl: billBoard?.imageUrl || "",
    },
    reValidateMode: "onSubmit",
  });

  // const { isPending: isUpdateStoreLoading, mutate: updateStore } = useMutation({
  //   mutationFn: async ({ name }: { name: string }) => {
  //     await axios.patch(`/api/stores/${store.id}`, { name });
  //   },

  //   onSuccess: () => {
  //     router.refresh();
  //     toast.success("Store updated successfully");
  //   },

  //   onError: () => {
  //     toast.error("Something went wrong");
  //   },
  // });

  // const { isPending: isDeleteStoreLoading, mutate: deleteStore } = useMutation({
  //   mutationFn: async () => {
  //     await axios.delete(`/api/stores/${store.id}`);
  //   },

  //   onSuccess: () => {
  //     toast.success("Store deleted successfully");
  //     router.push("/");
  //     router.refresh();
  //   },

  //   onError: () => {
  //     toast.error("Something went wrong");
  //   },
  // });

  const onSubmit = (values: FormSchemaType) => {
    //   updateStore({ name: values.name });
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between py-2">
          <Heading
            title={billBoard ? "Edit billboard" : "Create billboard"}
            description={
              billBoard
                ? "Edit an existing  billboard"
                : "Create a new billboard for your store"
            }
          />

          {billBoard && (
            <Button
              variant={"destructive"}
              size={"icon"}
              // onClick={() => setIsAlertModalOpen(true)}
            >
              <Trash className="h-4 w-4  " />
            </Button>
          )}
        </div>

        <Separator />

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Background Image</FormLabel>

                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        // isDisabled={}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Label</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Billboard label"
                          // disabled={isUpdateStoreLoading}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                // disabled={isUpdateStoreLoading}
              >
                {billBoard ? "Save changes" : "Create billboard"}
              </Button>
            </div>
          </form>
        </Form>

        {/* <Separator /> */}

        {/* <ApiAlert
          variant="public"
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${store.id}`}
        /> */}
      </div>

      {/* <AlertModal
        isLoading={isDeleteStoreLoading}
        ModalProps={{
          isOpen: isAlertModalOpen,
          onClose: () => setIsAlertModalOpen(false),
        }}
        onConfirm={deleteStore}
      /> */}
    </div>
  );
};
