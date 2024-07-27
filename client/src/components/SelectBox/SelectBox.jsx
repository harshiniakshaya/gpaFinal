const SelectBox = ({options, label, name, onChange}) => {
    return(
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            <select onChange={onChange} name={name} className="select select-bordered">
                <option disabled selected>Pick one</option>
                {
                    options.map(option => <option id={option.key}>{option.value}</option>)
                }
            </select>
        </label>
    )
};

export default SelectBox;