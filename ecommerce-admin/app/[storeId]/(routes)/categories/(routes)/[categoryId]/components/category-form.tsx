"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Heading } from "@/components/heading";
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

const formSchema = z.object({
  name: z.string().min(3),
});
type FormSchemaType = z.infer<typeof formSchema>;

interface CategoryFromProps {
  category: Category | null;
}

export const CategoryFrom: React.FC<CategoryFromProps> = ({ category }) => {
  const router = useRouter();
  const params = useParams<{ storeId: string; billboardId: string }>();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name || "",
    },
    reValidateMode: "onSubmit",
  });

  const { isPending: isCreateCategoryLoading, mutate: createCategory } =
    useMutation({
      mutationFn: async () => {
        //       await axios.post(`/api/stores/${params.storeId}/billboards`, {
        //         label,
        //         imageUrl,
        //       });
      },

      onSuccess: () => {
        toast.success("Category created successfully");
        router.push(`/${params.storeId}/categories`);
        router.refresh();
      },

      onError: () => {
        toast.error("Unable to create billboard");
      },
    });

  const { isPending: isUpdateCategoryLoading, mutate: updateCategory } =
    useMutation({
      mutationFn: async () => {
        //       await axios.patch(
        //         `/api/stores/${params.storeId}/billboards/${params.billboardId}`,
        //         { label, imageUrl },
        //       );
      },

      onSuccess: () => {
        toast.success("Category updated successfully");
        router.refresh();
      },

      onError: () => {
        toast.error("Unable to update category");
      },
    });

  const { isPending: isDeleteCategoryLoading, mutate: deleteCategory } =
    useMutation({
      mutationFn: async () => {
        //       await axios.delete(
        //         `/api/stores/${params.storeId}/billboards/${params.billboardId}`,
        //       );
      },

      onSuccess: () => {
        toast.success("Category deleted successfully");
        router.push(`/${params.storeId}/categories`);
        router.refresh();
      },

      onError: () => {
        toast.error("Unable to delete category");
      },
    });

  const onSubmit = (values: FormSchemaType) => {
    if (category) {
      updateCategory();
    } else {
      createCategory();
    }
  };

  const isMutationRunning =
    isCreateCategoryLoading ||
    isUpdateCategoryLoading ||
    isDeleteCategoryLoading;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between py-2">
          <Heading
            title={category ? "Edit category" : "Create category"}
            description={
              category
                ? "Edit an existing category"
                : "Create a new category for your store"
            }
          />

          {category && (
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => deleteCategory()}
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
                          placeholder="Category name"
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
                {category ? "Save changes" : "Create category"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
