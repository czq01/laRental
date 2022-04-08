import { styled as mStyled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

export const StyledPagination = mStyled(Pagination)(() => ({
  '& .MuiPaginationItem-text': {
    color: '#fff'
  }
  
}))