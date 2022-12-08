import React, { FC } from 'react';

import { Box, Popover } from '@mui/material';

interface PopoverMessageProps {
  anchorEl: null | HTMLElement;
  handlePopoverClose: () => void;
  open: boolean;
  children: React.ReactNode;
}

export const PopoverMessage: FC<PopoverMessageProps> = ({
  anchorEl,
  handlePopoverClose,
  open,
  children,
}) => {
  return (
    <Popover
      id="mouse-over-popover"
      sx={{
        pointerEvents: 'none',
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Box padding={2}>{children}</Box>
    </Popover>
  );
};
