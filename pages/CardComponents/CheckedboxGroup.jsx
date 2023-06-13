const CheckboxGroup = ({
  checkedInputs,
  inputValue,
  handleCheckboxChange,
  setColor,
}) => {
  return (
    <>
      {checkedInputs ? (
        checkedInputs.map(({ name, color }) => (
          <label
            key={name}
            onClick={() => setColor(color)}
            style={{
              backgroundColor: `${inputValue.includes(name) ? color : "white"}`,
            }}
            className={`${
              inputValue.includes(name) && "text-white font-bold"
            } cbtn p-2 rounded-full md:text-[12px] text-gray-700 text-[10px] px-3 my-1 hover:bg-stone-100 font-medium backdrop-blur-lg border shadow-lg flex items-center justify-center`}
          >
            <input
              className="opacity-0 hidden active:outline-0 focus:border-transparent focus:ring-0 !outline-none"
              type="checkbox"
              value={name}
              onChange={handleCheckboxChange}
            />
            {name}
          </label>
        ))
      ) : (
        <div className="text-gray-700">Nothing to show</div>
      )}
    </>
  );
};

export default CheckboxGroup;
