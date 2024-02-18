"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  // const origin = useOrigin();
  const params = useParams<{ storeId: string; billboardId: string }>();

  // const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: billBoard?.label || "",
      imageUrl: billBoard?.imageUrl || "",
    },
    reValidateMode: "onSubmit",
  });

  const { isPending: isCreateBillboardLoading, mutate: createBillboard } =
    useMutation({
      mutationFn: async ({
        label,
        imageUrl,
      }: {
        label: string;
        imageUrl: string;
      }) => {
        await axios.post(`/api/stores/${params.storeId}/billboards`, {
          label,
          imageUrl,
        });
      },

      onSuccess: () => {
        toast.success("Billboard created successfully");
        router.push(`/${params.storeId}/billboards`);
      },

      onError: () => {
        toast.error("Unable to create billboard");
      },
    });

  const { isPending: isUpdateBillboardLoading, mutate: updateBillboard } =
    useMutation({
      mutationFn: async ({
        label,
        imageUrl,
      }: {
        label: string;
        imageUrl: string;
      }) => {
        const { data } = await axios.patch(
          `/api/stores/${params.storeId}/billboards/${params.billboardId}`,
          { label, imageUrl },
        );

        return data;
      },

      onSuccess: (data: Billboard) => {
        toast.success("Billboard updated successfully");
        router.push(`/${params.storeId}/billboards/${data.id}`);
      },

      onError: () => {
        toast.error("Unable to update billboard");
      },
    });

  const { isPending: isDeleteBillboardLoading, mutate: deleteBillboard } =
    useMutation({
      mutationFn: async () => {
        await axios.delete(
          `/api/stores/${params.storeId}/billboards/${params.billboardId}`,
        );
      },

      onSuccess: () => {
        toast.success("Billboard deleted successfully");
        //     router.push("/");
        //     router.refresh();
      },

      onError: () => {
        toast.error("Unable to delete billboard");
        router.push(`/${params.storeId}/billboards`);
      },
    });

  const onSubmit = (values: FormSchemaType) => {
    if (billBoard) {
      updateBillboard({ label: values.label, imageUrl: values.imageUrl });
    } else {
      createBillboard({ label: values.label, imageUrl: values.imageUrl });
    }
  };

  const isMutationRunning =
    isCreateBillboardLoading ||
    isUpdateBillboardLoading ||
    isDeleteBillboardLoading;

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
              name="imageUrl"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Background Image</FormLabel>

                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        isDisabled={isMutationRunning}
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
                          disabled={isMutationRunning}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isMutationRunning}>
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
