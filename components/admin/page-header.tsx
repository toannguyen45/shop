import React, { ReactNode } from 'react'

const PageHeader = ({ children }: { children: ReactNode }) => {
    return (
        <h1 className="font-bold text-2xl">{children}</h1>
    )
}

export default PageHeader