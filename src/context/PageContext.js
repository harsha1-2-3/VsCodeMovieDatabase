import React from 'react'

const PageContext = React.createContext({
  searchResponse: '',
  searchInput: '',
  onChangeSearch: () => {},
  onTriggerSearchBtn: () => {},
})

export default PageContext