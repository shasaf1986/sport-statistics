import { createMuiTheme, colors } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiTableRow: {
      root: {
        '&$selected': {
          backgroundColor: `${colors.grey[100]} !important`,
        },
      },
    },
  },
});
