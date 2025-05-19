import Input from "./Input";

type EmailInputProps = {
  name?: string;
  placeholder?: string;
  requiredMessage?: boolean;
}

export default function EmailInput({name, placeholder="Email / Username", requiredMessage=false}: EmailInputProps) {
  return (
    <Input
      name={name == undefined ? "email" : name}
      type="email"
      placeholder={placeholder}
      inputMode="email"
      rules={{
        required: requiredMessage ? "El correo es requerido" : false,
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "El correo electrónico no es válido"
        }
      }}
    />
  );
}