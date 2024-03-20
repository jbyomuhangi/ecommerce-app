"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
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
  value: z.string(),
});
type FormSchemaType = z.infer<typeof formSchema>;

interface ColorFromProps {
  color: Color | null;
}

export const ColorFrom: React.FC<ColorFromProps> = ({ color }) => {
  const router = useRouter();
  const params = useParams<{ storeId: string; colorId: string }>();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: color?.name || "", value: color?.value || "" },
    reValidateMode: "onSubmit",
  });

  const { isPending: isCreateColorLoading, mutate: createColor } = useMutation({
    mutationFn: async ({ name, value }: { name: string; value: string }) => {
      await axios.post(`/api/stores/${params.storeId}/colors`, {
        name,
        value,
      });
    },

    onSuccess: () => {
      toast.success("Color created successfully");
      router.push(`/${params.storeId}/colors`);
      router.refresh();
    },

    onError: () => {
      toast.error("Unable to create color");
    },
  });

  const { isPending: isUpdateColorLoading, mutate: updateColor } = useMutation({
    mutationFn: async ({ name, value }: { name: string; value: string }) => {
      await axios.patch(
        `/api/stores/${params.storeId}/colors/${params.colorId}`,
        { name, value },
      );
    },

    onSuccess: () => {
      toast.success("Color updated successfully");
      router.refresh();
    },

    onError: () => {
      toast.error("Unable to update color");
    },
  });

  const { isPending: isDeleteColorLoading, mutate: deleteColor } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `/api/stores/${params.storeId}/colors/${params.colorId}`,
      );
    },

    onSuccess: () => {
      toast.success("Color deleted successfully");
      router.push(`/${params.storeId}/colors`);
      router.refresh();
    },

    onError: () => {
      toast.error("Unable to delete color");
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    if (color) {
      updateColor({ name: values.name, value: values.value });
    } else {
      createColor({ name: values.name, value: values.value });
    }
  };

  const isMutationRunning =
    isCreateColorLoading || isUpdateColorLoading || isDeleteColorLoading;

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between py-2">
          <Heading
            title={color ? "Edit color" : "Create color"}
            description={
              color
                ? "Edit an existing color"
                : "Create a new color for your store"
            }
          />

          {color && (
            <Button
              variant={"destructive"}
              color={"icon"}
              onClick={() => deleteColor()}
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
                          placeholder="Color name"
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
                name="value"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Value</FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Color value"
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
                {color ? "Save changes" : "Create color"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
