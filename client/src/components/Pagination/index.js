import { StyledPagination } from "./styled"

function Pagination({page, count, onPageChange}) {
  return (
    <>
      <StyledPagination 
        page={page}
        count={count} 
        onChange={onPageChange}
        defaultPage={1}
        color="primary" 
        variant="text"/>
    </>
  )
}

export default Pagination