// Created by: ChatGPT with some modifications
import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from 'react';
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
  color: white;
  font-weight: 600;
  box-sizing: border-box;
  padding: 8px 12px;
  border: none;
  background: black;
  cursor: pointer;
  z-index: 20;

  &:focus-visible {
    outline: 2px solid #007bff;
  }
`;

const Menu = styled.ul<{ 'data-open': boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transform: translateY(0px);
  transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  z-index: 10;

  &[data-open='true'] {
    max-height: 200px;
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    overflow-y: auto;
  }
`;

const MenuItem = styled.li<{ isFocused: boolean }>`
  color: white;
  padding: 8px 12px;
  background: ${({ isFocused }) => (isFocused ? 'darkgrey' : 'black')};
  cursor: pointer;

  &[aria-selected='true'] {
    font-weight: bold;
  }
`;

const options = ['Popular', 'Upcoming', 'Top_rated'];

interface AccessibleDropdownProps {
  onChange?: (event: { target: { value: string; name: string } }) => void;
}

const AccessibleDropdown: React.FC<AccessibleDropdownProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSelect = (index : number) => {
    setSelectedIndex(index);
    setIsOpen(false);
    buttonRef.current?.focus();

    if (onChange) {
      const fakeEvent = {
        target: {
          value: options[index].toLowerCase(), // Lowercase output
          name: 'filter',
        },
      };
      onChange(fakeEvent);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
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
        buttonRef.current?.focus();
        break;
      default:
        break;
    }
  };

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
          : 'Filter'}
      </TriggerButton>

      <Menu
        role='listbox'
        tabIndex={-1}
        ref={listRef}
        onKeyDown={handleKeyDown}
        data-open={isOpen}
        aria-hidden={!isOpen}
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
            {option.replace('_', ' ')}
          </MenuItem>
        ))}
      </Menu>
    </DropdownWrapper>
  );
};

export default AccessibleDropdown;
