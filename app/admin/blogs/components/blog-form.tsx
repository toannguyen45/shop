/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  BlogFormValues,
  insertBlogSchema,
} from "@/schemaValidations/blog.schema";
import { blogDefaultValues } from "@/constants";
import { Blog } from "@/types/blog";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { createBlog, updateBlog } from "@/actions/blog.action";
import RichTextEditor from "@/components/TipTapEditor";
import slugify from "slugify";
import Image from "next/image";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";

export default function BlogForm({
  type,
  blog,
  blogId,
}: {
  type: "Create" | "Update";
  blog?: Blog;
  blogId?: string;
}) {
  const router = useRouter();

  const [tagInput, setTagInput] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(insertBlogSchema),
    defaultValues: blog && type === "Update" ? blog : blogDefaultValues,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title, { shouldValidate: true });
    if (!blog) {
      const slug = slugify(title, { lower: true, strict: true });
      form.setValue("slug", slug, { shouldValidate: true });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      form.setValue("image", imageUrl, { shouldValidate: true });
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = async () => {
    const currentImage = form.getValues("image");
    if (!currentImage) return;

    setIsDeleting(true);
    try {
      const deleted = await deleteFromCloudinary(currentImage);
      if (deleted) {
        form.setValue("image", "");
        toast.success("Image deleted successfully");
      } else {
        toast.error("Failed to delete image from storage");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.getValues("tags").includes(tagInput.trim())) {
      const currentTags = form.getValues("tags");
      form.setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (values: z.infer<typeof insertBlogSchema>) => {
    try {
      // On Create
      if (type === "Create") {
        const res = await createBlog(values);

        if (!res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
          router.push("/admin/blogs");
        }
      }

      // On Update
      if (type === "Update") {
        if (!blogId) {
          router.push("/admin/blogs");
          return;
        }

        const res = await updateBlog({ ...values, id: blogId });

        if (!res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
          router.push("/admin/blogs");
        }
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu Đề</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type=""
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); 
                    handleTitleChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ảnh bìa</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    {isUploading && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm text-muted-foreground">
                          Đang tải...
                        </span>
                      </div>
                    )}
                  </div>
                  {field.value && (
                    <div className="relative w-full h-48">
                      <Image
                        src={field.value || "/placeholder.svg"}
                        alt="Featured image"
                        fill
                        className="object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleImageRemove}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="" type="" {...field} />
              </FormControl>
              <FormDescription>
                Phiên bản thân thiện với URL của tiêu đề
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tóm tắt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập nội dung tóm tắt"
                  className="resize-none"
                  rows={3}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nội Dung</FormLabel>
              <FormControl>
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Gõ tag sau đó nhấn enter"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addTag}
                      disabled={!tagInput.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {field.value.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Thêm thẻ để phân loại nội dung của bạn
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Nổi bật hay không?</FormLabel>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Xuất bản hay không?</FormLabel>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
