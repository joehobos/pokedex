import React from 'react'

function Page({gotoPreviousPage, gotoNextPage}) {
  return (
    <div>
        {gotoPreviousPage && <button onClick={gotoPreviousPage}>Previous</button>}
        {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}

export default Page;