interface FormErrorMessageProps {
  message?: string | null;
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null;

  return <p className="text-sm text-red-500 mt-1">{message}</p>;
}
