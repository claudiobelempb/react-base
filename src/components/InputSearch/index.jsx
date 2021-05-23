import "./style.css";

const InputSearch = ({onChange, value}) => {
  return (
    <div className={"container_input--search"}>
      <input 
        onChange={onChange} 
        value={value}
        type="search"
        placeholder="Type your search"
  
      />
    </div>
  );
}

export { InputSearch };