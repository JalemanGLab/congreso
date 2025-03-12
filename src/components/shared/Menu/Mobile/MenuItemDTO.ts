import { ReactNode } from "react";

export interface MenuItenDTO {
    text: string
    childrenIcon: ReactNode
    onClick: () => void
 }