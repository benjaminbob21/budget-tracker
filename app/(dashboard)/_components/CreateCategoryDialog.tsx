"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionType } from "@/lib/type";
import { cn } from "@/lib/utils";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleOff, Loader2, PlusSquareIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategory } from "../_actions/categories";
import { Category } from "@prisma/client";
import { toast } from "sonner";
import { useTheme } from "next-themes";

type Props = {
  type: TransactionType;
  successCallback: (category: Category) => void;
};

function CreateCategoryDialog({ type, successCallback }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      type,
    },
  });

  const queryClient = useQueryClient();
  const theme = useTheme()

  const { mutate, isPending } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      form.reset({
        name: "",
        icon: "",
        type,
      });

      toast.success(`Category ${data.name} created successfully 🎉`, {
        id: "create-category",
      });

      successCallback(data);

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setOpen((prev) => !prev);
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-category",
      });
    },
  });

  const onSubmit = useCallback(
    (values: CreateCategorySchemaType) => {
      toast.loading("Creating category...", {
        id: "create-category",
      });
      mutate(values);
    },
    [mutate]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center justify-start rounded-lg border px-4 py-3 text-muted-foreground hover:bg-muted/50 transition-colors"
        >
          <PlusSquareIcon className="mr-2 h-4 w-4" />
          Create new
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md w-full mx-auto">
        <DialogHeader className="space-y-3 pb-4 border-b">
          <DialogTitle>
            Create{" "}
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type}
            </span>
            category
          </DialogTitle>
          <DialogDescription>
            Categories help you organize and track your transactions better
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter category name"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500">
                    Choose a clear, descriptive name
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Icon</FormLabel>
                  <div className="space-y-4">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-[100px] w-full hover:bg-muted/50 transition-colors"
                          >
                            {field.value ? (
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-5xl" role="img">
                                  {field.value}
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  Click to change
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2">
                                <CircleOff className="h-[48px] w-[48px] text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">
                                  Click to select
                                </p>
                              </div>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="center">
                          <div className="max-h-[min(370px,60vh)] overflow-y-auto">
                            <Picker
                              data={data}
                              theme={theme.resolvedTheme}
                              onEmojiSelect={(emoji: { native: string }) => {
                                field.onChange(emoji.native);
                              }}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </div>
                  <FormDescription className="text-xs text-gray-500">
                    Choose an emoji that represents this category
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className="flex items-center justify-end gap-2 pt-4 border-t">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => form.reset()}
              className="px-6"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isPending}
            className={cn(
              "px-6",
              type === "income"
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-red-600 hover:bg-red-700",
              "text-white"
            )}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </div>
            ) : (
              "Create Category"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
