import { StringInputProps, useFormValue } from "sanity";
import { slotOptionsForType } from "@/lib/journey-slots";

export function SlotInput(props: StringInputProps) {
  const category = useFormValue(["type"]) as string | undefined;
  return props.renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {
        ...props.schemaType.options,
        list: slotOptionsForType(category),
      },
    },
  });
}
