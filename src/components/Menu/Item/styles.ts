import { styled, ListItemIcon } from '@mui/material';

const CustomListItemIcon = styled(ListItemIcon)`
  min-width: auto;
  margin-right: 12px;
  color: ${({ theme }) => theme.palette.primary.dark};
`;

const SpanName = styled('span')`
  font-size: 14px;

  &.active-menu-item {
    color: ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;

    &.selected-menu-item {
      font-weight: bold;
    }
  }

  &.disabled-menu-item {
    color: ${({ theme }) => theme.palette.common.black};
    font-weight: 400;
    cursor: not-allowed;
    pointer-events: all;
  }
`;

export { CustomListItemIcon, SpanName };
