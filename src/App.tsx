import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

import { Label } from '@radix-ui/react-label';

const formSchema = z.object({
  candidateNextStep: z.enum(['yes', 'no'], {
    required_error: 'You need to select a notification type.',
  }),
  potentialOffer: z.enum(['yes', 'no'], {
    required_error: 'You need to select a notification type.',
  }),
  nextInterviewerName: z.string().refine(
    (value) => {
      const parts = value.trim().split(' ');
      return parts.length === 2 && parts.every((part) => part.length >= 2);
    },
    {
      message:
        'Must be a first and last name, each with at least 2 characters.',
    },
  ),
  unselectedInterviewer: z.boolean().default(false).optional(),
  approveNextInterviewRound: z
    .boolean({
      required_error: 'You need to select a notification type.',
    })
    .default(false),
  feedback: z.string().min(10, {
    message: 'Feedback must be at least 10 characters.',
  }),
});

export default function App() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nextInterviewerName: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 py-10 gap-3 bg-slate-700 text-slate-300">
      <h1 className="text-center text-2xl">
        How did your meeting go with (Candidate's Full Name)?
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="candidateNextStep"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Will you be moving forward with (Candidate First Name) in the
                  hiring process?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="potentialOffer"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  Do you plan to make an offer of employment to (Candidate First
                  Name) at this time?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div className="md:max-w-3/4 md:mr-3">
              <FormField
                control={form.control}
                name="nextInterviewerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Who is the next person (Candidate First Name) will need to
                      speak with in the hiring process?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <Label className="text-sm">(First and Last Name)</Label>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:max-w-[25%]">
              <FormField
                control={form.control}
                name="unselectedInterviewer"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I don't know who (Candidate Name) needs to speak with
                        next.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="approveNextInterviewRound"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between py-4">
                <FormLabel className="text-sm font-medium leading-none max-w-[90%] mr-2">
                  Find-Time will now reach out (Next Round Interviewer's First
                  Name) to set up the next interview with (candidate's first
                  name). Is that OK?
                </FormLabel>
                <FormControl>
                  <Switch
                    className="bg-slate-300 self-center"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback for (Candidate Full Name)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about candidate at least 10 characters"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="border-slate-300 border-2 rounded-md"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
