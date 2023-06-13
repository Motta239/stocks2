import { BsFillEraserFill } from "react-icons/bs";

const FormComponent = ({
  inputValue,
  setInputValue,
  inputRef,
  handleChange,
  handleSubmit,
  x,
}) => {
  return (
    <form
      className="flex items-center justify-center space-x-2"
      onSubmit={handleSubmit}
    >
      {inputValue.length > 0 && (
        <BsFillEraserFill
          onClick={() => setInputValue("")}
          className="w-6 h-6 text-blue-500 hover:text-red-500 transition-all ease-in duration-300"
        />
      )}
      <input
        className="px-2 h-10 input max-w-[24rem] bg-stone-100 min-w-[10rem] border-[0.4px] w-1/2 shadow-none"
        type="text"
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        placeholder={`Forecast About ${x}`}
      />
      <button
        className="rounded-full h-10 w-24 px-4 border hover:bg-blue-500 hover:text-white bg-white text-blue-500"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default FormComponent;
