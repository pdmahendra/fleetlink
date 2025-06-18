import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/cui/form-input";
import { addVehicle } from "@/lib/schema";
import { toast } from "sonner";
import { useAddVehicle } from "@/api/vehicle-api";
import { Loader2 } from "lucide-react";

const AddVehicle = () => {
  const { mutate: addVehicleMutation, isPending } = useAddVehicle();
  const [formData, setFormData] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = addVehicle.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        capacityKg: fieldErrors.capacityKg?.[0],
        tyres: fieldErrors.tyres?.[0],
      });
      return;
    }

    addVehicleMutation(result.data, {
      onSuccess: (res) => {
        toast.success(res.message || "Vehicle added!");
        setFormData({
          name: "",
          capacityKg: "",
          tyres: "",
        });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Add Vehicle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          name="name"
          title="Vehicle Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <FormInput
          name="capacityKg"
          title="Capacity (kg)"
          type="number"
          value={formData.capacityKg}
          onChange={handleChange}
          error={errors.capacityKg}
          required
        />
        <FormInput
          name="tyres"
          title="Tyres"
          type="number"
          value={formData.tyres}
          onChange={handleChange}
          error={errors.tyres}
          required
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center gap-2">
              Add Vehicle
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            "Add Vehicle"
          )}{" "}
        </Button>
      </form>
    </div>
  );
};

export default AddVehicle;
