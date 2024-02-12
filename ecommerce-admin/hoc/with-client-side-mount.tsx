/* eslint-disable react/display-name */
"use client";

import React, { useEffect, useState } from "react";

export const withClientSideMount =
  <PropsType extends object>(Component: React.FC<PropsType>) =>
  (props: PropsType) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return <Component {...props} />;
  };
