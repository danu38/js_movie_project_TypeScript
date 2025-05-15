//Created by: ChatGPT with some modifications
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  width: 10ch;
  text-align: center;
`;

const TriggerButton = styled.button`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: none;
  background: white;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #007bff;
  }
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const MenuItem = styled.li`
  padding: 8px 12px;
  background: ${({ isFocused }) => (isFocused ? '#eee' : 'white')};
  cursor: pointer;

  &[aria-selected='true'] {
    font-weight: bold;
  }
`;

// Alternativen hårdkodade som tidigare <option value="">
const options = ['popular', 'upcoming', 'top_rated'];

const AccessibleDropdown = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const buttonRef = useRef();
  const listRef = useRef();

  // Öppna/stäng dropdown
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // När ett alternativ väljs
  const handleSelect = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
    buttonRef.current.focus();

    // 🔥 Skicka event till parent, liknande native <select>
    if (onChange) {
      const fakeEvent = {
        target: {
          value: options[index],
          name: 'filter', // matchar din gamla select
        },
      };
      onChange(fakeEvent);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case 'Enter':
        e.preventDefault();
        handleSelect(focusedIndex);
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current.focus();
        break;
      default:
        break;
    }
  };

  // När dropdownen öppnas, fokusera på listan
  useEffect(() => {
    if (isOpen && listRef.current) {
      listRef.current.focus();
    }
  }, [isOpen]);

  return (
    <DropdownWrapper>
      <TriggerButton
        ref={buttonRef}
        onClick={toggleMenu}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        {selectedIndex !== null
          ? options[selectedIndex].replace('_', ' ')
          : 'Choose'}
      </TriggerButton>

      {isOpen && (
        <Menu
          role='listbox'
          tabIndex={-1}
          ref={listRef}
          onKeyDown={handleKeyDown}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              role='option'
              aria-selected={selectedIndex === index}
              isFocused={focusedIndex === index}
              onMouseEnter={() => setFocusedIndex(index)}
              onClick={() => handleSelect(index)}
            >
              {option.replace('_', ' ')}{' '}
              {/* Visa som "Top rated" istället för "top_rated" */}
            </MenuItem>
          ))}
        </Menu>
      )}
    </DropdownWrapper>
  );
};

export default AccessibleDropdown;
