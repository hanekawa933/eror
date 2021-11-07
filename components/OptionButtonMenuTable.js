import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  chakra,
} from "@chakra-ui/react";

import { SettingsIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const OptionButtonMenuTable = () => {
  return (
    <Menu>
      <MenuButton as={Button} size="sm" variant="outline">
        <SettingsIcon />
      </MenuButton>
      <MenuList minWidth="3em">
        <MenuItem>
          <Button
            size="sm"
            variant="outline"
            colorScheme="red"
            leftIcon={<DeleteIcon />}
            width="100%"
          >
            Delete
          </Button>
        </MenuItem>
        <MenuItem minWidth="3em">
          <Button
            size="sm"
            variant="outline"
            colorScheme="whatsapp"
            leftIcon={<EditIcon />}
            width="100%"
          >
            Edit
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default OptionButtonMenuTable;
