import React from 'react';
import Select from 'react-select';

RFReactSelect.defaultProps = {
    isMulti: false,
    className: ""
};

export default function RFReactSelect({input, options, isMulti, className, styles}) {
    const {name, value, onBlur, onChange, onFocus} = input;
    const transformedValue = transformValue(value, options, isMulti);
    return (<Select
        name={name}
        closeMenuOnSelect={false}
        value={transformedValue}
        isMulti={isMulti}
        options={options}
        styles={styles}
        onChange={isMulti
        ? isMultiChangeHandler(onChange)
        : singleChangeHandler(onChange)}
        onBlur={() => onBlur(value)}
        onFocus={onFocus}
        className={className}/>);
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func) {
    return function handleSingleChange(value) {
        func(value
            ? value.value
            : '');
    };
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function isMultiChangeHandler(func) {
    return function handleisMultiHandler(values) {
        func(values.map(value => value.value));
    };
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select
 * wants the value in the form { value: "grape", label: "Grape" }
 *
 * * For isMulti select, Redux Form keeps the value as array of strings, while React Select
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, isMulti) {
    if (isMulti && typeof value === 'string') 
        return [];
    
    const filteredOptions = options.filter(option => {
        return isMulti
            ? value.indexOf(option.value) !== -1
            : option.value === value;
    });

    return isMulti
        ? filteredOptions
        : filteredOptions[0];
}