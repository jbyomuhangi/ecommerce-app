"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SelectValue } from "@radix-ui/react-select";

const formSchema = z.object({
  name: z.string().min(3),
  billboardId: z.string(),
});
type FormSchemaType = z.infer<typeof formSchema>;

interface SizeFromProps {
  size: Size | null;
}

export const SizeFrom: React.FC<SizeFromProps> = ({ size }) => {
  const router = useRouter();
  const params = useParams<{ storeId: string; sizeId: string }>();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: size?.name || "" },
    reValidateMode: "onSubmit",
  });

  const { isPending: isCreateSizeLoading, mutate: createSize } = useMutation({
    mutationFn: async ({
      name,
      billboardId,
    }: {
      name: string;
      billboardId: string;
    }) => {
      await axios.post(`/api/stores/${params.storeId}/sizes`, {
        name,
        billboardId,
      });
    },

    onSuccess: () => {
      toast.success("Size created successfully");
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
    },

    onError: () => {
      toast.error("Unable to create billboard");
    },
  });

  const { isPending: isUpdateSizeLoading, mutate: updateSize } = useMutation({
    mutationFn: async ({
      name,
      billboardId,
    }: {
      name: string;
      billboardId: string;
    }) => {
      await axios.patch(
        `/api/stores/${params.storeId}/sizes/${params.sizeId}`,
        { name, billboardId },
      );
    },

    onSuccess: () => {
      toast.success("Size updated successfully");
      router.refresh();
    },

    onError: () => {
      toast.error("Unable to update size");
    },
  });

  const { isPending: isDeleteSizeLoading, mutate: deleteSize } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `/api/stores/${params.storeId}/sizes/${params.sizeId}`,
      );
    },

    onSuccess: () => {
      toast.success("Size deleted successfully");
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
    },

    onError: () => {
      toast.error("Unable to delete size");
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    if (size) {
      updateSize({ name: values.name, billboardId: values.billboardId });
    } else {
      createSize({ name: values.name, billboardId: values.billboardId });
    }
  };

  const isMutationRunning =
    isCreateSizeLoading || isUpdateSizeLoading || isDeleteSizeLoading;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between py-2">
          <Heading
            title={size ? "Edit size" : "Create size"}
            description={
              size
                ? "Edit an existing size"
                : "Create a new size for your store"
            }
          />

          {size && (
            <Button
              variant={"destructive"}
              size={"icon"}
              onClick={() => deleteSize()}
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
                          placeholder="Size name"
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
                name="billboardId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Billboard</FormLabel>

                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isMutationRunning}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a billboard" />
                          </SelectTrigger>

                          <SelectContent>
                            {billboards.map((billboard) => {
                              return (
                                <SelectItem
                                  key={billboard.id}
                                  value={billboard.id}
                                >
                                  {billboard.label}
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
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isMutationRunning}>
                {size ? "Save changes" : "Create size"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
