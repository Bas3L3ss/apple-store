import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const notesSchema = z.object({
  customerNotes: z.string().max(500, "Notes must be 500 characters or less"),
});

const NotesForm = ({
  onSave,
  initialValue = "",
}: {
  onSave: (s: string) => void;
  initialValue: string;
}) => {
  const form = useForm({
    resolver: zodResolver(notesSchema),
    defaultValues: {
      customerNotes: initialValue,
    },
  });

  const onSubmit = (data: { customerNotes: string }) => {
    onSave(data.customerNotes);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-gray-700">
                Order Notes
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any special instructions or delivery notes here..."
                  className="min-h-32 rounded-lg border border-gray-300 px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-gray-500 mt-1">
                {field.value.length}/500 characters
              </p>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Notes
        </Button>
      </form>
    </Form>
  );
};
export default NotesForm;
