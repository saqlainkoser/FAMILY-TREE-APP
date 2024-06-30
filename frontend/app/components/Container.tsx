import styled from "styled-components";
import React from "react";


export const PaddedContainer = styled.div<{ $height_t: string, $padding: string }>`
    min-height: ${props => props.$height_t};
    width: 100vw;
    margin-inline: auto;
    padding: ${props => props.$padding};
`


export const Section = ({children, styles}: {
   children: React.JSX.Element,
   styles: React.CSSProperties
}): React.JSX.Element => {
   return <section style={styles}>
      {children}
   </section>
}

export const Attributes = ({children, styles}: {
   children: React.JSX.Element,
   styles: React.CSSProperties,
}): React.JSX.Element => {
   return (
      <div style={styles}>
         {children}
      </div>
   )
}


