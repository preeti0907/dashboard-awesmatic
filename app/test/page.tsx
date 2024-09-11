"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { ChevronDown  } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese1", value: "zh1" },
  { label: "Chinese2", value: "zh2" },
  { label: "Chinese3", value: "zh3" },
  { label: "French1", value: "fr1" },
  { label: "French2", value: "fr2" },
  { label: "French3", value: "fr3" },
  { label: "German1", value: "de1" },
  { label: "German2", value: "de2" },
  { label: "German3", value: "de3" },
  { label: "Spanish1", value: "es1" },
  { label: "Spanish2", value: "es2" },
  { label: "Spanish3", value: "es3" },
  { label: "Portuguese1", value: "pt1" },
  { label: "Portuguese2", value: "pt2" },
  { label: "Portuguese3", value: "pt3" },
  { label: "Russian1", value: "ru1" },
  { label: "Russian2", value: "ru2" },
  { label: "Russian3", value: "ru3" },
  { label: "Japanese1", value: "ja1" },
  { label: "Japanese2", value: "ja2" },
  { label: "Japanese3", value: "ja3" },
  { label: "Korean1", value: "ko1" },
  { label: "Korean2", value: "ko2" },
  { label: "Korean3", value: "ko3" },
] as const

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
})

export default function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
   
    console.log("You submitted the following values:")
  }

  return (
    <div className="flex w-full justify-center">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[300px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select Brand"}
                      <ChevronDown/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search brands..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No brands found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("language", language.value)
                            }}
                          >
                            {language.label}
                            <Button
                              className={cn(
                                "ml-auto h-4 w-4",
                                language.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Search by brand names
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}
