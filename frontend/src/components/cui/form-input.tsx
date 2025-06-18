import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  name: string;
  title: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

export const FormInput = ({
  name,
  title,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  required,
}: FormInputProps) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={name}>
        {title} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
