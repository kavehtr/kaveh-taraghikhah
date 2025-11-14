import React, { PropsWithChildren } from "react";

export default function Section({ children, ...rest }: PropsWithChildren<any>) {
  return (
    <section {...rest} className={`max-w-6xl mx-auto px-6 py-16 sm:py-24`}>
      {children}
    </section>
  );
}
