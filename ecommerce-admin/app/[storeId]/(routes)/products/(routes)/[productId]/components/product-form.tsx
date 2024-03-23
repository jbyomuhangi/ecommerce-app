"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { ImageUpload } from "@/components/image-upload";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MultiSelectInput } from "./multi-select";

type ProductType = Product & {
  images: Image[];
  colors: Color[];
  sizes: Size[];
};

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colorIds: z.string().array().min(1),
  sizeIds: z.string().array().min(1),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
});
type FormSchemaType = z.infer<typeof formSchema>;

interface ProductFormProps {
  product: ProductType | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  categories,
  colors,
  sizes,
}) => {
  const router = useRouter();
  const params = useParams<{ storeId: string; productId: string }>();

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      images: product?.images.map((image) => ({ url: image.url })) || [],
      price: Number(product?.price || 0),
      categoryId: product?.categoryId || "",
      colorIds: product?.colors.map((color) => color.id) || [],
      sizeIds: product?.sizes.map((size) => size.id) || [],
      isFeatured: product?.isFeatured || false,
      isArchived: product?.isArchived || false,
    },
    reValidateMode: "onSubmit",
  });

  const { isPending: isCreateProductLoading, mutate: createProduct } =
    useMutation({
      mutationFn: async (data: FormSchemaType) => {
        await axios.post(`/api/stores/${params.storeId}/products`, {
          ...data,
          images: data.images.map((item) => item.url),
        });
      },

      onSuccess: () => {
        toast.success("Product created successfully");
        router.push(`/${params.storeId}/products`);
        router.refresh();
      },

      onError: () => {
        toast.error("Unable to create product");
      },
    });

  const { isPending: isUpdateProductLoading, mutate: updateProduct } =
    useMutation({
      mutationFn: async (data: FormSchemaType) => {
        await axios.patch(
          `/api/stores/${params.storeId}/products/${params.productId}`,
          { ...data, images: data.images.map((item) => item.url) },
        );
      },

      onSuccess: () => {
        toast.success("Product updated successfully");
        router.push(`/${params.storeId}/products`);
        router.refresh();
      },

      onError: () => {
        toast.error("Unable to update product");
      },
    });

  const { isPending: isDeleteProductLoading, mutate: deleteProduct } =
    useMutation({
      mutationFn: async () => {
        await axios.delete(
          `/api/stores/${params.storeId}/products/${params.productId}`,
        );
      },

      onSuccess: () => {
        toast.success("Product deleted successfully");
        router.push(`/${params.storeId}/products`);
        router.refresh();
      },

      onError: () => {
        toast.error("Unable to delete product");
      },
    });

  const onSubmit = (values: FormSchemaType) => {
    if (product) {
      updateProduct(values);
    } else {
      createProduct(values);
    }
  };

  const isMutationRunning =
    isCreateProductLoading || isUpdateProductLoading || isDeleteProductLoading;

  const sizeOptions = useMemo(() => {
    return sizes.map((size) => ({ value: size.id, label: size.name }));
  }, [sizes]);

  const colorOptions = useMemo(() => {
    return colors.map((color) => ({ value: color.id, label: color.name }));
  }, [colors]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between py-2">
          <Heading
            title={product ? "Edit product" : "Create product"}
            description={
              product
                ? "Edit an existing  product"
                : "Create a new product for your store"
            }
          />

          {product && (
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => setIsAlertModalOpen(true)}
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
              name="images"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Images</FormLabel>

                    <FormControl>
                      <ImageUpload
                        value={field.value.map((item) => item.url)}
                        isDisabled={isMutationRunning}
                        onChange={(url) =>
                          field.onChange([...field.value, { url }])
                        }
                        onRemove={(url) =>
                          field.onChange(
                            field.value.filter((item) => item.url !== url),
                          )
                        }
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
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Name</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Product name"
                          disabled={isMutationRunning}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Price</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="69.42"
                          disabled={isMutationRunning}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Category</FormLabel>

                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isMutationRunning}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>

                          <SelectContent>
                            {categories.map((category) => {
                              return (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                >
                                  {category.name}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="sizeIds"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Size</FormLabel>

                      <FormControl>
                        <MultiSelectInput
                          value={field.value}
                          options={sizeOptions}
                          onAddItem={(value) =>
                            field.onChange([...field.value, value])
                          }
                          onRemoveItem={(value) => {
                            field.onChange(
                              field.value.filter((item) => item !== value),
                            );
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="colorIds"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Color</FormLabel>

                      <FormControl>
                        <MultiSelectInput
                          value={field.value}
                          options={colorOptions}
                          onAddItem={(value) =>
                            field.onChange([...field.value, value])
                          }
                          onRemoveItem={(value) => {
                            field.onChange(
                              field.value.filter((item) => item !== value),
                            );
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col gap-2 space-x-3 space-y-0 rounded-md border p-4">
                      <div className="flex flex-row items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isMutationRunning}
                          />
                        </FormControl>

                        <FormLabel className="pl-2">Featured</FormLabel>
                      </div>

                      <FormDescription className="pl-2">
                        This product will appear on the home page
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col gap-2 space-x-3 space-y-0 rounded-md border p-4">
                      <div className="flex flex-row items-center">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isMutationRunning}
                          />
                        </FormControl>

                        <FormLabel className="pl-2">Archived</FormLabel>
                      </div>

                      <FormDescription className="pl-2">
                        This product will not appear anywhere in the store
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isMutationRunning}>
                {product ? "Save changes" : "Create product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <AlertModal
        isLoading={isMutationRunning}
        ModalProps={{
          isOpen: isAlertModalOpen,
          onClose: () => setIsAlertModalOpen(false),
        }}
        onConfirm={deleteProduct}
      />
    </div>
  );
};
