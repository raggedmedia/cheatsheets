type ButtonProps = {
  btnText: string;
  onClick?: () => void;
};

export default function MyButton({ btnText, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {btnText}
    </button>
  );
}
