"use client"

import { Control } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { formSchema } from "./TransformationForm"


type FormProp ={
  control: Control<z.infer<typeof formSchema>>| undefined;
  render: (prop: {field : any}) => React.ReactNode;
  name: keyof z.infer<typeof formSchema> ;
  formLabel?: string;
  className?: string;
}

const CustomFormField = ({control, 
  render, 
  name, 
  formLabel, 
  className
}: FormProp ) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel>{formLabel}</FormLabel>}
          <FormControl>
            {render({field})}
          </FormControl>
          </FormItem>
      )}
    />
  )
}

export default CustomFormField;
