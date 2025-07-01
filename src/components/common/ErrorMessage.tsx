interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <p className="text-destructive text-lg font-medium text-center">
        {message}
      </p>
    </div>
  );
}
