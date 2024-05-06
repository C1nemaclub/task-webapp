import React, { useState } from 'react';

const useToggle = (
  initalState: boolean = false
): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [toggle, setToggle] = useState(initalState);

  const toggleState = () => {
    setToggle((prev) => !prev);
  };

  return [toggle, toggleState, setToggle];
};

export default useToggle;
