import React from 'react'
import { useSelect } from 'downshift'

const DropdownSelect = ({ items }: { items: Array<string> }) => {
    const {
        isOpen,
        selectedItem,
        getToggleButtonProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        getItemProps,
    } = useSelect({ items })

    return (
        <div>
            <button type="button" {...getToggleButtonProps()}>
                {selectedItem || 'Elements'}
            </button>
            <ul {...getMenuProps()}>
                {isOpen &&
                    items.map((item: string, index: number) => (
                        <li
                            style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}>
                            {item}
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default DropdownSelect
